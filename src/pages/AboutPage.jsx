import { useRef, useState } from 'react';
import { SplitPanelPreloader } from '../components/preloader/SplitPanelPreloader';
import './AboutPage.css';
import { WhyChooseFelmex } from '../components/why-choose/WhyChooseFelmex';
import { ScrollSectionTitle } from '../components/scroll-reveal/ScrollSectionTitle';
import { useSplitPanelPreloader } from '../hooks/useSplitPanelPreloader';

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

const MOBILE_ABOUT_TABS = [
  {
    id: 'who-we-are',
    label: 'Who We Are',
    tagLabel: 'Who we are.',
    labelLines: ['WHO WE', 'ARE'],
    icon: 'crowd',
    copyLines: [
      'We coordinate freight,',
      'customs, warehousing, and',
      'last-mile movement with',
      'accountable handoffs.',
    ],
  },
  {
    id: 'mission',
    label: 'Our Mission',
    tagLabel: 'Our mission',
    labelLines: ['OUR', 'MISSION'],
    icon: 'mission',
    copyLines: [
      'We simplify cross-border logistics',
      'with early planning, clear visibility,',
      'and reliable communication.',
    ],
  },
  {
    id: 'vision',
    label: 'Our Vision',
    tagLabel: 'Our vision',
    labelLines: ['OUR', 'VISION'],
    icon: 'vision',
    copyLines: [
      'We make global trade feel more',
      'predictable through stronger partners',
      'and scalable operating standards.',
    ],
  },
  {
    id: 'values',
    label: 'Our Values',
    tagLabel: 'Our values',
    labelLines: ['OUR', 'VALUES'],
    icon: 'values',
    copyLines: [
      'Integrity, reliability, excellence,',
      'and collaboration guide every route,',
      'handoff, and cargo promise.',
    ],
  },
];

const CORE_VALUES = ['Integrity', 'Reliability', 'Excellence', 'Collaboration'];
const ABOUT_STATS = [
  { value: '12+', label: 'Years Operating' },
  { value: '150+', label: 'Satisfied Clients' },
  { value: '1,500+', label: 'Shipments Delivered' },
];
const PARTNER_REVEAL_PATTERNS = [
  'vertical-up',
  'horizontal-left',
  'vertical-down',
  'horizontal-right',
  'vertical-up',
  'horizontal-right',
  'vertical-down',
  'horizontal-left',
  'vertical-up',
  'horizontal-right',
];

const PARTNER_LOGOS = [
  {
    name: 'Maersk',
    logo: '/partners/maersk.svg',
    tone: 'blue',
    className: 'maersk',
    logoWidth: '88%',
    logoMaxHeight: '34%',
  },
  {
    name: 'DHL Group',
    logo: '/partners/dhl-group.svg',
    tone: 'white',
    className: 'dhl',
    logoWidth: '92%',
    logoMaxHeight: '35%',
  },
  {
    name: 'Kuehne+Nagel',
    logo: '/partners/kuehne-nagel.svg',
    tone: 'red',
    className: 'kuehne-nagel',
    logoWidth: '96%',
    logoMaxHeight: '36%',
  },
  {
    name: 'DB Schenker',
    logo: '/partners/db-schenker.svg',
    tone: 'white',
    className: 'db-schenker',
    logoWidth: '94%',
    logoMaxHeight: '34%',
  },
  {
    name: 'CMA CGM',
    logo: '/partners/cma-cgm.svg',
    tone: 'blue',
    className: 'cma-cgm',
    logoWidth: '68%',
    logoMaxHeight: '68%',
  },
  {
    name: 'Amazon',
    logo: '/partners/amazon.svg',
    tone: 'white',
    className: 'amazon',
    logoWidth: '74%',
    logoMaxHeight: '35%',
  },
  {
    name: 'DP World',
    logo: '/partners/dp-world.svg',
    tone: 'red',
    className: 'dp-world',
    logoWidth: '68%',
    logoMaxHeight: '58%',
  },
  {
    name: 'FedEx Express',
    logo: '/partners/fedex-express.svg',
    tone: 'white',
    className: 'fedex',
    logoWidth: '72%',
    logoMaxHeight: '48%',
  },
  {
    name: 'MSC',
    logo: '/partners/msc.svg',
    tone: 'blue',
    className: 'msc',
    logoWidth: '48%',
    logoMaxHeight: '68%',
  },
  {
    name: 'Hapag-Lloyd',
    logo: '/partners/hapag-lloyd.svg',
    tone: 'white',
    className: 'hapag-lloyd',
    logoWidth: '86%',
    logoMaxHeight: '34%',
  },
];

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

