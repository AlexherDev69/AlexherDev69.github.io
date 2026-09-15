import { padTwoDigits, prefersMotion } from './motion';

const COUNTDOWN_SECONDS = 300;
const SECONDS_PER_MINUTE = 60;
const TICK_MS = 1000;

const formatClock = (seconds: number): string =>
  `${padTwoDigits(Math.floor(seconds / SECONDS_PER_MINUTE))}:${padTwoDigits(seconds % SECONDS_PER_MINUTE)}`;

/** Runs the decorative five-minute countdown of the "5 minutes" project, looping forever. */
export function initCountdown(): void {
  const clocks = document.querySelectorAll<HTMLElement>('[data-countdown]');
  if (clocks.length === 0 || !prefersMotion()) return;

  let remaining = COUNTDOWN_SECONDS;
  window.setInterval(() => {
    remaining = remaining <= 0 ? COUNTDOWN_SECONDS : remaining - 1;
    const text = formatClock(remaining);
    clocks.forEach((clock) => {
      clock.textContent = text;
    });
  }, TICK_MS);
}
