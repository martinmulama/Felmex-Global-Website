import './AboutPage.css';

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
  return (
    <section className="abt-page" id="about-top" aria-label="About Felmex Global Logistics">
      <section className="abt-hero" aria-label="About introduction">
        <div className="abt-hero-copy">
          <p className="abt-hero-kicker">About Felmex</p>
          <h1 className="abt-hero-title">
            About Us<span>.</span>
          </h1>
          <span className="abt-hero-rule" aria-hidden="true" />
          <p className="abt-hero-subtitle">
            <span>Built for disciplined logistics execution across borders, partners, and time zones.</span>
            <span>A blank operating canvas is being prepared for the next Felmex story.</span>
          </p>
          <a className="abt-hero-link" href="#abt-rising-canvas">
            <span className="abt-hero-link-icon" aria-hidden="true">
              <ArrowIcon />
            </span>
            <span>View canvas</span>
          </a>
        </div>
      </section>

      <section
        className="abt-rising-canvas"
        id="abt-rising-canvas"
        aria-label="Future About page content canvas"
      >
        <div className="abt-rising-canvas-inner" aria-hidden="true" />
      </section>
    </section>
  );
}
