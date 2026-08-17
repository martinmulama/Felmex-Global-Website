import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CONTACT_CHANNELS } from '../data/contact';
import './WhyChooseFelmex.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRAIN_SEGMENTS = [
  {
    key: 'transparent-communication',
    kind: 'container',
    tone: 'blue',
    image: '/Blue-transparent.png',
    width: 1536,
    height: 1024,
    title: 'TRANSPARENT COMMUNICATION',
    titleLines: ['Transparent', 'Communication'],
    text: 'Clear updates and complete visibility from origin to destination.',
  },
  {
    key: 'global-reach',
    kind: 'container',
    tone: 'white',
    image: '/White-transparent.png',
    width: 1536,
    height: 1024,
    title: 'GLOBAL REACH',
    titleLines: ['Global', 'Reach'],
    text: 'Integrated logistics across air, sea, road, and rail.',
  },
  {
    key: 'reliable-delivery',
    kind: 'container',
    tone: 'red',
    image: '/Red-transparent.png',
    width: 1536,
    height: 1024,
    title: 'RELIABLE DELIVERY',
    titleLines: ['Reliable', 'Delivery'],
    text: 'Every shipment handled with precision and accountability.',
  },
  {
    key: 'head',
    kind: 'head',
    image: '/Train head-transparent.png',
    width: 1672,
    height: 941,
  },
];

const HOME_HERO_SUBTEXT =
  'From East Africa to the world—Felmex Global Logistics delivers seamless multimodal freight, customs clearance, and trade solutions for fast-moving global supply chains.';

const SPLIT_BACKGROUND_TONES = ['navy', 'red', 'white'];

const WHY_CHOOSE_SPLIT_PANELS = TRAIN_SEGMENTS.filter(
  (segment) => segment.kind === 'container'
).map((segment, index) => {
  const backgroundTone = SPLIT_BACKGROUND_TONES[index] ?? 'white';

  return {
    ...segment,
    backgroundTone,
    colorScheme: backgroundTone === 'white' ? 'light' : 'dark',
  };
});

function HomeHeroDesktopActions() {
  return (
    <div className="why-choose-felmex__desktop-actions" aria-label="Hero quick actions">
      <a className="why-choose-felmex__desktop-action" href={CONTACT_CHANNELS.phoneHref}>
        <span className="why-choose-felmex__desktop-action-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.8 21 3 13.2 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.56 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
          </svg>
        </span>
        <span className="why-choose-felmex__desktop-action-copy">
          <span className="why-choose-felmex__desktop-action-label">Call us</span>
          <span className="why-choose-felmex__desktop-action-value">
            {CONTACT_CHANNELS.phoneDisplay}
          </span>
        </span>
      </a>
      <a
        className="why-choose-felmex__desktop-action why-choose-felmex__desktop-action--services"
        href="/services"
      >
        <span className="why-choose-felmex__desktop-action-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M4 12h14.4M13.2 5.8 19.4 12l-6.2 6.2" />
          </svg>
        </span>
        <span className="why-choose-felmex__desktop-action-copy">
          <span className="why-choose-felmex__desktop-action-link-text">
            Explore Our Services
          </span>
        </span>
      </a>
    </div>
  );
}