const PROVIDED_HANDSHAKE_ICON_PATH =
  'M48.753,26.371l-6.886,2.652L36.647,15.469l6.887-2.652A.6.6,0,0,0,43.1,11.7l-7.446,2.868a.6.6,0,0,0-.344.775l.606,1.575a7.944,7.944,0,0,1-2.468.712,9.194,9.194,0,0,1-3.5-1.039,10.08,10.08,0,0,0-2.6-.893,7.7,7.7,0,0,0-3.533.906.638.638,0,0,0-.423-.166H15.082a1.619,1.619,0,0,1-.578-.175l.7-1.5a.6.6,0,0,0-.288-.8L7.695,10.578a.6.6,0,0,0-.51,1.086L13.866,14.8,7.7,27.948,1.015,24.813A.6.6,0,0,0,.505,25.9l7.224,3.39a.591.591,0,0,0,.255.058A.6.6,0,0,0,8.527,29l.556-1.184c1.047.459,2.129.948,2.83,1.214a3.666,3.666,0,0,0,.163,2.016,1.8,1.8,0,0,0,1.659.946,2.058,2.058,0,0,0,.655,2.091,2.039,2.039,0,0,0,1.417.325,1.886,1.886,0,0,0,.088.417,2.235,2.235,0,0,0,1.262,1.311,2.676,2.676,0,0,0,2.111-.114A2.351,2.351,0,0,0,20.5,37.331a2.8,2.8,0,0,0,2.615-.53,3.212,3.212,0,0,0,1.512,1.427,1.733,1.733,0,0,0,.7.146,3.9,3.9,0,0,0,2.448-1.3,3.513,3.513,0,0,0,1.417.33,2.27,2.27,0,0,0,1.657-.673,3.246,3.246,0,0,0,.811-1.2,3.174,3.174,0,0,0,.809.119,2.271,2.271,0,0,0,1.657-.673,3.221,3.221,0,0,0,.821-1.232,2.871,2.871,0,0,0,.661.087l.126,0a2.947,2.947,0,0,0,1.968-.938c.788-.788.15-2.007-.339-2.706a6.4,6.4,0,0,1,2.306-1.38c.2-.06.463-.121.752-.183l.539,1.4a.6.6,0,0,0,.56.384.587.587,0,0,0,.216-.04l7.446-2.868a.6.6,0,1,0-.432-1.119ZM14.345,30.692c-.48.051-.977-.02-1.04-.163a2.815,2.815,0,0,1,0-1.614l.005,0a1.819,1.819,0,0,1,1.433-.606.992.992,0,0,1,.6.617C15.426,29.137,14.988,29.962,14.345,30.692Zm1.844,2.329a1.577,1.577,0,0,1-1.018.034c-.37-.282-.121-1.093.006-1.4a5.831,5.831,0,0,0,1.346-2.208,1.747,1.747,0,0,1,.969-.086,2.3,2.3,0,0,1,.568.731C17.594,30.674,16.637,32.265,16.189,33.021Zm3.186,1.412a.6.6,0,0,0-.039.1c-.414.26-1.208.624-1.638.427a1.011,1.011,0,0,1-.578-.548.682.682,0,0,1,.063-.539A35.22,35.22,0,0,1,19.11,30.84a1.045,1.045,0,0,1,1.4.032l.707.62Zm3.539.905c-.623.531-1.513.993-1.84.834-.718-.354-.663-.873-.632-1.012l0-.017c.007-.01.019-.014.026-.024l1.853-2.959a4.592,4.592,0,0,1,.874.6c.213.18.542.491.918.858Zm2.233,1.707a2.088,2.088,0,0,1-1.037-1.162l.937-1.343c.647.651,1.291,1.312,1.7,1.733C26.243,36.744,25.546,37.221,25.147,37.045Zm10.531-4.514a1.94,1.94,0,0,1-.979-.257c-.012-.008-.027-.01-.039-.018a5.068,5.068,0,0,1-1.124-.882c-2.127-2.126-6.075-5.211-6.243-5.341a.646.646,0,1,0-.794,1.019c.041.031,4.053,3.166,6.124,5.236a6.572,6.572,0,0,0,1.147.916,1.7,1.7,0,0,1-.552.852c-.531.531-1.382.2-1.757.017a.706.706,0,0,0-.182-.1l-6.638-5.826a.646.646,0,0,0-.853.971l6.7,5.88a1.817,1.817,0,0,1-.546.821c-.609.611-1.645.087-1.894-.054-.45-.467-3.108-3.223-4.014-3.989a4.781,4.781,0,0,0-1.666-.989l-1-.881a2.305,2.305,0,0,0-2.216-.518A3.379,3.379,0,0,0,18.23,28.3a2.4,2.4,0,0,0-1.885-.144,2.141,2.141,0,0,0-1.337-1.1,2.887,2.887,0,0,0-2.506.821c-.643-.245-1.76-.749-2.869-1.231l4.327-9.221a2.934,2.934,0,0,0,1.122.307h6.583a7.445,7.445,0,0,0-1.111.759,2.525,2.525,0,0,0-.583,1.255,3.1,3.1,0,0,1-.639,1.4c-.523.6-1.914,2.2-.565,3.545A1.581,1.581,0,0,0,19.9,25.1c1.355-.027,3.439-1.32,5.41-3.333L36.05,30.581a2.973,2.973,0,0,1,.742,1.39A1.681,1.681,0,0,1,35.678,32.531ZM39.3,27.563a7.71,7.71,0,0,0-2.829,1.688l-10.8-8.869a.644.644,0,0,0-.884.061c-2.718,2.946-4.808,3.543-5.1,3.333-.185-.186-.5-.5.626-1.782a4.336,4.336,0,0,0,.918-1.933,1.747,1.747,0,0,1,.244-.659c.475-.475,4.289-2.611,5.717-2.423a9.279,9.279,0,0,1,2.241.793A10.277,10.277,0,0,0,33.45,18.92a9.126,9.126,0,0,0,2.931-.8L39.955,27.4C39.708,27.452,39.477,27.508,39.3,27.563Z';

