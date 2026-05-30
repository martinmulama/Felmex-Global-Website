import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CONTACT_CHANNELS } from '../data/contact';
import { HERO_SERVICES } from '../data/services';
import { scrollToTarget } from '../utils/scroll';
import {
  DEFAULT_SERVICE_DETAIL,
  SERVICE_DETAILS,
  SERVICE_MEDIA,
  SERVICE_STATS,
  SERVICE_STRIP_COPIES,
  SERVICE_STRIP_ITEMS,
} from './service/data';
import './ServicePage.css';

const SERVICE_ICON_PATHS = {
  customs: 'M12 3 3 7v5c0 4.6 3.1 8.9 9 10 5.9-1.1 9-5.4 9-10V7l-9-4Zm0 3.1 6 2.7v3.2c0 3-1.9 5.8-6 7-4.1-1.2-6-4-6-7V8.8l6-2.7Z',
  sea: 'M3 14h18v2H3v-2Zm2.5-3.5 4-3h5l4 3v2h-13v-2Zm5.5 8.5 2-1 2 1 2-1 2 1 2-1v2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1v-2l2 1 2-1Z',
  road: 'M5 7h11l3 4v6h-2a2.5 2.5 0 0 1-5 0h-3a2.5 2.5 0 0 1-5 0H3V9a2 2 0 0 1 2-2Zm2 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm8 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  rail: 'M7 3h10a3 3 0 0 1 3 3v6a4 4 0 0 1-4 4l2 2v1h-2l-2-2h-4l-2 2H6v-1l2-2a4 4 0 0 1-4-4V6a3 3 0 0 1 3-3Zm0 3v2h10V6H7Zm1 6a1.2 1.2 0 1 0 0 2.4A1.2 1.2 0 0 0 8 12Zm8 0a1.2 1.2 0 1 0 0 2.4A1.2 1.2 0 0 0 16 12Z',
  air: 'M21 3 3.9 10.2a1 1 0 0 0 .08 1.88l6.36 1.95 1.95 6.36a1 1 0 0 0 1.88.08L21 3Zm-9.2 10.12-4.38-1.34 8.7-3.68-4.32 5.02Z',
  warehouse: 'M12 3 3 8v12h18V8l-9-5Zm0 2.3L18 8.7V18h-2v-6H8v6H6V8.7L12 5.3Z',
  project: 'M4 17h16v2H4v-2Zm1-3 6-8 4 5 2-3 2 3v3H5Zm7-9a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z',
  distribution: 'M4 5h6v6H4V5Zm10 0h6v4h-6V5ZM4 15h4v4H4v-4Zm8-3h8v7h-8v-7Z',
};

