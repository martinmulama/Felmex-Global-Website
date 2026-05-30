import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { HERO_METRICS, ONGOING_PROJECTS } from './projects/data';
import './ProjectsPage.css';

const PROJECT_ICON_PATHS = {
  globe:
    'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18Zm0 2c1.24 0 2.8 2.39 3.53 6H8.47C9.2 7.39 10.76 5 12 5Zm-4.73 1.82A14.7 14.7 0 0 0 6.17 11H3.6a7.03 7.03 0 0 1 3.67-4.18ZM3.6 13h2.57c.16 1.5.55 2.92 1.1 4.18A7.03 7.03 0 0 1 3.6 13Zm8.4 6c-1.24 0-2.8-2.39-3.53-6h7.06c-.73 3.61-2.29 6-3.53 6Zm2.73-1.82c.55-1.26.94-2.68 1.1-4.18h2.57a7.03 7.03 0 0 1-3.67 4.18ZM15.83 11a14.7 14.7 0 0 0-1.1-4.18A7.03 7.03 0 0 1 18.4 11h-2.57Z',
  project: 'M4 17h16v2H4v-2Zm1-3 6-8 4 5 2-3 2 3v3H5Zm7-9a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z',
  signal:
    'M5 19V9h2v10H5Zm6 0V5h2v14h-2Zm6 0v-7h2v7h-2ZM4 21h16v-1H4v1Z',
  route:
    'M6 19a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm12-10a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm-1.3 1.52-2.78 4.96a2.5 2.5 0 0 1-2.18 1.27H8.44v-1.8h3.3c.25 0 .49-.14.61-.36l2.79-4.96l1.56.89ZM7.45 7.83l2.32 1.23l-.84 1.59L6.61 9.42L7.45 7.83Z',
  clock:
    'M12 6.2v6.1l3.5 2M20 12a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z',
  phone:
    'M7.2 4.5c.5-.5 1.2-.7 1.9-.4l1.7.7c.7.3 1.1 1 1 1.8l-.2 1.8c0 .3 0 .6.2.8.9 1.8 2.3 3.2 4.1 4.1.3.2.5.2.8.2l1.8-.2c.8-.1 1.5.3 1.8 1l.7 1.7c.3.7.1 1.5-.4 1.9l-1.6 1.6c-.8.8-2 1.1-3.1.8-2.5-.7-4.8-2-6.8-4-2-2-3.3-4.3-4-6.8-.3-1.1 0-2.3.8-3.1L7.2 4.5Z',
  mail:
    'M4.5 7.2A1.7 1.7 0 0 1 6.2 5.5h11.6a1.7 1.7 0 0 1 1.7 1.7v9.6a1.7 1.7 0 0 1-1.7 1.7H6.2a1.7 1.7 0 0 1-1.7-1.7V7.2ZM5.8 7.5l6.2 5 6.2-5',
};

function ProjectMetaIcon({ kind }) {
  const path = PROJECT_ICON_PATHS[kind] || PROJECT_ICON_PATHS.project;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={path} />
    </svg>
  );
}

function ProjectHighlightIcon({ kind }) {
  return (
    <span className="cnt-highlight-icon" aria-hidden="true">
      <ProjectMetaIcon kind={kind} />
    </span>
  );
}

function isProjectAnimatableLetter(character) {
  return /[a-z0-9]/i.test(character);
}

function ProjectTitleText({ text, projectId, role, letterClassName = 'prj-title-letter' }) {
  return (
    <span className="prj-title-letter-run" aria-hidden="true">
      {text.split(' ').map((word, wordIndex, words) => (
        <Fragment key={`${role}-${projectId}-${wordIndex}-${word}`}>
          <span className="prj-title-letter-word">
            {Array.from(word).map((character, charIndex) => {
              const isAnimatable = isProjectAnimatableLetter(character);

              return (
                <span
                  key={`${role}-${projectId}-${wordIndex}-${charIndex}-${character}`}
                  className={letterClassName}
                  data-prj-project-id={projectId}
                  data-prj-title-role={isAnimatable ? role : undefined}
                  data-prj-title-letter={isAnimatable ? character.toLowerCase() : undefined}
                >
                  {character}
                </span>
              );
            })}
          </span>
          {wordIndex < words.length - 1 ? (
            <span className="prj-title-letter-space" aria-hidden="true">
              {' '}
            </span>
          ) : null}
        </Fragment>
      ))}
    </span>
  );
}