function HomeHeroCopy({ titleId, mobile = false }) {
  if (mobile) {
    return (
      <div className="why-choose-felmex__headline why-choose-felmex__headline--home-hero why-choose-felmex__headline--mobile-home-hero">
        <h1 id={titleId} aria-label="Delivering tomorrow’s trade today.">
          <span className="why-choose-felmex__title-line">Delivering tomorrow’s</span>
          <span className="why-choose-felmex__title-line">
            trade <span className="why-choose-felmex__title-impact">today</span>.
          </span>
        </h1>
        <span className="why-choose-felmex__mobile-rule" aria-hidden="true" />
        <p className="why-choose-felmex__hero-subtext">{HOME_HERO_SUBTEXT}</p>
        <a className="why-choose-felmex__hero-cta" href="/contact">
          <span>Get a Quote</span>
          <span className="why-choose-felmex__hero-cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    );
  }

  return (
    <div className="why-choose-felmex__headline why-choose-felmex__headline--home-hero">
      <h2 id={titleId} aria-label="Delivering Tomorrow’s Trade Today.">
        <span className="why-choose-felmex__title-line">Delivering Tomorrow’s</span>
        <span className="why-choose-felmex__title-line">
          <span className="why-choose-felmex__title-impact">Trade</span> Today.
        </span>
      </h2>
      <p className="why-choose-felmex__hero-subtext">{HOME_HERO_SUBTEXT}</p>
      <HomeHeroDesktopActions />
    </div>
  );
}

export function WhyChooseFelmex({
  variant = 'default',
  sectionId = 'why-choose-felmex',
  titleId = 'why-choose-felmex-title',
  labelledById = titleId,
  enableDesktopScroll = true,
}) {
  const sectionRef = useRef(null);
  const splitPanelFrameRef = useRef(null);
  const [activeSplitPanelIndex, setActiveSplitPanelIndex] = useState(0);
  const isHomeHero = variant === 'home-hero';

  const handleSplitPanelScroll = () => {
    const panelFrame = splitPanelFrameRef.current;

    if (!panelFrame) {
      return;
    }

    const panels = Array.from(panelFrame.querySelectorAll('.why-choose-felmex__split-panel'));
    const frameRect = panelFrame.getBoundingClientRect();
    const frameStart = frameRect.left;
    let closestPanelIndex = 0;
    let closestDistance = Infinity;

    panels.forEach((panel, index) => {
      const panelRect = panel.getBoundingClientRect();
      const distance = Math.abs(panelRect.left - frameStart);

      if (distance < closestDistance) {
        closestPanelIndex = index;
        closestDistance = distance;
      }
    });

    setActiveSplitPanelIndex((currentIndex) =>
      currentIndex === closestPanelIndex ? currentIndex : closestPanelIndex
    );
  };

  const scrollSplitPanelToIndex = (index) => {
    const panelFrame = splitPanelFrameRef.current;
    const targetPanel = panelFrame?.querySelectorAll('.why-choose-felmex__split-panel')[index];

    targetPanel?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  useGSAP(
    () => {
      const root = sectionRef.current;
      const images = root ? gsap.utils.toArray('img', root) : [];
      const refreshScrollTrigger = () => ScrollTrigger.refresh();

      if (!root) return undefined;

      images.forEach((image) => {
        if (!image.complete) {
          image.addEventListener('load', refreshScrollTrigger, { once: true });
          image.addEventListener('error', refreshScrollTrigger, { once: true });
        }
      });

      const matchMedia = gsap.matchMedia();

      if (isHomeHero) {
        const track = root.querySelector('[data-why-choose-track]');

        if (track) {
          matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
            const mobileHomeContainerPeek = () => {
              if (!window.matchMedia('(max-width: 1023px)').matches) return 0;

              const rootFontSize =
                Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
              return Math.min(
                rootFontSize * 2.1,
                Math.max(rootFontSize * 1.35, window.innerWidth * 0.055)
              );
            };
            const scrollAmount = () => Math.max(track.offsetWidth - window.innerWidth, 0);
            const startOffset = () => Math.max(scrollAmount() - mobileHomeContainerPeek(), 0);
            const setTrackStart = () => gsap.set(track, { x: -startOffset() });

            setTrackStart();

            const timeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: root,
                start: 'top top',
                end: () => `+=${startOffset()}`,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onRefreshInit: setTrackStart,
              },
            });

            timeline.fromTo(
              track,
              { x: () => -startOffset() },
              {
                x: 0,
                duration: 1,
              }
            );

            ScrollTrigger.refresh();
          });
        }
      } else if (enableDesktopScroll) {
        const splitContainer = root.querySelector('[data-why-choose-split-container]');
        const backgroundLayers = gsap.utils.toArray('[data-why-choose-bg]', root);
        const panels = gsap.utils.toArray('[data-why-choose-panel]', root);

        if (splitContainer && backgroundLayers.length === panels.length && panels.length > 1) {
          matchMedia.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
            const transitionDuration = 0.72;

            gsap.set(backgroundLayers, {
              y: 0,
              yPercent: (index) => (index === 0 ? 0 : 100),
            });
            gsap.set(panels, {
              opacity: 1,
              visibility: 'visible',
              y: 0,
              yPercent: (index) => (index === 0 ? 0 : 110),
            });

            const timeline = gsap.timeline({
              defaults: {
                ease: 'power3.inOut',
                overwrite: 'auto',
              },
              scrollTrigger: {
                trigger: splitContainer,
                start: 'top top',
                end: () => `+=${window.innerHeight * (panels.length - 1)}`,
                pin: true,
                pinSpacing: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            panels.slice(1).forEach((panel, index) => {
              const stateIndex = index + 1;
              const transitionStart = index;
              const outgoingPanel = panels[stateIndex - 1];
              const backgroundLayer = backgroundLayers[stateIndex];

              timeline
                .to(
                  backgroundLayer,
                  {
                    yPercent: 0,
                    duration: transitionDuration,
                  },
                  transitionStart
                )
                .to(
                  outgoingPanel,
                  {
                    yPercent: -110,
                    duration: transitionDuration,
                  },
                  transitionStart
                )
                .to(
                  panel,
                  {
                    yPercent: 0,
                    duration: transitionDuration,
                  },
                  transitionStart
                );
            });

            ScrollTrigger.refresh();
          });
        }
      }

      return () => {
        images.forEach((image) => {
          image.removeEventListener('load', refreshScrollTrigger);
          image.removeEventListener('error', refreshScrollTrigger);
        });
        matchMedia.revert();
      };
    },
    { scope: sectionRef, dependencies: [isHomeHero, enableDesktopScroll] }
  );

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className={`why-choose-felmex ${isHomeHero ? 'why-choose-felmex--home-hero' : 'why-choose-felmex--split'}`}
      aria-label={isHomeHero ? 'Delivering Tomorrow’s Trade Today.' : undefined}
      aria-labelledby={isHomeHero ? undefined : labelledById}
    >
      {isHomeHero ? (
        <div className="why-choose-felmex__viewport">
          <div className="why-choose-felmex__mobile-hero-copy">
            <HomeHeroCopy titleId="why-choose-felmex-mobile-title" mobile />
          </div>
          <div className="why-choose-felmex__track" data-why-choose-track>
            {TRAIN_SEGMENTS.map((segment) => {
              if (segment.kind === 'head') {
                return (
                  <article
                    className="why-choose-felmex__segment why-choose-felmex__segment--head train-head"
                    key={segment.key}
                  >
                    <div className="why-choose-felmex__train-visual-wrapper train-visual-wrapper">
                      <img
                        className="why-choose-felmex__image why-choose-felmex__train-image"
                        src={segment.image}
                        alt=""
                        width={segment.width}
                        height={segment.height}
                        decoding="async"
                        fetchPriority="low"
                      />
                    </div>
                    <div className="why-choose-felmex__train-content-wrapper train-content-wrapper">
                      <HomeHeroCopy titleId="why-choose-felmex-title" />
                    </div>
                  </article>
                );
              }

              return (
                <article
                  className={`why-choose-felmex__segment why-choose-felmex__segment--container why-choose-felmex__segment--${segment.tone}`}
                  key={segment.key}
                >
                  <img
                    className="why-choose-felmex__image"
                    src={segment.image}
                    alt=""
                    width={segment.width}
                    height={segment.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="why-choose-felmex__copy">
                    <h3>{segment.title}</h3>
                    <span className="why-choose-felmex__copy-rule" aria-hidden="true" />
                    <p>{segment.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="why-choose-felmex__split-container split-scroll-container" data-why-choose-split-container>
          <div className="why-choose-felmex__split-left left-panel">
            <div className="why-choose-felmex__split-bg-stack split-scroll-bg-stack" aria-hidden="true">
              {WHY_CHOOSE_SPLIT_PANELS.map((panel) => (
                <span
                  className={`why-choose-felmex__split-bg-layer why-choose-felmex__split-bg-layer--${panel.backgroundTone} split-scroll-bg-layer`}
                  data-why-choose-bg
                  key={panel.key}
                />
              ))}
            </div>

            <div
              className="why-choose-felmex__split-panel-frame split-scroll-statement-frame"
              aria-label="Felmex logistics advantages"
              ref={splitPanelFrameRef}
              onScroll={handleSplitPanelScroll}
            >
              {WHY_CHOOSE_SPLIT_PANELS.map((panel) => (
                <article
                  className={`why-choose-felmex__split-panel why-choose-felmex__split-panel--${panel.tone} why-choose-felmex__split-panel--bg-${panel.backgroundTone} why-choose-felmex__split-panel--${panel.colorScheme} split-scroll-statement`}
                  data-why-choose-panel
                  key={panel.key}
                >
                  <div className="why-choose-felmex__split-panel-inner">
                    <div className="why-choose-felmex__split-copy">
                      <h3 aria-label={panel.title}>
                        {panel.titleLines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </h3>
                      <span className="why-choose-felmex__split-copy-rule" aria-hidden="true" />
                      <p>{panel.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="why-choose-felmex__split-dots" aria-label="Why choose carousel navigation">
              {WHY_CHOOSE_SPLIT_PANELS.map((panel, index) => (
                <button
                  className={`why-choose-felmex__split-dot${index === activeSplitPanelIndex ? ' is-active' : ''}`}
                  type="button"
                  key={panel.key}
                  aria-label={`Show ${panel.title}`}
                  aria-current={index === activeSplitPanelIndex ? 'true' : undefined}
                  onClick={() => scrollSplitPanelToIndex(index)}
                />
              ))}
            </div>
          </div>

          <aside className="why-choose-felmex__split-right right-panel" aria-label="Why choose Felmex headline">
            <div className="why-choose-felmex__split-right-inner">
              <span className="why-choose-felmex__split-right-rule" aria-hidden="true" />
              <h2 className="why-choose-felmex__split-title" id={titleId}>
                <span className="why-choose-felmex__split-title-line">
                  <span>Why Choose</span>
                </span>
                <span className="why-choose-felmex__split-title-line">
                  <span>
                    <strong>Felmex.</strong>
                  </span>
                </span>
              </h2>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
