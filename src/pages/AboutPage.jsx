import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CONTACT_CHANNELS } from '../data/contact';
import {
  CONTINENT_REACH,
  HERO_OPERATING_ITEMS,
  OVERVIEW_CARDS,
  TEAM_MEMBERS,
  TEAM_PILLARS,
} from './about/data';
import './AboutPage.css';

function AboutHeroIcon({ icon }) {
  if (icon === 'signal') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 19V9M12 19V5M19 19v-7" />
        <path d="M4 19h16" />
        <path d="m6 10 4-3 4 2 4-4" />
      </svg>
    );
  }

  if (icon === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3 5 6v5c0 4.3 2.8 8.1 7 10 4.2-1.9 7-5.7 7-10V6l-7-3Z" />
        <path d="m9.2 12.4 2 2 3.8-4.1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 5h16v14H4z" />
      <path d="M8 3v4M16 3v4M7 10h10M8 14h3M8 17h6" />
    </svg>
  );
}

function AboutOverviewIcon({ cardId }) {
  if (cardId === 'how-we-operate') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6a3.8 3.8 0 0 0 0-7.6Z" />
        <path d="M4.8 13.2v-2.4l1.9-.4c.2-.6.45-1.13.78-1.64L6.4 7l1.7-1.7l1.75 1.05c.5-.33 1.04-.59 1.6-.77L11.9 4h2.4l.44 1.58c.57.18 1.1.43 1.6.76l1.77-1.04L19.8 7l-1.04 1.78c.3.49.56 1.02.74 1.58l1.7.44v2.4l-1.7.44c-.18.56-.43 1.1-.74 1.58l1.04 1.78l-1.69 1.7l-1.77-1.05c-.5.33-1.03.58-1.6.76L14.3 20h-2.4l-.44-1.58a6.85 6.85 0 0 1-1.6-.76L8.1 18.7L6.4 17l1.05-1.78a6.94 6.94 0 0 1-.78-1.6l-1.9-.42Z" />
      </svg>
    );
  }

  if (cardId === 'our-workflow') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 5h10" />
        <path d="M7 19h10" />
        <path d="M7 5v5l3-2.2L13 10V5" />
        <path d="M17 19v-5l-3 2.2L11 14v5" />
        <circle cx="7" cy="5" r="1.4" />
        <circle cx="17" cy="19" r="1.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 11.2a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
      <path d="M16.4 12.7a2.35 2.35 0 1 0 0-4.7a2.35 2.35 0 0 0 0 4.7Z" />
      <path d="M3.8 18.8c0-2.7 2.4-4.9 5.4-4.9s5.4 2.2 5.4 4.9" />
      <path d="M14.2 18.8c.25-1.76 1.86-3.13 3.8-3.13c2.1 0 3.8 1.59 3.8 3.55" />
    </svg>
  );
}

function AboutOverviewListIcon({ index }) {
  const icons = [
    <path key="team" d="M8 11.2a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z M16.4 12.7a2.35 2.35 0 1 0 0-4.7a2.35 2.35 0 0 0 0 4.7Z M3.8 18.8c0-2.7 2.4-4.9 5.4-4.9s5.4 2.2 5.4 4.9 M14.2 18.8c.25-1.76 1.86-3.13 3.8-3.13c2.1 0 3.8 1.59 3.8 3.55" />,
    <path key="shield" d="M12 3 5 6v5c0 4.3 2.8 8.1 7 10 4.2-1.9 7-5.7 7-10V6l-7-3Z m-2.8 9.4 1.95 1.95 3.75-4.1" />,
    <path key="doc" d="M7 4.5h6l4 4v11H7z M13 4.5v4h4 M9.2 13h5.6 M9.2 16h5.6" />,
    <path key="bars" d="M5 19V11 M10 19V7 M15 19V13 M20 19V5 M4 19h17" />,
  ];

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {icons[index] ?? icons[0]}
    </svg>
  );
}

