import { initCaseStudies } from './case-studies';
import { initHeader } from './header';
import { createRevealer } from './reveal';
import { initAutoplayVideos } from './videos';

const revealer = createRevealer();
revealer.observe(document);
initHeader();
initAutoplayVideos();
initCaseStudies(revealer);
