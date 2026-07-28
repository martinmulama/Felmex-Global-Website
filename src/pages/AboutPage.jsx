import { useState } from 'react';
import './AboutPage.css';

const ABOUT_BRIEFS = [
  {
    id: 'who-we-are',
    label: 'Who We Are',
    compactLabel: 'Who',
    navLabelLines: ['Who We Are'],
    titleLines: ['Who We Are'],
    copy:
      'FELMEX coordinates freight, customs, warehousing, and last-mile movement with accountable handoffs.',
  },
  {
    id: 'mission',
    label: 'Mission',
    compactLabel: 'Mission',
    navLabelLines: ['Mission'],
    titleLines: ['Mission'],
    copy:
      'We simplify logistics by checking requirements early, protecting handoffs, and keeping clients informed.',
  },
  {
    id: 'vision',
    label: 'Vision',
    compactLabel: 'Vision',
    navLabelLines: ['Vision'],
    titleLines: ['Vision'],
    copy:
      'We make cross-border trade more predictable through stronger partners, clearer visibility, and scalable standards.',
  },
  {
    id: 'values',
    label: 'Values',
    compactLabel: 'Values',
    navLabelLines: ['Values'],
    titleLines: ['Values'],
    copy:
      'Our values guide route planning, document control, pressure-ready communication, and cargo protection.',
  },
  {
    id: 'promise',
    label: 'Our Promise',
    compactLabel: 'Promise',
    navLabelLines: ['Our Promise'],
    titleLines: ['Our Promise'],
    copy:
      'We give practical guidance, honest timelines, and committed follow-through from planning to delivery.',
  },
];

