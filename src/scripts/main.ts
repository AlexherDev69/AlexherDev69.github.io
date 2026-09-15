import { initCaseStudies } from './case-studies';
import { initGalleryAutoscroll } from './gallery-autoscroll';
import { initGalleryDrag } from './gallery-drag';
import { initGalleryLightbox } from './gallery-lightbox';
import { initHeader } from './header';
import { createRevealer } from './reveal';
import { initAutoplayVideos } from './videos';

const revealer = createRevealer();
revealer.observe(document);
initHeader();
initAutoplayVideos();
initGalleryAutoscroll();
initGalleryDrag();
initGalleryLightbox();
initCaseStudies(revealer);
