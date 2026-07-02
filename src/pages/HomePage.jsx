import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './HomePage.css';
import { MQ } from '../constants/breakpoints';
import { ONGOING_PROJECTS } from './projects/data';
import { CLIENT_QUOTES } from './home/data';

const HOME_PROJECT_THUMBNAIL_COPIES = 2;
const HOME_PROJECT_PREVIEW =
  ONGOING_PROJECTS.find((project) => project.id === 'border-continuity') ?? ONGOING_PROJECTS[0];
const HOME_PROJECT_PREVIEW_PARAGRAPHS = [
  HOME_PROJECT_PREVIEW.lead,
  HOME_PROJECT_PREVIEW.body,
  'The sharp point is continuity: every document, release note, and dispatch decision has to protect the next movement before the border process is finished.',
];
const HOME_PROJECT_PREVIEW_META = HOME_PROJECT_PREVIEW.meta.slice(-2);
const HOME_PROJECT_PREVIEW_SERVICES = HOME_PROJECT_PREVIEW.services.slice(0, 2);
const SERVICE_CATALOG_IMAGE_WIDTHS = [640, 960, 1280];
const SERVICE_CATALOG_IMAGE_SIZES =
  '(min-width: 1081px) min(60rem, 68vw), (max-width: 640px) 92vw, 100vw';
const HOME_MOBILE_PROJECTS = [
  HOME_PROJECT_PREVIEW,
  ...ONGOING_PROJECTS.filter((project) => project.id !== HOME_PROJECT_PREVIEW.id),
].slice(0, 3);
const HOME_PROJECT_THUMBNAILS = ONGOING_PROJECTS.filter(
  (project) => project.id !== HOME_PROJECT_PREVIEW.id
).slice(0, 6);
const JOURNAL_PROJECT_TITLE = 'Projects planned around real handoffs.';
const JOURNAL_OOG_TITLE = 'Built for the Extra ordinary- OOG-Project Logistics.';
const JOURNAL_PROJECT_TITLE_LINES = ['Projects planned around', 'real handoffs.'];
const JOURNAL_OOG_TITLE_LINES = ['Built for the Extra ordinary-', 'OOG-Project Logistics.'];
const OOG_PROJECT_CAPABILITIES = [
  {
    index: '01',
    icon: 'survey',
    title: 'Engineering & Planning',
    text: 'Route surveys, load analysis, and lift planning tailored for complex and oversized cargo.',
    image: '/project-hero-1536.webp',
    video: '/oog-project-logistics-preview.mp4',
  },
  {
    index: '02',
    icon: 'vessel',
    title: 'Specialized Equipment',
    text: 'Access to specialized trailers, cranes, and lifting gear to handle all dimensions.',
    image: '/service-oog-project-3d-cutout-v2.webp',
  },
  {
    index: '03',
    icon: 'checklist',
    title: 'Multi-Modal Execution',
    text: 'Seamless coordination across sea, land, and air to support on-time, damage-free delivery.',
    image: '/felmex-overview-port-lift-1536.webp',
  },
  {
    index: '04',
    icon: 'operator',
    title: 'Permits & Compliance',
    text: 'End-to-end handling of permits, escorts, and regulatory requirements across all jurisdictions.',
    image: '/air-freight.webp',
  },
  {
    index: '05',
    icon: 'control',
    title: 'End-to-End Project Control',
    text: 'Dedicated project teams providing real-time updates, risk management, and complete visibility.',
    image: '/road-freight.webp',
  },
];
const HOME_SERVICE_FEATURES = [
  {
    number: '01',
    label: 'Multimodal Transport Solutions',
    icon: 'air',
    image: '/hero-air-panel.webp',
    imageWidth: 209,
    imageHeight: 871,
    imageWidths: [209],
    href: '/services',
    summary: 'Seamless integration of air, sea, road, and rail across one accountable operating plan.',
    mediaTone: 'air',
  },
  {
    number: '02',
    label: 'International Freight Forwarding',
    icon: 'sea',
    image: '/ship-service-catalog.webp',
    imageWidth: 1280,
    imageHeight: 853,
    href: '/services#svc-deep-dive-sea-freight',
    summary: 'End-to-end cargo movement across global trade routes, carrier options, and port handoffs.',
    mediaTone: 'ship',
  },
  {
    number: '03',
    label: 'Customs & Trade Facilitation',
    icon: 'customs',
    image: '/hero-road-panel.webp',
    imageWidth: 864,
    imageHeight: 1821,
    imageWidths: [864],
    href: '/services#svc-deep-dive-customs-clearance-brokerage',
    summary: 'Clearance expertise, document discipline, and compliance support before border friction builds.',
    mediaTone: 'road',
  },
  {
    number: '04',
    label: 'Supply Chain Management',
    icon: 'rail',
    image: '/hero-rail-panel.webp',
    imageWidth: 864,
    imageHeight: 1821,
    imageWidths: [864],
    href: '/services#svc-deep-dive-fmcg-inter-cross-border-distribution',
    summary: 'Optimized workflows for efficient replenishment, handoff control, and cost-aware movement.',
    mediaTone: 'rail',
  },
  {
    number: '05',
    label: 'Warehousing & Distribution',
    icon: 'warehouse',
    image: '/cold-general-warehousing.webp',
    imageWidth: 1536,
    imageHeight: 1024,
    imageWidths: [1536],
    href: '/services#svc-deep-dive-cold-general-warehousing',
    summary: 'Secure storage, stock visibility, staging, and timely delivery from one controlled flow.',
    mediaTone: 'warehouse',
  },
];

const HOME_CHOICE_FEATURES = [
  {
    number: '01',
    icon: 'globe',
    titleLines: ['Global reach', 'with local expertise'],
    text: 'We operate across major international markets while keeping a strong understanding of local needs.',
  },
  {
    number: '02',
    icon: 'shield',
    titleLines: ['Transparent and', 'reliable operations'],
    text: 'Our processes are built on clarity, accountability, and a commitment to getting it right, every time.',
  },
  {
    number: '03',
    icon: 'handshake',
    titleLines: ['Trusted partnerships', 'built on integrity'],
    text: 'We believe in long-term relationships founded on trust, respect, and delivering on our promises.',
  },
];

function getResponsiveImagePath(imagePath, width, sourceWidth = 1280) {
  if (width === sourceWidth) return imagePath;

  return imagePath.replace(/\.webp$/u, `-${width}.webp`);
}

function getServiceCatalogSrcSet(service) {
  const widths = service.imageWidths ?? SERVICE_CATALOG_IMAGE_WIDTHS;

  return widths.map(
    (width) => `${getResponsiveImagePath(service.image, width, service.imageWidth)} ${width}w`
  ).join(', ');
}

