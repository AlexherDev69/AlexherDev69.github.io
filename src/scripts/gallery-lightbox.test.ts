import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { initGalleryLightbox, LIGHTBOX_OPEN_ATTRIBUTE } from './gallery-lightbox';

const VIEWPORT = { width: 1440, height: 900 };
const IMAGE_ALT = 'Écran de guidage';

const MARKUP = `
  <div class="d-gallery" data-autoscroll>
    <div class="g" role="button" tabindex="0" data-lightbox-item data-image-item>
      <img src="/assets/shot.webp" alt="${IMAGE_ALT}" width="563" height="220" />
    </div>
  </div>
  <dialog data-lightbox>
    <div data-lightbox-backdrop></div>
    <figure>
      <div data-lightbox-media></div>
      <figcaption data-lightbox-chrome data-lightbox-caption></figcaption>
    </figure>
    <button type="button" data-lightbox-chrome data-close>Fermer</button>
  </dialog>
`;

/** jsdom lacks modal dialogs and the Web Animations API: minimal stand-ins keep the script's contract. */
const polyfillBrowserApis = (): void => {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement): void {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement): void {
    if (!this.open) return;
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
  Element.prototype.getAnimations = (): Animation[] => [];
};

const query = <T extends Element>(selector: string): T => document.querySelector<T>(selector) as T;

describe('initGalleryLightbox', () => {
  beforeAll(() => {
    polyfillBrowserApis();
    document.documentElement.classList.add('static');
    document.body.innerHTML = MARKUP;
    // Listeners live on document: initialising once keeps them from piling up between tests
    initGalleryLightbox();
  });

  // Global stubs are undone after every test, so the viewport is set again each time
  beforeEach(() => {
    vi.stubGlobal('innerWidth', VIEWPORT.width);
    vi.stubGlobal('innerHeight', VIEWPORT.height);
  });

  afterEach(() => {
    query<HTMLDialogElement>('[data-lightbox]').close();
  });

  const item = (): HTMLElement => query('[data-image-item]');
  const dialog = (): HTMLDialogElement => query('[data-lightbox]');

  it('should open the image full screen with its caption when a thumbnail is clicked', () => {
    item().click();

    expect(dialog().open).toBe(true);
    expect(query('[data-lightbox-media] img').getAttribute('alt')).toBe(IMAGE_ALT);
    expect(query('[data-lightbox-caption]').textContent).toBe(IMAGE_ALT);
  });

  it('should hide the thumbnail and hold the gallery autoscroll while the preview is open', () => {
    item().click();

    expect(item().style.visibility).toBe('hidden');
    expect(query('[data-autoscroll]').hasAttribute(LIGHTBOX_OPEN_ATTRIBUTE)).toBe(true);
  });

  it('should cap the upscale at twice the image size when the viewport is much larger', () => {
    item().click();

    const media = query<HTMLElement>('[data-lightbox-media]');
    expect(media.style.width).toBe('1126px');
    expect(media.style.height).toBe('440px');
  });

  it('should open the preview when a focused thumbnail receives Enter', () => {
    item().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(dialog().open).toBe(true);
  });

  it('should restore the thumbnail and the autoscroll when the close button is clicked', async () => {
    item().click();
    query<HTMLButtonElement>('[data-close]').click();
    await vi.waitFor(() => expect(dialog().open).toBe(false));

    expect(item().style.visibility).toBe('');
    expect(query('[data-autoscroll]').hasAttribute(LIGHTBOX_OPEN_ATTRIBUTE)).toBe(false);
    expect(query('[data-lightbox-media]').children).toHaveLength(0);
  });

  it('should close only the preview when Escape is pressed, not the panel listening underneath', async () => {
    const onDocumentKeydown = vi.fn();
    document.addEventListener('keydown', onDocumentKeydown);
    item().click();

    dialog().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await vi.waitFor(() => expect(dialog().open).toBe(false));

    expect(onDocumentKeydown).not.toHaveBeenCalled();
    document.removeEventListener('keydown', onDocumentKeydown);
  });
});
