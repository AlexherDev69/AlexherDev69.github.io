// @vitest-environment node
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { experiences, otherWorks, profile, skills, socials } from './portfolio';
import { projects } from './projects';

const PUBLIC_DIR = join(process.cwd(), 'public');
const ASSET_PATTERN = /\.(webp|png|jpe?g|mp4)$/;
const FORBIDDEN_DASHES = /[–—]/;

/** Every string nested anywhere in a value, with the path that leads to it. */
const collectStrings = (value: unknown, path = ''): Array<{ path: string; text: string }> => {
  if (typeof value === 'string') return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => collectStrings(item, `${path}[${index}]`));
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => collectStrings(item, path ? `${path}.${key}` : key));
  }
  return [];
};

const allContent = collectStrings({ profile, socials, experiences, skills, otherWorks, projects });

describe('projects', () => {
  it('should give every project a unique slug', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('should only use slugs that are safe in a URL hash', () => {
    projects.forEach((project) => expect(project.slug).toMatch(/^[a-z0-9-]+$/));
  });

  it('should point every image, poster and video to a file that exists in public', () => {
    const assets = allContent.filter(({ text }) => text.startsWith('/assets/') && ASSET_PATTERN.test(text));
    expect(assets.length).toBeGreaterThan(0);
    const missing = assets.filter(({ text }) => !existsSync(join(PUBLIC_DIR, text)));
    expect(missing).toEqual([]);
  });

  it('should describe every gallery image with an alt text', () => {
    projects.forEach(({ slug, gallery }) => {
      gallery.images.forEach((image) => expect(image.alt, `${slug}: ${image.src}`).not.toBe(''));
    });
  });

  it('should give every image real dimensions to avoid layout shifts', () => {
    const images = projects.flatMap(({ gallery }) => gallery.images);
    images.forEach((image) => {
      expect(image.width, image.src).toBeGreaterThan(0);
      expect(image.height, image.src).toBeGreaterThan(0);
    });
  });
});

describe('site content', () => {
  it('should link career entries only to existing case studies', () => {
    const slugs = new Set(projects.map((project) => project.slug));
    const linked = experiences.flatMap((item) => item.missions ?? []).flatMap((mission) => (mission.caseSlug ? [mission.caseSlug] : []));
    expect(linked.length).toBeGreaterThan(0);
    linked.forEach((slug) => expect(slugs.has(slug), slug).toBe(true));
  });

  it('should only link to secure external pages', () => {
    const links = allContent.filter(({ path }) => path.endsWith('.url'));
    expect(links.length).toBeGreaterThan(0);
    links.forEach(({ path, text }) => expect(text, path).toMatch(/^https:\/\//));
  });

  it('should not use em or en dashes in any displayed text', () => {
    const offenders = allContent.filter(({ text }) => FORBIDDEN_DASHES.test(text));
    expect(offenders).toEqual([]);
  });
});