function ServiceCatalogIcon({ kind }) {
  const icons = {
    air: (
      <path
        d="M20.2 4.4 3.8 11.2a0.9 0.9 0 0 0 .05 1.68l5.85 1.78 1.78 5.85a0.9 0.9 0 0 0 1.68.05L20.2 4.4Zm-8.48 9.26L7.6 12.42l8.06-3.34-3.94 4.58Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    sea: (
      <>
        <path
          d="M4.1 14.1h15.8M6.2 12.2V8.1h11.6v4.1M9.4 8.1V5.7h5.2v2.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m4.8 16.2 1.8 1.6 1.8-1.6 1.8 1.6 1.8-1.6 1.8 1.6 1.8-1.6 1.8 1.6 1.8-1.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    rail: (
      <>
        <path
          d="M7.1 4.9h9.8a2 2 0 0 1 2 2v7.9a2 2 0 0 1-2 2H7.1a2 2 0 0 1-2-2V6.9a2 2 0 0 1 2-2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 8h8M8.3 12.2h.01M15.7 12.2h.01M8.4 19.1l2.2-2.3M15.6 19.1l-2.2-2.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    road: (
      <>
        <path
          d="M4.3 8h10.2v7.4H4.3V8Zm10.2 2.2h3.2l2 2.4v2.8h-5.2v-5.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.7 17.2a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9Zm9 0a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
        />
      </>
    ),
    warehouse: (
      <>
        <path
          d="M4.5 10.2 12 5.4l7.5 4.8v8.3h-15v-8.3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.4 18.5v-5.4h9.2v5.4M9.2 15.1h5.6M9.2 12.9h5.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    customs: (
      <>
        <path
          d="M12 4.1 5.2 6.8v5.5c0 3.7 2.7 6.6 6.8 7.6 4.1-1 6.8-3.9 6.8-7.6V6.8L12 4.1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.1 12.2h5.8M9.1 9.7h5.8M10.2 14.8h3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
        />
      </>
    ),
    project: (
      <>
        <path
          d="M7.2 18.3h9.6M8.2 18.3l2-8.2h3.6l2 8.2M9.4 12.7h5.2M12 4.6v5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 6.2 12 4.6l2.5 1.6M12 10.1l1.5 1.5-1.5 1.5-1.5-1.5L12 10.1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    distribution: (
      <>
        <path
          d="M4.4 6.1h5.4v5.4H4.4V6.1Zm9.8 0h5.4v4.2h-5.4V6.1ZM4.4 15h4.4v3.9H4.4V15Zm8.1-1.9h7.1v5.8h-7.1v-5.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.8 8.8h4.4M8.8 16.9h3.7M15.4 10.3v2.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  };

  return (
    <span className="landing-service-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {icons[kind] ?? icons.air}
      </svg>
    </span>
  );
}

function WhyChooseIcon({ kind }) {
  const icons = {
    globe: (
      <>
        <circle
          cx="12"
          cy="12"
          r="8.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
        />
        <path
          d="M3.6 9.1c2.8.4 4.7 1.5 5.8 3.3 1 1.7.8 3.6-.5 5.8m5.8-14.4c-.8 1.4-1 2.8-.5 4 .5 1.3 1.8 2.2 3.9 2.8M6.7 5.9c1.6.8 3.1 1.1 4.4.8 1.3-.2 2.5-1 3.6-2.2M20.7 11.6c-1.5-.4-2.8-.2-3.9.4-1.3.8-2.2 2.2-2.7 4.4-.2 1-.1 2 .2 3M10.2 20.6c.6-1.9.4-3.5-.6-4.7-.7-.9-1.8-1.4-3.3-1.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    shield: (
      <>
        <path
          d="M12 3.5 5.4 6.1v5.4c0 4.1 2.6 7.4 6.6 8.8 4-1.4 6.6-4.7 6.6-8.8V6.1L12 3.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m8.8 12.2 2.1 2.1 4.4-4.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    handshake: (
      <>
        <path
          d="m3.2 12.9 2.2-5.1 3.3 1.4-2.2 5.1-3.3-1.4Zm17.6 0-2.2-5.1-3.3 1.4 2.2 5.1 3.3-1.4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m7.1 13.4 2.1-2.1a2.15 2.15 0 0 1 3 0l.6.6 1.1-1.1a2.05 2.05 0 0 1 2.9 0l.5.5m-7.7 5.3.7.7a1.22 1.22 0 0 0 1.7-1.7l.6.6a1.22 1.22 0 0 0 1.7-1.7l.6.6a1.22 1.22 0 0 0 1.7-1.7l-4.1-4.1m-5.5 4.6 1.7 1.7m7.6-2.9-2.8-2.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  };

  return (
    <span className={`landing-why-card-icon landing-why-card-icon--${kind}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {icons[kind] ?? icons.globe}
      </svg>
    </span>
  );
}

function OogCapabilityIcon({ kind }) {
  const icons = {
    survey: (
      <>
        <path
          d="M8.2 4.7h7.6a1.4 1.4 0 0 1 1.4 1.4v12.8a1.4 1.4 0 0 1-1.4 1.4H8.2a1.4 1.4 0 0 1-1.4-1.4V6.1a1.4 1.4 0 0 1 1.4-1.4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.4 8.5h5.2M9.4 11.3h4.2M9.4 14.1h2.7M15.8 19.8l3.1 3.1M15 17.1a3.1 3.1 0 1 0 6.2 0 3.1 3.1 0 0 0-6.2 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    vessel: (
      <>
        <path
          d="M4.2 14h15.6M6.1 12V8.2h11.8V12M9.5 8.2V5.9h5v2.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m4.9 16.4 1.8 1.6 1.8-1.6 1.8 1.6 1.8-1.6 1.8 1.6 1.8-1.6 1.8 1.6 1.8-1.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    checklist: (
      <>
        <path
          d="M8.4 5.1h7.2a1.6 1.6 0 0 1 1.6 1.6v11.8a1.6 1.6 0 0 1-1.6 1.6H8.4a1.6 1.6 0 0 1-1.6-1.6V6.7a1.6 1.6 0 0 1 1.6-1.6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m9.3 9.5.9.9 1.7-1.9M13.7 9.6h2M9.3 13.1l.9.9 1.7-1.9M13.7 13.2h2M9.3 16.7l.9.9 1.7-1.9M13.7 16.8h2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    operator: (
      <>
        <path
          d="M8.7 10.1V8.7a3.3 3.3 0 0 1 6.6 0v1.4M7.7 10.1h8.6M9.2 12.2a3.1 3.1 0 0 0 5.6 0M6.2 20.1c.6-2.9 2.7-4.5 5.8-4.5s5.2 1.6 5.8 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    control: (
      <>
        <path
          d="m12 4.2 6.5 3.7v8.2L12 19.8l-6.5-3.7V7.9L12 4.2Zm0 0v7.5m6.5-3.8L12 11.7 5.5 7.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.9 14.2 12 16l3.1-1.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  };

  return (
    <span className="landing-oog-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {icons[kind] ?? icons.control}
      </svg>
    </span>
  );
}

function HomeOverviewIcon({ kind }) {
  const icons = {
    vision: (
      <>
        <path
          d="M2.7 12s3.45-5.1 9.3-5.1 9.3 5.1 9.3 5.1-3.45 5.1-9.3 5.1S2.7 12 2.7 12Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.35" fill="none" stroke="currentColor" strokeWidth="1.45" />
      </>
    ),
    mission: (
      <>
        <path
          d="M12 20.25a8.25 8.25 0 1 1 7.7-11.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16.3a4.3 4.3 0 1 1 3.9-6.1M12 12l5.4-5.4m.35 3.1-.35-3.1 3.1.35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.05" fill="currentColor" />
      </>
    ),
    about: (
      <>
        <path
          d="M5.2 10.4 12 6.1l6.8 4.3v9.2H5.2v-9.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.3 19.6v-6.1h7.4v6.1M10.3 15.35h1.1M12.7 15.35h1.1M10.3 17.4h1.1M12.7 17.4h1.1M5.2 10.4v9.2H2.95v-7.65l2.25-1.55Zm13.6 0 2.25 1.55v7.65H18.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" focusable="false">
      {icons[kind] ?? icons.vision}
    </svg>
  );
}

function bindWindowScroll(update) {
  let rafId = null;

  const runUpdate = () => {
    rafId = null;
    update();
  };

  const queueUpdate = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(runUpdate);
  };

  queueUpdate();
  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', queueUpdate);

  return () => {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
    }
    window.removeEventListener('scroll', queueUpdate);
    window.removeEventListener('resize', queueUpdate);
  };
}

let gsapLoadPromise = null;
let scrollTriggerLoadPromise = null;

function loadGsap() {
  if (!gsapLoadPromise) {
    gsapLoadPromise = import('gsap').then((module) => module.gsap);
  }

  return gsapLoadPromise;
}

function loadScrollTrigger() {
  if (!scrollTriggerLoadPromise) {
    scrollTriggerLoadPromise = Promise.all([loadGsap(), import('gsap/ScrollTrigger')]).then(
      ([gsap, scrollTriggerModule]) => {
        const { ScrollTrigger } = scrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);
        return { gsap, ScrollTrigger };
      }
    );
  }

  return scrollTriggerLoadPromise;
}

function clearInlineMotionStyles(elements, properties) {
  elements.forEach((element) => {
    properties.forEach((property) => element.style.removeProperty(property));
  });
}

export function HomePage() {
  const overviewRef = useRef(null);
  const testimonialsSectionRef = useRef(null);
  const journalSectionRef = useRef(null);
  const journalPinWrapperRef = useRef(null);
  const journalDesktopStageRef = useRef(null);
  const journalDesktopViewportRef = useRef(null);
  const journalDesktopTrackRef = useRef(null);
  const journalMobileTrackRef = useRef(null);
  const journalTitleRef = useRef(null);
  const journalTitleProjectRef = useRef(null);
  const journalTitleOogRef = useRef(null);
  const journalScrollTriggerRef = useRef(null);
  const journalCarouselDelayRef = useRef(null);
  const journalMobileScrollFrameRef = useRef(null);
  const closeSectionRef = useRef(null);
  const servicesListRef = useRef(null);
  const serviceImagePreloadersRef = useRef([]);
  const hasPreloadedServiceImagesRef = useRef(false);
  const testimonialsTitleDroppedRef = useRef(false);
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  const [isTestimonialsTitleDropped, setIsTestimonialsTitleDropped] = useState(false);
  const [isCloseVisible, setIsCloseVisible] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeMobileProjectIndex, setActiveMobileProjectIndex] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(MQ.mobile).matches
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia(MQ.mobile);
    const syncMobileViewport = () => setIsMobileViewport(mediaQuery.matches);
    syncMobileViewport();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncMobileViewport);
      return () => mediaQuery.removeEventListener('change', syncMobileViewport);
    }

    mediaQuery.addListener(syncMobileViewport);
    return () => mediaQuery.removeListener(syncMobileViewport);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotion = () => setPrefersReducedMotion(mediaQuery.matches);
    syncReducedMotion();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncReducedMotion);
      return () => mediaQuery.removeEventListener('change', syncReducedMotion);
    }

    mediaQuery.addListener(syncReducedMotion);
    return () => mediaQuery.removeListener(syncReducedMotion);
  }, []);

  useEffect(() => {
    const track = journalMobileTrackRef.current;
    if (!isMobileViewport || !track || typeof window === 'undefined') return undefined;

    const syncActiveMobileProject = () => {
      journalMobileScrollFrameRef.current = null;

      const firstCard = track.querySelector('.landing-journal-mobile-card');
      if (!firstCard) return;

      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
      const cardSpan = firstCard.getBoundingClientRect().width + gap;
      if (cardSpan <= 0) return;

      const nextIndex = Math.min(
        HOME_MOBILE_PROJECTS.length - 1,
        Math.max(0, Math.round(track.scrollLeft / cardSpan))
      );

      setActiveMobileProjectIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex
      );
    };

    const queueActiveMobileProjectSync = () => {
      if (journalMobileScrollFrameRef.current !== null) return;

      journalMobileScrollFrameRef.current = window.requestAnimationFrame(syncActiveMobileProject);
    };

    queueActiveMobileProjectSync();
    track.addEventListener('scroll', queueActiveMobileProjectSync, { passive: true });
    window.addEventListener('resize', queueActiveMobileProjectSync);

    return () => {
      if (journalMobileScrollFrameRef.current !== null) {
        window.cancelAnimationFrame(journalMobileScrollFrameRef.current);
        journalMobileScrollFrameRef.current = null;
      }

      track.removeEventListener('scroll', queueActiveMobileProjectSync);
      window.removeEventListener('resize', queueActiveMobileProjectSync);
    };
  }, [isMobileViewport]);

  useEffect(() => {
    const node = overviewRef.current;
    if (!node) return undefined;

    if (prefersReducedMotion) {
      setIsOverviewVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setIsOverviewVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.24,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [prefersReducedMotion, isMobileViewport]);

  useEffect(() => {
    const list = servicesListRef.current;
    if (!list || typeof window === 'undefined') return undefined;

    const preloadServiceImages = () => {
      if (hasPreloadedServiceImagesRef.current) return;

      hasPreloadedServiceImagesRef.current = true;
      serviceImagePreloadersRef.current = HOME_SERVICE_FEATURES.map((service, index) => {
        const image = new Image();
        image.decoding = 'async';
        image.sizes = SERVICE_CATALOG_IMAGE_SIZES;
        image.srcset = getServiceCatalogSrcSet(service);

        if ('fetchPriority' in image) {
          image.fetchPriority = index < 2 ? 'high' : 'auto';
        }

        image.src = service.image;
        return image;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        preloadServiceImages();
        observer.disconnect();
      },
      {
        threshold: 0,
        rootMargin: '900px 0px 900px 0px',
      }
    );

    observer.observe(list);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const list = servicesListRef.current;
    if (!list || typeof window === 'undefined') return undefined;

    const serviceEntries = Array.from(list.querySelectorAll('.landing-service-entry'));
    let frameId = null;

    const syncActiveService = () => {
      frameId = null;

      const targetY = window.innerHeight * 0.48;
      let nextIndex = 0;
      let shortestDistance = Number.POSITIVE_INFINITY;

      serviceEntries.forEach((entry, index) => {
        const rect = entry.getBoundingClientRect();
        const cardFocusY = rect.top + rect.height * 0.42;
        const distance = Math.abs(cardFocusY - targetY);

        if (distance < shortestDistance) {
          shortestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveServiceIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex
      );
    };

    const queueActiveServiceSync = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(syncActiveService);
    };

    queueActiveServiceSync();
    window.addEventListener('scroll', queueActiveServiceSync, { passive: true });
    window.addEventListener('resize', queueActiveServiceSync);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', queueActiveServiceSync);
      window.removeEventListener('resize', queueActiveServiceSync);
    };
  }, []);

  useEffect(() => {
    const list = servicesListRef.current;
    if (!list || isMobileViewport) return undefined;

    const serviceEntries = Array.from(list.querySelectorAll('.landing-service-entry'));
    const servicePieces = serviceEntries.flatMap((entry) =>
      Array.from(entry.querySelectorAll('.landing-service-figure, .landing-service-copy'))
    );
    const contexts = new Map();
    let isCancelled = false;
    let loadedGsap = null;

    if (prefersReducedMotion) {
      servicePieces.forEach((piece) => {
        piece.style.opacity = '1';
        piece.style.visibility = 'visible';
        piece.style.transform = 'none';
        piece.style.clipPath = 'inset(0% 0% 0% 0%)';
      });
      return () => {
        clearInlineMotionStyles(servicePieces, [
          'opacity',
          'visibility',
          'transform',
          'clip-path',
        ]);
      };
    }

    serviceEntries.forEach((entry) => {
      const pieces = entry.querySelectorAll('.landing-service-figure, .landing-service-copy');
      pieces.forEach((piece) => {
        piece.style.opacity = '0';
        piece.style.visibility = 'hidden';
        piece.style.transform = 'translate3d(26px, 0, 0)';
        piece.style.clipPath = 'inset(0% 0% 0% 100%)';
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const serviceEntry = entry.target;
          observer.unobserve(serviceEntry);

          loadGsap().then((gsap) => {
            if (isCancelled) return;
            loadedGsap = gsap;
            const animationContext = gsap.context(() => {
              const figure = serviceEntry.querySelector('.landing-service-figure');
              const copy = serviceEntry.querySelector('.landing-service-copy');
              const pieces = [figure, copy].filter(Boolean);

              gsap
                .timeline({
                  defaults: {
                    ease: 'power3.out',
                    overwrite: 'auto',
                  },
                })
                .to(figure, {
                  autoAlpha: 1,
                  x: 0,
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 0.32,
                })
                .to(
                  copy,
                  {
                    autoAlpha: 1,
                    x: 0,
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 0.3,
                  },
                  '>-0.14'
                );

              gsap.set(pieces, { clearProps: 'visibility' });
            }, serviceEntry);

            contexts.set(serviceEntry, animationContext);
          });
        });
      },
      {
        threshold: 0.22,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    serviceEntries.forEach((entry) => observer.observe(entry));

    return () => {
      isCancelled = true;
      observer.disconnect();
      contexts.forEach((context) => context.revert());
      if (loadedGsap) {
        loadedGsap.set(servicePieces, {
          clearProps: 'opacity,visibility,transform,clipPath',
        });
      } else {
        clearInlineMotionStyles(servicePieces, [
          'opacity',
          'visibility',
          'transform',
          'clip-path',
        ]);
      }
    };
  }, [isMobileViewport, prefersReducedMotion]);

  useEffect(() => {
    testimonialsTitleDroppedRef.current = isTestimonialsTitleDropped;
  }, [isTestimonialsTitleDropped]);

  useEffect(() => {
    const node = overviewRef.current;
    if (!node) return undefined;

    const applyOverviewMotion = (progress) => {
      const eased = 1 - Math.pow(1 - progress, 3);
      const imageY = (1 - eased) * 42;
      const imageScale = 0.94 + eased * 0.06;
      const imageOpacity = 0.58 + eased * 0.42;

      node.style.setProperty('--overview-image-y', `${imageY.toFixed(2)}px`);
      node.style.setProperty('--overview-image-scale', imageScale.toFixed(4));
      node.style.setProperty('--overview-image-opacity', imageOpacity.toFixed(4));
    };

    if (prefersReducedMotion) {
      applyOverviewMotion(1);
      return undefined;
    }

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const updateOverviewMotion = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const start = viewportHeight * 0.94;
      const end = viewportHeight * 0.18;
      const progress = clamp((start - rect.top) / Math.max(start - end, 1), 0, 1);
      applyOverviewMotion(progress);
    };

    return bindWindowScroll(updateOverviewMotion);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const node = testimonialsSectionRef.current;
    if (!node) return undefined;

    if (prefersReducedMotion) {
      testimonialsTitleDroppedRef.current = true;
      setIsTestimonialsTitleDropped(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        testimonialsTitleDroppedRef.current = true;
        setIsTestimonialsTitleDropped(true);
        observer.disconnect();
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -24% 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useLayoutEffect(() => {
    const pinWrapper = journalPinWrapperRef.current;
    const stage = journalDesktopStageRef.current;
    const viewport = journalDesktopViewportRef.current;
    const track = journalDesktopTrackRef.current;
    if (!pinWrapper || !stage || !viewport || !track || typeof window === 'undefined') return undefined;

    const journalTitle = journalTitleRef.current;
    const projectTitle = journalTitleProjectRef.current;
    const oogTitle = journalTitleOogRef.current;
    let isOogTitleActive = false;
    let titleTween = null;
    let gsapInstance = null;
    let scrollTriggerInstance = null;
    let isCancelled = false;
    let hasStartedSetup = false;
    let animationContext = null;
    let refreshFrameId = null;
    let resizeObserver = null;
    let setupObserver = null;
    let mediaElements = [];
    const layoutSettleFrameIds = [];

    const clearThumbnailCarouselDelay = () => {
      if (journalCarouselDelayRef.current === null) return;
      window.clearTimeout(journalCarouselDelayRef.current);
      journalCarouselDelayRef.current = null;
    };

    const stopThumbnailCarousel = () => {
      clearThumbnailCarouselDelay();
      journalSectionRef.current?.classList.remove('is-carousel-running');
    };

    const startThumbnailCarousel = () => {
      const node = journalSectionRef.current;
      if (!node || node.classList.contains('is-carousel-running')) return;
      clearThumbnailCarouselDelay();
      journalCarouselDelayRef.current = window.setTimeout(() => {
        node.classList.add('is-carousel-running');
        journalCarouselDelayRef.current = null;
      }, 420);
    };

    const setTitleLayerTransform = (node, yPercent) => {
      node.style.opacity = '1';
      node.style.visibility = 'visible';
      node.style.transform = `translate3d(0, ${yPercent}%, 0)`;
    };

    const setJournalTitle = (shouldUseOogTitle, immediate = false) => {
      if (!journalTitle || !projectTitle || !oogTitle) return;
      if (isOogTitleActive === shouldUseOogTitle && !immediate) return;

      isOogTitleActive = shouldUseOogTitle;
      journalTitle.setAttribute(
        'aria-label',
        shouldUseOogTitle ? JOURNAL_OOG_TITLE : JOURNAL_PROJECT_TITLE
      );

      titleTween?.kill();

      const enteringTitle = shouldUseOogTitle ? oogTitle : projectTitle;
      const leavingTitle = shouldUseOogTitle ? projectTitle : oogTitle;
      const enterYPercent = shouldUseOogTitle ? 100 : -100;
      const leaveYPercent = shouldUseOogTitle ? -100 : 100;

      if (immediate || !gsapInstance) {
        setTitleLayerTransform(enteringTitle, 0);
        setTitleLayerTransform(leavingTitle, leaveYPercent);
        return;
      }

      titleTween = gsapInstance
        .timeline({
          defaults: {
            duration: 0.58,
            ease: 'power3.inOut',
            overwrite: 'auto',
          },
        })
        .set(enteringTitle, { autoAlpha: 1, y: 0, yPercent: enterYPercent }, 0)
        .to(leavingTitle, { y: 0, yPercent: leaveYPercent }, 0)
        .to(enteringTitle, { y: 0, yPercent: 0 }, 0);
    };

    const syncJournalTitle = () => {
      const firstOogRail = track.querySelector('.landing-oog-card');
      if (!firstOogRail) {
        setJournalTitle(false);
        return;
      }

      const rootStyles = window.getComputedStyle(document.documentElement);
      const viewportRect = viewport.getBoundingClientRect();
      const railRect = firstOogRail.getBoundingClientRect();
      const rootFontSize = Number.parseFloat(rootStyles.fontSize) || 16;
      const contentMaxWidth =
        Number.parseFloat(rootStyles.getPropertyValue('--site-content-max-width')) ||
        Number.parseFloat(rootStyles.getPropertyValue('--max-width')) ||
        viewportRect.width;
      const contentLeftEdge =
        viewportRect.left + Math.max(rootFontSize, (viewportRect.width - contentMaxWidth) / 2);

      setJournalTitle(railRect.left <= contentLeftEdge);
    };

    const clearTrackTransform = () => {
      if (gsapInstance) {
        gsapInstance.set(track, { clearProps: 'transform' });
        return;
      }

      track.style.removeProperty('transform');
    };

    const clearHorizontalMotion = () => {
      journalScrollTriggerRef.current?.kill();
      journalScrollTriggerRef.current = null;
      stopThumbnailCarousel();
      setJournalTitle(false, true);
      pinWrapper.style.removeProperty('--landing-journal-pin-distance');
      clearTrackTransform();
    };

    if (isMobileViewport || prefersReducedMotion) {
      clearHorizontalMotion();
      return undefined;
    }

    const getHeaderClearance = () => {
      const rawValue = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--site-header-clearance');
      return Number.parseFloat(rawValue) || 0;
    };
    const getTravelDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    const getHandoffDistance = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      return Math.min(220, Math.max(120, viewportHeight * 0.16));
    };
    const getReleaseDistance = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      return Math.min(520, Math.max(280, viewportHeight * 0.36));
    };
    const getScrollDistance = () =>
      Math.max(getHandoffDistance() + getTravelDistance() + getReleaseDistance(), 1);
    const syncPinnedScrollDistance = () => {
      const stageHeight = Math.ceil(stage.getBoundingClientRect().height || stage.offsetHeight || 1);
      pinWrapper.style.setProperty(
        '--landing-journal-pin-distance',
        `${stageHeight + getScrollDistance()}px`
      );
    };

    const runScrollTriggerRefresh = () => {
      syncPinnedScrollDistance();
      const currentTrigger = journalScrollTriggerRef.current;
      if (!currentTrigger || !scrollTriggerInstance) return;

      scrollTriggerInstance.refresh();
    };

    const queueScrollTriggerRefresh = () => {
      if (refreshFrameId !== null) {
        window.cancelAnimationFrame(refreshFrameId);
      }

      refreshFrameId = window.requestAnimationFrame(() => {
        refreshFrameId = null;
        runScrollTriggerRefresh();
      });
    };

    const waitForAnimationFrame = () =>
      new Promise((resolve) => {
        const frameId = window.requestAnimationFrame(resolve);
        layoutSettleFrameIds.push(frameId);
      });

    const createHorizontalScrollTrigger = () => {
      if (isCancelled || !gsapInstance) return;

      animationContext = gsapInstance.context(() => {
        gsapInstance.set(track, { x: 0 });
        setJournalTitle(false, true);

        const timeline = gsapInstance.timeline({
          scrollTrigger: {
            trigger: pinWrapper,
            start: () => `top top+=${getHeaderClearance()}`,
            end: () => `+=${getScrollDistance()}`,
            scrub: 1.05,
            invalidateOnRefresh: true,
            onEnter: () => {
              startThumbnailCarousel();
              syncJournalTitle();
            },
            onEnterBack: () => {
              startThumbnailCarousel();
              syncJournalTitle();
            },
            onLeave: () => {
              stopThumbnailCarousel();
              syncJournalTitle();
            },
            onLeaveBack: () => {
              stopThumbnailCarousel();
              setJournalTitle(false);
            },
            onRefreshInit: () => {
              stopThumbnailCarousel();
              setJournalTitle(false, true);
            },
            onUpdate: syncJournalTitle,
            onRefresh: (self) => {
              if (self.isActive) startThumbnailCarousel();
              syncJournalTitle();
            },
          },
        });

        timeline
          .to(track, {
            x: 0,
            duration: () => getHandoffDistance(),
            ease: 'none',
          })
          .to(track, {
            x: () => -getTravelDistance(),
            duration: () => Math.max(getTravelDistance(), 1),
            ease: 'none',
          })
          .to(track, {
            x: () => -getTravelDistance(),
            duration: () => getReleaseDistance(),
            ease: 'none',
          });

        journalScrollTriggerRef.current = timeline.scrollTrigger;
      }, pinWrapper);

      runScrollTriggerRefresh();
    };

    const settleLayoutThenCreateTrigger = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready.catch(() => undefined);
      }

      if (isCancelled) return;
      await waitForAnimationFrame();
      if (isCancelled) return;
      await waitForAnimationFrame();
      createHorizontalScrollTrigger();
    };

    const refreshScrollTrigger = () => queueScrollTriggerRefresh();

    const setupPinnedJournal = async () => {
      if (hasStartedSetup) return;
      hasStartedSetup = true;

      const loadedModules = await loadScrollTrigger().catch(() => null);
      if (!loadedModules || isCancelled) return;

      gsapInstance = loadedModules.gsap;
      scrollTriggerInstance = loadedModules.ScrollTrigger;

      mediaElements = Array.from(stage.querySelectorAll('img'));
      mediaElements.forEach((mediaElement) => {
        if (mediaElement.complete) return;
        mediaElement.addEventListener('load', refreshScrollTrigger, { once: true });
        mediaElement.addEventListener('error', refreshScrollTrigger, { once: true });
      });

      resizeObserver =
        typeof ResizeObserver === 'function'
          ? new ResizeObserver(() => {
              queueScrollTriggerRefresh();
            })
          : null;

      resizeObserver?.observe(viewport);
      resizeObserver?.observe(track);
      resizeObserver?.observe(stage);
      window.addEventListener('load', refreshScrollTrigger, { once: true });
      settleLayoutThenCreateTrigger();
    };

    const beginSetup = () => {
      setupObserver?.disconnect();
      setupPinnedJournal();
    };

    if (typeof IntersectionObserver === 'function') {
      setupObserver = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          beginSetup();
        },
        {
          rootMargin: '1200px 0px',
          threshold: 0,
        }
      );
      setupObserver.observe(pinWrapper);
    } else {
      beginSetup();
    }

    return () => {
      isCancelled = true;
      setupObserver?.disconnect();
      if (refreshFrameId !== null) {
        window.cancelAnimationFrame(refreshFrameId);
      }
      layoutSettleFrameIds.forEach((frameId) => {
        window.cancelAnimationFrame(frameId);
      });
      window.removeEventListener('load', refreshScrollTrigger);
      mediaElements.forEach((mediaElement) => {
        mediaElement.removeEventListener('load', refreshScrollTrigger);
        mediaElement.removeEventListener('error', refreshScrollTrigger);
      });
      resizeObserver?.disconnect();
      journalScrollTriggerRef.current = null;
      titleTween?.kill();
      stopThumbnailCarousel();
      setJournalTitle(false, true);
      pinWrapper.style.removeProperty('--landing-journal-pin-distance');
      animationContext?.revert();
      clearTrackTransform();
    };
  }, [isMobileViewport, prefersReducedMotion]);

  useEffect(() => {
    const stage = journalDesktopStageRef.current;
    const viewport = journalDesktopViewportRef.current;
    if (!stage || !viewport || typeof window === 'undefined') return undefined;

    const videos = Array.from(stage.querySelectorAll('.landing-oog-card-video'));
    if (videos.length === 0) return undefined;

    const pauseVideo = (video) => {
      video.pause();
    };

    const playVideo = (video) => {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(() => undefined);
      }
    };

    videos.forEach(pauseVideo);

    if (isMobileViewport || prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return () => {
        videos.forEach(pauseVideo);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            playVideo(video);
            return;
          }

          pauseVideo(video);
        });
      },
      {
        root: viewport,
        threshold: [0, 0.45, 0.75],
      }
    );

    videos.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
      videos.forEach(pauseVideo);
    };
  }, [isMobileViewport, prefersReducedMotion]);

  useEffect(() => {
    const node = closeSectionRef.current;
    if (!node) return undefined;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setIsCloseVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setIsCloseVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -16% 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const node = closeSectionRef.current;
    if (!node) return undefined;

    const closeCards = Array.from(node.querySelectorAll('.landing-close-feature'));
    if (closeCards.length === 0) return undefined;
    let animationContext = null;
    let isCancelled = false;
    let loadedGsap = null;

    if (prefersReducedMotion) {
      closeCards.forEach((card) => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.transform = 'none';
        card.style.clipPath = 'inset(0% 0% 0% 0%)';
      });
      return () => {
        clearInlineMotionStyles(closeCards, [
          'opacity',
          'visibility',
          'transform',
          'clip-path',
        ]);
      };
    }

    closeCards.forEach((card) => {
      card.style.opacity = '0';
      card.style.visibility = 'hidden';
      card.style.transform = 'translate3d(-42px, 0, 0)';
      card.style.clipPath = 'inset(0% 100% 0% 0%)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        loadGsap().then((gsap) => {
          if (isCancelled) return;
          loadedGsap = gsap;
          animationContext = gsap.context(() => {
            const timeline = gsap.timeline({
              defaults: {
                ease: 'power3.out',
                overwrite: 'auto',
              },
            });

            closeCards.forEach((card, index) => {
              timeline.to(
                card,
                {
                  autoAlpha: 1,
                  x: 0,
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: index === 0 ? 0.38 : 0.42,
                },
                index === 0 ? 0 : '>-0.16'
              );
            });
          }, node);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    observer.observe(node);

    return () => {
      isCancelled = true;
      observer.disconnect();
      animationContext?.revert();
      if (loadedGsap) {
        loadedGsap.set(closeCards, {
          clearProps: 'opacity,visibility,transform,clipPath',
        });
      } else {
        clearInlineMotionStyles(closeCards, [
          'opacity',
          'visibility',
          'transform',
          'clip-path',
        ]);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <section className="hero" aria-label="Felmex hero">
        <div className="hero-layout">
          <div className="hero-media" aria-hidden="true">
            <video
              className="hero-video"
              src="/Final.mp4"
              poster="/hero-video-poster.webp"
              autoPlay
              muted
              playsInline
              preload="metadata"
            />
          </div>

          <div className="hero-content">
            <img
              className="hero-logo"
              src="/logo-transparent.png"
              width="487"
              height="170"
              alt="Felmex Global Logistics"
            />

            <div className="hero-copy">
              <span className="hero-rule" aria-hidden="true" />
              <h1 className="hero-title">
                <span>Delivering Tomorrow&rsquo;s</span>
                <span>
                  Trade <strong>Today.</strong>
                </span>
              </h1>
              <span className="hero-rule hero-rule--after" aria-hidden="true" />
              <p className="hero-lede">
                From East Africa to the world&mdash;Felmex Global Logistics delivers seamless
                multimodal freight, customs clearance, and trade solutions for fast-moving global
                supply chains.
              </p>
              <a className="hero-cta" href="/contact" aria-label="Contact Felmex Global Logistics">
                <span>Contact Us</span>
                <span className="hero-cta-arrow" aria-hidden="true">
                  -&gt;
                </span>
              </a>
            </div>
          </div>

          <div className="hero-staircase" aria-hidden="true">
            <figure className="hero-panel hero-panel--road">
              <img src="/hero-road-panel.webp" width="864" height="1821" alt="" />
            </figure>
            <figure className="hero-panel hero-panel--rail">
              <img src="/hero-rail-panel.webp" width="864" height="1821" alt="" />
            </figure>
            <figure className="hero-panel hero-panel--air">
              <img src="/hero-air-panel.webp" width="209" height="871" alt="" />
            </figure>
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={overviewRef}
        className={`landing-overview${isOverviewVisible ? ' is-visible' : ''}`}
        aria-label="Company overview"
      >
        <div className="container landing-overview-shell">
          <div className="landing-overview-intro landing-reveal-group">
            <span className="landing-overview-rule landing-reveal-item" aria-hidden="true" />
            <h2 className="landing-overview-title">
              <span className="landing-overview-title-line landing-reveal-line" style={{ '--reveal-delay': '0ms' }}>
                <span>Moving Your Business</span>
              </span>
              <span className="landing-overview-title-line landing-reveal-line" style={{ '--reveal-delay': '110ms' }}>
                <span>
                  Forward, <strong>Together.</strong>
                </span>
              </span>
            </h2>
            <p className="landing-overview-lede landing-reveal-item" style={{ '--reveal-delay': '260ms' }}>
              We combine global reach with local expertise to deliver logistics solutions that drive
              efficiency, reduce costs, and connect your business to new opportunities.
            </p>
            <div className="landing-overview-actions landing-reveal-item" style={{ '--reveal-delay': '360ms' }}>
              <a className="landing-overview-button landing-overview-button--primary" href="/contact">
                Contact Sales
              </a>
              <a className="landing-overview-button landing-overview-button--secondary" href="#services-catalog">
                <span>Get Started</span>
                <span className="landing-overview-button-arrow" aria-hidden="true">
                  -&gt;
                </span>
              </a>
            </div>
          </div>

          <div className="landing-overview-statement-grid" aria-label="Felmex mission, vision, and company overview">
            <article
              className="landing-overview-statement landing-overview-statement--about landing-reveal-item"
              style={{ '--reveal-delay': '0ms' }}
            >
              <div className="landing-overview-icon" aria-hidden="true">
                <HomeOverviewIcon kind="about" />
              </div>
              <h3>About Us</h3>
              <span className="landing-overview-card-rule" aria-hidden="true" />
              <p>
                FELMEX Global Logistics is an envisioned global multimodal service provider,
                delivering integrated solutions across air, sea, road, and rail. We simplify complex
                supply chains, connect businesses to international markets, and ensure efficiency,
                transparency, and reliability at every step.
              </p>
            </article>
            <article
              className="landing-overview-statement landing-overview-statement--mission landing-reveal-item"
              style={{ '--reveal-delay': '90ms' }}
            >
              <div className="landing-overview-icon" aria-hidden="true">
                <HomeOverviewIcon kind="mission" />
              </div>
              <h3>Mission</h3>
              <span className="landing-overview-card-rule" aria-hidden="true" />
              <p>
                FELMEX Global Logistics exists to simplify complexity in international trade. We
                integrate air, sea, road, and rail services into one cohesive network, ensuring
                reliable, transparent, and future-ready supply chain solutions for our partners
                worldwide.
              </p>
            </article>
            <article className="landing-overview-statement landing-overview-statement--vision landing-reveal-item">
              <div className="landing-overview-icon" aria-hidden="true">
                <HomeOverviewIcon kind="vision" />
              </div>
              <span className="landing-overview-card-rule" aria-hidden="true" />
              <h3>Vision</h3>
              <p>
                Redefine global logistics by delivering seamless, multimodal solutions that connect
                businesses, markets, and communities with efficiency &amp; integrity.
              </p>
            </article>
          </div>
        </div>

      </section>

      <section id="services" className="landing-services" aria-label="Services overview">
        <div className="container landing-services-shell" id="services-catalog">
          <aside className="landing-services-aside" aria-label="Services section introduction">
            <div className="landing-services-sticky">
              <p className="landing-section-label">Our services</p>
              <h2 className="landing-section-title landing-services-title">
                <span className="landing-title-line">
                  <span>Moving Cargo</span>
                </span>
                <span className="landing-title-line">
                  <span>Without</span>
                </span>
                <span className="landing-title-line landing-title-line--accent">
                  <span>Compromise.</span>
                </span>
              </h2>
              <span className="landing-services-rule" aria-hidden="true" />
              <p className="landing-section-text landing-services-intro">
                End-to-end logistics solutions powered by global reach, advanced technology, and a
                commitment to excellence.
              </p>
              <a className="landing-secondary-link landing-services-link" href="/services">
                <span className="landing-services-link-icon" aria-hidden="true">
                  -&gt;
                </span>
                <span>View all services</span>
              </a>
            </div>
          </aside>

          <div
            ref={servicesListRef}
            className="landing-services-list"
            aria-label="Core service lines"
          >
            {HOME_SERVICE_FEATURES.map((service, index) => (
              <article
                id={`home-service-${service.number}`}
                className={`landing-service-entry landing-service-entry--${service.mediaTone}${
                  activeServiceIndex === index ? ' is-active' : ''
                }`}
                key={service.label}
              >
                <figure className="landing-service-figure">
                  <img
                    className="landing-service-image"
                    src={service.image}
                    srcSet={getServiceCatalogSrcSet(service)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    fetchpriority={index < 2 ? 'auto' : 'low'}
                    sizes={SERVICE_CATALOG_IMAGE_SIZES}
                    width={service.imageWidth}
                    height={service.imageHeight}
                  />
                </figure>
                <div className="landing-service-copy">
                  <p className="landing-service-index">{service.number}</p>
                  <span className="landing-service-rule" aria-hidden="true" />
                  <ServiceCatalogIcon kind={service.icon} />
                  <div className="landing-service-body">
                    <h3 className="landing-service-name">{service.label}</h3>
                    <p className="landing-service-summary">{service.summary}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-choose-felmex" className="landing-why" aria-labelledby="why-choose-title">
        <div className="landing-why-shell">
          <div className="landing-why-staircase" role="list" aria-label="Reasons to choose Felmex">
            {HOME_CHOICE_FEATURES.map((feature) => (
              <article className="landing-why-card" key={feature.number} role="listitem">
                <span className="landing-why-card-number">{feature.number}</span>
                <div className="landing-why-card-content">
                  <WhyChooseIcon kind={feature.icon} />
                  <h3>
                    {feature.titleLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h3>
                  <span className="landing-why-card-rule" aria-hidden="true" />
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="landing-why-copy">
            <p className="landing-why-kicker">Why choose Felmex?</p>
            <span className="landing-why-copy-rule" aria-hidden="true" />
            <h2 id="why-choose-title" className="landing-why-title">
              <span>More than logistics.</span>
              <span>A partnership</span>
              <span>
                you can <strong>trust.</strong>
              </span>
            </h2>
            <p className="landing-why-text">
              We combine global reach with local expertise to deliver solutions that drive
              efficiency, reduce costs, and connect your business to new opportunities.
            </p>
          </div>
        </div>
      </section>

      <section
        id="clients"
        ref={testimonialsSectionRef}
        className={`landing-testimonials${isTestimonialsTitleDropped ? ' is-title-dropped' : ''}`}
        aria-label="Client testimonials"
      >
        <div className="container landing-testimonials-shell">
          <header className="landing-testimonials-header">
            <p className="landing-section-label">Client testimonials</p>
            <h2 className="landing-section-title landing-testimonials-title">
              <span className="landing-title-line landing-testimonials-title-line">
                <span>Driving Operations Across Africa</span>
              </span>
              <span className="landing-title-line landing-testimonials-title-line">
                <span>
                  and <span className="landing-testimonials-title-accent">International markets.</span>
                </span>
              </span>
            </h2>
            <p className="landing-section-text landing-testimonials-text">
              Teams rely on Felmex for calm communication, disciplined execution, and fast
              response when plans change.
            </p>
          </header>
        </div>

        <div className="landing-testimonials-bleed">
          <div className="landing-testimonials-content">
            <div
              className="landing-testimonials-accordion"
              role="list"
              aria-label="Client testimonials"
            >
              {CLIENT_QUOTES.map((quote, index) => (
                <article
                  key={quote.company}
                  className={`landing-testimonial-panel ${quote.tone}`}
                  role="listitem"
                >
                  <span className="landing-testimonial-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="landing-testimonial-detail">
                    <span className="landing-testimonial-mark" aria-hidden="true">
                      &ldquo;
                    </span>
                    <blockquote className="landing-testimonial-quote">
                      &ldquo;{quote.quote}&rdquo;
                    </blockquote>
                    <span className="landing-testimonial-rule" aria-hidden="true" />
                    <div className="landing-testimonial-meta">
                      <p className="landing-testimonial-source">{quote.role}</p>
                      <p className="landing-testimonial-company">{quote.company}</p>
                    </div>
                  </div>

                  <figure className="landing-testimonial-visual">
                    <img
                      className="landing-testimonial-photo"
                      src={quote.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="scroll-wrapper landing-final-curtain">
        <section
          id="blog"
          ref={journalSectionRef}
          className="feature-section landing-journal"
          aria-label="Project previews"
        >
          <div ref={journalPinWrapperRef} className="landing-journal-pin-wrap">
            <div ref={journalDesktopStageRef} className="landing-journal-shell">
              <div className="landing-project-preview-stage">
                <span
                  className="landing-project-preview-ornament landing-project-preview-ornament--left"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 348 160" focusable="false">
                    <path d="M0 1H169C174.5 1 179 5.5 179 11V52C179 57.5 183.5 62 189 62H262C267.5 62 272 66.5 272 72V113C272 118.5 276.5 123 282 123H338C343.5 123 347 127.5 347 133V160" />
                  </svg>
                </span>
                <span
                  className="landing-project-preview-ornament landing-project-preview-ornament--right"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 348 160" focusable="false">
                    <path d="M0 1H169C174.5 1 179 5.5 179 11V52C179 57.5 183.5 62 189 62H262C267.5 62 272 66.5 272 72V113C272 118.5 276.5 123 282 123H338C343.5 123 347 127.5 347 133V160" />
                  </svg>
                </span>
                <header className="landing-project-preview-intro">
                  <p className="landing-project-preview-label">Projects Preview</p>
                  <h2 className="landing-project-preview-title">
                    Ongoing logistics
                    <span>
                      in{' '}
                      <span className="landing-project-preview-title-accent">
                        motion<span className="landing-project-preview-dot">.</span>
                      </span>
                    </span>
                  </h2>
                  <span className="landing-project-preview-rule" aria-hidden="true" />
                  <p className="landing-project-preview-copy">
                    <span>A wider look at the cargo programs, customs handoffs,</span>
                    <span>and inland routes Felmex coordinates from port release</span>
                    <span>to final site delivery.</span>
                  </p>
                  <a className="landing-project-preview-link" href="/blog">
                    <span className="landing-project-preview-link-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path
                          d="M5 12h13M13 6.5 18.5 12 13 17.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>View all projects</span>
                  </a>
                </header>

                <div className="landing-project-preview-controlbar" aria-hidden="true">
                  <span className="landing-project-preview-nav landing-project-preview-nav--down">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path
                        d="M12 5v13m-5.5-5.5L12 18l5.5-5.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="landing-project-preview-scroll-text">Scroll to explore</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="final-conviction"
          ref={closeSectionRef}
          className={`rising-group landing-close${isCloseVisible ? ' is-visible' : ''}`}
          aria-label="Project handling"
        >
          <div className="final-section-canvas landing-close-canvas">
            <aside className="banner-card landing-project-preview-process landing-project-preview-process--handoff">
              <p>
                <span>At Felmex, every project is managed with a commitment to precision,</span>
                <span>transparency, and reliability. From initial planning to final delivery, our</span>
                <span>teams ensure every detail is coordinated across customs, carriers,</span>
                <span>and on-ground partners. With real-time visibility and proactive</span>
                <span>communication, we minimize risk, keep cargo moving,</span>
                <span>and deliver results our clients can depend on.</span>
              </p>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
