import { prefersMotion } from './motion';

const VISIBLE_THRESHOLD = 0.25;

/** Plays muted looping videos only while they are on screen. */
export function initAutoplayVideos(): void {
  const videos = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
  if (videos.length === 0 || !prefersMotion() || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else if (!video.paused) {
          video.pause();
        }
      }
    },
    { threshold: VISIBLE_THRESHOLD },
  );

  videos.forEach((video) => observer.observe(video));
}
