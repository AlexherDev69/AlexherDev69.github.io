import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FakeIntersectionObserver, installFakeIntersectionObserver, lastObserver } from '../test/intersection-observer';
import { initAutoplayVideos } from './videos';

const setupVideo = (): HTMLVideoElement => {
  document.body.innerHTML = '<video data-autoplay muted loop></video>';
  const video = document.querySelector('video') as HTMLVideoElement;
  video.play = vi.fn().mockResolvedValue(undefined);
  video.pause = vi.fn();
  return video;
};

describe('initAutoplayVideos', () => {
  let video: HTMLVideoElement;

  beforeEach(() => {
    installFakeIntersectionObserver();
    video = setupVideo();
  });

  afterEach(() => {
    document.documentElement.className = '';
  });

  it('should play a video when it comes on screen', () => {
    document.documentElement.classList.add('anim');
    initAutoplayVideos();

    lastObserver().trigger([video], true);

    expect(video.play).toHaveBeenCalledOnce();
  });

  it('should pause a playing video when it leaves the screen', () => {
    document.documentElement.classList.add('anim');
    Object.defineProperty(video, 'paused', { value: false });
    initAutoplayVideos();

    lastObserver().trigger([video], false);

    expect(video.pause).toHaveBeenCalledOnce();
  });

  it('should swallow the rejection when the browser blocks autoplay', async () => {
    document.documentElement.classList.add('anim');
    video.play = vi.fn().mockRejectedValue(new DOMException('Blocked', 'NotAllowedError'));
    initAutoplayVideos();

    lastObserver().trigger([video], true);
    // An uncaught rejection would surface here and fail the run
    await vi.waitFor(() => expect(video.play).toHaveBeenCalledOnce());
  });

  it('should not watch any video when the visitor prefers reduced motion', () => {
    document.documentElement.classList.add('static');

    initAutoplayVideos();

    expect(FakeIntersectionObserver.instances).toHaveLength(0);
  });
});
