const REVEAL_SELECTOR = '.rv, .mask';
const REVEALED_CLASS = 'in';
const VISIBLE_THRESHOLD = 0.12;
const BOTTOM_MARGIN = '0px 0px -6% 0px';

export interface Revealer {
  observe(root: ParentNode): void;
  replay(root: ParentNode): void;
}

const revealAll = (root: ParentNode): void => {
  root.querySelectorAll(REVEAL_SELECTOR).forEach((element) => element.classList.add(REVEALED_CLASS));
};

/** Adds the `in` class to `.rv` and `.mask` elements the first time they scroll into view. */
export function createRevealer(): Revealer {
  if (!('IntersectionObserver' in window)) {
    return { observe: revealAll, replay: revealAll };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(REVEALED_CLASS);
        observer.unobserve(entry.target);
      }
    },
    { threshold: VISIBLE_THRESHOLD, rootMargin: BOTTOM_MARGIN },
  );

  const observe = (root: ParentNode): void => {
    root.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
      if (!element.classList.contains(REVEALED_CLASS)) observer.observe(element);
    });
  };

  const replay = (root: ParentNode): void => {
    root.querySelectorAll(REVEAL_SELECTOR).forEach((element) => element.classList.remove(REVEALED_CLASS));
    observe(root);
  };

  return { observe, replay };
}
