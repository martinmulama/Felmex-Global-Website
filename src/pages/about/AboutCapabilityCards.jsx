export const CAPABILITY_STATEMENTS = [
  {
    label: 'Global Reach',
    copy: 'Integrated logistics across air, sea, road, and rail. We connect sourcing, forwarding, customs, warehousing, and delivery so each stage supports the next.',
    icon: '/about/capability-icon-global.png',
  },
  {
    label: 'Transparent Communication',
    copy: 'Clear updates and complete visibility from origin to destination. We keep your business informed with transparent communication and reliable follow-through at every handoff.',
    icon: '/about/capability-icon-integrated.png',
  },
  {
    label: 'Reliable Delivery',
    copy: 'Every shipment handled with precision and accountability. From first coordination to final delivery, we focus on keeping your cargo moving and your business ready for growth.',
    icon: '/about/capability-icon-delivery.png',
  },
];

export function AboutCapabilityCards({ compact = false }) {
  return (
    <section
      className={`abt-capabilities${compact ? ' abt-capabilities--compact' : ''}`}
      aria-label="How we support your logistics"
    >
      <div className="abt-capabilities-inner">
        <header className="abt-capabilities-heading">
          <h2>
            Why People Choose{' '}
            <span className="abt-title-impact">
              Felmex<span className="abt-red-punctuation">.</span>
            </span>
          </h2>
        </header>
        <div className="abt-capabilities-scene">
          <svg className="abt-capabilities-connector" viewBox="0 0 1774 142" aria-hidden="true">
            <path d="M8 82 C 117 82, 146 117, 337 56 S 692 14, 877 50 S 1183 90, 1434 39 S 1636 69, 1766 82" />
            <circle cx="8" cy="82" r="8" />
            <circle cx="1766" cy="82" r="7" />
          </svg>
          <div className="abt-capability-card-track">
            <svg className="abt-capability-compact-connector" viewBox="0 0 1000 120" aria-hidden="true">
              <path d="M-10 86 C 55 86, 95 42, 154 42 S 365 88, 500 44 S 745 86, 846 42 S 945 76, 1010 76" />
              <circle cx="0" cy="86" r="6" />
              <circle cx="1000" cy="76" r="6" />
            </svg>
            {CAPABILITY_STATEMENTS.map((statement) => (
              <article className="abt-capability-card" key={statement.label}>
                <div className="abt-capability-paper">
                  <img className="abt-capability-pin" src="/about/capability-pin.png" alt="" aria-hidden="true" />
                  <img className="abt-capability-icon" src={statement.icon} alt="" aria-hidden="true" />
                  <h2>{statement.label}</h2>
                  <p>{statement.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
