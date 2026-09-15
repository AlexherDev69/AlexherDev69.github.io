import { afterEach, describe, expect, it } from 'vitest';
import { padTwoDigits, prefersMotion } from './motion';

describe('padTwoDigits', () => {
  it('should prefix a zero when the number has a single digit', () => {
    expect(padTwoDigits(7)).toBe('07');
  });

  it('should keep the number as is when it already has two digits', () => {
    expect(padTwoDigits(42)).toBe('42');
  });
});

describe('prefersMotion', () => {
  afterEach(() => {
    document.documentElement.className = '';
  });

  it('should allow motion when the page flagged animations on', () => {
    document.documentElement.classList.add('anim');
    expect(prefersMotion()).toBe(true);
  });

  it('should refuse motion when the visitor asked for reduced motion', () => {
    document.documentElement.classList.add('static');
    expect(prefersMotion()).toBe(false);
  });
});
