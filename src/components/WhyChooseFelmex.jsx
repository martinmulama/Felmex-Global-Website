import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './WhyChooseFelmex.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRAIN_SEGMENTS = [
  {
    key: 'transparent-communication',
    kind: 'container',
    tone: 'blue',
    image: '/Blue.png',
    width: 1536,
    height: 1024,
    title: 'TRANSPARENT COMMUNICATION',
    text: 'Clear updates and complete visibility from origin to destination.',
  },
  {
    key: 'global-reach',
    kind: 'container',
    tone: 'white',
    image: '/White.png',
    width: 1536,
    height: 1024,
    title: 'GLOBAL REACH',
    text: 'Integrated logistics across air, sea, road, and rail.',
  },
  {
    key: 'reliable-delivery',
    kind: 'container',
    tone: 'red',
    image: '/Red.png',
    width: 1536,
    height: 1024,
    title: 'RELIABLE DELIVERY',
    text: 'Every shipment handled with precision and accountability.',
  },
  {
    key: 'head',
    kind: 'head',
    image: '/Train head .png',
    width: 1672,
    height: 941,
  },
];

export function WhyChooseFelmex() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      const track = root?.querySelector('[data-why-choose-track]');

      if (!root || !track) return undefined;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

      const scrollAmount = () => {
        return Math.max(track.offsetWidth - window.innerWidth, 0);
      };
      const setTrackStart = () => gsap.set(track, { x: -scrollAmount() });
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
          end: () => `+=${scrollAmount()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onRefreshInit: setTrackStart,
        },
      });

      timeline.fromTo(
        track,
        { x: () => -scrollAmount() },
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
      className="why-choose-felmex"
      aria-labelledby="why-choose-felmex-title"
    >
      <div className="why-choose-felmex__viewport">
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
                          logistics solutions tailored to your business. We combine local expertise
                          with global reach to ensure your cargo moves smoothly, safely, and on time.
                        </p>
                        <p>
                          Clients choose us for proactive planning, disciplined documentation, and
                          responsive support that keeps multimodal shipments moving when conditions
                          change.
                        </p>
                      </div>
                    </div>
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