const CORE_VALUES = ['Integrity', 'Reliability', 'Excellence', 'Collaboration'];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M4.8 12h13.4m-5.7-5.8 5.8 5.8-5.8 5.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AboutPage() {
  const [activeBriefId, setActiveBriefId] = useState(ABOUT_BRIEFS[0].id);
  const activeBriefIndex = Math.max(
    ABOUT_BRIEFS.findIndex((brief) => brief.id === activeBriefId),
    0
  );
  const activeBrief = ABOUT_BRIEFS[activeBriefIndex] ?? ABOUT_BRIEFS[0];

  return (
    <section className="abt-page" id="about-top" aria-label="About Felmex">
      <section className="abt-hero" aria-label="About introduction">
        <div className="abt-hero-copy">
          <p className="abt-hero-kicker">About Us</p>
          <h1 className="abt-hero-title">
            About Us<span>.</span>
          </h1>
          <span className="abt-hero-rule" aria-hidden="true" />
          <p className="abt-hero-subtitle">
            <span>Built around reliable logistics, clear accountability, and practical execution.</span>
            <span>Learn how FELMEX moves cargo with discipline from planning to delivery.</span>
          </p>
          <a className="abt-hero-link" href="#abt-curtain-canvas">
            <span className="abt-hero-link-icon" aria-hidden="true">
              <ArrowIcon />
            </span>
            <span>Explore our story</span>
          </a>
        </div>
      </section>

      <section className="abt-curtain-section" id="abt-curtain-canvas" aria-label="About page canvas">
        <div className="abt-curtain-board">
          <div className="abt-curtain-stage">
            <div className="abt-curtain-canvas" key={activeBrief.id} data-brief={activeBrief.id}>
              <section
                className="abt-curtain-scene"
                id="abt-brief-panel"
                role="tabpanel"
                aria-labelledby={`abt-brief-tab-${activeBrief.id}`}
                aria-label={`${activeBrief.label} brief`}
              >
                <div className="abt-curtain-hero-copy">
                  <p className="abt-curtain-kicker">
                    {String(activeBriefIndex + 1).padStart(2, '0')}
                  </p>
                  <h2 className="abt-curtain-scene-title">
                    {activeBrief.titleLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h2>
                  <span className="abt-curtain-title-rule" aria-hidden="true" />
                  <p className="abt-curtain-scene-copy">{activeBrief.copy}</p>
                  <div className="abt-curtain-dots" aria-label="About brief slides">
                    {ABOUT_BRIEFS.map((brief) => {
                      const isActive = brief.id === activeBrief.id;

                      return (
                        <button
                          className={`abt-curtain-dot${isActive ? ' is-active' : ''}`}
                          type="button"
                          key={brief.id}
                          aria-label={`Show ${brief.label}`}
                          aria-selected={isActive}
                          onClick={() => setActiveBriefId(brief.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
            <nav className="abt-curtain-nav" aria-label="About sections">
              <div className="abt-curtain-nav-track" role="tablist" aria-label="About sections">
                {ABOUT_BRIEFS.map((brief) => {
                  const isActive = brief.id === activeBrief.id;

                  return (
                    <button
                      className={`abt-curtain-tab${isActive ? ' is-active' : ''}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="abt-brief-panel"
                      id={`abt-brief-tab-${brief.id}`}
                      key={brief.id}
                      onClick={() => setActiveBriefId(brief.id)}
                    >
                      <span className="abt-curtain-tab-label">
                        {brief.navLabelLines.map((line) => (
                          <span className="abt-curtain-tab-label-line" key={line}>
                            {line}
                          </span>
                        ))}
                      </span>
                      <span className="abt-curtain-tab-compact">{brief.compactLabel}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
            <section className="abt-story-section" aria-labelledby="abt-story-title">
              <figure className="abt-story-visual" aria-hidden="true">
                <img
                  src="/about-story-truck.png"
                  width="1794"
                  height="877"
                  alt=""
                />
              </figure>
              <div className="abt-story-copy">
                <p className="abt-story-kicker">Our Story</p>
                <h2 className="abt-story-title" id="abt-story-title">
                  Built on reliable movement<span>.</span>
                </h2>
                <span className="abt-story-rule" aria-hidden="true" />
                <div className="abt-story-text">
                  <p>
                    FELMEX Global Logistics was founded on a simple principle: freight should be
                    predictable, transparent, and accountable.
                  </p>
                  <p>
                    As trade grew more complex, businesses needed more than transportation; they
                    needed a partner capable of coordinating every stage of the supply chain with
                    precision and care.
                  </p>
                  <p>
                    Today, FELMEX integrates sea, road, rail, and air freight into one seamless
                    network, helping businesses move confidently across borders with reliability,
                    integrity, and efficiency.
                  </p>
                </div>
              </div>
            </section>
            <section className="abt-values-section" aria-labelledby="abt-values-title">
              <div className="abt-values-copy">
                <span className="abt-values-rule" aria-hidden="true" />
                <h2 className="abt-values-title" id="abt-values-title">
                  <span>Our mission, vision</span>
                  <span>
                    and{' '}
                    <span className="abt-values-title-accent">
                      values<span className="abt-red-punctuation">.</span>
                    </span>
                  </span>
                </h2>
                <div className="abt-values-block-list">
                  <section className="abt-values-block" aria-labelledby="abt-values-vision-title">
                    <p className="abt-values-label" id="abt-values-vision-title">
                      Vision
                    </p>
                    <p className="abt-values-vision-copy">
                      Redefine global logistics by delivering seamless, multimodal solutions that
                      connect businesses, markets, and communities with efficiency and integrity.
                    </p>
                  </section>
                  <section className="abt-values-block" aria-labelledby="abt-values-mission-title">
                    <p className="abt-values-label" id="abt-values-mission-title">
                      Mission
                    </p>
                    <p>
                      FELMEX Global Logistics exists to simplify complexity in international trade.
                      We integrate air, sea, road, and rail services into one cohesive network,
                      ensuring reliable, transparent, and future-ready supply chain solutions for
                      our partners worldwide.
                    </p>
                  </section>
                  <section className="abt-values-block" aria-labelledby="abt-values-principles-title">
                    <p className="abt-values-label" id="abt-values-principles-title">
                      Values
                    </p>
                    <p className="abt-values-principles">The principles that move us.</p>
                    <ul className="abt-values-list" aria-label="Felmex core values">
                      {CORE_VALUES.map((value) => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
              <figure className="abt-values-visual" aria-hidden="true">
                <img
                  src="/about-vision-warehouse.png"
                  width="1535"
                  height="1024"
                  alt=""
                />
              </figure>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}