function AboutOverviewFooterIcon({ icon }) {
  if (icon === 'globe') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18Z" />
        <path d="M3.8 12h16.4M12 3c2.1 2.2 3.2 5.4 3.2 9s-1.1 6.8-3.2 9m0-18c-2.1 2.2-3.2 5.4-3.2 9s1.1 6.8 3.2 9" />
      </svg>
    );
  }

  if (icon === 'cube') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="m12 3 7 4v10l-7 4-7-4V7l7-4Z M12 3v18 M5 7l7 4 7-4" />
      </svg>
    );
  }

  if (icon === 'plane') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M21 4 10.5 14.5 M21 4l-6 16-3.3-6.7L5 10l16-6Z" />
      </svg>
    );
  }

  if (icon === 'target') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6a3.8 3.8 0 0 0 0-7.6Z" />
      <path d="M4.8 13.2v-2.4l1.9-.4c.2-.6.45-1.13.78-1.64L6.4 7l1.7-1.7l1.75 1.05c.5-.33 1.04-.59 1.6-.77L11.9 4h2.4l.44 1.58c.57.18 1.1.43 1.6.76l1.77-1.04L19.8 7l-1.04 1.78c.3.49.56 1.02.74 1.58l1.7.44v2.4l-1.7.44c-.18.56-.43 1.1-.74 1.58l1.04 1.78l-1.69 1.7l-1.77-1.05c-.5.33-1.03.58-1.6.76L14.3 20h-2.4l-.44-1.58a6.85 6.85 0 0 1-1.6-.76L8.1 18.7L6.4 17l1.05-1.78a6.94 6.94 0 0 1-.78-1.6l-1.9-.42Z" />
    </svg>
  );
}

