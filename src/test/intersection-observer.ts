import { vi } from 'vitest';

/** Controllable IntersectionObserver: tests decide when an element enters or leaves the screen. */
export class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];

  readonly observed = new Set<Element>();

  constructor(
    private readonly callback: IntersectionObserverCallback,
    readonly options?: IntersectionObserverInit,
  ) {
    FakeIntersectionObserver.instances.push(this);
  }

  observe(element: Element): void {
    this.observed.add(element);
  }

  unobserve(element: Element): void {
    this.observed.delete(element);
  }

  disconnect(): void {
    this.observed.clear();
  }

  /** Reports every given element as visible or hidden, like the browser would after a scroll. */
  trigger(elements: Element[], isIntersecting: boolean): void {
    const entries = elements.map((target) => ({ target, isIntersecting }) as IntersectionObserverEntry);
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

export const installFakeIntersectionObserver = (): void => {
  FakeIntersectionObserver.instances = [];
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
};

export const lastObserver = (): FakeIntersectionObserver => {
  const observer = FakeIntersectionObserver.instances.at(-1);
  if (!observer) throw new Error('No IntersectionObserver was created');
  return observer;
};
