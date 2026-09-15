import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initGalleryDrag } from './gallery-drag';

const GALLERY_WIDTH = 1000;
const CONTENT_WIDTH = 3000;

interface PointerInit {
  clientX?: number;
  pointerType?: string;
  buttons?: number;
}

/** jsdom has no PointerEvent: a MouseEvent carrying the pointer fields is enough for the script. */
const pointer = (target: Element, type: string, { clientX = 0, pointerType = 'mouse', buttons = 1 }: PointerInit = {}): MouseEvent => {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientX, button: 0, buttons });
  Object.defineProperties(event, { pointerId: { value: 1 }, pointerType: { value: pointerType } });
  target.dispatchEvent(event);
  return event;
};

const setupGallery = (): { gallery: HTMLElement; item: HTMLElement } => {
  document.body.innerHTML = '<div class="d-gallery" data-drag-scroll><div class="g" data-item></div></div>';
  const gallery = document.querySelector<HTMLElement>('[data-drag-scroll]') as HTMLElement;
  let scrollLeft = 0;
  Object.defineProperties(gallery, {
    scrollWidth: { value: CONTENT_WIDTH },
    clientWidth: { value: GALLERY_WIDTH },
    scrollLeft: { get: () => scrollLeft, set: (value: number) => (scrollLeft = value) },
  });
  gallery.setPointerCapture = vi.fn();
  initGalleryDrag();
  return { gallery, item: gallery.querySelector<HTMLElement>('[data-item]') as HTMLElement };
};

describe('initGalleryDrag', () => {
  let gallery: HTMLElement;
  let item: HTMLElement;

  beforeEach(() => {
    ({ gallery, item } = setupGallery());
  });

  it('should scroll the gallery by the distance the mouse travels when dragged', () => {
    pointer(item, 'pointerdown', { clientX: 500 });
    pointer(item, 'pointermove', { clientX: 300 });

    expect(gallery.scrollLeft).toBe(200);
    expect(gallery.classList.contains('is-dragging')).toBe(true);
    expect(gallery.setPointerCapture).toHaveBeenCalledOnce();
  });

  it('should neither scroll nor capture the pointer when the mouse barely moves', () => {
    pointer(item, 'pointerdown', { clientX: 500 });
    pointer(item, 'pointermove', { clientX: 497 });

    expect(gallery.scrollLeft).toBe(0);
    expect(gallery.setPointerCapture).not.toHaveBeenCalled();
  });

  it('should swallow the click that ends a drag so the item under the cursor does not open', () => {
    const onItemClick = vi.fn();
    item.addEventListener('click', onItemClick);

    pointer(item, 'pointerdown', { clientX: 500 });
    pointer(item, 'pointermove', { clientX: 200 });
    pointer(item, 'pointerup', { clientX: 200, buttons: 0 });
    item.click();

    expect(onItemClick).not.toHaveBeenCalled();
    expect(gallery.classList.contains('is-dragging')).toBe(false);
  });

  it('should let a simple click through to the item', () => {
    const onItemClick = vi.fn();
    item.addEventListener('click', onItemClick);

    pointer(item, 'pointerdown', { clientX: 500 });
    pointer(item, 'pointerup', { clientX: 500, buttons: 0 });
    item.click();

    expect(onItemClick).toHaveBeenCalledOnce();
  });

  it('should not start a drag when the button was released outside the gallery', () => {
    pointer(item, 'pointerdown', { clientX: 500 });
    pointer(item, 'pointermove', { clientX: 100, buttons: 0 });

    expect(gallery.scrollLeft).toBe(0);
  });

  it('should leave touch scrolling to the browser', () => {
    pointer(item, 'pointerdown', { clientX: 500, pointerType: 'touch' });
    pointer(item, 'pointermove', { clientX: 100, pointerType: 'touch' });

    expect(gallery.scrollLeft).toBe(0);
  });
});
