import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './HomePage.css';
import { CONTACT_CHANNELS } from '../data/contact';
import { MQ } from '../constants/breakpoints';
import { ONGOING_PROJECTS } from './projects/data';
import {
  CLIENT_QUOTES,
  FINAL_CTA_FEATURES,
  LANDING_STATS,
  TESTIMONIAL_STACK_MOBILE_QUERY,
} from './home/data';

const LANDING_METRIC_COPIES = 4;
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
const HERO_MEDIA_READY_TIMEOUT_MS = 1800;
const SERVICE_CATALOG_IMAGE_WIDTHS = [640, 960, 1280];
const SERVICE_CATALOG_IMAGE_SIZES =
  '(min-width: 1081px) min(36rem, 52vw), (max-width: 640px) 82vw, 100vw';
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
const TESTIMONIAL_PARTNERS = [
  { name: 'Maersk', logo: '/partners/maersk.svg' },
  { name: 'DHL', logo: '/partners/dhl.svg' },
  { name: 'Nestle' },
  { name: 'Olam' },
  { name: 'Dangote' },
];

const HOME_SERVICE_FEATURES = [
  {
    number: '01',
    label: 'Air Freight',
    icon: 'air',
    image: '/felmex-colors-air.webp',
    imageWidth: 1280,
    imageHeight: 853,
    href: '/services#svc-deep-dive-air-freight',
    summary:
      'Priority air movements for time-sensitive cargo, with routing, uplift coordination, and handoff visibility kept in one operating flow.',
    details: ['Urgent cargo planning', 'Airport handling coordination', 'Clear status updates'],
  },
  {
    number: '02',
    label: 'Sea Freight',
    icon: 'sea',
    image: '/ship-service-catalog.webp',
    imageWidth: 1280,
    imageHeight: 853,
    href: '/services#svc-deep-dive-sea-freight',
    summary:
      'Ocean freight support for planned volume, FCL/LCL moves, and port-side coordination from booking through release.',
    details: ['Carrier and sailing options', 'Port documentation support', 'Container movement control'],
  },
  {
    number: '03',
    label: 'Rail Freight',
    icon: 'rail',
    image: '/service-rail-3d-cutout-v2.webp',
    imageWidth: 1280,
    imageHeight: 853,
    href: '/services#svc-deep-dive-rail-freight',
    summary:
      'Rail-linked freight for stable corridors, heavy cargo, and inland connectivity where predictability matters more than improvisation.',
    details: ['Corridor planning', 'Containerized rail movement', 'Inland handoff coordination'],
  },
  {
    number: '04',
    label: 'Road Freight',
    icon: 'road',
    image: '/road-service-catalog.webp',
    imageWidth: 1280,
    imageHeight: 720,
    href: '/services#svc-deep-dive-road-freight',
    summary:
      'Dependable inland movement for domestic and cross-border cargo, with routing, dispatch, and delivery coordination handled end-to-end.',
    details: ['Cross-border dispatch', 'Domestic route planning', 'Delivery handoff control'],
  },
  {
    number: '05',
    label: 'Cold & General Warehousing',
    icon: 'warehouse',
    image: '/service-warehouse-3d-cutout-v2.webp',
    imageWidth: 1280,
    imageHeight: 853,
    href: '/services#svc-deep-dive-cold-general-warehousing',
    summary:
      'Controlled storage, handling, and dispatch readiness for cold-chain and general cargo that needs visibility before release.',
    details: ['Cold and ambient storage', 'Stock visibility controls', 'Pick-pack dispatch staging'],
  },
  {
    number: '06',
    label: 'OOG Project Logistics',
    icon: 'project',
    image: '/service-oog-project-3d-cutout-v2.webp',
    imageWidth: 1280,
    imageHeight: 853,
    href: '/services#svc-deep-dive-oog-project-logistics',
    summary:
      'Specialist planning for oversized and project cargo, from route checks and permits through lift coordination and final placement.',
    details: ['Route feasibility planning', 'Permit coordination', 'Specialist lift oversight'],
  },
  {
    number: '07',
    label: 'FMCG Inter-Cross Border Distribution',
    icon: 'distribution',
    image: '/felmex-overview-3d.webp',
    imageWidth: 1280,
    imageHeight: 860,
    href: '/services#svc-deep-dive-distribution',
    summary:
      'Fast-moving regional distribution for FMCG replenishment cycles, with routing, dispatch, and delivery checkpoints kept visible.',
    details: ['Replenishment lane planning', 'Multi-drop delivery coordination', 'Cycle performance visibility'],
  },
];

function getResponsiveImagePath(imagePath, width) {
  if (width === 1280) return imagePath;

  return imagePath.replace(/\.webp$/u, `-${width}.webp`);
}

