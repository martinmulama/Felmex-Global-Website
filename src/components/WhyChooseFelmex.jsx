import { useRef } from 'react';
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

export function WhyChooseFelmex({ variant = 'default' }) {
  const sectionRef = useRef(null);
  const isHomeHero = variant === 'home-hero';

  useGSAP(
    () => {
      const root = sectionRef.current;
      const track = root?.querySelector('[data-why-choose-track]');

      if (!root || !track) return undefined;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

      const mobileHomeContainerPeek = () => {
        if (!isHomeHero || !window.matchMedia('(max-width: 1023px)').matches) return 0;

        const rootFontSize =
          Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
        return Math.min(rootFontSize * 2.1, Math.max(rootFontSize * 1.35, window.innerWidth * 0.055));
      };
      const scrollAmount = () => {
        return Math.max(track.offsetWidth - window.innerWidth, 0);
      };
      const startOffset = () => Math.max(scrollAmount() - mobileHomeContainerPeek(), 0);
      const setTrackStart = () => gsap.set(track, { x: -startOffset() });
      const refreshScrollTrigger = () => ScrollTrigger.refresh();
      const images = gsap.utils.toArray('img', root);

      images.forEach((image) => {
        if (!image.complete) {
          image.addEventListener('load', refreshScrollTrigger, { once: true });
          image.addEventListener('error', refreshScrollTrigger, { once: true });
        }
      });

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

      return () => {
        images.forEach((image) => {
          image.removeEventListener('load', refreshScrollTrigger);
          image.removeEventListener('error', refreshScrollTrigger);
        });
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="why-choose-felmex"
      ref={sectionRef}
      className={`why-choose-felmex${isHomeHero ? ' why-choose-felmex--home-hero' : ''}`}
      aria-label={isHomeHero ? 'Delivering Tomorrow’s Trade Today.' : undefined}
      aria-labelledby={isHomeHero ? undefined : 'why-choose-felmex-title'}
    >
      <div className="why-choose-felmex__viewport">
        {isHomeHero ? (
          <div className="why-choose-felmex__mobile-hero-copy">
            <HomeHeroCopy titleId="why-choose-felmex-mobile-title" mobile />
          </div>
        ) : null}
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
                    {isHomeHero ? (
                      <HomeHeroCopy titleId="why-choose-felmex-title" />
                    ) : (
                      <div className="why-choose-felmex__headline">
                        <p className="why-choose-felmex__kicker">Our approach</p>
                        <h2 id="why-choose-felmex-title">
                          Why Choose{' '}
                          <span className="why-choose-felmex__title-impact">
                            Felmex<span className="why-choose-felmex__title-dot">.</span>
                          </span>
                        </h2>
                        <span className="why-choose-felmex__headline-rule" aria-hidden="true" />
                        <div className="why-choose-felmex__intro">
                          <p>
                            Felmex Global Logistics delivers reliable, efficient, and cost-effective
                            logistics solutions tailored to your business. We combine local
                            expertise with global reach to ensure your cargo moves smoothly, safely,
                            and on time.
                          </p>
                          <p>
                            Clients choose us for proactive planning, disciplined documentation, and
                            responsive support that keeps multimodal shipments moving when
                            conditions change.
                          </p>
                        </div>
                      </div>
                    )}
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
    </section>
  );
}