function AboutTeamPillarIcon({ icon }) {
  if (icon === 'target') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 5.2a6.8 6.8 0 1 0 6.8 6.8" />
        <path d="M12 9.2a2.8 2.8 0 1 0 2.8 2.8" />
        <path d="M12 2v3.3M19 5l-2.3 2.3M22 12h-3.3" />
      </svg>
    );
  }

  if (icon === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3 5.5 5.8v4.8c0 4 2.5 7.5 6.5 9.4c4-1.9 6.5-5.4 6.5-9.4V5.8L12 3Z" />
        <path d="m9.4 11.8 1.7 1.7 3.5-3.7" />
      </svg>
    );
  }

  if (icon === 'document') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 3.8h6.3L18 8.5V20H7z" />
        <path d="M13.3 3.8v4.7H18" />
        <path d="M9.3 12h5.4M9.3 15.3h5.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8.5 17.4H6a2 2 0 0 1-2-2V8.6a2 2 0 0 1 2-2h11.2a2 2 0 0 1 2 2v1.8" />
      <path d="M9 10.1h5.6" />
      <path d="M13.8 13.7h4.2a2 2 0 0 1 2 2v2.5l-2.4-1.4h-3.8a2 2 0 0 1-2-2v-.1a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function renderCardFooter(card) {
  if (card.id === 'who-we-are') {
    return (
      <div className="abt-overview-card-signal abt-overview-card-signal--compact">
        {card.signal.map((item) => (
          <div key={item.label}>
            <span className="abt-overview-card-footer-icon" aria-hidden="true">
              <AboutOverviewFooterIcon icon={item.icon} />
            </span>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="abt-overview-card-summary">
      <div className="abt-overview-card-summary-head">
        <span className="abt-overview-card-footer-icon" aria-hidden="true">
          <AboutOverviewFooterIcon icon={card.id === 'our-workflow' ? 'target' : 'gear'} />
        </span>
        <p className="abt-overview-card-summary-label">{card.agendaTitle}</p>
      </div>
      <p className="abt-overview-card-summary-copy">{card.agendaCopy}</p>
    </div>
  );
}

function renderCardBody(card) {
  if (card.intro) {
    return card.intro.map((paragraph) => (
      <p key={paragraph} className="abt-overview-card-copy">
        {paragraph}
      </p>
    ));
  }

  if (card.points) {
    return (
      <ul className="abt-overview-card-list">
        {card.points.map((point, index) => (
          <li key={point}>
            <span className="abt-overview-card-list-icon" aria-hidden="true">
              <AboutOverviewListIcon index={index} />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (card.steps) {
    return (
      <ol className="abt-overview-card-steps">
        {card.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    );
  }

  return null;
}

export function AboutPage() {
  const reachTimelineRef = useRef(null);
  const [visibleIds, setVisibleIds] = useState(() => new Set());
  const [activeOverviewId, setActiveOverviewId] = useState(OVERVIEW_CARDS[0]?.id ?? '');

  const scrollToOverviewCard = (event, cardId) => {
    event.preventDefault();

    const card = document.getElementById(`abt-overview-${cardId}`);
    if (!card) return;

    setActiveOverviewId(cardId);
    card.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll('[data-abt-reveal]'));
    if (revealNodes.length === 0) return undefined;

    const revealIds = revealNodes
      .map((node) => node.getAttribute('data-abt-reveal'))
      .filter(Boolean);

    if (typeof IntersectionObserver === 'undefined') {
      setVisibleIds(new Set(revealIds));
      return undefined;
    }

    const observers = revealNodes.map((node) => {
      const threshold = Number.parseFloat(node.getAttribute('data-abt-threshold') ?? '');
      const rootMargin = node.getAttribute('data-abt-root-margin') ?? '0px 0px -8% 0px';

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const revealId = entry.target.getAttribute('data-abt-reveal');
            if (!revealId) return;

            setVisibleIds((current) => {
              if (current.has(revealId)) return current;
              const next = new Set(current);
              next.add(revealId);
              return next;
            });

            observer.unobserve(entry.target);
          });
        },
        {
          threshold: Number.isFinite(threshold) ? threshold : 0.18,
          rootMargin,
        }
      );

      observer.observe(node);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const overviewCards = Array.from(document.querySelectorAll('[data-abt-overview-card]'));
    if (overviewCards.length === 0) return undefined;

    const desktopQuery = window.matchMedia('(min-width: 1081px)');
    if (!desktopQuery.matches) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setActiveOverviewId(overviewCards[0].getAttribute('data-abt-overview-card') ?? '');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const activeId = visibleEntries[0]?.target.getAttribute('data-abt-overview-card');
        if (!activeId) return;

        setActiveOverviewId(activeId);
      },
      {
        threshold: [0.28, 0.45, 0.62],
        rootMargin: '-24% 0px -42% 0px',
      }
    );

    overviewCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timelineNode = reachTimelineRef.current;
    if (!timelineNode) return undefined;

    const steps = Array.from(timelineNode.querySelectorAll('.abt-reach-step'));
    const connectors = Array.from(timelineNode.querySelectorAll('.abt-reach-connector'));
    const pieces = [...steps, ...connectors];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileTimeline = window.matchMedia('(max-width: 640px)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      gsap.set(timelineNode, { autoAlpha: 1, y: 0 });
      gsap.set(pieces, {
        autoAlpha: 1,
        y: 0,
        scaleX: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
      });
      return undefined;
    }

    if (isMobileTimeline) {
      gsap.set(timelineNode, { autoAlpha: 1, y: 0 });
      gsap.set(pieces, {
        autoAlpha: 1,
        y: 0,
        scaleX: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
      });

      return () => {
        gsap.set(timelineNode, { clearProps: 'opacity,visibility,transform' });
        gsap.set(pieces, {
          clearProps: 'opacity,visibility,transform,clipPath,transformOrigin',
        });
      };
    }

    let animationContext = null;

    const setInitialTimelineState = () => {
      gsap.set(timelineNode, { autoAlpha: 1, y: 0 });
      gsap.set(steps, {
        autoAlpha: 0,
        y: 18,
        clipPath: 'inset(0% 0% 100% 0%)',
      });
      gsap.set(connectors, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: 'left center',
      });
    };

    animationContext = gsap.context(() => {
      setInitialTimelineState();
    }, timelineNode);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        animationContext = gsap.context(() => {
          const reveal = gsap.timeline({
            defaults: {
              ease: 'power3.out',
              overwrite: 'auto',
            },
          });

          steps.forEach((step, index) => {
            reveal.to(
              step,
              {
                autoAlpha: 1,
                y: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: index === 0 ? 0.28 : 0.3,
              },
              index === 0 ? 0 : '>-0.12'
            );

            const connector = connectors[index];
            if (!connector) return;

            reveal.to(
              connector,
              {
                autoAlpha: 1,
                scaleX: 1,
                duration: 0.24,
              },
              '>-0.1'
            );
          });
        }, timelineNode);
      },
      {
        threshold: 0.24,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(timelineNode);

    return () => {
      observer.disconnect();
      animationContext?.revert();
      gsap.set(timelineNode, { clearProps: 'opacity,visibility,transform' });
      gsap.set(pieces, {
        clearProps: 'opacity,visibility,transform,clipPath,transformOrigin',
      });
    };
  }, []);

  return (
    <section className="abt-page" id="about-top">
      <section
        className={`abt-hero${visibleIds.has('hero') ? ' is-visible' : ''}`}
        data-abt-reveal="hero"
        aria-label="About Felmex Global Logistics"
      >
        <div className="abt-container abt-hero-shell">
          <div className="abt-hero-panel">
            <div className="abt-hero-copy">
              <p className="abt-hero-kicker">About Felmex</p>
              <h1 className="abt-hero-title">
                <span className="abt-hero-title-line">
                  <span>
                    We run <span className="abt-title-accent">cross-border logistics</span>
                  </span>
                </span>
                <span className="abt-hero-title-line">
                  <span>
                    with <span className="abt-title-accent">discipline, clarity,</span> and ownership.
                  </span>
                </span>
              </h1>
              <p className="abt-hero-sub">
                <span>
                  Felmex Global Logistics was built to make trade execution dependable. We align
                  planning, visibility, customs discipline, and delivery follow-through so every
                  shipment feels controlled instead of improvised.
                </span>
              </p>

              <div className="abt-hero-actions">
                <a className="abt-btn-primary" href="/services">
                  Explore services
                </a>
                <a className="abt-btn-ghost" href="/contact">
                  Talk to Felmex
                </a>
              </div>
            </div>

            <div className="abt-hero-visual" aria-hidden="true">
              <picture className="abt-hero-picture">
                <source
                  type="image/webp"
                  srcSet="/about-network-hero-960.webp 960w, /about-network-hero-1440.webp 1440w"
                  sizes="(max-width: 640px) calc(100vw - 1.5rem), (max-width: 1080px) calc(100vw - 2rem), 54vw"
                />
                <img
                  src="/about-network-hero-1440.webp"
                  alt=""
                  width="1440"
                  height="728"
                  decoding="async"
                  fetchPriority="high"
                  loading="eager"
                />
              </picture>
            </div>
          </div>

          <div className="abt-hero-standard" aria-label="Operating standard">
            <div className="abt-hero-standard-grid" role="list">
              {HERO_OPERATING_ITEMS.map((item) => (
                <article key={item.title} className="abt-hero-standard-item" role="listitem">
                  <span className="abt-hero-standard-icon" aria-hidden="true">
                    <AboutHeroIcon icon={item.icon} />
                  </span>
                  <div className="abt-hero-standard-copy">
                    <p>{item.title}</p>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

      </section>

      <section
        className="abt-overview-section"
        aria-label="Inside Felmex"
      >
        <div className="abt-overview-shell">
          <header
            className={`abt-overview-copy${visibleIds.has('overview-head') ? ' is-visible' : ''}`}
            data-abt-reveal="overview-head"
            data-abt-threshold="0.2"
          >
            <div className="abt-overview-copy-text">
              <p className="abt-section-kicker">Inside Felmex</p>
              <h2 className="abt-section-title abt-overview-title abt-section-title--rise">
                <span className="abt-section-title-line">
                  <span>How <span className="site-section-title-accent">Felmex</span> works.</span>
                </span>
              </h2>
              <p className="abt-overview-history">
                Our history has been built around the real pressure points of freight movement:
                planning before cargo moves, documentation before borders, and accountable
                follow-through until delivery closes. Those lessons shaped the workflows we use
                today, giving every shipment a clear path from first brief to final confirmation.
              </p>

              <nav className="abt-overview-nav" aria-label="How Felmex works sections">
                {OVERVIEW_CARDS.map((card) => (
                  <a
                    key={card.id}
                    className={`abt-overview-nav-link${
                      activeOverviewId === card.id ? ' is-active' : ''
                    }`}
                    href={`#abt-overview-${card.id}`}
                    onClick={(event) => scrollToOverviewCard(event, card.id)}
                    aria-current={activeOverviewId === card.id ? 'true' : undefined}
                  >
                    <span className="abt-overview-nav-index">{card.index}</span>
                    <span className="abt-overview-nav-title">{card.title}</span>
                  </a>
                ))}
              </nav>
            </div>

          </header>

          <div
            className="abt-overview-list"
            role="list"
            aria-label="Inside Felmex overview"
          >
            {OVERVIEW_CARDS.map((card) => (
              <article
                key={card.id}
                id={`abt-overview-${card.id}`}
                data-abt-overview-card={card.id}
                className={`abt-overview-card ${card.tone}`}
                role="listitem"
              >
                <span className="abt-overview-card-icon" aria-hidden="true">
                  <AboutOverviewIcon cardId={card.id} />
                </span>

                <div className="abt-overview-card-content">
                  <div className="abt-overview-card-title-group">
                    <p className="abt-overview-card-kicker">{card.label}</p>
                    <h3 className="abt-overview-card-title">{card.title}</h3>
                  </div>
                  <span className="abt-overview-card-rule" aria-hidden="true" />

                  <div className="abt-overview-card-detail">
                    <div className="abt-overview-card-body">{renderCardBody(card)}</div>
                    {card.id === 'who-we-are' ? null : (
                      <div className="abt-overview-card-rail">{renderCardFooter(card)}</div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`abt-reach-section${visibleIds.has('reach') ? ' is-visible' : ''}`}
        data-abt-reveal="reach"
        data-abt-threshold="0.2"
        data-abt-root-margin="0px 0px -8% 0px"
        aria-label="Felmex regional expansion"
      >
        <div className="abt-reach-shell">
          <div className="abt-reach-copy">
            <p className="abt-reach-kicker">Regional expansion</p>
            <h2 className="abt-reach-title abt-section-title--rise">
              <span className="abt-section-title-line">
                <span>From African roots to</span>
              </span>
              <span className="abt-section-title-line">
                <span className="site-section-title-accent">
                  coordinated global corridors.
                </span>
              </span>
            </h2>
            <p className="abt-reach-intro">
              Felmex grew from practical regional movement in Africa into connected trade programs
              across major continental routes. Each expansion added new partners, tighter handoff
              control, and better visibility for clients moving beyond one market.
            </p>
          </div>

          <div className="abt-reach-timeline-wrap">
            <div
              ref={reachTimelineRef}
              className="abt-reach-timeline"
              role="list"
              aria-label="Felmex regional expansion timeline"
            >
            {CONTINENT_REACH.map((item, index) => (
              <article
                key={item.id}
                className="abt-reach-step"
                role="listitem"
                style={{ '--abt-delay': `${index * 70}ms` }}
              >
                <div className="abt-reach-step-head">
                  <span className="abt-reach-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="abt-reach-dot" aria-hidden="true" />
                </div>
                <span
                  className="abt-reach-continent"
                  style={{ '--abt-continent-fill-image': `url('/continents/${item.id}-fill.webp')` }}
                  aria-hidden="true"
                >
                  <img
                    className="abt-reach-continent-fill"
                    src={`/continents/${item.id}-fill.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="abt-reach-continent-outline"
                    src={`/continents/${item.id}-outline.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <p className="abt-reach-step-label">{item.label}</p>
                <p className="abt-reach-step-text">{item.copy}</p>
                {index < CONTINENT_REACH.length - 1 ? (
                  <span className="abt-reach-connector" aria-hidden="true" />
                ) : null}
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="abt-team-section" aria-label="Meet the team">
        <div className="abt-container abt-team-shell">
          <div className="abt-team-list" role="list">
            {TEAM_MEMBERS.map((member, index) => (
              <article
                key={member.id}
                role="listitem"
                className="abt-team-entry"
                style={{
                  '--abt-team-accent': member.accent,
                }}
              >
                <div className="abt-team-card">
                  <div className="abt-team-photo-wrap">
                    <img
                      className="abt-team-photo"
                      src={member.photo}
                      alt={`${member.name} portrait`}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.visibility = 'hidden';
                      }}
                    />
                  </div>

                  <div className="abt-team-body">
                    <p className="abt-team-role">{member.role}</p>
                    <h3 className="abt-team-name">{member.name}</h3>
                    <span className="abt-team-rule" aria-hidden="true" />
                    <p className="abt-team-focus">{member.focus}</p>
                    <p className="abt-team-bio">{member.bio}</p>

                    <dl className="abt-team-meta">
                      <div>
                        <dt>Base</dt>
                        <dd>{member.base}</dd>
                      </div>
                      <div>
                        <dt>Experience</dt>
                        <dd>{member.experience}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside
            className={`abt-team-copy${visibleIds.has('team-head') ? ' is-visible' : ''}`}
            data-abt-reveal="team-head"
          >
            <p className="abt-section-kicker">Meet the team</p>
            <h2 className="abt-section-title abt-section-title--rise">
              <span className="abt-section-title-line">
                <span>The people behind your <span className="site-section-title-accent">outcomes.</span></span>
              </span>
            </h2>
            <p className="abt-section-text">
              Felmex combines commercial direction, execution control, compliance readiness, and
              client communication in one operating team.
            </p>

            <div className="abt-team-pillars" role="list" aria-label="What the team brings">
              {TEAM_PILLARS.map((pillar, index) => (
                <article
                  key={pillar.id}
                  className="abt-team-pillar"
                  role="listitem"
                  style={{ '--abt-delay': `${180 + index * 80}ms` }}
                >
                  <span className="abt-team-pillar-icon" aria-hidden="true">
                    <AboutTeamPillarIcon icon={pillar.icon} />
                  </span>
                  <p className="abt-team-pillar-label">{pillar.label}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        className={`abt-final-cta${visibleIds.has('final-cta') ? ' is-visible' : ''}`}
        data-abt-reveal="final-cta"
        aria-label="Contact Felmex"
      >
        <div className="abt-container abt-final-cta-shell">
          <div className="abt-final-cta-actions">
            <div className="abt-final-cta-buttons">
              <a className="abt-btn-primary" href="/contact">
                Get a logistics plan
              </a>
              <a className="abt-btn-ghost" href={CONTACT_CHANNELS.phoneHref}>
                Call {CONTACT_CHANNELS.phoneDisplay}
              </a>
            </div>
            <p className="abt-final-cta-note">
              <a href={CONTACT_CHANNELS.emailHref}>{CONTACT_CHANNELS.emailDisplay}</a>
              <span aria-hidden="true">/</span>
              <span>{CONTACT_CHANNELS.coverage}</span>
            </p>
          </div>

          <div className="abt-final-cta-copy">
            <p className="abt-section-kicker">Work with Felmex</p>
            <h2 className="abt-final-cta-title abt-section-title--rise">
              <span className="abt-section-title-line">
                <span>Build your next logistics program with</span>
              </span>
              <span className="abt-section-title-line">
                <span className="site-section-title-accent">one accountable partner.</span>
              </span>
            </h2>
            <p className="abt-final-cta-sub">
              Whether you are moving urgent cargo, planning regular imports, or tightening
              multi-country distribution, we help teams execute with more control and less noise.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