function getServiceCatalogSrcSet(imagePath) {
  return SERVICE_CATALOG_IMAGE_WIDTHS.map(
    (width) => `${getResponsiveImagePath(imagePath, width)} ${width}w`
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

function FinalCtaIcon({ kind }) {
  const icons = {
    shield: (
      <>
        <path
          d="M12 3.6 6.4 5.8v4.6c0 3.6 2.2 6.8 5.6 8.2 3.4-1.4 5.6-4.6 5.6-8.2V5.8L12 3.6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m9.6 11.6 1.8 1.8 3.2-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    clock: (
      <>
        <path
          d="M12 5v2.1m0 9.8V19m7-7h-2.1M7.1 12H5m11.7 4.7-1.5-1.5M8.8 8.8 7.3 7.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle
          cx="12"
          cy="12"
          r="6.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeDasharray="1.8 2.6"
          strokeLinecap="round"
        />
        <path
          d="M12 9.1v3.2l2.4 1.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8.4" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M6.6 18.1c.7-2.6 2.9-4.1 5.4-4.1s4.7 1.5 5.4 4.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    plane: (
      <path
        d="M20.5 4.5 4.5 11l5.6 1.7 1.7 5.6 8.7-13.8Zm-9 7.2 5.2-2.2-2.6 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    truck: (
      <>
        <path
          d="M4.5 8h9v6.5h-9V8Zm9 2.2h3l2 2.1v2.2h-1.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="17.2" r="1.7" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16" cy="17.2" r="1.7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </>
    ),
  };

  return (
    <span className={`landing-close-feature-icon landing-close-feature-icon--${kind}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {icons[kind] ?? icons.user}
      </svg>
    </span>
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

function HeroTransportIcon({ kind }) {
  const icons = {
    air: (
      <path
        d="M12 3.7v16.6M4.4 13.7 12 9.6l7.6 4.1M7.3 19.2 12 16.5l4.7 2.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    sea: (
      <>
        <path
          d="M5.2 13.1h13.6l-1.8 4.2H7l-1.8-4.2ZM7.4 12.9V9.3h9.2v3.6M10 9.3V6.8h4v2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.3 19.5c.9.6 1.8.6 2.7 0s1.8-.6 2.7 0 1.8.6 2.7 0 1.8-.6 2.7 0 1.8.6 2.7 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    road: (
      <>
        <path
          d="M3.8 8.3h10.1v7H3.8v-7Zm10.1 2h3.4l2.9 2.8v2.2h-6.3v-5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7.1" cy="17.2" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="16.9" cy="17.2" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
      </>
    ),
    rail: (
      <>
        <path
          d="M8.1 4.6h7.8a2 2 0 0 1 2 2v8.7a2 2 0 0 1-2 2H8.1a2 2 0 0 1-2-2V6.6a2 2 0 0 1 2-2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 8.3h7M8.5 12.1h7M9.1 20l2-2.7m3.8 0 2 2.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    partner: (
      <>
        <path
          d="m8.5 11.4 2.5-2.5a2.2 2.2 0 0 1 3.1 0l1 1 1.4-1.4a2.1 2.1 0 0 1 3 0l1.5 1.5-4.2 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m3 10 1.5-1.5a2.1 2.1 0 0 1 3 0l4.6 4.6a1.5 1.5 0 0 1-2.1 2.1l-.4-.4a1.5 1.5 0 0 1-2.1 2.1l-.5-.5a1.5 1.5 0 0 1-2.1 2.1L3 16.6"
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
    <svg className={`hero-right-icon hero-right-icon--${kind}`} viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      {icons[kind] ?? icons.air}
    </svg>
  );
}

export function HomePage() {
  const overviewRef = useRef(null);
  const testimonialsSectionRef = useRef(null);
  const testimonialsPartnersRef = useRef(null);
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
  const heroVideoRef = useRef(null);
  const heroRightImageRef = useRef(null);
  const serviceImagePreloadersRef = useRef([]);
  const hasPreloadedServiceImagesRef = useRef(false);
  const testimonialsTitleDroppedRef = useRef(false);
  const [isHeroEntered, setIsHeroEntered] = useState(false);
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  const [isTestimonialsTitleDropped, setIsTestimonialsTitleDropped] = useState(false);
  const [isCloseVisible, setIsCloseVisible] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(1);
  const [activeMobileProjectIndex, setActiveMobileProjectIndex] = useState(0);
  const [testimonialSlideDirection, setTestimonialSlideDirection] = useState('next');
  const [isTestimonialStackMobile, setIsTestimonialStackMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(TESTIMONIAL_STACK_MOBILE_QUERY).matches
  );
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

  const showPreviousTestimonial = () => {
    setTestimonialSlideDirection('previous');
    setActiveTestimonialIndex((currentIndex) =>
      currentIndex === 0 ? CLIENT_QUOTES.length - 1 : currentIndex - 1
    );
  };

  const showNextTestimonial = () => {
    setTestimonialSlideDirection('next');
    setActiveTestimonialIndex((currentIndex) =>
      currentIndex === CLIENT_QUOTES.length - 1 ? 0 : currentIndex + 1
    );
  };

  const showTestimonial = (targetIndex) => {
    if (targetIndex === activeTestimonialIndex) return;

    const forwardDistance =
      (targetIndex - activeTestimonialIndex + CLIENT_QUOTES.length) % CLIENT_QUOTES.length;
    const backwardDistance =
      (activeTestimonialIndex - targetIndex + CLIENT_QUOTES.length) % CLIENT_QUOTES.length;

    setTestimonialSlideDirection(forwardDistance <= backwardDistance ? 'next' : 'previous');
    setActiveTestimonialIndex(targetIndex);
  };

  const visibleTestimonials = [-1, 0, 1].map((offset) => {
    const index = (activeTestimonialIndex + offset + CLIENT_QUOTES.length) % CLIENT_QUOTES.length;
    return {
      index,
      isActive: offset === 0,
      quote: CLIENT_QUOTES[index],
    };
  });
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

    const mediaQuery = window.matchMedia(TESTIMONIAL_STACK_MOBILE_QUERY);
    const syncTestimonialStackMode = () => setIsTestimonialStackMobile(mediaQuery.matches);
    syncTestimonialStackMode();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncTestimonialStackMode);
      return () => mediaQuery.removeEventListener('change', syncTestimonialStackMode);
    }

    mediaQuery.addListener(syncTestimonialStackMode);
    return () => mediaQuery.removeListener(syncTestimonialStackMode);
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
    const video = heroVideoRef.current;
    const rightImage = heroRightImageRef.current;
    let rafOne = null;
    let rafTwo = null;
    let timeoutId = null;
    let isCancelled = false;
    const cleanups = [];

    const queueHeroEntrance = () => {
      if (isCancelled) return;

      rafOne = window.requestAnimationFrame(() => {
        rafTwo = window.requestAnimationFrame(() => {
          if (!isCancelled) {
            setIsHeroEntered(true);
          }
        });
      });
    };

    const attemptPlay = () => {
      if (!video || !video.paused) return;

      video.play().catch(() => {});
    };

    const waitForVideoFrame = () =>
      new Promise((resolve) => {
        if (!video || video.readyState >= 2) {
          resolve();
          return;
        }

        let isSettled = false;
        const settle = () => {
          if (isSettled) return;
          isSettled = true;
          video.removeEventListener('loadeddata', settle);
          video.removeEventListener('canplay', settle);
          video.removeEventListener('error', settle);
          resolve();
        };

        video.addEventListener('loadeddata', settle, { once: true });
        video.addEventListener('canplay', settle, { once: true });
        video.addEventListener('error', settle, { once: true });
        cleanups.push(settle);
      });

    const waitForRightImage = () =>
      new Promise((resolve) => {
        if (!rightImage) {
          resolve();
          return;
        }

        const decodeImage = () => {
          if (typeof rightImage.decode !== 'function') {
            resolve();
            return;
          }

          rightImage.decode().catch(() => {}).then(resolve);
        };

        if (rightImage.complete && rightImage.naturalWidth > 0) {
          decodeImage();
          return;
        }

        let isSettled = false;
        const settle = () => {
          if (isSettled) return;
          isSettled = true;
          rightImage.removeEventListener('load', settle);
          rightImage.removeEventListener('error', settle);
          decodeImage();
        };

        rightImage.addEventListener('load', settle, { once: true });
        rightImage.addEventListener('error', settle, { once: true });
        cleanups.push(settle);
      });

    setIsHeroEntered(false);
    attemptPlay();

    const mediaReady = Promise.all([waitForVideoFrame(), waitForRightImage()]);
    const fallbackReady = new Promise((resolve) => {
      timeoutId = window.setTimeout(resolve, HERO_MEDIA_READY_TIMEOUT_MS);
    });

    Promise.race([mediaReady, fallbackReady]).then(() => {
      if (isCancelled) return;

      attemptPlay();
      queueHeroEntrance();
    });

    return () => {
      isCancelled = true;
      cleanups.forEach((cleanup) => cleanup());
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (rafOne !== null) window.cancelAnimationFrame(rafOne);
      if (rafTwo !== null) window.cancelAnimationFrame(rafTwo);
    };
  }, []);

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
        image.srcset = getServiceCatalogSrcSet(service.image);

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

  useEffect(() => {
    const node = testimonialsPartnersRef.current;
    if (!node) return undefined;

    const partnerLabel = node.querySelector('.landing-testimonial-partners-title');
    const partnerItems = Array.from(node.querySelectorAll('.landing-testimonial-partner'));
    const partnerPieces = [partnerLabel, ...partnerItems].filter(Boolean);
    let animationContext = null;
    let isCancelled = false;
    let loadedGsap = null;

    if (prefersReducedMotion) {
      partnerPieces.forEach((piece) => {
        piece.style.opacity = '1';
        piece.style.visibility = 'visible';
        piece.style.transform = 'none';
        piece.style.clipPath = 'inset(0% 0% 0% 0%)';
      });
      return () => {
        clearInlineMotionStyles(partnerPieces, [
          'opacity',
          'visibility',
          'transform',
          'clip-path',
        ]);
      };
    }

    partnerPieces.forEach((piece) => {
      piece.style.opacity = '0';
      piece.style.visibility = 'hidden';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        loadGsap().then((gsap) => {
          if (isCancelled) return;
          loadedGsap = gsap;
          animationContext = gsap.context(() => {
            gsap.set(partnerLabel, {
              autoAlpha: 0,
              x: -18,
              clipPath: 'inset(0% 100% 0% 0%)',
            });

            partnerItems.forEach((partner, index) => {
              const direction = ['bottom', 'top', 'left', 'right', 'bottom'][index % 5];
              const offset = 20;

              gsap.set(partner, {
                autoAlpha: 0,
                x: direction === 'left' ? -offset : direction === 'right' ? offset : 0,
                y: direction === 'top' ? -offset : direction === 'bottom' ? offset : 0,
                clipPath:
                  direction === 'left'
                    ? 'inset(0% 100% 0% 0%)'
                    : direction === 'right'
                      ? 'inset(0% 0% 0% 100%)'
                      : direction === 'top'
                        ? 'inset(100% 0% 0% 0%)'
                        : 'inset(0% 0% 100% 0%)',
              });
            });

            const timeline = gsap.timeline({
              defaults: {
                ease: 'power3.out',
                overwrite: 'auto',
              },
            });

            timeline.to(partnerLabel, {
              autoAlpha: 1,
              x: 0,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.28,
            });

            partnerItems.forEach((partner, index) => {
              timeline.to(
                partner,
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 0.32,
                },
                index === 0 ? '>-0.06' : '>-0.16'
              );
            });
          }, node);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(node);
    return () => {
      isCancelled = true;
      observer.disconnect();
      animationContext?.revert();
      if (loadedGsap) {
        loadedGsap.set(partnerPieces, {
          clearProps: 'opacity,visibility,transform,clipPath',
        });
      } else {
        clearInlineMotionStyles(partnerPieces, [
          'opacity',
          'visibility',
          'transform',
          'clip-path',
        ]);
      }
    };
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
      <section className={`hero${isHeroEntered ? ' is-hero-entered' : ''}`} aria-label="Felmex hero">
        <div className="hero-layout">
          <figure className="hero-visual hero-visual--left" aria-label="Felmex logistics in motion">
            <video
              ref={heroVideoRef}
              className="hero-video"
              width="540"
              height="960"
              autoPlay
              muted
              playsInline
              preload="auto"
              poster="/hero-video-poster.webp"
              aria-hidden="true"
            >
              <source src="/Final.mp4" type="video/mp4" />
            </video>
          </figure>

          <div className="hero-canvas" aria-label="Felmex brand promise">
            <span className="hero-cross hero-cross--top-left" aria-hidden="true" />
            <span className="hero-cross hero-cross--bottom-right" aria-hidden="true" />
            <span className="hero-diagonal hero-diagonal--left" aria-hidden="true" />
            <span className="hero-diagonal hero-diagonal--right" aria-hidden="true" />

            <div className="hero-overlay">
              <div className="hero-panel">
                <img
                  className="hero-logo"
                  src="/logo-transparent.png"
                  alt="Felmex Global Logistics"
                  width="487"
                  height="170"
                  fetchpriority="high"
                  loading="eager"
                  decoding="async"
                />
                <span className="hero-rule" aria-hidden="true" />
                <h1 className="hero-title">
                  <span className="hero-title-line">
                    <span>Delivering Tomorrow&rsquo;s</span>
                  </span>
                  <span className="hero-title-line">
                    <span>
                      Trade <span className="hero-title-accent">Today.</span>
                    </span>
                  </span>
                </h1>
                <span className="hero-rule hero-rule--small" aria-hidden="true" />
                <p className="hero-brief">
                  <span className="hero-brief-line">
                    <span>From East Africa to the world&mdash;Felmex Global Logistics</span>
                  </span>
                  <span className="hero-brief-line">
                    <span>delivers seamless multimodal freight, customs clearance,</span>
                  </span>
                  <span className="hero-brief-line">
                    <span>and trade solutions for fast-moving global supply chains.</span>
                  </span>
                </p>
                <a className="hero-cta" href="/contact">
                  <span>Contact us</span>
                  <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
                    <path
                      d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {!isMobileViewport ? (
            <figure className="hero-visual hero-visual--right" aria-label="Felmex global coverage highlights">
              <img
                ref={heroRightImageRef}
                className="hero-right-legacy-image"
                src="/final-right.webp"
                alt=""
                width="1024"
                height="1536"
                fetchpriority="high"
                loading="eager"
                decoding="sync"
              />
              <div className="hero-right-board" aria-hidden="true">
                <div className="hero-right-card hero-right-card--coverage">
                  <div className="hero-coverage-icons">
                    <HeroTransportIcon kind="air" />
                    <span className="hero-coverage-dot" />
                    <HeroTransportIcon kind="sea" />
                    <span className="hero-coverage-dot" />
                    <HeroTransportIcon kind="road" />
                    <span className="hero-coverage-dot" />
                    <HeroTransportIcon kind="rail" />
                  </div>
                  <p>Multimodal Coverage</p>
                </div>
                <div className="hero-right-card hero-right-card--countries">
                  <p className="hero-country-value">6+</p>
                  <p className="hero-country-label">Continents Served</p>
                  <p className="hero-trusted-note">Trusted by businesses across <strong>Africa, Europe, Asia, the Middle East, the Americas, and Oceania</strong>.</p>
                </div>
                <div className="hero-right-card hero-right-card--partner">
                  <HeroTransportIcon kind="partner" />
                  <p className="hero-partner-title">East Africa&rsquo;s Global Partner</p>
                  <p className="hero-partner-label">Trusted Supply Chain Solutions</p>
                </div>
              </div>
            </figure>
          ) : null}
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

        <div className="landing-metric-marquee">
          <div className="landing-metric-scroll-layer">
            <div
              className="landing-metric-track"
              aria-label="Key company metrics"
              style={{ '--landing-metric-copy-count': LANDING_METRIC_COPIES }}
            >
              {Array.from({ length: LANDING_METRIC_COPIES }).map((_, groupIndex) => (
                <div
                  key={`landing-metric-group-${groupIndex}`}
                  className="landing-metric-track-group"
                  role={groupIndex === 0 ? 'list' : 'presentation'}
                  aria-hidden={groupIndex === 0 ? undefined : 'true'}
                >
                  {LANDING_STATS.map((item) => (
                    <article
                      key={`${groupIndex}-${item.label}`}
                      className="landing-metric-card landing-metric-card--strip"
                      role={groupIndex === 0 ? 'listitem' : undefined}
                    >
                      <p className="landing-metric-value">{item.value}</p>
                      <h3 className="landing-metric-label">{item.label}</h3>
                      <p className="landing-metric-detail">{item.detail}</p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="landing-services" aria-label="Services overview">
        <div className="container landing-services-shell" id="services-catalog">
          <div
            ref={servicesListRef}
            className="landing-services-list"
            aria-label="Core service lines"
          >
            {HOME_SERVICE_FEATURES.map((service, index) => (
              <article className="landing-service-entry" key={service.label}>
                <div className="landing-service-copy">
                  <ServiceCatalogIcon kind={service.icon} />
                  <div className="landing-service-body">
                    <p className="landing-service-index">{service.number}</p>
                    <h3 className="landing-service-name">{service.label}</h3>
                    <p className="landing-service-summary">{service.summary}</p>
                    <ul className="landing-service-points" aria-label={`${service.label} support areas`}>
                      {service.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                    <a className="landing-service-learn-link" href={service.href}>
                      <span>Learn more</span>
                      <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
                        <path
                          d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <figure className="landing-service-figure">
                  <img
                    className="landing-service-image"
                    src={service.image}
                    srcSet={getServiceCatalogSrcSet(service.image)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    fetchpriority={index < 2 ? 'auto' : 'low'}
                    sizes={SERVICE_CATALOG_IMAGE_SIZES}
                    width={service.imageWidth}
                    height={service.imageHeight}
                  />
                </figure>
              </article>
            ))}
          </div>

          <div className="landing-services-mobile-action" aria-label="Services section action">
            <a className="landing-secondary-link landing-services-link" href="/services">
              <span>View all services</span>
              <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
                <path
                  d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <aside className="landing-services-aside" aria-label="Services section introduction">
            <div className="landing-services-sticky">
              <p className="landing-section-label">Core service lines</p>
              <h2 className="landing-section-title landing-services-title">
                <span className="landing-title-line">
                  <span>Services built around the way</span>
                </span>
                <span className="landing-title-line landing-title-line--accent">
                  <span>cargo actually moves.</span>
                </span>
              </h2>
              <p className="landing-section-text landing-services-intro">
                Start with the major lanes. Each service is planned around clear routing, practical
                handoffs, and updates your team can act on.
              </p>
              <a className="landing-secondary-link landing-services-link" href="/services">
                <span>View all services</span>
                <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
                  <path
                    d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </aside>
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
                <span>
                  Trusted by <span className="landing-testimonials-title-accent">operations teams</span>
                </span>
              </span>
              <span className="landing-title-line landing-testimonials-title-line">
                <span>
                  across <span className="landing-testimonials-title-accent">Africa</span> and{' '}
                  <span className="landing-testimonials-title-accent">global trade.</span>
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
              key={`${activeTestimonialIndex}-${testimonialSlideDirection}`}
              className={`landing-testimonials-accordion is-active-1 is-sliding-${testimonialSlideDirection}`}
              role="list"
              aria-label="Client testimonials"
            >
              {visibleTestimonials.map(({ quote, index, isActive: isActiveSlide }) => {
                const isActive = !isTestimonialStackMobile && isActiveSlide;
                const isExpanded = isTestimonialStackMobile || isActive;
                const detailId = `testimonial-detail-${index}`;

                return (
                  <article
                    key={quote.company}
                    className={`landing-testimonial-panel ${quote.tone}${isActive ? ' is-active' : ''}`}
                    role="listitem"
                  >
                    <button
                      type="button"
                      className="landing-testimonial-trigger"
                      onClick={
                        isTestimonialStackMobile ? undefined : () => showTestimonial(index)
                      }
                      aria-expanded={isExpanded}
                      aria-controls={detailId}
                    >
                      <div className="landing-testimonial-visual">
                        <img
                          className="landing-testimonial-photo"
                          src={quote.image}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="landing-testimonial-visual-copy">
                          <p className="landing-testimonial-card-name">{quote.companyShort}</p>
                          <p className="landing-testimonial-card-sector">{quote.sector}</p>
                        </div>
                      </div>

                      <div
                        id={detailId}
                        className="landing-testimonial-detail"
                        aria-hidden={false}
                      >
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
                    </button>
                  </article>
                );
              })}
            </div>
            <button
              type="button"
              className="landing-testimonial-nav landing-testimonial-nav--previous"
              onClick={showPreviousTestimonial}
              aria-label="Show previous testimonial"
            >
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path
                  d="M14.8 5.6 8.4 12l6.4 6.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="landing-testimonial-nav landing-testimonial-nav--next"
              onClick={showNextTestimonial}
              aria-label="Show next testimonial"
            >
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path
                  d="m9.2 5.6 6.4 6.4-6.4 6.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="landing-testimonial-dots" aria-label="Select testimonial">
              {CLIENT_QUOTES.map((quote, index) => (
                <button
                  key={quote.company}
                  type="button"
                  className={index === activeTestimonialIndex ? 'is-active' : undefined}
                  onClick={() => showTestimonial(index)}
                  aria-label={`Show testimonial from ${quote.company}`}
                  aria-current={index === activeTestimonialIndex ? 'true' : undefined}
                />
              ))}
            </div>
            <div
              ref={testimonialsPartnersRef}
              className="landing-testimonial-partners"
              aria-label="Trusted by leading companies"
            >
              <p className="landing-testimonial-partners-title">Trusted by leading companies</p>
              <div className="landing-testimonial-partner-row">
                {TESTIMONIAL_PARTNERS.map((partner, index) => (
                  <span
                    className={`landing-testimonial-partner landing-testimonial-partner--from-${
                      ['bottom', 'top', 'left', 'right', 'bottom'][index % 5]
                    }`}
                    key={partner.name}
                  >
                    {partner.logo ? (
                      <img src={partner.logo} alt={partner.name} loading="lazy" decoding="async" />
                    ) : (
                      <span>{partner.name}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="blog"
        ref={journalSectionRef}
        className="landing-journal"
        aria-label="Project previews"
      >
        <div ref={journalPinWrapperRef} className="landing-journal-pin-wrap">
          <div ref={journalDesktopStageRef} className="landing-journal-shell">
            <header className="landing-journal-expanse">
              <p className="landing-section-label">Projects preview</p>
              <h2
                ref={journalTitleRef}
                className="landing-section-title landing-journal-expanse-title landing-journal-title-stack"
                aria-label={JOURNAL_PROJECT_TITLE}
              >
                <span
                  ref={journalTitleProjectRef}
                  className="landing-journal-title-layer landing-journal-title-layer--project"
                  aria-hidden="true"
                >
                  {JOURNAL_PROJECT_TITLE_LINES.map((line, index) => (
                    <span className="landing-journal-title-segment" key={line}>
                      {index === JOURNAL_PROJECT_TITLE_LINES.length - 1 ? (
                        <span className="site-section-title-accent">{line}</span>
                      ) : (
                        line
                      )}
                    </span>
                  ))}
                </span>
                <span
                  ref={journalTitleOogRef}
                  className="landing-journal-title-layer landing-journal-title-layer--oog"
                  aria-hidden="true"
                >
                  {JOURNAL_OOG_TITLE_LINES.map((line, index) => (
                    <span className="landing-journal-title-segment" key={line}>
                      {index === JOURNAL_OOG_TITLE_LINES.length - 1 ? (
                        <span className="site-section-title-accent">{line}</span>
                      ) : (
                        line
                      )}
                    </span>
                  ))}
                </span>
              </h2>
              <p className="landing-section-text landing-journal-expanse-copy">
                A wider look at the cargo programs, customs handoffs, and inland routes Felmex
                coordinates from port release to final site delivery.
              </p>
            </header>

            <div className="landing-journal-split">
              {!isMobileViewport ? (
                <div
                  className="landing-journal-pane landing-journal-pane--desk landing-journal-horizontal-stage"
                >
                  <div
                    ref={journalDesktopViewportRef}
                    className="landing-journal-horizontal-viewport"
                    aria-label="Project preview and OOG capability panels"
                  >
                    <div ref={journalDesktopTrackRef} className="landing-journal-horizontal-track">
                      <section className="landing-journal-horizontal-panel landing-journal-horizontal-panel--preview">
                        <div className="landing-journal-editorial">
                          <article className="landing-journal-preview">
                            <div className="landing-journal-preview-shell">
                              <div className="landing-journal-preview-copy">
                                <div className="landing-journal-preview-meta">
                                  <p className="landing-journal-preview-label">{HOME_PROJECT_PREVIEW.eyebrow}</p>
                                  <p className="landing-journal-preview-kicker">Projects page preview</p>
                                </div>
                                <h3 className="landing-journal-preview-title">
                                  <span className="landing-journal-preview-title-stage">
                                    {HOME_PROJECT_PREVIEW.title}
                                  </span>
                                </h3>
                                <div className="landing-journal-preview-body">
                                  {HOME_PROJECT_PREVIEW_PARAGRAPHS.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                  ))}
                                </div>

                                <div className="landing-journal-preview-meta-grid" role="list" aria-label="Project details">
                                  {HOME_PROJECT_PREVIEW_META.map((item) => (
                                    <div
                                      key={item.label}
                                      className="landing-journal-preview-meta-item"
                                      role="listitem"
                                    >
                                      <span>{item.label}</span>
                                      <span>{item.value}</span>
                                    </div>
                                  ))}
                                </div>

                                <div className="landing-journal-preview-services" role="list" aria-label="Services involved">
                                  {HOME_PROJECT_PREVIEW_SERVICES.map((service) => (
                                    <span key={service} className="landing-journal-preview-service" role="listitem">
                                      {service}
                                    </span>
                                  ))}
                                </div>

                                <div className="landing-journal-preview-actions">
                                  <a className="landing-journal-preview-cta landing-journal-preview-cta--ghost" href="/blog">
                                    Explore projects
                                  </a>
                                </div>
                              </div>

                              <div className="landing-journal-preview-visual" aria-hidden="true">
                                <figure className="landing-journal-preview-figure">
                                  <img
                                    src={HOME_PROJECT_PREVIEW.image}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    width="1600"
                                    height="1067"
                                  />
                                </figure>
                                <div className="landing-journal-preview-visual-caption">
                                  <span>{HOME_PROJECT_PREVIEW.index}</span>
                                  <p>{HOME_PROJECT_PREVIEW.subtitle}</p>
                                </div>
                              </div>
                            </div>
                          </article>

                          <aside className="landing-journal-thumbnails" aria-label="More project previews">
                            <header className="landing-journal-thumbnails-head">
                              <p>More projects</p>
                              <a href="/blog">View all</a>
                            </header>
                            <div className="landing-journal-thumbnail-viewport">
                              <div
                                className="landing-journal-thumbnail-list"
                                aria-label="More project previews"
                                style={{ '--landing-project-thumbnail-copy-count': HOME_PROJECT_THUMBNAIL_COPIES }}
                              >
                                {Array.from({ length: HOME_PROJECT_THUMBNAIL_COPIES }).map((_, groupIndex) => (
                                  <div
                                    key={`landing-project-thumbnail-group-${groupIndex}`}
                                    className="landing-journal-thumbnail-group"
                                    role={groupIndex === 0 ? 'list' : 'presentation'}
                                    aria-hidden={groupIndex === 0 ? undefined : 'true'}
                                  >
                                    {HOME_PROJECT_THUMBNAILS.map((project) => (
                                      <a
                                        key={`${groupIndex}-${project.id}`}
                                        className="landing-journal-thumbnail"
                                        href="/blog"
                                        role={groupIndex === 0 ? 'listitem' : undefined}
                                        tabIndex={groupIndex === 0 ? undefined : -1}
                                      >
                                        <figure className="landing-journal-thumbnail-figure">
                                          <img
                                            src={project.image}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                            width="720"
                                            height="520"
                                          />
                                        </figure>
                                        <div className="landing-journal-thumbnail-copy">
                                          <span>{project.index}</span>
                                          <h3>{project.title}</h3>
                                          <p className="landing-journal-thumbnail-summary">{project.lead}</p>
                                          <p className="landing-journal-thumbnail-meta">{project.readTime}</p>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </aside>
                        </div>
                      </section>

                      {OOG_PROJECT_CAPABILITIES.map((capability) => (
                        <article
                          className="landing-journal-horizontal-panel landing-oog-card"
                          key={capability.title}
                          role="listitem"
                        >
                          <figure className="landing-oog-card-media">
                            {capability.video ? (
                              <video
                                className="landing-oog-card-video"
                                aria-hidden="true"
                                muted
                                loop
                                playsInline
                                preload="none"
                                poster={capability.image}
                                width="960"
                                height="640"
                              >
                                <source src={capability.video} type="video/mp4" />
                              </video>
                            ) : (
                              <img
                                src={capability.image}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                width="960"
                                height="640"
                              />
                            )}
                            <OogCapabilityIcon kind={capability.icon} />
                            <span className="landing-oog-play" aria-hidden="true">
                              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                                <path d="M9 7.4v9.2L16.4 12 9 7.4Z" fill="currentColor" />
                              </svg>
                            </span>
                          </figure>
                          <div className="landing-oog-card-body">
                            <p className="landing-oog-card-index">{capability.index}</p>
                            <h3>{capability.title}</h3>
                            <p>{capability.text}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <section className="landing-journal-mobile-showcase" aria-label="Featured projects">
                <header className="landing-journal-mobile-showcase-head">
                  <p>Featured projects</p>
                  <span>
                    Swipe to explore
                    <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
                      <path
                        d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </header>

                <div
                  ref={journalMobileTrackRef}
                  className="landing-journal-mobile-track"
                  role="list"
                  aria-label="Featured project cards"
                >
                  {HOME_MOBILE_PROJECTS.map((project) => (
                    <article className="landing-journal-mobile-card" key={project.id} role="listitem">
                      <figure className="landing-journal-mobile-card-media">
                        <img
                          src={project.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width="720"
                          height="520"
                        />
                      </figure>
                      <div className="landing-journal-mobile-card-body">
                        <p className="landing-journal-mobile-card-index">{project.index}</p>
                        <p className="landing-journal-mobile-card-meta">
                          <span>{project.eyebrow}</span>
                          <span>{project.readTime}</span>
                        </p>
                        <h3>{project.title}</h3>
                        <p>{project.lead}</p>
                        <a href="/blog">
                          Explore project
                          <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
                            <path
                              d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="landing-journal-mobile-dots" aria-hidden="true">
                  {HOME_MOBILE_PROJECTS.map((project, index) => (
                    <span
                      key={`${project.id}-dot`}
                      className={index === activeMobileProjectIndex ? 'is-active' : undefined}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section
        id="final-conviction"
        ref={closeSectionRef}
        className={`landing-close${isCloseVisible ? ' is-visible' : ''}`}
        aria-label="Final call to action"
      >
        <div className="container landing-close-shell">
          <div className="landing-close-card-grid" role="list" aria-label="Why teams choose Felmex">
            {FINAL_CTA_FEATURES.map((feature) => (
              <article
                key={feature.number}
                className="landing-close-feature"
                role="listitem"
              >
                <div className="landing-close-feature-media">
                  <img
                    className="landing-close-feature-image"
                    src={feature.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="1400"
                  />
                </div>
                <div className="landing-close-feature-body">
                  <span className="landing-close-feature-badge" aria-hidden="true">
                    <FinalCtaIcon kind={feature.icon} />
                  </span>
                  <p className="landing-close-feature-index">{feature.number}</p>
                  <span className="landing-close-feature-rule" aria-hidden="true" />
                  <h3 className="landing-close-feature-title">{feature.title}</h3>
                  <p className="landing-close-feature-text">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="landing-close-pane landing-close-pane--pitch">
            <p className="landing-section-label landing-close-label">More than logistics</p>
            <h2 className="landing-close-title">
              <span className="landing-close-title-line">
                <span>Logistics that moves your</span>
              </span>
              <span className="landing-close-title-line landing-title-line--accent">
                <span>business forward.</span>
              </span>
            </h2>
            <p className="landing-close-text">
              Reliable. Responsive. Results-driven. We simplify cross-border logistics so you can
              focus on what matters most: growing your business.
            </p>
            <div className="landing-close-actions">
              <a className="landing-close-solution-link" href="/contact">
                Get a solution
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="landing-close-contact-note">
              <a href={CONTACT_CHANNELS.phoneHref}>{CONTACT_CHANNELS.phoneDisplay}</a>
              <span aria-hidden="true">/</span>
              <a href={CONTACT_CHANNELS.emailHref}>{CONTACT_CHANNELS.emailDisplay}</a>
            </p>
          </div>

          <div className="landing-close-mobile-outro">
            <a className="landing-close-solution-link" href="/contact">
              Get a solution
              <span aria-hidden="true">→</span>
            </a>
            <p className="landing-close-contact-note">
              <a href={CONTACT_CHANNELS.phoneHref}>{CONTACT_CHANNELS.phoneDisplay}</a>
              <span aria-hidden="true">/</span>
              <a href={CONTACT_CHANNELS.emailHref}>{CONTACT_CHANNELS.emailDisplay}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
