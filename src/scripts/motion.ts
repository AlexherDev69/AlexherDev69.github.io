/** The `anim` class is set on <html> before first paint unless the visitor prefers reduced motion. */
export const prefersMotion = (): boolean => document.documentElement.classList.contains('anim');

export const padTwoDigits = (value: number): string => String(value).padStart(2, '0');