function MobileAboutIcon({ kind }) {
  const icons = {
    crowd: (
      <svg viewBox="0 0 160 128" focusable="false" aria-hidden="true">
        <circle cx="80" cy="37" r="24" fill="currentColor" />
        <circle cx="39.5" cy="49" r="18" fill="currentColor" />
        <circle cx="120.5" cy="49" r="18" fill="currentColor" />
        <path
          d="M39.5 72C20.4 72 5 84.1 5 99v5.2c0 4 3.2 7.3 7.3 7.3h39.5c-1.2-4-1.8-8.1-1.8-12.5 0-9.6 3.5-18.4 9.5-25.8A49.2 49.2 0 0 0 39.5 72Z"
          fill="currentColor"
        />
        <path
          d="M120.5 72c-7 0-13.8 1.1-20 3.2 6 7.3 9.5 16.2 9.5 25.8 0 4.4-.6 8.5-1.8 12.5h39.5c4 0 7.3-3.2 7.3-7.3V99c0-14.9-15.4-27-34.5-27Z"
          fill="currentColor"
        />
        <path
          d="M80 69c-25.4 0-46 15.3-46 34.2v6.6c0 5 4 9 9 9h74c5 0 9-4 9-9v-6.6C126 84.3 105.4 69 80 69Z"
          fill="currentColor"
        />
      </svg>
    ),
    mission: (
      <svg viewBox="0 0 160 128" focusable="false" aria-hidden="true">
        <path d="M80 21a43 43 0 1 0 43 43A43 43 0 0 0 80 21Zm0 70a27 27 0 1 1 27-27 27 27 0 0 1-27 27Z" fill="currentColor" />
        <path d="M80 48a16 16 0 1 0 16 16 16 16 0 0 0-16-16Z" fill="currentColor" />
        <path
          d="M88.6 56.8 130 31l-18.9 45.4-15.5-8.2-10 21.4-12.1-12.1 21.4-10-6.3-10.7Z"
          fill="currentColor"
        />
        <path
          d="M80 14v17M80 97v17M30 64h17M113 64h17"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>
    ),
    vision: (
      <svg viewBox="0 0 160 128" focusable="false" aria-hidden="true">
        <path
          d="M80 31c38.7 0 62.9 32.9 62.9 32.9S118.7 97 80 97 17.1 63.9 17.1 63.9 41.3 31 80 31Z"
          fill="currentColor"
        />
        <path d="M80 43a21 21 0 1 1 0 42 21 21 0 0 1 0-42Z" fill="#ffffff" />
        <path d="M80 52a12 12 0 1 1 0 24 12 12 0 0 1 0-24Z" fill="currentColor" />
        <path d="M87.5 56.4a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" fill="#ffffff" />
      </svg>
    ),
    values: (
      <svg viewBox="0 0 160 128" focusable="false" aria-hidden="true">
        <path
          d="M80 12 124 30.8V62c0 27.6-17.7 45.8-44 56-26.3-10.2-44-28.4-44-56V30.8L80 12Z"
          fill="currentColor"
        />
        <path
          d="m58 65.4 14.9 14.9L103.5 48"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="9.5"
        />
        <path
          d="M55 39.5 80 28.8l25 10.7"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.78"
          strokeWidth="5"
        />
      </svg>
    ),
  };

  return icons[kind] ?? icons.crowd;
}

