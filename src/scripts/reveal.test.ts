import { beforeEach, describe, expect, it } from 'vitest';
import { installFakeIntersectionObserver, lastObserver } from '../test/intersection-observer';
import { createRevealer } from './reveal';

const revealables = (): Element[] => Array.from(document.querySelectorAll('.rv, .mask'));

describe('createRevealer', () => {
  beforeEach(() => {
    document.body.innerHTML = '<p class="rv">Texte</p><span class="mask">Titre</span><p class="other">Fixe</p>';
  });

  it('should reveal an element once it scrolls into view and stop watching it', () => {
    installFakeIntersectionObserver();
    createRevealer().observe(document);
    const [paragraph] = revealables();

    lastObserver().trigger([paragraph], true);

    expect(paragraph.classList.contains('in')).toBe(true);
    expect(lastObserver().observed.has(paragraph)).toBe(false);
  });

  it('should keep an element hidden while it stays off screen', () => {
    installFakeIntersectionObserver();
    createRevealer().observe(document);
    const [paragraph] = revealables();

    lastObserver().trigger([paragraph], false);

    expect(paragraph.classList.contains('in')).toBe(false);
  });

  it('should only watch the reveal targets when observing a root', () => {
    installFakeIntersectionObserver();
    createRevealer().observe(document);

    expect([...lastObserver().observed]).toEqual(revealables());
  });

  it('should hide and watch elements again when a section is replayed', () => {
    installFakeIntersectionObserver();
    const revealer = createRevealer();
    revealer.observe(document);
    lastObserver().trigger(revealables(), true);

    revealer.replay(document);

    revealables().forEach((element) => expect(element.classList.contains('in')).toBe(false));
    expect(lastObserver().observed.size).toBe(revealables().length);
  });

  it('should reveal everything at once when the browser has no IntersectionObserver', () => {
    Reflect.deleteProperty(window, 'IntersectionObserver');

    createRevealer().observe(document);

    revealables().forEach((element) => expect(element.classList.contains('in')).toBe(true));
  });
});
