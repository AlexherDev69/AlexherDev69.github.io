const SOLID_OFFSET_PX = 24;
const ALWAYS_VISIBLE_ZONE_PX = 480;
const SCROLL_TOLERANCE_PX = 6;

/** Gives the header a background once the page scrolls, hides it while scrolling down. */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  let lastY = window.scrollY;
  let frameRequested = false;

  const update = (): void => {
    const y = window.scrollY;
    header.classList.toggle('is-solid', y > SOLID_OFFSET_PX);
    if (y < ALWAYS_VISIBLE_ZONE_PX || y < lastY - SCROLL_TOLERANCE_PX) {
      header.classList.remove('is-hidden');
    } else if (y > lastY + SCROLL_TOLERANCE_PX) {
      header.classList.add('is-hidden');
    }
    lastY = y;
    frameRequested = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (frameRequested) return;
      frameRequested = true;
      window.requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}
