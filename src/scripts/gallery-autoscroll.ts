import { LIGHTBOX_OPEN_ATTRIBUTE } from './gallery-lightbox';
import { prefersMotion } from './motion';

const SCROLL_SPEED_PX_PER_SECOND = 36;
const START_DELAY_MS = 2600;
const EDGE_PAUSE_MS = 1800;
const INTERACTION_PAUSE_MS = 3000;
const MAX_FRAME_DELTA_MS = 100;
const EDGE_TOLERANCE_PX = 1;
const DRIFT_TOLERANCE_PX = 2;
const VISIBLE_THRESHOLD = 0.3;
const MS_PER_SECOND = 1000;

type Direction = 1 | -1;

interface AutoscrollController {
  start(): void;
  stop(): void;
}

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

/** Scrolls one gallery back and forth; hovering or touching it hands control back to the visitor. */
const createAutoscroll = (gallery: HTMLElement): AutoscrollController => {
  let position = 0;
  let direction: Direction = 1;
  let frame = 0;
  let lastTime = 0;
  let pausedUntil = 0;
  let isHovered = false;

  const pause = (durationMs: number): void => {
    pausedUntil = performance.now() + durationMs;
  };

  const tick = (time: number): void => {
    const delta = Math.min(time - lastTime, MAX_FRAME_DELTA_MS);
    lastTime = time;
    frame = window.requestAnimationFrame(tick);

    if (isHovered || time < pausedUntil || gallery.hasAttribute(LIGHTBOX_OPEN_ATTRIBUTE)) {
      position = gallery.scrollLeft;
      return;
    }

    // Picks up any scroll that did not come from this loop (scrollbar, keyboard, momentum)
    if (Math.abs(gallery.scrollLeft - position) > DRIFT_TOLERANCE_PX) position = gallery.scrollLeft;
    const maxScroll = gallery.scrollWidth - gallery.clientWidth;
    position = clamp(position + (direction * SCROLL_SPEED_PX_PER_SECOND * delta) / MS_PER_SECOND, 0, maxScroll);
    gallery.scrollLeft = position;

    const reachedEdge = direction === 1 ? position >= maxScroll - EDGE_TOLERANCE_PX : position <= EDGE_TOLERANCE_PX;
    if (reachedEdge) {
      direction = direction === 1 ? -1 : 1;
      pause(EDGE_PAUSE_MS);
    }
  };

  gallery.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') isHovered = true;
  });
  gallery.addEventListener('pointerleave', () => {
    isHovered = false;
  });
  (['pointerdown', 'wheel', 'touchstart', 'focusin'] as const).forEach((type) => {
    gallery.addEventListener(type, () => pause(INTERACTION_PAUSE_MS), { passive: true });
  });

  return {
    start: () => {
      if (frame !== 0 || gallery.scrollWidth <= gallery.clientWidth) return;
      position = gallery.scrollLeft;
      lastTime = performance.now();
      pause(START_DELAY_MS);
      frame = window.requestAnimationFrame(tick);
    },
    stop: () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    },
  };
};

/** Slowly scrolls case study galleries that overflow, only while they are on screen. */
export function initGalleryAutoscroll(): void {
  const galleries = document.querySelectorAll<HTMLElement>('[data-autoscroll]');
  if (galleries.length === 0 || !prefersMotion() || !('IntersectionObserver' in window)) return;

  const controllers = new Map<Element, AutoscrollController>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const controller = controllers.get(entry.target);
        if (entry.isIntersecting) controller?.start();
        else controller?.stop();
      }
    },
    { threshold: VISIBLE_THRESHOLD },
  );

  galleries.forEach((gallery) => {
    controllers.set(gallery, createAutoscroll(gallery));
    observer.observe(gallery);
  });
}
