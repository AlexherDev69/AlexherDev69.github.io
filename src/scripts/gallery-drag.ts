const DRAGGABLE_CLASS = 'is-draggable';
const DRAGGING_CLASS = 'is-dragging';
const PRIMARY_BUTTON = 0;
const PRIMARY_BUTTONS_MASK = 1;
const CLICK_TOLERANCE_PX = 5;

const overflows = (gallery: HTMLElement): boolean => gallery.scrollWidth > gallery.clientWidth;

/** Scrolls a gallery by dragging it with the mouse, the way a finger already does on touch screens. */
const enableDragScroll = (gallery: HTMLElement): void => {
  let activePointerId: number | null = null;
  let startX = 0;
  let startScrollLeft = 0;
  let hasDragged = false;

  // A drag must not end with a click that opens the item under the cursor
  gallery.addEventListener(
    'click',
    (event) => {
      if (!hasDragged) return;
      hasDragged = false;
      event.preventDefault();
      event.stopPropagation();
    },
    { capture: true },
  );

  gallery.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') gallery.classList.toggle(DRAGGABLE_CLASS, overflows(gallery));
  });

  gallery.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== PRIMARY_BUTTON || !overflows(gallery)) return;
    event.preventDefault();
    hasDragged = false;
    activePointerId = event.pointerId;
    startX = event.clientX;
    startScrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener('pointermove', (event) => {
    if (event.pointerId !== activePointerId) return;
    // The button was released outside the gallery before the drag started
    if ((event.buttons & PRIMARY_BUTTONS_MASK) === 0) {
      activePointerId = null;
      return;
    }
    const deltaX = event.clientX - startX;
    // Capture only once it is a real drag: capturing on press would retarget simple clicks to the gallery
    if (!hasDragged && Math.abs(deltaX) > CLICK_TOLERANCE_PX) {
      hasDragged = true;
      gallery.setPointerCapture(event.pointerId);
      gallery.classList.add(DRAGGING_CLASS);
    }
    if (hasDragged) gallery.scrollLeft = startScrollLeft - deltaX;
  });

  const endDrag = (event: PointerEvent): void => {
    if (event.pointerId !== activePointerId) return;
    activePointerId = null;
    gallery.classList.remove(DRAGGING_CLASS);
  };
  gallery.addEventListener('pointerup', endDrag);
  gallery.addEventListener('pointercancel', endDrag);
};

export function initGalleryDrag(): void {
  document.querySelectorAll<HTMLElement>('[data-drag-scroll]').forEach(enableDragScroll);
}