export function AboutPage() {
  const isAppLoaded = useSplitPanelPreloader();
  const [activeBriefId, setActiveBriefId] = useState(ABOUT_BRIEFS[0].id);
  const [isMobilePanelSliding, setIsMobilePanelSliding] = useState(false);
  const [isMobilePanelSettling, setIsMobilePanelSettling] = useState(false);
  const [mobileSlideDirection, setMobileSlideDirection] = useState(1);
  const mobileSwipeStartRef = useRef(null);
  const mobilePendingTabIndexRef = useRef(null);
  const activeBriefIndex = Math.max(
    ABOUT_BRIEFS.findIndex((brief) => brief.id === activeBriefId),
    0
  );
  const activeBrief = ABOUT_BRIEFS[activeBriefIndex] ?? ABOUT_BRIEFS[0];
  const activeMobileTab =
    MOBILE_ABOUT_TABS.find((tab) => tab.id === activeBriefId) ?? MOBILE_ABOUT_TABS[0];
  const activeMobileIndex = Math.max(
    MOBILE_ABOUT_TABS.findIndex((tab) => tab.id === activeMobileTab.id),
    0
  );
  const previousMobileTab =
    MOBILE_ABOUT_TABS[
      (activeMobileIndex - 1 + MOBILE_ABOUT_TABS.length) % MOBILE_ABOUT_TABS.length
    ];
  const nextMobileTab = MOBILE_ABOUT_TABS[(activeMobileIndex + 1) % MOBILE_ABOUT_TABS.length];

  const changeMobileTab = (direction) => {
    if (isMobilePanelSliding) return;

    const nextIndex =
      (activeMobileIndex + direction + MOBILE_ABOUT_TABS.length) % MOBILE_ABOUT_TABS.length;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setActiveBriefId(MOBILE_ABOUT_TABS[nextIndex].id);
      return;
    }

    mobilePendingTabIndexRef.current = nextIndex;
    setMobileSlideDirection(direction);
    setIsMobilePanelSliding(true);
  };

  const handleMobilePanelTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;

    const nextIndex = mobilePendingTabIndexRef.current;
    if (nextIndex === null || nextIndex === undefined) return;

    mobilePendingTabIndexRef.current = null;
    setActiveBriefId(MOBILE_ABOUT_TABS[nextIndex].id);
    setIsMobilePanelSliding(false);
    setIsMobilePanelSettling(true);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsMobilePanelSettling(false));
    });
  };

  const handleMobilePanelTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;

    mobileSwipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleMobilePanelTouchEnd = (event) => {
    const start = mobileSwipeStartRef.current;
    const touch = event.changedTouches[0];
    mobileSwipeStartRef.current = null;

    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    changeMobileTab(deltaX < 0 ? 1 : -1);
  };

  return (
    <section
      className={`abt-page${isAppLoaded ? ' is-loaded' : ''}`}
      id="about-top"
      aria-label="About Felmex"
    >
      <SplitPanelPreloader isAppLoaded={isAppLoaded} />
      <section className="abt-mobile-reference" aria-label="About Felmex mobile overview">
        <section className="abt-mobile-hero" aria-label="About introduction">
          <h1 className="abt-mobile-title">
            <span>About</span>
            <span>Us</span>
          </h1>
          <blockquote className="abt-mobile-quote">
            <span className="abt-mobile-quote-mark abt-mobile-quote-mark--open" aria-hidden="true">
              &ldquo;
            </span>
            <p>
              Built around <strong>reliable logistics</strong>, clear <strong>accountability</strong>, and
              practical <strong>execution</strong>.
            </p>
            <span className="abt-mobile-quote-mark abt-mobile-quote-mark--close" aria-hidden="true">
              &rdquo;
            </span>
          </blockquote>
        </section>

        <section className="abt-mobile-brand-story" aria-label="Our story">
          <div className="abt-mobile-brand-story-layout">
            <div className="abt-mobile-brand-story-visual">
              <img
                src="/about-our-story-people.png"
                alt="A Felmex logistics consultant and field worker"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="abt-mobile-brand-story-copy">
              <article className="abt-mobile-story-entry">
                <h2>Origin</h2>
                <span className="abt-mobile-story-entry-rule" aria-hidden="true" />
                <p>
                  FELMEX Global Logistics was founded on a simple principle: freight should be
                  predictable, transparent, and accountable.
                </p>
              </article>

              <article className="abt-mobile-story-entry">
                <h2>Growth</h2>
                <span className="abt-mobile-story-entry-rule" aria-hidden="true" />
                <p>
                  As trade grew more complex, businesses needed more than transportation; they needed a
                  partner capable of coordinating every stage of the supply chain with precision and care.
                </p>
              </article>

              <article className="abt-mobile-story-entry">
                <h2>Today</h2>
                <span className="abt-mobile-story-entry-rule" aria-hidden="true" />
                <p>
                  Today, FELMEX integrates sea, road, rail, and air freight into one seamless network,
                  helping businesses move confidently across borders with reliability, integrity, and
                  efficiency.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className={`abt-mobile-tabs${
            isMobilePanelSliding
              ? ` is-sliding is-sliding-${mobileSlideDirection > 0 ? 'forward' : 'backward'}`
              : ''
          }${isMobilePanelSettling ? ' is-settling' : ''}`}
          aria-label="About sections"
          onTouchStart={handleMobilePanelTouchStart}
          onTouchEnd={handleMobilePanelTouchEnd}
        >
          <div
            className="abt-mobile-layout-track"
            aria-live="polite"
            aria-label={activeMobileTab.label}
            onTransitionEnd={handleMobilePanelTransitionEnd}
          >
              {[
                { slot: 'previous', tab: previousMobileTab },
                { slot: 'current', tab: activeMobileTab },
                { slot: 'next', tab: nextMobileTab },
              ].map(({ slot, tab }) => {
                const panelIndex = MOBILE_ABOUT_TABS.findIndex((item) => item.id === tab.id);
                const panelNextTab = MOBILE_ABOUT_TABS[(panelIndex + 1) % MOBILE_ABOUT_TABS.length];
                const panelTagPosition = panelIndex % 2 === 0 ? 'top' : 'bottom';
                const panelPeekPosition = panelTagPosition === 'top' ? 'bottom' : 'top';

                return (
                  <section
                    className={`abt-mobile-layout abt-mobile-layout--${slot}`}
                    key={`${slot}-${tab.id}`}
                    aria-hidden={slot !== 'current'}
                  >
                    <section className="abt-mobile-panel">
                      <p className="abt-mobile-panel-copy">
                        {tab.copyLines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </p>

                      <span
                        className={`abt-mobile-panel-tag abt-mobile-panel-tag--active abt-mobile-panel-tag--${panelTagPosition}`}
                      >
                        {tab.tagLabel}
                      </span>

                      <button
                        className={`abt-mobile-panel-tag abt-mobile-panel-tag--peek abt-mobile-panel-tag--${panelPeekPosition}`}
                        type="button"
                        tabIndex={slot === 'current' ? 0 : -1}
                        aria-label={`Show ${panelNextTab.label}`}
                        onClick={() => slot === 'current' && changeMobileTab(1)}
                      >
                        {panelNextTab.tagLabel}
                      </button>
                    </section>
                  </section>
                );
              })}
          </div>
        </section>

        <section className="abt-mobile-why-choose scroll-section">
          <header className="abt-mobile-why-choose-header">
            <span className="abt-mobile-section-rule" aria-hidden="true" />
            <ScrollSectionTitle className="abt-mobile-section-title" id="abt-mobile-why-choose-felmex-title">
              <span>Why Choose</span>
              <span>
                Felmex<span className="abt-red-punctuation">.</span>
              </span>
            </ScrollSectionTitle>
          </header>
          <WhyChooseFelmex
            sectionId="abt-mobile-why-choose-felmex"
            titleId="abt-mobile-why-choose-felmex-internal-title"
            labelledById="abt-mobile-why-choose-felmex-title"
            enableDesktopScroll={false}
          />
        </section>

        <section className="abt-mobile-partners scroll-section" aria-labelledby="abt-mobile-partners-title">
          <header className="abt-mobile-partners-header">
            <ScrollSectionTitle className="abt-mobile-partners-title" id="abt-mobile-partners-title">
              Trusted by Industry{' '}
              <span className="abt-partners-title-impact">
                Leaders<span className="abt-red-punctuation">.</span>
              </span>
            </ScrollSectionTitle>
            <span className="abt-mobile-partners-rule" aria-hidden="true" />
          </header>
          <div
            className="abt-mobile-partner-grid scroll-section"
            aria-label="Trusted logistics partners"
          >
            {PARTNER_LOGOS.map((partner, index) => (
              <div
                className={`abt-mobile-partner-tile abt-mobile-partner-tile--${partner.className} abt-partner-reveal abt-partner-reveal--${PARTNER_REVEAL_PATTERNS[index]}`}
                key={partner.name}
                style={{
                  '--abt-partner-logo-width': partner.logoWidth,
                  '--abt-partner-reveal-delay': `${index * 0.07}s`,
                }}
              >
                <img
                  className="abt-mobile-partner-logo"
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="abt-mobile-final-cta scroll-section" aria-labelledby="abt-mobile-final-cta-title">
          <ScrollSectionTitle id="abt-mobile-final-cta-title">
            <span>Let&apos;s Move Your</span>
            <span>Business</span>
            <span>
              Forward, <strong>Together.</strong>
            </span>
          </ScrollSectionTitle>
          <p>
            Partner with FELMEX Global Logistics for seamless, reliable, and scalable logistics
            solutions that drive growth and open new opportunities.
          </p>
          <a className="abt-mobile-final-cta-link" href="/contact">
            <span>Get in Touch</span>
            <span className="abt-mobile-final-cta-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        </section>
      </section>

      <section className="abt-hero" aria-label="About introduction">
        <div className="abt-hero-copy">
          <div className="clip-mask abt-hero-kicker-mask">
            <p className="abt-hero-kicker abt-hero-reveal">About Us</p>
          </div>
          <div className="clip-mask abt-hero-title-mask">
            <h1 className="abt-hero-title abt-hero-reveal">
              About Us<span>.</span>
            </h1>
          </div>
          <span className="abt-hero-rule" aria-hidden="true" />
          <p className="abt-hero-subtitle">
            <span className="clip-mask abt-hero-subtitle-line-mask">
              <span className="abt-hero-reveal">
                Built around reliable logistics, clear accountability, and practical execution.
              </span>
            </span>
            <span className="clip-mask abt-hero-subtitle-line-mask">
              <span className="abt-hero-reveal">
                Learn how FELMEX moves cargo with discipline from planning to delivery.
              </span>
            </span>
          </p>
          <div className="clip-mask abt-hero-link-mask">
            <a className="abt-hero-link abt-hero-reveal" href="#abt-curtain-canvas">
              <span className="abt-hero-link-icon" aria-hidden="true">
                <ArrowIcon />
              </span>
              <span>Explore our story</span>
            </a>
          </div>
        </div>
      </section>

      <section className="abt-curtain-section" id="abt-curtain-canvas" aria-label="About page canvas">
        <div className="abt-curtain-board">
          <div className="abt-curtain-stage">
            <div className="abt-curtain-canvas" key={activeBrief.id} data-brief={activeBrief.id}>
              <div className="abt-desktop-hero-collage" aria-hidden="true">
                <span className="abt-desktop-hero-card-back abt-desktop-hero-card-back--team" />
                <figure className="abt-desktop-hero-photo abt-desktop-hero-photo--team">
                  <img
                    src="/overview/team.png"
                    alt=""
                    width="1190"
                    height="1322"
                    decoding="async"
                  />
                </figure>
                <span className="abt-desktop-hero-card-back abt-desktop-hero-card-back--warehouse" />
                <figure className="abt-desktop-hero-photo abt-desktop-hero-photo--warehouse">
                  <img
                    src="/overview/felmex-container-lift.png"
                    alt=""
                    width="1314"
                    height="1197"
                    decoding="async"
                  />
                </figure>
                <aside className="abt-desktop-hero-note" key={activeBrief.id}>
                  <img
                    className="abt-desktop-hero-paperclip"
                    src="/service-catalog-paperclip.png"
                    alt=""
                    width="1254"
                    height="1254"
                    decoding="async"
                  />
                  <p>
                    <span>{activeBrief.label}</span>
                    {activeBrief.copy}
                  </p>
                  <span aria-hidden="true" />
                </aside>
              </div>
              <section
                className="abt-curtain-scene scroll-section"
                id="abt-brief-panel"
                role="tabpanel"
                aria-labelledby={`abt-brief-tab-${activeBrief.id}`}
                aria-label={`${activeBrief.label} brief`}
              >
                <div className="abt-curtain-hero-copy">
                  <p className="abt-curtain-kicker">
                    {String(activeBriefIndex + 1).padStart(2, '0')}
                  </p>
                  <ScrollSectionTitle className="abt-curtain-scene-title">
                    {activeBrief.titleLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </ScrollSectionTitle>
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
            <section className="abt-desktop-stats-strip" aria-labelledby="abt-stats-title">
              <div className="abt-desktop-stats-strip-inner">
                <header className="abt-desktop-stats-intro">
                  <h2 id="abt-stats-title">
                    <span>Our Company In</span>
                    <strong>Numbers</strong>
                  </h2>
                </header>

                {ABOUT_STATS.map((stat) => (
                  <div className="abt-desktop-stat-group" key={stat.label}>
                    <article className="abt-desktop-stat-card">
                      <p className="abt-desktop-stat-value">{stat.value}</p>
                      <p className="abt-desktop-stat-label">{stat.label}</p>
                    </article>
                  </div>
                ))}
              </div>
            </section>
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
            <section className="abt-story-section scroll-section" aria-labelledby="abt-story-title">
              <div className="abt-story-red-panel" aria-hidden="true" />
              <div className="abt-story-copy">
                <p className="abt-story-kicker">Our Story</p>
                <ScrollSectionTitle className="abt-story-title" id="abt-story-title">
                  Built on reliable{' '}
                  <span className="abt-title-impact">
                    movement<span className="abt-red-punctuation">.</span>
                  </span>
                </ScrollSectionTitle>
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
            <section className="abt-values-section scroll-section" aria-labelledby="abt-values-title">
              <div className="abt-values-red-panel" aria-hidden="true" />
              <div className="abt-values-copy">
                <span className="abt-values-rule" aria-hidden="true" />
                <ScrollSectionTitle className="abt-values-title" id="abt-values-title">
                  <span>Our Mission, Vision, </span>
                  <span>
                    and{' '}
                    <span className="abt-values-title-accent">
                      Values<span className="abt-red-punctuation">.</span>
                    </span>
                  </span>
                </ScrollSectionTitle>
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
                  src="/about-plane-cutout.png"
                  width="1536"
                  height="1024"
                  alt=""
                />
              </figure>
            </section>
            <WhyChooseFelmex />
            <section className="abt-partners-section scroll-section" aria-labelledby="abt-partners-title">
              <div className="abt-partners-header">
                <p className="abt-partners-kicker">Our Partners</p>
                <ScrollSectionTitle className="abt-partners-title" id="abt-partners-title">
                  Trusted by Industry{' '}
                  <span className="abt-partners-title-impact">
                    Leaders<span className="abt-red-punctuation">.</span>
                  </span>
                </ScrollSectionTitle>
                <span className="abt-partners-rule" aria-hidden="true" />
                <p className="abt-partners-copy">
                  We collaborate with forward-thinking companies worldwide to deliver smarter
                  logistics solutions and lasting impact.
                </p>
              </div>
              <div className="abt-partners-grid scroll-section" aria-label="Trusted logistics partners">
                {PARTNER_LOGOS.map((partner, index) => (
                  <div
                    className={`abt-partner-tile abt-partner-tile--${partner.tone} abt-partner-tile--${partner.className} abt-partner-reveal abt-partner-reveal--${PARTNER_REVEAL_PATTERNS[index]}`}
                    key={partner.name}
                    style={{
                      '--abt-partner-logo-width': partner.logoWidth,
                      '--abt-partner-logo-max-height': partner.logoMaxHeight,
                      '--abt-partner-reveal-delay': `${index * 0.07}s`,
                    }}
                  >
                    <img
                      className="abt-partner-logo"
                      src={partner.logo}
                      alt={partner.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </section>
            <section className="abt-final-cta-section scroll-section" aria-labelledby="abt-final-cta-title">
              <div className="abt-final-cta-shell">
                <div className="abt-final-cta-heading">
                  <ScrollSectionTitle id="abt-final-cta-title">
                    <span>Let&apos;s Move Your</span>
                    <span>Business</span>
                    <span>
                      Forward, <strong>Together.</strong>
                    </span>
                  </ScrollSectionTitle>
                  <span className="abt-final-cta-rule" aria-hidden="true" />
                </div>
                <div className="abt-final-cta-copy">
                  <p>
                    Partner with FELMEX Global Logistics for seamless, reliable, and scalable
                    logistics solutions that drive growth and open new opportunities.
                  </p>
                  <a className="abt-final-cta-link" href="/contact">
                    <span>Get in Touch</span>
                    <span className="abt-final-cta-arrow" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}
