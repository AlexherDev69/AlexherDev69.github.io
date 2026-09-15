import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FakeIntersectionObserver, installFakeIntersectionObserver, lastObserver } from '../test/intersection-observer';
import { initGalleryAutoscroll } from './gallery-autoscroll';
import { LIGHTBOX_OPEN_ATTRIBUTE } from './gallery-lightbox';

const START_DELAY_MS = 2600;
const EDGE_PAUSE_MS = 1800;
const GALLERY_WIDTH = 1000;
const MAX_SCROLL = 120;
const EDGE_TOLERANCE_PX = 1;

const setupGallery = (contentWidth = GALLERY_WIDTH + MAX_SCROLL): HTMLElement => {
  document.body.innerHTML = '<div class="d-gallery" data-autoscroll></div>';
  const gallery = document.querySelector<HTMLElement>('[data-autoscroll]') as HTMLElement;
  let scrollLeft = 0;
  Object.defineProperties(gallery, {
    scrollWidth: { value: contentWidth },
    clientWidth: { value: GALLERY_WIDTH },
    scrollLeft: { get: () => scrollLeft, set: (value: number) => (scrollLeft = value) },
  });
  return gallery;
};

const hover = (gallery: HTMLElement): void => {
  const event = new MouseEvent('pointerenter');
  Object.defineProperty(event, 'pointerType', { value: 'mouse' });
  gallery.dispatchEvent(event);
};

const showOnScreen = (gallery: HTMLElement): void => {
  initGalleryAutoscroll();
  lastObserver().trigger([gallery], true);
};

describe('initGalleryAutoscroll', () => {
  let gallery: HTMLElement;

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance', 'setTimeout'] });
    installFakeIntersectionObserver();
    document.documentElement.classList.add('anim');
    gallery = setupGallery();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.documentElement.className = '';
  });

  it('should wait before moving when the gallery comes on screen', () => {
    showOnScreen(gallery);

    vi.advanceTimersByTime(START_DELAY_MS - 100);

    expect(gallery.scrollLeft).toBe(0);
  });

  it('should scroll slowly to the right once the start delay is over', () => {
    showOnScreen(gallery);

    vi.advanceTimersByTime(START_DELAY_MS + 1000);

    expect(gallery.scrollLeft).toBeGreaterThan(20);
    expect(gallery.scrollLeft).toBeLessThan(50);
  });

  it('should head back to the left after pausing at the right edge', () => {
    showOnScreen(gallery);
    vi.advanceTimersByTime(START_DELAY_MS + 4000);
    const edge = gallery.scrollLeft;
    expect(edge).toBeGreaterThanOrEqual(MAX_SCROLL - EDGE_TOLERANCE_PX);

    vi.advanceTimersByTime(EDGE_PAUSE_MS + 1000);

    expect(gallery.scrollLeft).toBeLessThan(edge - 10);
  });

  it('should hold still while the mouse hovers the gallery', () => {
    showOnScreen(gallery);
    hover(gallery);

    vi.advanceTimersByTime(START_DELAY_MS + 2000);

    expect(gallery.scrollLeft).toBe(0);
  });

  it('should hold still while one of its items is shown full screen', () => {
    gallery.setAttribute(LIGHTBOX_OPEN_ATTRIBUTE, '');
    showOnScreen(gallery);

    vi.advanceTimersByTime(START_DELAY_MS + 2000);

    expect(gallery.scrollLeft).toBe(0);
  });

  it('should stop moving when the gallery leaves the screen', () => {
    showOnScreen(gallery);
    vi.advanceTimersByTime(START_DELAY_MS + 500);
    lastObserver().trigger([gallery], false);
    const stoppedAt = gallery.scrollLeft;

    vi.advanceTimersByTime(2000);

    expect(gallery.scrollLeft).toBe(stoppedAt);
  });

  it('should stay put when every item already fits in the gallery', () => {
    gallery = setupGallery(GALLERY_WIDTH);
    showOnScreen(gallery);

    vi.advanceTimersByTime(START_DELAY_MS + 2000);

    expect(gallery.scrollLeft).toBe(0);
  });

  it('should not animate anything when the visitor prefers reduced motion', () => {
    document.documentElement.className = 'static';

    initGalleryAutoscroll();

    expect(FakeIntersectionObserver.instances).toHaveLength(0);
  });
});