const DEEP_DIVE_ICON_PATHS = {
  air: 'M20.5 4.5 4.5 11l5.6 1.7 1.7 5.6 8.7-13.8Zm-9 7.2 5.2-2.2-2.6 3Z',
  pin: 'M12 20c3.6-4.1 5.8-7.2 5.8-9.8a5.8 5.8 0 1 0-11.6 0c0 2.6 2.2 5.7 5.8 9.8Zm0-7.1a2.6 2.6 0 1 1 0-5.2a2.6 2.6 0 0 1 0 5.2Z',
  document: 'M8 3.75h7l3 3v13.5H8V3.75Zm7 0v3h3m-7.5 5.5h5m-5 3h5m-5 3h3',
  shield:
    'M12 3.8 18.2 6.4v4.3c0 3.6-2.2 6.8-6.2 8.4-4-1.6-6.2-4.8-6.2-8.4V6.4L12 3.8Zm-2 8 1.6 1.6 3.9-3.9',
  ship: 'M5 13.5h14M7 10.5l3.2-2.5h3.6l3 2.5M5.5 16.8c1 .8 2 .8 3 0 1 .8 2 .8 3 0 1 .8 2 .8 3 0 1 .8 2 .8 3 0',
  truck:
    'M4.5 8h9v6.5h-9V8Zm9 2.2h3l2 2.1v2.2h-1.4M8 16.8a1.7 1.7 0 1 0 0 3.4a1.7 1.7 0 0 0 0-3.4Zm8 0a1.7 1.7 0 1 0 0 3.4a1.7 1.7 0 0 0 0-3.4Z',
  route:
    'M6.5 18.5a1.7 1.7 0 1 0 0-3.4a1.7 1.7 0 0 0 0 3.4Zm11-11a1.7 1.7 0 1 0 0-3.4a1.7 1.7 0 0 0 0 3.4ZM8.2 17h3.3a5.4 5.4 0 0 0 5.4-5.4V7.2',
  chat:
    'M7 7.5h10A1.5 1.5 0 0 1 18.5 9v6A1.5 1.5 0 0 1 17 16.5h-5l-4 2.8v-2.8H7A1.5 1.5 0 0 1 5.5 15V9A1.5 1.5 0 0 1 7 7.5Zm2.5 3h5m-5 3h3.5',
  receipt: 'M8 4.5h8v15l-2-1.4-2 1.4-2-1.4-2 1.4v-15Zm2.5 4h3m-3 3.3h3m-3 3.4h3',
  train:
    'M8 4.5h8A3.5 3.5 0 0 1 19.5 8v5.5A3.5 3.5 0 0 1 16 17H8A3.5 3.5 0 0 1 4.5 13.5V8A3.5 3.5 0 0 1 8 4.5Zm1.2 3h5.6M8.5 19.5l2-2m5 2-2-2',
  link: 'M9.5 14.5 7.8 16.2a3 3 0 1 1-4.2-4.2l1.7-1.7m5.2-.8 3.2-3.2a3 3 0 0 1 4.2 4.2l-3.2 3.2M9 15l6-6',
  chart: 'M6.5 18.5V13m5 5.5V9.5m5 9V6.5M5 20.5h14',
  snow: 'M12 4.5v15M8.4 6.4l7.2 11.2M15.6 6.4 8.4 17.6M6.2 9.4l11.6 5.2M17.8 9.4 6.2 14.6',
  warehouse: 'M4.5 8.5 12 4.5l7.5 4v10H4.5v-10Zm3.5 4h8M12 8.5v8',
  checklist: 'M6.5 5.5h11v13h-11v-13Zm2.2 3.2 1.2 1.2 2.1-2.1m-3.3 5.4 1.2 1.2 2.1-2.1m-3.3 5.4 1.2 1.2 2.1-2.1m2-9.1h2.2m-2.2 5.4h2.2m-2.2 5.4h2.2',
  building: 'M6.5 19.5v-13h8v13m-4.5-10h1m-1 3h1m-1 3h1m4.5 4v-9h3v9',
  ruler: 'M6 17.5 17.5 6m-8.2 11H6v-3.3m7-7 1.8 1.8m2-3.8 1.8 1.8m-7.6 7.6 1.8 1.8m2-3.8 1.8 1.8',
  crane:
    'M6.5 19.5V7.2h7.8m0 0-2.2-2.2m2.2 2.2-2.2 2.2m2.2-2.2v6.4m0 0h4.2l-2 2.8m-4.4 3.1h4.4',
  flag: 'M7 20V5m0 0h8l-1.6 3 1.6 3H7',
  boxes:
    'M4.5 8.5 9 6l4.5 2.5L9 11 4.5 8.5Zm9 0L18 6l4.5 2.5-4.5 2.5-4.5-2.5ZM4.5 15.5 9 13l4.5 2.5L9 18l-4.5-2.5ZM9 11v7m9-9v7',
  team:
    'M8 11a2.4 2.4 0 1 0 0-4.8A2.4 2.4 0 0 0 8 11Zm8 0a2.4 2.4 0 1 0 0-4.8a2.4 2.4 0 0 0 0 4.8ZM4.8 18.5v-.7c0-1.9 1.5-3.4 3.4-3.4h1.6c1.9 0 3.4 1.5 3.4 3.4v.7m2.3 0v-.6c0-1.4 1.2-2.6 2.6-2.6h.6c1.4 0 2.6 1.2 2.6 2.6v.6',
  flow:
    'M8 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm8 6a2 2 0 1 0 0-4a2 2 0 0 0 0 4ZM8 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm1-16h4.2A3.8 3.8 0 0 1 17 8.8v.2m-2.4 5H17v.2a3.8 3.8 0 0 1-3.8 3.8H9',
};