export function ProjectsPage() {
  const [isHeroEntered, setIsHeroEntered] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(ONGOING_PROJECTS[0]?.id ?? '');
  const detailCardRef = useRef(null);
  const detailTitleRef = useRef(null);
  const detailVisualRef = useRef(null);
  const detailFigureRef = useRef(null);
  const detailCaptionRef = useRef(null);
  const titleLayerRef = useRef(null);

  useEffect(() => {
    let rafOne = null;
    let rafTwo = null;

    setIsHeroEntered(false);
    rafOne = window.requestAnimationFrame(() => {
      rafTwo = window.requestAnimationFrame(() => {
        setIsHeroEntered(true);
      });
    });

    return () => {
      if (rafOne !== null) window.cancelAnimationFrame(rafOne);
      if (rafTwo !== null) window.cancelAnimationFrame(rafTwo);
    };
  }, []);

  const selectedProject =
    ONGOING_PROJECTS.find((project) => project.id === selectedProjectId) ?? ONGOING_PROJECTS[0];
  const selectedProjectBody = selectedProject.bodyParagraphs ?? [selectedProject.body];

  useEffect(() => {
    const detailCard = detailCardRef.current;
    if (!detailCard) return;

    detailCard.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [selectedProjectId]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const detailCard = detailCardRef.current;
    const detailTitle = detailTitleRef.current;
    const detailVisual = detailVisualRef.current;
    const detailFigure = detailFigureRef.current;
    const detailCaption = detailCaptionRef.current;
    const titleLayer = titleLayerRef.current;
    if (!detailCard || !detailTitle || !detailVisual || !detailFigure || !titleLayer) {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targetLetters = Array.from(
      detailTitle.querySelectorAll('[data-prj-title-role="target"]')
    );

    if (reduceMotionQuery.matches || window.innerWidth <= 760) {
      titleLayer.replaceChildren();
      gsap.set(targetLetters, { clearProps: 'opacity,visibility' });
      gsap.set([detailVisual, detailFigure, detailCaption].filter(Boolean), {
        clearProps: 'clipPath,opacity,transform',
      });
      return undefined;
    }

    let animationContext = null;
    let frameId = null;
    let isCancelled = false;

    frameId = window.requestAnimationFrame(() => {
      if (isCancelled) return;

      const sourceLetters = Array.from(
        document.querySelectorAll(
          `[data-prj-title-role="source"][data-prj-project-id="${selectedProjectId}"]`
        )
      );
      if (!targetLetters.length) return;

      const availableSources = sourceLetters.map((element, index) => ({
        element,
        index,
        letter: element.dataset.prjTitleLetter ?? '',
      }));
      const usedSourceIndexes = new Set();

      const takeSourceLetter = (targetLetter, targetIndex) => {
        if (!availableSources.length) return null;

        const desiredLetter = targetLetter.dataset.prjTitleLetter ?? '';
        const matchingSources = availableSources.filter(
          (candidate) =>
            candidate.letter === desiredLetter && !usedSourceIndexes.has(candidate.index)
        );
        const unusedSources = availableSources.filter(
          (candidate) => !usedSourceIndexes.has(candidate.index)
        );
        const candidates = matchingSources.length ? matchingSources : unusedSources;
        const match = candidates.length
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : availableSources[targetIndex % availableSources.length];

        usedSourceIndexes.add(match.index);
        return match.element;
      };

      animationContext = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { overwrite: 'auto' } });

        titleLayer.replaceChildren();
        gsap.set(targetLetters, { autoAlpha: 0 });
        gsap.set(detailVisual, {
          clipPath: 'inset(100% 0 0 0)',
          y: 26,
        });
        gsap.set(detailFigure, {
          scale: 1.08,
          transformOrigin: 'center center',
        });
        if (detailCaption) {
          gsap.set(detailCaption, {
            autoAlpha: 0,
            y: 16,
          });
        }

        timeline.to(
          detailVisual,
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.82,
            ease: 'power3.out',
            y: 0,
          },
          0.1
        );

        timeline.to(
          detailFigure,
          {
            duration: 0.98,
            ease: 'power3.out',
            scale: 1,
          },
          0.12
        );

        if (detailCaption) {
          timeline.to(
            detailCaption,
            {
              autoAlpha: 1,
              duration: 0.48,
              ease: 'power2.out',
              y: 0,
            },
            0.48
          );
        }

        targetLetters.forEach((targetLetter, index) => {
          const sourceLetter = takeSourceLetter(targetLetter, index);
          const targetRect = targetLetter.getBoundingClientRect();
          const clone = document.createElement('span');
          const targetStyles = window.getComputedStyle(targetLetter);
          const launchAt = index * 0.012;
          const scatterX = ((index % 7) - 3) * 10;
          const scatterY = ((index % 5) - 2) * 9;

          clone.className = 'prj-title-fly-letter';
          clone.textContent = targetLetter.textContent ?? '';
          clone.style.fontFamily = targetStyles.fontFamily;
          clone.style.fontSize = targetStyles.fontSize;
          clone.style.fontWeight = targetStyles.fontWeight;
          clone.style.letterSpacing = targetStyles.letterSpacing;
          clone.style.lineHeight = targetStyles.lineHeight;
          titleLayer.appendChild(clone);

          const sourceRect = sourceLetter?.getBoundingClientRect();
          const sourceX = sourceRect ? sourceRect.left : targetRect.left - 36;
          const sourceY = sourceRect ? sourceRect.top : targetRect.top + 18;

          gsap.set(clone, {
            autoAlpha: 1,
            left: 0,
            position: 'absolute',
            rotation: ((index % 8) - 3.5) * 4,
            scale: 0.96,
            top: 0,
            x: sourceX,
            y: sourceY,
          });

          if (sourceLetter) {
            timeline.to(
              sourceLetter,
              {
                color: 'rgba(150, 214, 255, 0.98)',
                duration: 0.16,
                ease: 'power1.out',
                repeat: 1,
                yoyo: true,
              },
              launchAt
            );
          }

          timeline.to(
            clone,
            {
              duration: 0.52,
              ease: 'power3.out',
              rotation: ((index % 4) - 1.5) * 3,
              scale: 1.05,
              x: targetRect.left + scatterX,
              y: targetRect.top + scatterY,
            },
            launchAt
          );

          timeline.to(
            clone,
            {
              duration: 0.24,
              ease: 'power2.out',
              rotation: 0,
              scale: 1,
              x: targetRect.left,
              y: targetRect.top,
              onStart: () => {
                gsap.to(targetLetter, {
                  autoAlpha: 1,
                  duration: 0.08,
                  ease: 'power1.out',
                });
              },
              onComplete: () => {
                clone.remove();
              },
            },
            launchAt + 0.42
          );
        });

        timeline.add(() => {
          gsap.set(targetLetters, { clearProps: 'opacity,visibility' });
          titleLayer.replaceChildren();
        });
      }, detailCard);
    });

    return () => {
      isCancelled = true;
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (animationContext) {
        animationContext.revert();
      }
      titleLayer.replaceChildren();
    };
  }, [selectedProjectId, selectedProject.title]);

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);

    if (typeof window !== 'undefined' && window.innerWidth <= 1080) {
      window.requestAnimationFrame(() => {
        document.getElementById('prj-project-detail')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  return (
    <section className="cnt-page prj-page" id="projects-top" aria-label="Felmex projects page">
      <section
        className={`cnt-hero${isHeroEntered ? ' is-entered' : ''}`}
        aria-label="Felmex projects hero"
      >
        <div className="cnt-container cnt-hero-shell">
          <div className="cnt-hero-panel">
            <div className="cnt-hero-copy">
              <p className="cnt-section-kicker">Current Projects</p>
              <h1 className="cnt-hero-title">
                <span className="cnt-hero-title-line">
                  <span>Current Felmex work.</span>
                </span>
                <span className="cnt-hero-title-line">
                  <span>
                    Cargo, customs, and <span className="cnt-title-accent">delivery in motion.</span>
                  </span>
                </span>
              </h1>
              <p className="cnt-hero-text">
                <span>
                  Browse Felmex articles covering project cargo, customs coordination, inland
                  delivery, warehousing, and the operating decisions behind complex logistics work.
                </span>
              </p>

              <div className="cnt-hero-actions">
                <a className="cnt-btn-primary" href="#prj-project-list">
                  Browse projects
                </a>
                <a className="cnt-btn-ghost" href="#prj-project-detail">
                  View selected details
                </a>
              </div>
            </div>

            <div className="cnt-hero-visual" aria-hidden="true">
              <picture className="cnt-hero-picture">
                <source
                  type="image/webp"
                  srcSet="/projects-network-hero-960.webp 960w, /projects-network-hero-1440.webp 1440w"
                  sizes="(max-width: 640px) calc(100vw - 1.5rem), (max-width: 1080px) calc(100vw - 2rem), 54vw"
                />
                <img
                  src="/projects-network-hero-1440.webp"
                  alt=""
                  width="1440"
                  height="727"
                  decoding="async"
                  fetchPriority="high"
                  loading="eager"
                />
              </picture>
            </div>
          </div>

          <div className="cnt-hero-highlights" role="list" aria-label="Project page highlights">
            {HERO_METRICS.map((item) => (
              <article key={item.label} className="cnt-highlight-card" role="listitem">
                <ProjectHighlightIcon kind={item.icon} />
                <div className="cnt-highlight-copy-block">
                  <p className="cnt-highlight-label">{item.label}</p>
                  <p className="cnt-highlight-value">{item.value}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cnt-main">
        <div className="cnt-container cnt-main-grid">
          <div className="cnt-office-column" id="prj-project-list">
            <div className="cnt-office-rail-head">
              <h2 className="cnt-section-title">
                Latest <span className="site-section-title-accent--flat">Felmex articles</span>
              </h2>
              <span />
            </div>

            <div className="cnt-office-list prj-list" role="list" aria-label="Current Felmex projects">
              {ONGOING_PROJECTS.map((project) => (
                <article key={project.id} className="prj-list-card" role="listitem">
                  <button
                    type="button"
                    className={`prj-list-button${project.id === selectedProject.id ? ' is-active' : ''}`}
                    onClick={() => handleProjectSelect(project.id)}
                    aria-pressed={project.id === selectedProject.id}
                    aria-controls="prj-project-detail"
                  >
                    <div className="prj-list-thumb">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        width="240"
                        height="160"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="prj-list-copy">
                      <div className="prj-list-head">
                        <p className="prj-list-eyebrow">{project.eyebrow}</p>
                      </div>
                      <div className="prj-list-meta">
                        <span>{project.publishedOn}</span>
                        <span>{project.readTime}</span>
                      </div>
                      <h3 className="prj-list-title" aria-label={project.title}>
                        <ProjectTitleText
                          text={project.title}
                          projectId={project.id}
                          role="source"
                        />
                      </h3>
                      <p className="prj-list-subtitle">{project.subtitle}</p>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>

          <article
            ref={detailCardRef}
            className="cnt-form-card prj-detail-card"
            id="prj-project-detail"
            aria-label="Selected project details"
          >
            <div className="prj-detail-shell">
              <div className="prj-detail-story">
                <div className="prj-detail-head">
                  <p className="cnt-form-kicker">{selectedProject.eyebrow}</p>
                  <h2
                    ref={detailTitleRef}
                    className="cnt-form-title"
                    aria-label={selectedProject.title}
                  >
                    <ProjectTitleText
                      text={selectedProject.title}
                      projectId={selectedProject.id}
                      role="target"
                      letterClassName="prj-detail-title-letter"
                    />
                  </h2>
                  <div className="prj-detail-article-meta">
                    <span>{selectedProject.publishedOn}</span>
                    <span>{selectedProject.readTime}</span>
                  </div>
                  <p className="prj-detail-subtitle">{selectedProject.subtitle}</p>
                </div>

                <div className="prj-detail-body" aria-label="Article body">
                  <p className="prj-detail-lead">{selectedProject.lead}</p>
                  {selectedProjectBody.map((paragraph) => (
                    <p className="prj-detail-copy" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <a className="prj-detail-cta" href="/contact">
                  <span>Discuss project</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <div ref={detailVisualRef} className="prj-detail-visual" aria-hidden="true">
                <figure ref={detailFigureRef} className="prj-detail-figure">
                  <img
                    src={selectedProject.image}
                    alt=""
                    width="960"
                    height="1280"
                    loading="eager"
                    decoding="async"
                  />
                </figure>
                <div ref={detailCaptionRef} className="prj-detail-visual-caption">
                  <span>{selectedProject.index}</span>
                  <p>{selectedProject.subtitle}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div ref={titleLayerRef} className="prj-title-letter-layer" aria-hidden="true" />
    </section>
  );
}
