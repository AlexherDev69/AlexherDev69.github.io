import { padTwoDigits, prefersMotion } from './motion';
import type { Revealer } from './reveal';

const CLOSE_ANIMATION_MS = 750;
const SWAP_FADE_MS = 460;
const SWAP_SETTLE_MS = 60;

interface CaseHistoryState {
  caseSlug: string;
  pushed: boolean;
}

const readHistoryState = (): CaseHistoryState | null => {
  const state: unknown = history.state;
  if (typeof state !== 'object' || state === null || !('caseSlug' in state)) return null;
  return state as CaseHistoryState;
};

/**
 * Full-screen case study panel: opens from the project list, keeps the URL hash in sync
 * (so a case study can be shared and the back button closes it) and pages between projects.
 */
export function initCaseStudies(revealer: Revealer): void {
  const panel = document.querySelector<HTMLElement>('[data-case-panel]');
  const site = document.querySelector<HTMLElement>('[data-site]');
  if (!panel || !site) return;

  const articles = Array.from(panel.querySelectorAll<HTMLElement>('[data-case]'));
  const slugs = articles.map((article) => article.dataset.case ?? '');
  const position = panel.querySelector<HTMLElement>('[data-case-position]');
  const closeButton = panel.querySelector<HTMLElement>('[data-case-close]');

  let currentIndex = -1;
  let timer: number | undefined;

  const indexFromHash = (): number => slugs.indexOf(decodeURIComponent(window.location.hash.slice(1)));
  const openerFor = (index: number): HTMLElement | null =>
    document.querySelector<HTMLElement>(`button[data-open-case="${slugs[index]}"]`);

  const showArticle = (index: number): void => {
    articles.forEach((article, articleIndex) => {
      article.hidden = articleIndex !== index;
    });
    const article = articles[index];
    panel.setAttribute('aria-labelledby', article.getAttribute('aria-labelledby') ?? '');
    if (position) position.textContent = `${padTwoDigits(index + 1)} / ${padTwoDigits(articles.length)}`;
    panel.scrollTop = 0;
    revealer.replay(article);
    currentIndex = index;
  };

  const open = (index: number): void => {
    window.clearTimeout(timer);
    panel.classList.remove('is-leaving', 'is-swapping');
    panel.hidden = false;
    showArticle(index);
    document.documentElement.style.overflow = 'hidden';
    site.inert = true;
    closeButton?.focus({ preventScroll: true });
  };

  const finishClose = (): void => {
    const opener = currentIndex >= 0 ? openerFor(currentIndex) : null;
    panel.hidden = true;
    panel.classList.remove('is-leaving', 'is-swapping');
    document.documentElement.style.overflow = '';
    site.inert = false;
    currentIndex = -1;
    opener?.focus({ preventScroll: true });
  };

  const close = (): void => {
    if (currentIndex < 0) return;
    window.clearTimeout(timer);
    if (!prefersMotion()) {
      finishClose();
      return;
    }
    panel.classList.add('is-leaving');
    timer = window.setTimeout(finishClose, CLOSE_ANIMATION_MS);
  };

  /** Closing goes back in history when the panel added an entry, so the back button stays consistent. */
  const requestClose = (): void => {
    if (readHistoryState()?.pushed) {
      history.back();
      return;
    }
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    close();
  };

  const step = (delta: number): void => {
    if (currentIndex < 0) return;
    const target = (currentIndex + delta + articles.length) % articles.length;
    const state: CaseHistoryState = { caseSlug: slugs[target], pushed: readHistoryState()?.pushed ?? false };
    history.replaceState(state, '', `#${slugs[target]}`);
    window.clearTimeout(timer);
    if (!prefersMotion()) {
      showArticle(target);
      return;
    }
    panel.classList.add('is-swapping');
    timer = window.setTimeout(() => {
      showArticle(target);
      timer = window.setTimeout(() => panel.classList.remove('is-swapping'), SWAP_SETTLE_MS);
    }, SWAP_FADE_MS);
  };

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const opener = event.target.closest<HTMLElement>('[data-open-case]');
    if (opener) {
      const index = slugs.indexOf(opener.dataset.openCase ?? '');
      if (index < 0) return;
      const state: CaseHistoryState = { caseSlug: slugs[index], pushed: true };
      history.pushState(state, '', `#${slugs[index]}`);
      open(index);
      return;
    }

    if (event.target.closest('[data-case-close]')) {
      requestClose();
      return;
    }

    const stepper = event.target.closest<HTMLElement>('[data-case-step]');
    if (stepper) step(Number(stepper.dataset.caseStep));
  });

  document.addEventListener('keydown', (event) => {
    if (currentIndex >= 0 && event.key === 'Escape') requestClose();
  });

  window.addEventListener('popstate', () => {
    const index = indexFromHash();
    if (index < 0) {
      close();
    } else if (currentIndex < 0) {
      open(index);
    } else if (index !== currentIndex) {
      showArticle(index);
    }
  });

  const initialIndex = indexFromHash();
  if (initialIndex >= 0) open(initialIndex);
}
