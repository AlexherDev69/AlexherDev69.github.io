import { useCallback, useEffect, useState } from 'react';
import type { PortfolioProject } from '../data/portfolio';
import EasyDietPreview from './EasyDietPreview';

type Props = {
  projects: PortfolioProject[];
};

/**
 * Navigateur de dossiers (DA Severance / MDR) : un dossier à la fois.
 * Navigation par flèches (boutons), clavier (← / →), points de progression
 * et deep-link (#slug). Habillage terminal, logique inchangée.
 */
export default function ProjectBrowser({ projects }: Props) {
  const total = projects.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Ouvre le dossier correspondant au hash (#slug) au chargement.
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

  // Met à jour le hash pour rendre chaque dossier partageable.
  useEffect(() => {
    const slug = projects[index]?.slug;
    if (slug) window.history.replaceState(null, '', `#${slug}`);
  }, [index, projects]);

  // Ferme la lightbox quand on change de dossier.
  useEffect(() => {
    setLightbox(null);
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const gallery = projects[index]?.gallery;
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
  const cat = project.category.toLowerCase();
  const counter = String(index + 1).padStart(2, '0');
  const totalLabel = String(total).padStart(2, '0');
  const idHex = '0x' + (index + 1).toString(16).toUpperCase().padStart(2, '0');

  return (
    <div className="pv">
      {/* Ligne de statut */}
      <div className="pv__status">
        <span className={`pv__badge pv__badge--${cat}`}>
          {project.category === 'Pro' ? 'Dossier Pro' : 'Dossier Perso'}
        </span>
        <span className="pv__counter">
          {counter} / {totalLabel}
        </span>
        <div className="pv__dots" role="tablist" aria-label="Dossiers">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              className={`pv__dot pv__dot--${p.category.toLowerCase()} ${i === index ? 'is-active' : ''}`}
              aria-label={p.title}
              aria-selected={i === index}
              onClick={() => jump(i)}
            />
          ))}
        </div>
      </div>

      <article
        key={project.slug}
        className={`pv__card ${dir > 0 ? 'pv__card--next' : 'pv__card--prev'}`}
      >
        <p className="pv__eyebrow">{idHex} · {project.context}</p>
        <h1 className="pv__title">{project.title}</h1>
        <p className="pv__tagline">{project.tagline}</p>

        {project.highlight && (
          <p className="pv__highlight">★ {project.highlight}</p>
        )}

        {(gallery.length > 0 || project.preview === 'easydiet') && (
          <section className="pv__section">
            <p className="pv__label">&gt; Aperçu</p>
            {project.preview === 'easydiet' ? (
              <EasyDietPreview />
            ) : (
              <div className="pv__shots">
                {gallery.map((img, i) => (
                  <button
                    type="button"
                    className="pv__shot"
                    key={img.src}
                    onClick={() => setLightbox(i)}
                    aria-label={`Agrandir : ${img.alt}`}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" />
                    <span className="pv__shot-num">⛶ {String(i + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        <div className="pv__body">
          {project.problem && (
            <section className="pv__section">
              <p className="pv__label">&gt; Le problème</p>
              <p className="pv__text">{project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section className="pv__section">
              <p className="pv__label pv__label--accent">&gt; La solution</p>
              <p className="pv__text">{project.solution}</p>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section className="pv__section">
              <p className="pv__label">&gt; Fonctionnalités</p>
              <ul className="pv__list">
                {project.features.map((f) => (
                  <li key={f}>
                    <span className="pv__bullet" aria-hidden="true">›</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <section className="pv__section">
              <p className="pv__label">&gt; Défis techniques</p>
              <div className="pv__challenges">
                {project.challenges.map((c, i) => (
                  <div className="pv__challenge" key={c.title}>
                    <div className="pv__challenge-head">
                      <span className="pv__challenge-no">{String(i + 1).padStart(2, '0')}</span>
                      <h3>{c.title}</h3>
                    </div>
                    <p>{c.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.result && (
            <section className="pv__result">
              <p className="pv__label pv__label--accent">&gt; Résultat — raffiné 100%</p>
              <p className="pv__text">{project.result}</p>
            </section>
          )}
        </div>

        <div className="pv__foot">
          <ul className="pv__stack">
            {project.stack.map((s) => (
              <li key={s} className="chip">{s}</li>
            ))}
          </ul>
          {project.links && project.links.length > 0 && (
            <ul className="pv__links">
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
        className="pv__arrow pv__arrow--prev"
        onClick={() => go(-1)}
        aria-label="Dossier précédent"
      >
        ←
      </button>
      <button
        type="button"
        className="pv__arrow pv__arrow--next"
        onClick={() => go(1)}
        aria-label="Dossier suivant"
      >
        →
      </button>

      {lightbox !== null && gallery[lightbox] && (
        <div
          className="pv__lb"
          role="dialog"
          aria-modal="true"
          aria-label={gallery[lightbox].alt}
          onClick={() => setLightbox(null)}
        >
          <div className="pv__lb-counter">
            {lightbox + 1} / {gallery.length}
          </div>
          <figure className="pv__lb-fig" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[lightbox].src} alt={gallery[lightbox].alt} />
          </figure>
          <p className="pv__lb-cap">{gallery[lightbox].alt}</p>
          {gallery.length > 1 && (
            <button
              type="button"
              className="pv__lb-arrow pv__lb-arrow--prev"
              aria-label="Image précédente"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox - 1 + gallery.length) % gallery.length);
              }}
            >
              ←
            </button>
          )}
          {gallery.length > 1 && (
            <button
              type="button"
              className="pv__lb-arrow pv__lb-arrow--next"
              aria-label="Image suivante"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % gallery.length);
              }}
            >
              →
            </button>
          )}
          <button
            type="button"
            className="pv__lb-close"
            aria-label="Fermer"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