function ServiceLineIcon({ kind }) {
  const path = SERVICE_ICON_PATHS[kind] || SERVICE_ICON_PATHS.project;

  return (
    <svg className="svc-icon-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <circle className="svc-icon-duo" cx="12" cy="12" r="8" />
      <path className="svc-icon-path" d={path} />
    </svg>
  );
}

function SupportMetaIcon({ kind }) {
  const path = DEEP_DIVE_ICON_PATHS[kind] || DEEP_DIVE_ICON_PATHS.shield;

  return (
    <svg className="svc-support-icon-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function CapabilityBadgeIcon({ kind }) {
  const path = DEEP_DIVE_ICON_PATHS[kind] || DEEP_DIVE_ICON_PATHS.shield;

  return (
    <svg className="svc-deep-dive-capability-icon-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getCardSummary(description) {
  if (!description) return '';
  const firstSentence = description.split('. ')[0]?.trim() ?? '';
  if (!firstSentence) return description;
  return /[.!?]$/.test(firstSentence) ? firstSentence : `${firstSentence}.`;
}

function normalizeCapabilityItem(item) {
  if (typeof item === 'string') {
    return {
      title: item,
      detail: '',
      icon: 'shield',
    };
  }

  return {
    title: item?.title ?? '',
    detail: item?.detail ?? '',
    icon: item?.icon ?? 'shield',
  };
}

const SERVICES = HERO_SERVICES.map((service) => ({
  id: slugify(service.label),
  iconKey: service.icon,
  name: service.label,
  summary: getCardSummary(service.description),
}));

export function ServicePage() {
  const pageRef = useRef(null);
  const deepDiveImageRevealIdsRef = useRef(new Set());
  const [activeServiceId, setActiveServiceId] = useState(SERVICES[0]?.id ?? '');
  const [isHeroEntered, setIsHeroEntered] = useState(false);
  const [isRevealReady, setIsRevealReady] = useState(false);
  const [isDeepDiveNavOpen, setIsDeepDiveNavOpen] = useState(false);
  const [visibleRevealIds, setVisibleRevealIds] = useState(() => new Set());

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

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const revealItems = Array.from(root.querySelectorAll('[data-reveal-id]'));
    if (revealItems.length === 0) return undefined;

    const revealIds = revealItems
      .map((item) => item.getAttribute('data-reveal-id'))
      .filter(Boolean);

    if (typeof IntersectionObserver === 'undefined') {
      setVisibleRevealIds(new Set(revealIds));
      return undefined;
    }

    setIsRevealReady(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const revealId = entry.target.getAttribute('data-reveal-id');
          if (revealId) {
            setVisibleRevealIds((current) => {
              if (current.has(revealId)) return current;
              const next = new Set(current);
              next.add(revealId);
              return next;
            });
          }
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;

    const entries = Array.from(root.querySelectorAll('.svc-deep-dive-entry[id]'));
    if (entries.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const currentEntry = observedEntries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!currentEntry) return;

        const nextServiceId = currentEntry.target.id.replace('svc-deep-dive-', '');
        setActiveServiceId((current) => (current === nextServiceId ? current : nextServiceId));
      },
      {
        threshold: [0.24, 0.42, 0.62],
        rootMargin: '-22% 0px -44% 0px',
      }
    );

    entries.forEach((entry) => observer.observe(entry));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || !isRevealReady || typeof window === 'undefined') return undefined;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return undefined;

    const mediaVisuals = root.querySelectorAll('.svc-deep-dive-media-visual');
    const mediaImages = root.querySelectorAll('.svc-deep-dive-media img');
    const mediaCaptions = root.querySelectorAll('.svc-deep-dive-media-caption');

    gsap.set(mediaVisuals, {
      clipPath: 'inset(100% 0% 0% 0%)',
      y: 28,
    });
    gsap.set(mediaImages, {
      scale: 1.08,
      y: 18,
      transformOrigin: 'center center',
    });
    gsap.set(mediaCaptions, {
      autoAlpha: 0,
      y: 16,
    });

    return () => {
      gsap.set(mediaVisuals, { clearProps: 'clipPath,transform' });
      gsap.set(mediaImages, { clearProps: 'transform,transformOrigin' });
      gsap.set(mediaCaptions, { clearProps: 'opacity,visibility,transform' });
    };
  }, [isRevealReady]);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || typeof window === 'undefined') return;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    SERVICES.forEach((service) => {
      const revealId = `deep-dive-${service.id}`;
      if (!visibleRevealIds.has(revealId) || deepDiveImageRevealIdsRef.current.has(revealId)) return;

      const entry = root.querySelector(`#svc-deep-dive-${service.id}`);
      const media = entry?.querySelector('.svc-deep-dive-media');
      const mediaVisual = media?.querySelector('.svc-deep-dive-media-visual');
      const mediaImage = media?.querySelector('img');
      const mediaCaption = media?.querySelector('.svc-deep-dive-media-caption');

      if (!mediaVisual || !mediaImage) return;

      deepDiveImageRevealIdsRef.current.add(revealId);

      const timeline = gsap.timeline({
        defaults: { overwrite: 'auto' },
      });

      timeline.to(
        mediaVisual,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.82,
          ease: 'power3.out',
          y: 0,
        },
        0.03
      );

      timeline.to(
        mediaImage,
        {
          duration: 1.02,
          ease: 'power3.out',
          scale: 1.01,
          y: 0,
        },
        0.03
      );

      if (mediaCaption) {
        timeline.to(
          mediaCaption,
          {
            autoAlpha: 1,
            duration: 0.56,
            ease: 'power2.out',
            y: 0,
          },
          0.4
        );
      }
    });
  }, [visibleRevealIds]);

  useEffect(() => {
    if (!isDeepDiveNavOpen || typeof window === 'undefined') return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDeepDiveNavOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDeepDiveNavOpen]);

  const scrollToDedicatedService = (serviceId) => {
    if (typeof document === 'undefined') return;

    const target = document.getElementById(`svc-deep-dive-${serviceId}`);
    if (!target) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    scrollToTarget(target, {
      immediate: prefersReducedMotion,
    });
  };

  const handleTopCardClick = (serviceId) => {
    setActiveServiceId(serviceId);
    setIsDeepDiveNavOpen(false);
    if (typeof window === 'undefined') return;
    window.requestAnimationFrame(() => {
      scrollToDedicatedService(serviceId);
    });
  };

  return (
    <section
      className={`svc-page${isRevealReady ? ' is-reveal-ready' : ''}`}
      id="services-top"
      ref={pageRef}
      aria-label="Felmex service offerings"
    >
      <section className={`svc-hero${isHeroEntered ? ' is-entered' : ''}`} aria-label="Services hero section">
        <div className="svc-container svc-hero-shell">
          <div className="svc-hero-panel">
            <div className="svc-hero-copy">
              <p className="svc-section-label svc-hero-label">What we do</p>
              <h1 className="svc-hero-title">
                <span className="svc-rise-line">
                  <span>
                    Logistics services <span className="svc-title-accent">built</span>
                  </span>
                </span>
                <span className="svc-rise-line">
                  <span>
                    with <span className="svc-title-accent">visible control.</span>
                  </span>
                </span>
              </h1>
              <p className="svc-hero-sub">
                <span>
                  Felmex supports importers, exporters, distributors, and project cargo teams with
                  one accountable operating model across air, sea, road, rail, warehousing,
                  customs, and border distribution.
                </span>
              </p>

              <div className="svc-hero-actions svc-hero-slide">
                <a className="svc-btn-primary" href="#svc-main-services">
                  Explore services
                </a>
                <a className="svc-btn-ghost" href="/contact">
                  Talk to our team
                </a>
              </div>
            </div>

            <div className="svc-hero-visual" aria-hidden="true">
              <picture className="svc-hero-picture">
                <source
                  type="image/webp"
                  srcSet="/service-network-hero-v2-960.webp 960w, /service-network-hero-v2-1440.webp 1440w"
                  sizes="(max-width: 640px) calc(100vw - 1.5rem), (max-width: 1080px) calc(100vw - 2rem), 58vw"
                />
                <img
                  src="/service-network-hero-v2-1440.webp"
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

          <div className="svc-hero-stats" role="list" aria-label="Service page highlights">
            {SERVICE_STATS.map((item) => (
              <article key={item.label} className="svc-hero-stat" role="listitem">
                <div className="svc-hero-stat-icon" aria-hidden="true">
                  <ServiceLineIcon kind={item.iconKey} />
                </div>
                <div className="svc-hero-stat-copy">
                  <p className="svc-hero-stat-value">{item.value}</p>
                  <p className="svc-hero-stat-label">{item.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-main" id="svc-main-services" aria-label="Main services">
        <div className="svc-container svc-main-shell">
          <div className="svc-main-layout">
            <div className="svc-main-primary">
              <header
                className={`svc-main-header svc-reveal${visibleRevealIds.has('main-header') ? ' is-visible' : ''}`}
                data-reveal-id="main-header"
              >
                <p className="svc-section-label">What we do</p>
                <h2 className={`svc-section-title svc-title-stack${visibleRevealIds.has('main-header') ? ' is-visible' : ''}`}>
                  <span className="svc-rise-line">
                    <span>Choose the service lane that fits</span>
                  </span>
                  <span className="svc-rise-line">
                    <span className="site-section-title-accent">your cargo, timing, and operating pressure.</span>
                  </span>
                </h2>
                <p className="svc-section-text">
                  From air to ocean to project logistics, we design smarter lanes with real-time
                  visibility, so you never overrun capacity or budget.
                </p>
              </header>
            </div>

            <div
              className={`svc-main-secondary${visibleRevealIds.has('main-header') ? ' is-visible' : ''}`}
            >
              <div className="svc-grid" role="list">
                {SERVICES.map((service, index) => (
                  <button
                    type="button"
                    className={`svc-card svc-reveal${activeServiceId === service.id ? ' is-active' : ''}${
                      visibleRevealIds.has(`card-${service.id}`) ? ' is-visible' : ''
                    }`}
                    role="listitem"
                    key={service.id}
                    style={{ '--reveal-delay': `${index * 70}ms` }}
                    data-reveal-id={`card-${service.id}`}
                    aria-label={`Jump to ${service.name} deep dive`}
                    aria-pressed={activeServiceId === service.id}
                    onClick={() => handleTopCardClick(service.id)}
                  >
                    <div className="svc-card-icon" aria-hidden="true">
                      <ServiceLineIcon kind={service.iconKey} />
                    </div>
                    <h3 className="svc-card-name">{service.name}</h3>
                    <p className="svc-card-summary">{service.summary}</p>
                    <span className="svc-card-arrow" aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`svc-strip svc-reveal${visibleRevealIds.has('service-strip') ? ' is-visible' : ''}`}
        data-reveal-id="service-strip"
        aria-label="How Felmex runs service execution"
      >
        <div className="svc-strip-scroll-layer">
          <div className="svc-strip-track" aria-label="Felmex service operating principles">
            {Array.from({ length: SERVICE_STRIP_COPIES }).map((_, groupIndex) => (
              <div
                key={`service-strip-group-${groupIndex}`}
                className="svc-strip-track-group"
                role={groupIndex === 0 ? 'list' : 'presentation'}
                aria-hidden={groupIndex === 0 ? undefined : 'true'}
              >
                {SERVICE_STRIP_ITEMS.map((item) => (
                  <article
                    key={`${groupIndex}-${item.label}`}
                    className="svc-strip-card"
                    role={groupIndex === 0 ? 'listitem' : undefined}
                  >
                    <p className="svc-strip-value">{item.value}</p>
                    <h3 className="svc-strip-label">{item.label}</h3>
                    <p className="svc-strip-detail">{item.detail}</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="svc-deep-dive"
        id="svc-deep-dive"
        aria-label="In-depth view of each service"
      >
        <div className="svc-deep-dive-shell">
          <button
            type="button"
            className="svc-deep-dive-mobile-toggle"
            aria-label="Open service detail navigation"
            aria-expanded={isDeepDiveNavOpen}
            aria-controls="svc-deep-dive-aside"
            onClick={() => setIsDeepDiveNavOpen(true)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`svc-deep-dive-backdrop${isDeepDiveNavOpen ? ' is-open' : ''}`}
            aria-label="Close service detail navigation"
            onClick={() => setIsDeepDiveNavOpen(false)}
          />
          <aside
            id="svc-deep-dive-aside"
            className={`svc-deep-dive-aside svc-reveal${visibleRevealIds.has('deep-dive-aside') ? ' is-visible' : ''}${
              isDeepDiveNavOpen ? ' is-open' : ''
            }`}
            data-reveal-id="deep-dive-aside"
            aria-label="Service detail navigation"
          >
            <div className="svc-deep-dive-sticky">
              <button
                type="button"
                className="svc-deep-dive-drawer-close"
                aria-label="Close service detail navigation"
                onClick={() => setIsDeepDiveNavOpen(false)}
              >
                <span aria-hidden="true" />
              </button>
              <p className="svc-section-label">Service details</p>
              <nav className="svc-deep-dive-nav" aria-label="Jump to service detail">
                {SERVICES.map((service, index) => {
                  const isActive = activeServiceId === service.id;

                  return (
                    <button
                      type="button"
                      className={`svc-deep-dive-nav-button${isActive ? ' is-active' : ''}`}
                      key={service.id}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => handleTopCardClick(service.id)}
                    >
                      <span className="svc-deep-dive-nav-icon" aria-hidden="true">
                        <ServiceLineIcon kind={service.iconKey} />
                      </span>
                      <span className="svc-deep-dive-nav-copy">
                        <span className="svc-deep-dive-nav-index">{String(index + 1).padStart(2, '0')}</span>
                        <span className="svc-deep-dive-nav-label">{service.name}</span>
                      </span>
                    </button>
                  );
                })}
              </nav>
              <a className="svc-deep-dive-help" href="/contact">
                <span className="svc-deep-dive-help-icon" aria-hidden="true">
                  <SupportMetaIcon kind="team" />
                </span>
                <span className="svc-deep-dive-help-copy">
                  <span className="svc-deep-dive-help-title">Need help choosing</span>
                  <span className="svc-deep-dive-help-text">the right solution?</span>
                  <span className="svc-deep-dive-help-link">
                    Talk to our experts <span aria-hidden="true">→</span>
                  </span>
                </span>
              </a>
            </div>
          </aside>

          <div className="svc-deep-dive-list">
            {SERVICES.map((service, index) => {
              const detail = SERVICE_DETAILS[service.iconKey] ?? DEFAULT_SERVICE_DETAIL;
              const image = SERVICE_MEDIA[service.iconKey] ?? '/sea-freight.webp';

              return (
                <article
                  key={service.id}
                  id={`svc-deep-dive-${service.id}`}
                  className={`svc-deep-dive-entry svc-reveal${
                    visibleRevealIds.has(`deep-dive-${service.id}`) ? ' is-visible' : ''
                  }${activeServiceId === service.id ? ' is-current' : ''}`}
                  data-reveal-id={`deep-dive-${service.id}`}
                  aria-labelledby={`svc-deep-dive-title-${service.id}`}
                  style={{ '--reveal-delay': `${index * 60}ms` }}
                >
                  <div className="svc-deep-dive-media">
                    <div className="svc-deep-dive-media-visual">
                      <img
                        src={image}
                        alt={`${service.name} logistics operations`}
                        loading="lazy"
                        decoding="async"
                        width="1280"
                        height="960"
                      />
                    </div>
                    <div className="svc-deep-dive-media-caption">
                      <p className="svc-deep-dive-media-kicker">Felmex service focus</p>
                      <p className="svc-deep-dive-media-title">{service.name}</p>
                    </div>
                  </div>

                  <div className="svc-deep-dive-content">
                    <div className="svc-deep-dive-copy">
                      <p className="svc-deep-dive-kicker">Global logistics solutions</p>
                      <h2 className="svc-deep-dive-title" id={`svc-deep-dive-title-${service.id}`}>
                        <span>{service.name}</span>
                      </h2>
                      <p className="svc-deep-dive-intro">
                        <span>{detail.intro}</span>
                      </p>
                      <p className="svc-deep-dive-offer">
                        <span>{detail.offer}</span>
                      </p>
                    </div>

                    <div className="svc-deep-dive-capabilities" role="list" aria-label={`${service.name} capabilities`}>
                      {detail.whatYouGet.map((item) => {
                        const capability = normalizeCapabilityItem(item);

                        return (
                          <article
                            key={`${service.id}-${capability.title}-${capability.detail}`}
                            className="svc-deep-dive-capability"
                            role="listitem"
                          >
                            <span className="svc-deep-dive-capability-icon" aria-hidden="true">
                              <CapabilityBadgeIcon kind={capability.icon} />
                            </span>
                            <div className="svc-deep-dive-capability-copy">
                              <p className="svc-deep-dive-capability-title">{capability.title}</p>
                              {capability.detail ? (
                                <p className="svc-deep-dive-capability-detail">{capability.detail}</p>
                              ) : null}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>

                  <div className="svc-deep-dive-support">
                    <article className="svc-deep-dive-support-item">
                      <span className="svc-deep-dive-support-icon" aria-hidden="true">
                        <SupportMetaIcon kind="team" />
                      </span>
                      <p className="svc-deep-dive-support-label">Who It&apos;s For</p>
                      <p className="svc-deep-dive-support-value">{detail.whoItsFor}</p>
                    </article>
                    <article className="svc-deep-dive-support-item is-steps">
                      <span className="svc-deep-dive-support-icon" aria-hidden="true">
                        <SupportMetaIcon kind="flow" />
                      </span>
                      <p className="svc-deep-dive-support-label">How It Works</p>
                      <p className="svc-deep-dive-support-value svc-deep-dive-support-value--summary">
                        {detail.howItWorks[0]}
                      </p>
                      <ol className="svc-deep-dive-support-steps" aria-label={`${service.name} workflow steps`}>
                        {detail.howItWorks.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </article>
                    <article className="svc-deep-dive-support-item">
                      <span className="svc-deep-dive-support-icon" aria-hidden="true">
                        <SupportMetaIcon kind="shield" />
                      </span>
                      <p className="svc-deep-dive-support-label">What Sets It Apart</p>
                      <p className="svc-deep-dive-support-value">{detail.differentiation}</p>
                    </article>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="svc-final-cta" aria-label="Contact Felmex for logistics support">
        <div className="svc-container">
          <div
            className={`svc-final-cta-inner svc-reveal${visibleRevealIds.has('final-cta') ? ' is-visible' : ''}`}
            data-reveal-id="final-cta"
          >
            <div className="svc-final-cta-primary">
              <p className="svc-section-label">More than freight forwarding</p>
              <h2 className={`svc-final-cta-title svc-title-stack${visibleRevealIds.has('final-cta') ? ' is-visible' : ''}`}>
                <span className="svc-rise-line">
                  <span>Build your next shipment flow</span>
                </span>
                <span className="svc-rise-line">
                  <span className="site-section-title-accent">with one disciplined logistics partner.</span>
                </span>
              </h2>
              <p className="svc-final-cta-sub">
                Whether you need a single urgent movement or a repeatable multi-country freight
                program, Felmex helps you plan clearly, execute visibly, and deliver with control.
              </p>
            </div>
            <div className="svc-final-cta-secondary">
              <div className="svc-final-cta-actions">
                <a className="svc-btn-primary" href="/contact">
                  Get a logistics plan
                </a>
                <a className="svc-btn-ghost" href={CONTACT_CHANNELS.phoneHref}>
                  Call {CONTACT_CHANNELS.phoneDisplay}
                </a>
              </div>
              <p className="svc-final-cta-note">
                <a href={CONTACT_CHANNELS.emailHref}>{CONTACT_CHANNELS.emailDisplay}</a>
                <span aria-hidden="true">/</span>
                <span>{CONTACT_CHANNELS.coverage}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
