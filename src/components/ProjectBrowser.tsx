import { useCallback, useEffect, useState } from 'react';
import type { PortfolioProject } from '../data/portfolio';
import EasyDietPreview from './EasyDietPreview';

type Props = {
  projects: PortfolioProject[];
};

/**
 * Navigateur de projets : affiche un projet à la fois.
 * Navigation par flèches (boutons), clavier (← / →) et deep-link (#slug).
 */
export default function ProjectBrowser({ projects }: Props) {
  const total = projects.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Ouvre le projet correspondant au hash (#slug) au chargement.
  useEffect(() => {
    const slug = window.location.hash.replace('#', '');
    if (!slug) return;
    const found = projects.findIndex((p) => p.slug === slug);
    if (found >= 0) setIndex(found);
  }, [projects]);

  const go = useCallback(
    (delta: 1 | -1) => {
      setDir(delta);
      setIndex((i) => (i + delta + total) % total);
    },
    [total]
  );

  const jump = useCallback(
    (target: number) => {
      setDir(target >= index ? 1 : -1);
      setIndex(target);
    },
    [index]
  );

  // Met à jour le hash pour rendre chaque projet partageable.
  useEffect(() => {
    const slug = projects[index]?.slug;
    if (slug) window.history.replaceState(null, '', `#${slug}`);
  }, [index, projects]);

  // Ferme la lightbox quand on change de projet.
  useEffect(() => {
    setLightbox(null);
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const gallery = projects[index]?.gallery;
      // En mode lightbox : les flèches naviguent entre les images, Échap ferme.
      if (lightbox !== null && gallery && gallery.length > 0) {
        if (e.key === 'Escape') setLightbox(null);
        if (e.key === 'ArrowLeft')
          setLightbox((lightbox - 1 + gallery.length) % gallery.length);
        if (e.key === 'ArrowRight') setLightbox((lightbox + 1) % gallery.length);
        return;
      }
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, lightbox, index, projects]);

  const project = projects[index];
  if (!project) return null;

  const gallery = project.gallery ?? [];

  const counter = String(index + 1).padStart(2, '0');
  const totalLabel = String(total).padStart(2, '0');

  return (
    <div className="pb">
      <div className="pb__top">
        <div className="pb__meta">
          <span className={`pb__cat pb__cat--${project.category.toLowerCase()}`}>
            {project.category === 'Pro' ? 'Projet pro' : 'Projet perso'}
          </span>
          <span className="pb__counter">
            {counter} <span>/ {totalLabel}</span>
          </span>
        </div>
        <div className="pb__dots" role="tablist" aria-label="Projets">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              className={`pb__dot ${i === index ? 'is-active' : ''} pb__dot--${p.category.toLowerCase()}`}
              aria-label={p.title}
              aria-selected={i === index}
              onClick={() => jump(i)}
            />
          ))}
        </div>
      </div>

      <article key={project.slug} className={`pb__card pb__card--${dir > 0 ? 'next' : 'prev'}`}>
        <p className="pb__context">{project.context}</p>
        <h1 className="pb__title">{project.title}</h1>
        <p className="pb__tagline">{project.tagline}</p>

        {project.highlight && (
          <p className="pb__highlight">
            <span aria-hidden="true">★</span> {project.highlight}
          </p>
        )}

        {(gallery.length > 0 || project.preview === 'easydiet') && (
          <section className="pb__gallery">
            <h2 className="pb__gallery-title">Aperçu</h2>
            {project.preview === 'easydiet' ? (
              <EasyDietPreview />
            ) : (
              <div className="pb__shots">
                {gallery.map((img, i) => (
                  <button
                    type="button"
                    className="pb__shot"
                    key={img.src}
                    onClick={() => setLightbox(i)}
                    aria-label={`Agrandir : ${img.alt}`}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        <div className="pb__body">
          {project.problem && (
            <section className="pb__block">
              <h2>Le problème</h2>
              <p>{project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section className="pb__block">
              <h2>La solution</h2>
              <p>{project.solution}</p>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section className="pb__block">
              <h2>Fonctionnalités</h2>
              <ul className="pb__list">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <section className="pb__block">
              <h2>Défis techniques</h2>
              <div className="pb__challenges">
                {project.challenges.map((c) => (
                  <div className="pb__challenge" key={c.title}>
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.result && (
            <section className="pb__block">
              <h2>Résultat</h2>
              <p>{project.result}</p>
            </section>
          )}
        </div>

        <div className="pb__foot">
          <ul className="pb__stack">
            {project.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
          {project.links && project.links.length > 0 && (
            <ul className="pb__links">
              {project.links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>

      <button
        type="button"
        className="pb__side pb__side--prev"
        onClick={() => go(-1)}
        aria-label="Projet précédent"
      >
        ←
      </button>
      <button
        type="button"
        className="pb__side pb__side--next"
        onClick={() => go(1)}
        aria-label="Projet suivant"
      >
        →
      </button>

      {lightbox !== null && gallery[lightbox] && (
        <div
          className="pb__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={gallery[lightbox].alt}
          onClick={() => setLightbox(null)}
        >
          <button type="button" className="pb__lb-close" aria-label="Fermer" onClick={() => setLightbox(null)}>
            ×
          </button>
          {gallery.length > 1 && (
            <button
              type="button"
              className="pb__lb-arrow pb__lb-arrow--prev"
              aria-label="Image précédente"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox - 1 + gallery.length) % gallery.length);
              }}
            >
              ←
            </button>
          )}
          <figure className="pb__lb-fig" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[lightbox].src} alt={gallery[lightbox].alt} />
            <figcaption>{gallery[lightbox].alt}</figcaption>
          </figure>
          {gallery.length > 1 && (
            <button
              type="button"
              className="pb__lb-arrow pb__lb-arrow--next"
              aria-label="Image suivante"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % gallery.length);
              }}
            >
              →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
