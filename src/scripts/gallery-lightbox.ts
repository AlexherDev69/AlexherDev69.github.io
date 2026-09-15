import { prefersMotion } from './motion';

/** Set on a gallery while one of its items is shown full screen, so the autoscroll holds still. */
export const LIGHTBOX_OPEN_ATTRIBUTE = 'data-lightbox-open';

const OPEN_DURATION_MS = 650;
const CLOSE_DURATION_MS = 480;
const CHROME_DELAY_MS = 220;
const EASE_OUT = 'cubic-bezier(.19, 1, .22, 1)';
const EASE_IN_OUT = 'cubic-bezier(.77, 0, .18, 1)';
const MAX_WIDTH_RATIO = 0.9;
const MAX_HEIGHT_RATIO = 0.8;
const MAX_UPSCALE = 2;
const FINAL_RADIUS_PX = 12;

type GalleryMedia = HTMLImageElement | HTMLVideoElement;

interface Size {
  width: number;
  height: number;
}

const createMedia = (source: GalleryMedia): GalleryMedia => {
  if (source instanceof HTMLImageElement) {
    const image = new Image();
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    return image;
  }
  const video = document.createElement('video');
  video.src = source.querySelector('source')?.src ?? source.currentSrc;
  video.poster = source.poster;
  video.controls = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('aria-label', source.getAttribute('aria-label') ?? '');
  return video;
};

/** Largest size that fits the viewport, without blowing small screenshots up past twice their size. */
const fitSize = (source: GalleryMedia): Size => {
  const width = Number(source.getAttribute('width')) || source.clientWidth;
  const height = Number(source.getAttribute('height')) || source.clientHeight;
  const scale = Math.min(
    (window.innerWidth * MAX_WIDTH_RATIO) / width,
    (window.innerHeight * MAX_HEIGHT_RATIO) / height,
    MAX_UPSCALE,
  );
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
};

/** Keyframe that lays the full screen media exactly over its thumbnail (FLIP technique). */
const thumbnailKeyframe = (item: HTMLElement, final: DOMRect): Keyframe => {
  const thumb = item.getBoundingClientRect();
  const thumbRadius = parseFloat(getComputedStyle(item).borderTopLeftRadius) || 0;
  return {
    transform: `translate(${thumb.left - final.left}px, ${thumb.top - final.top}px) scale(${thumb.width / final.width}, ${thumb.height / final.height})`,
    borderRadius: `${(thumbRadius * final.width) / thumb.width}px`,
  };
};

const playWithSound = (video: HTMLVideoElement): void => {
  video.play().catch(() => {
    video.muted = true;
    video.play().catch(() => undefined);
  });
};

export function initGalleryLightbox(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  const media = dialog?.querySelector<HTMLElement>('[data-lightbox-media]');
  const caption = dialog?.querySelector<HTMLElement>('[data-lightbox-caption]');
  const backdrop = dialog?.querySelector<HTMLElement>('[data-lightbox-backdrop]');
  if (!dialog || !media || !caption || !backdrop) return;

  const chrome = Array.from(dialog.querySelectorAll<HTMLElement>('[data-lightbox-chrome]'));
  let activeItem: HTMLElement | null = null;
  let isClosing = false;

  const cancelAnimations = (): void => {
    [media, backdrop, ...chrome].forEach((element) => element.getAnimations().forEach((animation) => animation.cancel()));
  };

  const animateOpen = (item: HTMLElement): void => {
    const final = media.getBoundingClientRect();
    media.animate([thumbnailKeyframe(item, final), { transform: 'none', borderRadius: `${FINAL_RADIUS_PX}px` }], {
      duration: OPEN_DURATION_MS,
      easing: EASE_OUT,
    });
    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: OPEN_DURATION_MS, easing: 'ease' });
    chrome.forEach((element) =>
      element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: OPEN_DURATION_MS, delay: CHROME_DELAY_MS, easing: 'ease', fill: 'backwards' }),
    );
  };

  const animateClose = async (item: HTMLElement): Promise<void> => {
    cancelAnimations();
    const final = media.getBoundingClientRect();
    const fadeOut = { duration: CLOSE_DURATION_MS, easing: 'ease', fill: 'forwards' } as const;
    const animations = [
      media.animate([{ transform: 'none', borderRadius: `${FINAL_RADIUS_PX}px` }, thumbnailKeyframe(item, final)], {
        duration: CLOSE_DURATION_MS,
        easing: EASE_IN_OUT,
        fill: 'forwards',
      }),
      backdrop.animate([{ opacity: 1 }, { opacity: 0 }], fadeOut),
      ...chrome.map((element) => element.animate([{ opacity: 1 }, { opacity: 0 }], { ...fadeOut, duration: CLOSE_DURATION_MS / 2 })),
    ];
    await Promise.all(animations.map((animation) => animation.finished.catch(() => undefined)));
  };

  const reset = (): void => {
    if (activeItem) {
      activeItem.style.visibility = '';
      activeItem.closest('[data-autoscroll]')?.removeAttribute(LIGHTBOX_OPEN_ATTRIBUTE);
    }
    if (dialog.open) dialog.close();
    cancelAnimations();
    media.replaceChildren();
    activeItem = null;
    isClosing = false;
  };

  const open = (item: HTMLElement): void => {
    const source = item.querySelector<GalleryMedia>('img, video');
    if (!source || dialog.open) return;

    const content = createMedia(source);
    const size = fitSize(source);
    media.replaceChildren(content);
    media.style.width = `${size.width}px`;
    media.style.height = `${size.height}px`;
    caption.textContent = source.getAttribute('alt') ?? source.getAttribute('aria-label') ?? '';

    activeItem = item;
    item.closest('[data-autoscroll]')?.setAttribute(LIGHTBOX_OPEN_ATTRIBUTE, '');
    dialog.showModal();
    if (prefersMotion()) animateOpen(item);
    item.style.visibility = 'hidden';
    if (content instanceof HTMLVideoElement) playWithSound(content);
  };

  const close = async (): Promise<void> => {
    if (!dialog.open || isClosing) return;
    isClosing = true;
    media.querySelector('video')?.pause();
    if (prefersMotion() && activeItem) await animateClose(activeItem);
    reset();
  };

  document.addEventListener('click', (event) => {
    const item = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-lightbox-item]') : null;
    if (item) open(item);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (!(event.target instanceof HTMLElement) || !event.target.matches('[data-lightbox-item]')) return;
    event.preventDefault();
    open(event.target);
  });

  dialog.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('video')) return;
    void close();
  });
  // Escape closes the preview only, not the case study panel underneath
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    void close();
  });
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    void close();
  });
  dialog.addEventListener('close', () => {
    if (activeItem) reset();
  });
}
