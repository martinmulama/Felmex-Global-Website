import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HomePage.css';
import { WhyChooseFelmex } from '../components/why-choose/WhyChooseFelmex';
import { HomePreloader } from '../components/preloader/HomePreloader';
import { ScrollSectionTitle } from '../components/scroll-reveal/ScrollSectionTitle';
import { ONGOING_PROJECTS } from './projects/data';
import { CLIENT_QUOTES } from './home/data';

const HOME_MOBILE_PROJECT_TELEPROMPTER_CYCLE_REPETITIONS = 3;

const HOME_DESKTOP_PROJECT_PREVIEW =
  ONGOING_PROJECTS.find((project) => project.id === 'cold-chain-release') ?? ONGOING_PROJECTS[0];
const HOME_DESKTOP_PROJECT_CLIENTS = ['Quantum sea', 'Air Uk'];
const HOME_MOBILE_PROJECT_CLIENTS = ['Quantum sea', 'Air Uk'];
const HOME_DESKTOP_PROJECT_PREVIEW_PARAGRAPHS = [
  HOME_DESKTOP_PROJECT_PREVIEW.lead,
  ...(HOME_DESKTOP_PROJECT_PREVIEW.bodyParagraphs ?? [HOME_DESKTOP_PROJECT_PREVIEW.body]),
].filter(Boolean);
const SERVICE_CATALOG_IMAGE_WIDTHS = [640, 960, 1280];
const SERVICE_CATALOG_IMAGE_SIZES =
  '(min-width: 1081px) min(60rem, 68vw), (max-width: 640px) 92vw, 100vw';
const TABLET_HOME_QUERY = '(max-width: 1024px)';
const PROJECT_PREVIEW_TITLE_PHRASES = ['Current Work', 'Track Record', 'Future Plans'];
const HOME_MOBILE_PROJECTS = [
  {
    projectId: 'port-to-plant',
    title: 'Port-to-Plant Heavy Lift',
    meta: 'Mombasa, Kenya',
    brief: 'Oversized cargo routing stays controlled from berth release to inland installation.',
  },
  {
    projectId: 'cold-chain-release',
    title: 'Cold Chain Dispatch',
    meta: 'Mombasa, Kenya',
    brief: 'Sensitive inventory staging stays aligned with timed delivery releases.',
  },
  {
    projectId: 'border-continuity',
    title: 'Border Release Continuity',
    meta: 'East Africa',
    brief: 'Customs and inland handoffs are managed as one continuous flow.',
  },
  {
    projectId: 'airbridge-spares',
    title: 'Airbridge Spares Response',
    meta: 'East Africa',
    brief: 'Urgent engineering spares are routed through site-critical delivery windows.',
  },
  {
    projectId: 'rail-linked-program',
    title: 'Rail-Linked Repositioning',
    meta: 'East Africa',
    brief: 'Rail and road handoffs stay aligned across long-haul inland moves.',
  },
].map((caseStudy, index) => {
  const project = ONGOING_PROJECTS.find((item) => item.id === caseStudy.projectId);

  return {
    ...caseStudy,
    index: String(index + 1).padStart(2, '0'),
    image: project?.image ?? '/sea-freight.webp',
    imageAlt: project?.imageAlt ?? `${caseStudy.title} logistics project`,
    paragraphs: [
      project?.lead,
      ...(project?.bodyParagraphs ?? [project?.body]),
    ].filter(Boolean),
    publishedOn:
      project?.meta?.find((item) => item.label.toLowerCase() === 'published')?.value ??
      project?.publishedOn ??
      'Ongoing',
    clients: HOME_MOBILE_PROJECT_CLIENTS,
  };
});
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
    mobileIcons: ['train', 'truck'],
    mobileOrder: 5,
  },
  {
    number: '02',
    label: 'International Freight Forwarding',
    icon: 'sea',
    image: '/ship-service-catalog.webp',
    imageWidth: 1280,
    imageHeight: 853,
    imageWidths: [1280],
    href: '/services#svc-deep-dive-sea-freight',
    summary: 'End-to-end cargo movement across global trade routes, carrier options, and port handoffs.',
    mediaTone: 'ship',
    mobileIcons: ['air', 'sea'],
    mobileOrder: 1,
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
    mobileIcons: ['officer', 'clipboardCheck'],
    mobileOrder: 2,
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
    mobileIcons: ['network', 'grid'],
    mobileOrder: 3,
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
    mobileIcons: ['warehouse', 'box'],
    mobileOrder: 4,
  },
  {
    number: '06',
    label: 'Parcel & Courier',
    icon: 'parcel',
    image: '/parcel-courier-service-catalog.webp',
    imageWidth: 1536,
    imageHeight: 1024,
    imageWidths: [1536],
    href: '/services',
    summary:
      'Dependable local and international movement for documents, parcels, e-commerce, medical, and commercial cargo.',
    mediaTone: 'parcel',
    mobileIcons: ['box', 'pin'],
    mobileOrder: 6,
  },
];

const FINAL_OPERATION_STEPS = [
  {
    key: 'source',
    label: 'Source',
    text: 'Eliminate procurement bottlenecks with our direct vendor-integration network. We manage high-volume material acquisition efficiently to protect your margins from day one.',
    highlightWords: ['procurement', 'vendor-integration', 'acquisition', 'margins'],
  },
  {
    key: 'store',
    label: 'Store',
    text: 'Cut your warehousing overhead in half. We house your assets in secure, strategically located fulfillment hubs designed for rapid enterprise-level inventory rotation.',
    highlightWords: ['warehousing', 'secure', 'fulfillment hubs', 'inventory rotation'],
  },
  {
    key: 'process',
    label: 'Process',
    text: 'Zero errors, maximum speed. Our automated order-mapping technology instantly picks, packs, and labels your shipments the moment a customer clicks buy.',
    highlightWords: ['Zero errors', 'maximum speed', 'order-mapping', 'picks, packs, and labels'],
  },
  {
    key: 'ship',
    label: 'Ship',
    text: 'Bypass delays with the fastest transit times on the market. We leverage deep carrier discounts and smart route-optimization to deliver your goods at lightning speed for the lowest cost.',
    highlightWords: ['delays', 'fastest transit times', 'carrier discounts', 'lowest cost'],
  },
  {
    key: 'scale',
    label: 'Scale',
    text: 'Turn logistical efficiency into explosive business growth. Our frictionless, end-to-end infrastructure expands effortlessly alongside your rising volume, allowing you to dominate new markets without limits.',
    highlightWords: ['efficiency', 'growth', 'end-to-end infrastructure', 'new markets'],
  },
];

const OVERVIEW_MOBILE_STATEMENTS = [
  {
    key: 'about',
    label: 'About Us',
    navLabel: 'About',
    icon: 'about',
    panelTone: 'about',
    titleLines: ['About', 'Us.'],
    paragraphs: [
      'FELMEX Global Logistics is an envisioned global multimodal service provider, delivering integrated solutions across air, sea, road, and rail.',
      'We simplify complex supply chains, connect businesses to international markets, and keep efficiency, transparency, and reliability visible at every step.',
    ],
  },
  {
    key: 'mission',
    label: 'Mission Statement',
    navLabel: 'Mission',
    icon: 'mission',
    panelTone: 'mission',
    titleLines: ['Mission', 'Statement.'],
    paragraphs: [
      'Our mission is to simplify complexity in international trade by integrating air, sea, road, and rail into one reliable, transparent, future-ready network.',
    ],
  },
  {
    key: 'vision',
    label: 'Vision',
    navLabel: 'Vision',
    icon: 'vision',
    panelTone: 'vision',
    titleLines: ['Vision.'],
    paragraphs: [
      'Our vision is to redefine global logistics through seamless multimodal solutions that connect businesses, markets, and communities with efficiency and integrity.',
    ],
  },
  {
    key: 'idd',
    label: 'Identity Statement (IDD)',
    navLabel: 'IDD',
    icon: 'idd',
    panelTone: 'idd',
    titleLines: ['Identity Statement', '(IDD).'],
    paragraphs: [
      'Integrity Due Diligence keeps every partner, supplier, and agent aligned to clear ethical, compliance, and operating standards.',
      'That discipline gives client cargo the confidence of moving through a responsible logistics network from planning through final handoff.',
    ],
  },
];

const FINAL_INDUSTRIES = [
  'FMCG & Retail',
  'E-Commerce',
  'Cold Chain',
  'Manufacturing',
  'Healthcare',
  'Automotive',
  'Energy & Projects',
  'Construction',
  'Agriculture',
  'Technology',
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

const SERVICE_CATALOG_SOLID_ICONS = {
  air: (
    <path d="M20.6 4.55c0.5 0.5 0.34 1.36-0.34 1.88l-4.96 3.84 3.9 4.78-1.9 1.48-5.28-3.42-3.66 2.84-0.18 3.08-1.72 1.34-1.34-4.16-4.14-1.36 1.72-1.34 3.08-0.16 3.66-2.84-2.28-5.88 1.9-1.48 4.02 4.48 4.96-3.84c0.66-0.52 1.58-0.54 2.08-0.04Z" />
  ),
  sea: (
    <>
      <path d="M6.45 10.72h11.1l2.18 3.36-2.14 3.98H6.41l-2.14-3.98 2.18-3.36ZM8.3 7.05h7.4v3.1H8.3v-3.1ZM10.55 4.9h2.9v2.15h-2.9V4.9Z" />
      <path d="M3.9 19.05c0.78 0.52 1.45 0.78 2.05 0.78 0.64 0 1.22-0.24 1.78-0.72a0.86 0.86 0 0 1 1.14 0c0.58 0.48 1.16 0.72 1.8 0.72s1.22-0.24 1.78-0.72a0.86 0.86 0 0 1 1.14 0c0.58 0.48 1.16 0.72 1.8 0.72 0.62 0 1.28-0.26 2.04-0.78 0.58-0.4 1.36 0.02 1.36 0.72 0 0.28-0.14 0.54-0.38 0.7-0.96 0.66-1.96 1-3.02 1-0.88 0-1.68-0.22-2.36-0.68-0.68 0.46-1.46 0.68-2.36 0.68s-1.68-0.22-2.36-0.68c-0.68 0.46-1.46 0.68-2.36 0.68-1.06 0-2.08-0.34-3.04-1a0.84 0.84 0 0 1-0.36-0.7c0-0.7 0.78-1.12 1.36-0.72Z" />
    </>
  ),
  train: (
    <>
      <path d="M7.2 3.65h9.6c1.54 0 2.8 1.26 2.8 2.8v7.95c0 1.28-0.86 2.36-2.04 2.7l2.16 3.08h-2.3l-0.9-1.3H7.48l-0.9 1.3h-2.3l2.16-3.08a2.8 2.8 0 0 1-2.04-2.7V6.45c0-1.54 1.26-2.8 2.8-2.8Z" />
      <path d="M7.45 7.05h9.1v4.1h-9.1v-4.1ZM8.48 14.08a1.12 1.12 0 1 0 2.24 0 1.12 1.12 0 0 0-2.24 0Zm4.8 0a1.12 1.12 0 1 0 2.24 0 1.12 1.12 0 0 0-2.24 0Z" fill="#ffffff" />
    </>
  ),
  rail: (
    <>
      <path d="M7.2 3.65h9.6c1.54 0 2.8 1.26 2.8 2.8v7.95c0 1.28-0.86 2.36-2.04 2.7l2.16 3.08h-2.3l-0.9-1.3H7.48l-0.9 1.3h-2.3l2.16-3.08a2.8 2.8 0 0 1-2.04-2.7V6.45c0-1.54 1.26-2.8 2.8-2.8Z" />
      <path d="M7.45 7.05h9.1v4.1h-9.1v-4.1ZM8.48 14.08a1.12 1.12 0 1 0 2.24 0 1.12 1.12 0 0 0-2.24 0Zm4.8 0a1.12 1.12 0 1 0 2.24 0 1.12 1.12 0 0 0-2.24 0Z" fill="#ffffff" />
    </>
  ),
  truck: (
    <>
      <path d="M3.45 8.15h10.72v7.1h1.02a2.52 2.52 0 0 1 4.92 0h0.8v-3.5l-2.78-3.2h-3.16V6.4H3.45v1.75Zm12.46 1.95h1.5l1.42 1.65h-2.92V10.1ZM7.08 17.72a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64Zm10.58 0a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64Z" />
      <path d="M4.95 8.15h7.58v2.78H4.95V8.15Z" fill="#ffffff" />
    </>
  ),
  road: (
    <>
      <path d="M3.45 8.15h10.72v7.1h1.02a2.52 2.52 0 0 1 4.92 0h0.8v-3.5l-2.78-3.2h-3.16V6.4H3.45v1.75Zm12.46 1.95h1.5l1.42 1.65h-2.92V10.1ZM7.08 17.72a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64Zm10.58 0a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64Z" />
      <path d="M4.95 8.15h7.58v2.78H4.95V8.15Z" fill="#ffffff" />
    </>
  ),
  officer: (
    <path d="M8.62 5.02h6.76l0.86 2.52c-1.24 0.46-2.66 0.7-4.24 0.7s-3-0.24-4.24-0.7l0.86-2.52Zm0.36 4.18h6.04v1.48c0 2.3-1.28 4.02-3.02 4.02s-3.02-1.72-3.02-4.02V9.2Zm-3.4 10.85v-1.42c0-2.18 2.9-3.64 6.42-3.64s6.42 1.46 6.42 3.64v1.42H5.58Zm4.52-4.18 1.9 2.52 1.9-2.52c-0.6-0.1-1.24-0.16-1.9-0.16s-1.3 0.06-1.9 0.16Z" />
  ),
  clipboardCheck: (
    <>
      <path d="M9.32 4.15h5.36l0.62 1.58h1.1c0.92 0 1.68 0.76 1.68 1.68v11.14c0 0.92-0.76 1.68-1.68 1.68H7.6c-0.92 0-1.68-0.76-1.68-1.68V7.41c0-0.92 0.76-1.68 1.68-1.68h1.1l0.62-1.58Zm0.78 1.22-0.72 2.02h5.24l-0.72-2.02h-3.8Z" />
      <path d="M10.62 15.65 7.95 13l1.42-1.42 1.2 1.2 4.06-4.26 1.44 1.38-5.45 5.75Z" fill="#ffffff" />
    </>
  ),
  customs: (
    <>
      <path d="M12 3.85 5.18 6.55v5.74c0 3.78 2.72 6.74 6.82 7.86 4.1-1.12 6.82-4.08 6.82-7.86V6.55L12 3.85Z" />
      <path d="M10.84 14.7 8.48 12.34l1.28-1.3 1.08 1.08 3.42-3.56 1.3 1.24-4.72 4.9Z" fill="#ffffff" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 3.85 5.18 6.55v5.74c0 3.78 2.72 6.74 6.82 7.86 4.1-1.12 6.82-4.08 6.82-7.86V6.55L12 3.85Z" />
      <path d="M10.84 14.7 8.48 12.34l1.28-1.3 1.08 1.08 3.42-3.56 1.3 1.24-4.72 4.9Z" fill="#ffffff" />
    </>
  ),
  network: (
    <>
      <path d="M8.02 12.96 15.5 7.5l1.1 1.5-7.48 5.46-1.1-1.5Zm1.06 2.02 7.7 2.18-0.5 1.74-7.7-2.18 0.5-1.74Z" />
      <path d="M6.72 17.38a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Zm10.14-7.54a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Zm0 10.56a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z" />
    </>
  ),
  grid: (
    <>
      <rect x="4.7" y="4.7" width="5.85" height="5.85" rx="0.82" />
      <rect x="13.45" y="4.7" width="5.85" height="5.85" rx="0.82" />
      <rect x="4.7" y="13.45" width="5.85" height="5.85" rx="0.82" />
      <rect x="13.45" y="13.45" width="5.85" height="5.85" rx="0.82" />
    </>
  ),
  warehouse: (
    <>
      <path d="M4.1 10.22 12 4.7l7.9 5.52v9.56H4.1v-9.56Z" />
      <path d="M7.62 12.55h8.76v1.44H7.62v-1.44Zm0 2.62h8.76v1.44H7.62v-1.44Zm1.25-5.08h6.26v1.42H8.87v-1.42Zm-0.72 5.78h2.1v3.91h-2.1v-3.91Z" fill="#ffffff" />
    </>
  ),
  box: (
    <>
      <path d="M12 3.85 19.36 7.7v8.58L12 20.15l-7.36-3.87V7.7L12 3.85Z" />
      <path d="M6.75 8.2 12 10.95l5.25-2.75 0.7 1.34-5.18 2.72v5.62h-1.54v-5.62L6.05 9.54l0.7-1.34Zm2.1-1.1 5.34 2.8-0.72 1.34-5.34-2.8 0.72-1.34Z" fill="#ffffff" />
    </>
  ),
  parcel: (
    <>
      <path d="M12 3.85 19.36 7.7v8.58L12 20.15l-7.36-3.87V7.7L12 3.85Z" />
      <path d="M6.75 8.2 12 10.95l5.25-2.75 0.7 1.34-5.18 2.72v5.62h-1.54v-5.62L6.05 9.54l0.7-1.34Zm2.1-1.1 5.34 2.8-0.72 1.34-5.34-2.8 0.72-1.34Z" fill="#ffffff" />
    </>
  ),
  pin: (
    <>
      <path d="M12 3.9a5.92 5.92 0 0 0-5.92 5.92c0 4.88 5.92 10.32 5.92 10.32s5.92-5.44 5.92-10.32A5.92 5.92 0 0 0 12 3.9Z" />
      <circle cx="12" cy="9.82" r="2.05" fill="#ffffff" />
    </>
  ),
  globePin: (
    <>
      <path d="M12 3.9a5.92 5.92 0 0 0-5.92 5.92c0 4.88 5.92 10.32 5.92 10.32s5.92-5.44 5.92-10.32A5.92 5.92 0 0 0 12 3.9Z" />
      <circle cx="12" cy="9.82" r="2.05" fill="#ffffff" />
    </>
  ),
  distribution: (
    <>
      <rect x="4.7" y="4.7" width="5.85" height="5.85" rx="0.82" />
      <rect x="13.45" y="4.7" width="5.85" height="5.85" rx="0.82" />
      <rect x="4.7" y="13.45" width="5.85" height="5.85" rx="0.82" />
      <rect x="13.45" y="13.45" width="5.85" height="5.85" rx="0.82" />
    </>
  ),
};

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
    train: (
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
    truck: (
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
    parcel: (
      <>
        <path
          d="M5.1 8.1 12 4.4l6.9 3.7v7.8L12 19.6l-6.9-3.7V8.1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.1 8.1 12 11.8l6.9-3.7M12 11.8v7.8M8.5 6.3l6.9 3.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.4 13.4h3.2M4.1 16.2h2.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
        />
      </>
    ),
    box: (
      <>
        <path
          d="M5.1 8.1 12 4.4l6.9 3.7v7.8L12 19.6l-6.9-3.7V8.1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.1 8.1 12 11.8l6.9-3.7M12 11.8v7.8M8.5 6.3l6.9 3.7"
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
    container: (
      <>
        <path
          d="M4.7 10h14.6v8.4H4.7V10Zm2.4 0 4.9-3.2 4.9 3.2M12 4.8v2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.6 12.4v3.7M10.6 12.4v3.7M13.6 12.4v3.7M16.6 12.4v3.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
        />
      </>
    ),
    document: (
      <>
        <path
          d="M6.8 4.4h7.6l3.8 3.8v11.4H6.8V4.4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.4 4.4v3.8h3.8M9.2 11h5.6M9.2 14h5.6M9.2 17h3.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    globePin: (
      <>
        <path
          d="M12 20.1a8.1 8.1 0 1 1 4.6-1.42M4.5 12h9.4M12 3.9c-2.1 2.3-3.15 5-3.15 8.1 0 2.55 0.72 4.85 2.15 6.9M12 3.9c1.35 1.45 2.26 3.08 2.74 4.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.7 14.9c0 2.3 2.55 4.65 2.55 4.65s2.55-2.35 2.55-4.65a2.55 2.55 0 0 0-5.1 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.25 14.9h.01"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </>
    ),
    pin: (
      <>
        <path
          d="M12 20.5s5.6-5.2 5.6-10.1a5.6 5.6 0 0 0-11.2 0c0 4.9 5.6 10.1 5.6 10.1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12.4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
        />
      </>
    ),
    network: (
      <>
        <path
          d="M7.4 16.6a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Zm9.2-7a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Zm0 10.4a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m9.8 12.4 4.4-4M9.95 15.05l4.3 2.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    officer: (
      <>
        <path
          d="M8.6 8.3h6.8l-1.1-2.7H9.7L8.6 8.3Zm1 2.8c0 2.1 1.15 3.75 2.4 3.75s2.4-1.65 2.4-3.75V9.25H9.6v1.85Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.2 20v-1.35c0-2.16 2.6-3.8 5.8-3.8s5.8 1.64 5.8 3.8V20M10.1 15.45 12 18l1.9-2.55M8.1 18.5V20M15.9 18.5V20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    shieldCheck: (
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
          d="m8.9 12.3 2.1 2.1 4.35-4.55"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    clipboardCheck: (
      <>
        <path
          d="M8.2 5.9h7.6M9.5 4.2h5l0.7 2H8.8l0.7-2Zm-2 2h9a1.4 1.4 0 0 1 1.4 1.4v11a1.4 1.4 0 0 1-1.4 1.4h-9a1.4 1.4 0 0 1-1.4-1.4v-11a1.4 1.4 0 0 1 1.4-1.4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m8.9 13 2.1 2.1 4.2-4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    stopwatch: (
      <>
        <path
          d="M9.2 4.3h5.6M12 4.3v2.05M18.3 8l1.35-1.35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 20.2a6.6 6.6 0 1 0 0-13.2 6.6 6.6 0 0 0 0 13.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 10.1v3.4"
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
    grid: (
      <>
        <path
          d="M5.3 5.3h5.1v5.1H5.3V5.3Zm8.3 0h5.1v5.1h-5.1V5.3ZM5.3 13.6h5.1v5.1H5.3v-5.1Zm8.3 0h5.1v5.1h-5.1v-5.1Z"
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

function ServiceCatalogSolidIcon({ kind }) {
  return (
    <span className="landing-service-icon landing-service-icon--solid" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {SERVICE_CATALOG_SOLID_ICONS[kind] ?? SERVICE_CATALOG_SOLID_ICONS.air}
      </svg>
    </span>
  );
}

function ServiceMobileIconStack({ icons }) {
  return (
    <div className="landing-service-mobile-icons" aria-hidden="true">
      {icons.slice(0, 2).map((icon, iconIndex) => (
        <span
          className={`landing-service-mobile-icon landing-service-mobile-icon--${iconIndex + 1}`}
          key={`${icon}-${iconIndex}`}
        >
          <ServiceCatalogSolidIcon kind={icon} />
        </span>
      ))}
    </div>
  );
}

function OverviewStatementIcon({ kind, className = 'landing-overview-icon' }) {
  const icons = {
    about: (
      <>
        <path
          d="M8.4 11.1a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4.2a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.8 19.2c.6-3.4 2.2-5 4.8-5s4.2 1.6 4.8 5m-1.1-3.8c.8-.7 1.9-1.1 3.3-1.1 2.4 0 3.9 1.4 4.5 4.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    vision: (
      <>
        <path
          d="M3.5 12s3.2-5.1 8.5-5.1 8.5 5.1 8.5 5.1-3.2 5.1-8.5 5.1S3.5 12 3.5 12Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Zm0-10.8v1.4m0 13.2V20m-6.1-3.6-1 1m14.2-1 1 1M5.9 7.6l-1-1m14.2 1 1-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    mission: (
      <>
        <path
          d="M19.6 12a7.6 7.6 0 1 1-4.1-6.8M16.3 12a4.3 4.3 0 1 1-4.3-4.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12 18.7 5.3m-2.2.1h2.2v2.2m-4.7.2 2.5.6.6 2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    idd: (
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
          d="m8.9 12.1 2.1 2.1 4.4-4.6"
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
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {icons[kind] ?? icons.about}
      </svg>
    </span>
  );
}

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const overviewRef = useRef(null);
  const servicesListRef = useRef(null);
  const projectPreviewTitleRef = useRef(null);
  const projectPreviewStageRef = useRef(null);
  const compactSolutionsStageRef = useRef(null);
  const serviceImagePreloadersRef = useRef([]);
  const hasPreloadedServiceImagesRef = useRef(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeFinalOperation, setActiveFinalOperation] = useState(FINAL_OPERATION_STEPS[0].key);
  const [activeOverviewStatement, setActiveOverviewStatement] = useState(
    OVERVIEW_MOBILE_STATEMENTS[0].key
  );
  const [isCompactHomeViewport, setIsCompactHomeViewport] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(TABLET_HOME_QUERY).matches
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const activeFinalOperationStep =
    FINAL_OPERATION_STEPS.find((step) => step.key === activeFinalOperation) ??
    FINAL_OPERATION_STEPS[0];
  const activeOverviewStatementData =
    OVERVIEW_MOBILE_STATEMENTS.find((statement) => statement.key === activeOverviewStatement) ??
    OVERVIEW_MOBILE_STATEMENTS[0];

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia(TABLET_HOME_QUERY);
    const syncCompactHomeViewport = () => setIsCompactHomeViewport(mediaQuery.matches);
    syncCompactHomeViewport();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncCompactHomeViewport);
      return () => mediaQuery.removeEventListener('change', syncCompactHomeViewport);
    }

    mediaQuery.addListener(syncCompactHomeViewport);
    return () => mediaQuery.removeListener(syncCompactHomeViewport);
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

  useLayoutEffect(() => {
    const node = overviewRef.current;
    if (!node || typeof window === 'undefined') return undefined;

    const splitContainer = node.querySelector('.split-scroll-container');
    const viewport = node.querySelector('.split-scroll-statement-frame');
    const article = node.querySelector('.landing-overview-article');

    if (!splitContainer || !viewport || !article || isCompactHomeViewport || prefersReducedMotion) {
      return undefined;
    }

    // The page travels exactly as far as the article overflows its paper viewport.
    // A single linear tween keeps all four blocks in normal document flow.
    const scrollDistance = () => Math.max(0, article.scrollHeight - viewport.clientHeight);
    const headerHeight = () =>
      Math.ceil(document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0);
    const animationContext = gsap.context(() => {
      gsap.fromTo(article, { y: 0 }, {
        y: () => -scrollDistance(),
        ease: 'none',
        scrollTrigger: {
          id: 'home-overview-article',
          trigger: splitContainer,
          start: () => `top top+=${headerHeight()}`,
          end: () => `+=${Math.max(1, scrollDistance())}`,
          pin: true,
          pinType: 'fixed',
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, node);

    // Refresh only after assets that can change the article's measured height settle.
    // Observing the pinned viewport itself creates a refresh loop as ScrollTrigger
    // swaps it between normal flow and its pin spacer at the section boundaries.
    let refreshFrame;
    let isEffectActive = true;
    const refreshAfterAssetsSettle = () => {
      if (!isEffectActive) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const fontReady = document.fonts?.ready;

    fontReady?.then(refreshAfterAssetsSettle);
    window.addEventListener('load', refreshAfterAssetsSettle, { once: true });
    ScrollTrigger.refresh();

    return () => {
      isEffectActive = false;
      window.removeEventListener('load', refreshAfterAssetsSettle);
      cancelAnimationFrame(refreshFrame);
      animationContext.revert();
      ScrollTrigger.refresh();
    };
  }, [isCompactHomeViewport, prefersReducedMotion]);

  useLayoutEffect(() => {
    const stage = compactSolutionsStageRef.current;
    if (!stage || !isCompactHomeViewport || typeof window === 'undefined') return undefined;

    const primary = stage.querySelector('.landing-compact-solutions-primary');
    const copy = stage.querySelector('.landing-compact-solutions-copy');
    const copyTitle = copy?.querySelector('h2');
    const copyBody = copy?.querySelector('p');
    const peek = stage.querySelector('.landing-compact-solutions-peek');
    if (!primary || !copyTitle || !copyBody || !peek) return undefined;

    const primaryFinalY = () =>
      stage.clientHeight * (window.innerWidth < 768 ? 0.325 : 0.28);

    if (prefersReducedMotion) {
      stage.classList.add('is-settled', 'is-handoff-ready');
      return () => stage.classList.remove('is-settled', 'is-handoff-ready');
    }

    let removeHandoffScrollListener = () => {};

    const animationContext = gsap.context(() => {
      let sourceProgress = 0;
      let handoffOpen = false;
      let sourceFinalLocked = false;
      let sourceTimeline;

      const lockSourceFinalState = () => {
        gsap.set(primary, {
          scale: 0.382,
          x: stage.clientWidth * 0.065,
          y: primaryFinalY(),
          force3D: true,
        });
        gsap.set(copyTitle, { yPercent: 0, force3D: true });
        gsap.set(copyBody, { yPercent: 0, force3D: true });
        gsap.set(peek, { x: 0, force3D: true });
      };

      const syncHandoffState = () => {
        handoffOpen = stage.scrollLeft > 1;
        if (handoffOpen) sourceFinalLocked = true;
        stage.classList.toggle('is-handoff-open', handoffOpen);
        stage.classList.toggle(
          'is-handoff-ready',
          sourceFinalLocked || sourceProgress >= 0.775
        );

        if (sourceFinalLocked) {
          lockSourceFinalState();
          return;
        }

        sourceTimeline?.progress(sourceTimeline.progress());
      };

      stage.addEventListener('scroll', syncHandoffState, { passive: true });
      removeHandoffScrollListener = () => stage.removeEventListener('scroll', syncHandoffState);

      gsap.set(copyTitle, { yPercent: 100, force3D: true });
      gsap.set(copyBody, { yPercent: 104, force3D: true });
      gsap.set(peek, { x: () => stage.clientWidth * 0.18, force3D: true });

      sourceTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${Math.round(stage.clientHeight * 1.5)}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              sourceProgress = self.progress;
              if (sourceFinalLocked && !handoffOpen && self.direction === -1) {
                sourceFinalLocked = false;
              }
              stage.classList.toggle(
                'is-handoff-ready',
                sourceFinalLocked || sourceProgress >= 0.775
              );
            },
          },
        })
        .to(
          primary,
          {
            scale: 0.382,
            x: () => stage.clientWidth * 0.065,
            y: primaryFinalY,
            force3D: true,
            ease: 'none',
            duration: 0.72,
            modifiers: {
              scale: (value) => (sourceFinalLocked ? 0.382 : value),
              x: (value) =>
                sourceFinalLocked ? `${stage.clientWidth * 0.065}px` : value,
              y: (value) => (sourceFinalLocked ? `${primaryFinalY()}px` : value),
            },
          },
          0
        )
        .to(
          copyTitle,
          {
            yPercent: 0,
            force3D: true,
            ease: 'power3.out',
            duration: 0.24,
            modifiers: {
              yPercent: (value) => (sourceFinalLocked ? 0 : value),
            },
          },
          0.72
        )
        .to(
          copyBody,
          {
            yPercent: 0,
            force3D: true,
            ease: 'power3.out',
            duration: 0.32,
            modifiers: {
              yPercent: (value) => (sourceFinalLocked ? 0 : value),
            },
          },
          0.82
        )
        .to(
          peek,
          {
            x: 0,
            force3D: true,
            ease: 'power3.out',
            duration: 0.38,
            modifiers: {
              x: (value) => (sourceFinalLocked ? '0px' : value),
            },
          },
          0.76
        )
        // Leave a small reading beat before the native handoff rail becomes available.
        .to({}, { duration: 0.32 });
    }, stage);

    ScrollTrigger.refresh();

    return () => {
      removeHandoffScrollListener();
      animationContext.revert();
      stage.classList.remove('is-handoff-ready', 'is-handoff-open');
      ScrollTrigger.refresh();
    };
  }, [isCompactHomeViewport, prefersReducedMotion]);

  useEffect(() => {
    const title = projectPreviewTitleRef.current;
    const typedPhrase = title?.querySelector('.landing-project-preview-title-typed');
    if (!typedPhrase || typeof window === 'undefined') return undefined;

    let timeoutId = null;
    let phraseIndex = 0;
    let hasStarted = false;

    const schedule = (callback, delay) => {
      timeoutId = window.setTimeout(callback, delay);
    };

    const renderPhrase = (phrase, shouldAnimate) => {
      const [firstWord, ...remainingWords] = phrase.split(' ');
      const finalWord = remainingWords.join(' ');
      const fragment = document.createDocumentFragment();
      const firstWordElement = document.createElement('span');

      firstWordElement.className = 'landing-project-preview-title-first-word';

      Array.from(firstWord).forEach((letter, index) => {
        const letterMask = document.createElement('span');
        const letterGlyph = document.createElement('span');

        letterMask.className = 'landing-project-preview-title-letter-mask';
        letterGlyph.className = 'landing-project-preview-title-letter';
        letterGlyph.textContent = letter;
        letterGlyph.style.setProperty('--landing-project-preview-letter-delay', `${index * 0.09}s`);
        letterMask.append(letterGlyph);
        firstWordElement.append(letterMask);
      });

      const finalWordMask = document.createElement('span');
      const finalWordElement = document.createElement('span');

      finalWordMask.className = 'landing-project-preview-title-final-word-mask';
      finalWordElement.className = 'landing-project-preview-title-final-word';
      finalWordElement.textContent = finalWord;
      finalWordElement.style.setProperty(
        '--landing-project-preview-final-word-delay',
        `${firstWord.length * 0.09 + 0.14}s`
      );
      finalWordMask.append(finalWordElement);

      fragment.append(firstWordElement, document.createTextNode(' '), finalWordMask);
      typedPhrase.replaceChildren(fragment);
      typedPhrase.setAttribute('aria-label', phrase);
      typedPhrase.classList.remove('is-formed', 'is-sliding-out');

      if (shouldAnimate) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            typedPhrase.classList.add('is-formed');
          });
        });
      } else {
        typedPhrase.classList.add('is-formed');
      }
    };

    renderPhrase(PROJECT_PREVIEW_TITLE_PHRASES[0], false);
    if (prefersReducedMotion) return undefined;

    const cyclePhrase = () => {
      schedule(() => {
        typedPhrase.classList.remove('is-formed');
        typedPhrase.classList.add('is-sliding-out');

        schedule(() => {
          phraseIndex = (phraseIndex + 1) % PROJECT_PREVIEW_TITLE_PHRASES.length;
          renderPhrase(PROJECT_PREVIEW_TITLE_PHRASES[phraseIndex], true);
          cyclePhrase();
        }, 620);
      }, 2400);
    };

    const startTypingCycle = () => {
      if (hasStarted) return;

      hasStarted = true;
      renderPhrase(PROJECT_PREVIEW_TITLE_PHRASES[phraseIndex], true);
      cyclePhrase();
    };

    if (typeof window.IntersectionObserver === 'undefined') {
      startTypingCycle();
      return () => window.clearTimeout(timeoutId);
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        observer.disconnect();
        startTypingCycle();
      },
      { threshold: 0, rootMargin: '0px 0px -20% 0px' }
    );

    observer.observe(title);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const stage = projectPreviewStageRef.current;
    const titlePane = stage?.querySelector('.landing-project-preview-intro');
    if (!stage || !titlePane || !isCompactHomeViewport || typeof window === 'undefined') {
      return undefined;
    }

    let animationFrameId = null;
    let initialPositionFrameId = null;
    let revealDelayId = null;
    let observer = null;
    let shouldHoldArticlePosition = true;
    let isAutoSliding = false;

    const placeArticleInView = () => {
      if (!shouldHoldArticlePosition) return;

      stage.scrollLeft = stage.scrollWidth - stage.clientWidth;
    };

    const revealTitlePane = () => {
      if (prefersReducedMotion || isAutoSliding || !shouldHoldArticlePosition) return;

      shouldHoldArticlePosition = false;
      isAutoSliding = true;
      stage.classList.add('is-auto-revealing');

      const startingScrollLeft = stage.scrollLeft;
      if (startingScrollLeft <= 0) {
        stage.classList.remove('is-auto-revealing');
        isAutoSliding = false;
        return;
      }

      const startedAt = window.performance.now();
      const duration = 920;

      const slide = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        stage.scrollLeft = startingScrollLeft * (1 - easedProgress);

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(slide);
          return;
        }

        isAutoSliding = false;
        stage.classList.remove('is-auto-revealing');
      };

      animationFrameId = window.requestAnimationFrame(slide);
    };

    const scheduleTitleReveal = () => {
      if (prefersReducedMotion || revealDelayId !== null) return;

      revealDelayId = window.setTimeout(revealTitlePane, 140);
    };

    const positionArticleThenObserve = () => {
      placeArticleInView();

      if (prefersReducedMotion) {
        shouldHoldArticlePosition = false;
        stage.scrollLeft = 0;
        return;
      }

      if (typeof window.IntersectionObserver === 'undefined') {
        scheduleTitleReveal();
        return;
      }

      observer = new window.IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;

          observer?.disconnect();
          scheduleTitleReveal();
        },
        { threshold: 0, rootMargin: '0px 0px -8% 0px' }
      );
      observer.observe(stage);
    };

    const resizeObserver =
      typeof window.ResizeObserver === 'function' ? new window.ResizeObserver(placeArticleInView) : null;

    resizeObserver?.observe(stage);
    resizeObserver?.observe(titlePane);
    initialPositionFrameId = window.requestAnimationFrame(positionArticleThenObserve);

    return () => {
      if (initialPositionFrameId !== null) {
        window.cancelAnimationFrame(initialPositionFrameId);
      }

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      if (revealDelayId !== null) {
        window.clearTimeout(revealDelayId);
      }

      observer?.disconnect();
      resizeObserver?.disconnect();
      stage.classList.remove('is-auto-revealing');
    };
  }, [isCompactHomeViewport, prefersReducedMotion]);

  useEffect(() => {
    const list = servicesListRef.current;
    if (!list || isCompactHomeViewport || typeof window === 'undefined') return undefined;

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
  }, [isCompactHomeViewport]);

  useEffect(() => {
    const list = servicesListRef.current;
    if (!list || isCompactHomeViewport || typeof window === 'undefined') return undefined;

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
  }, [isCompactHomeViewport]);

  return (
    <>
      <HomePreloader />
      <div className="hero hero--why-choose">
        <WhyChooseFelmex variant="home-hero" />
      </div>

      <section
        id="about"
        ref={overviewRef}
        className="landing-overview landing-overview--split scroll-section"
        aria-label="Company overview"
      >
        <div className="split-scroll-container">
          <div className="left-panel">
            <div className="landing-overview-collage" aria-hidden="true">
              <div className="landing-overview-photo-backing" />
              <div className="landing-overview-photo landing-overview-photo--port">
                <img src="/overview/harbor.png" alt="" width="1328" height="1184" />
              </div>
              <div className="landing-overview-photo landing-overview-photo--team">
                <div className="landing-overview-photo-crop">
                  <img src="/overview/felmex-container-lift.png" alt="" width="1314" height="1197" />
                </div>
              </div>
            </div>
            <div className="landing-overview-paper">
              <div
                className="split-scroll-statement-frame"
                role="region"
                aria-label="About Felmex, our mission, integrity due diligence, and our vision"
                tabIndex={prefersReducedMotion ? 0 : undefined}
              >
                <div className="landing-overview-article">
                  <article className="landing-overview-statement landing-overview-statement--about split-scroll-statement">
                    <span className="landing-overview-statement-rule" aria-hidden="true" />
                    <h3>About Us</h3>
                    <p>
                      FELMEX Global Logistics is an envisioned global multimodal service provider,
                      delivering integrated solutions across air, sea, road, and rail. We simplify complex
                      supply chains, connect businesses to international markets, and ensure efficiency,
                      transparency, and reliability at every step.
                    </p>
                  </article>
                  <article className="landing-overview-statement landing-overview-statement--mission split-scroll-statement">
                    <span className="landing-overview-statement-rule" aria-hidden="true" />
                    <h3>Our Mission</h3>
                    <p>
                      FELMEX Global Logistics exists to simplify complexity in international trade. We
                      integrate air, sea, road, and rail services into one cohesive network, ensuring
                      reliable, transparent, and future-ready supply chain solutions for our partners
                      worldwide.
                    </p>
                  </article>
                  <article className="landing-overview-statement landing-overview-statement--idd split-scroll-statement">
                    <span className="landing-overview-statement-rule" aria-hidden="true" />
                    <h3>IDD Statement</h3>
                    <p>
                      Integrity Due Diligence keeps every partner, supplier, and agent aligned to clear
                      ethical, compliance, and operating standards so client cargo moves through a
                      responsible logistics network with confidence.
                    </p>
                  </article>
                  <article className="landing-overview-statement landing-overview-statement--vision split-scroll-statement">
                    <span className="landing-overview-statement-rule" aria-hidden="true" />
                    <h3>Our Vision</h3>
                    <p>
                      Redefine global logistics by delivering seamless, multimodal solutions that connect
                      businesses, markets, and communities with efficiency &amp; integrity.
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <img className="landing-overview-paperclip" src="/service-catalog-paperclip.png" alt="" aria-hidden="true" width="1280" height="1280" />
          </div>

          <aside className="right-panel" aria-label="Company overview headline">
            <div className="right-panel-inner">
              <span className="landing-overview-rule" aria-hidden="true" />
              <ScrollSectionTitle className="landing-overview-title">
                <span className="landing-overview-title-line">
                  <span>Moving Your</span>
                </span>
                <span className="landing-overview-title-line">
                  <span>Business Forward,</span>
                </span>
                <span className="landing-overview-title-line">
                  <span>
                    <strong>Together.</strong>
                  </span>
                </span>
              </ScrollSectionTitle>
            </div>
          </aside>
        </div>

        <header className="landing-overview-mobile-header">
          <span className="landing-overview-mobile-header-rule" aria-hidden="true" />
          <ScrollSectionTitle className="landing-section-title landing-overview-mobile-heading">
            <span className="landing-title-line">
              <span>Moving Your Business Forward,</span>
            </span>
            <span className="landing-title-line landing-title-line--accent">
              <span>Together.</span>
            </span>
          </ScrollSectionTitle>
        </header>

        <div
          className={`landing-mobile-solutions-switcher landing-overview-mobile-switcher landing-overview-mobile-switcher--${activeOverviewStatementData.key} landing-overview-mobile-switcher--${activeOverviewStatementData.panelTone}`}
          aria-label="Company statements"
        >
          <nav
            className="landing-mobile-solutions-nav landing-overview-mobile-nav"
            aria-label="Company statement menu"
            role="tablist"
          >
            {OVERVIEW_MOBILE_STATEMENTS.map((statement) => {
              const isActive = statement.key === activeOverviewStatementData.key;

              return (
                <button
                  id={`landing-overview-mobile-tab-${statement.key}`}
                  className={`landing-mobile-solution-button landing-overview-mobile-button landing-overview-mobile-button--${statement.panelTone}${isActive ? ' is-active' : ''
                    }`}
                  key={statement.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="landing-overview-mobile-panel"
                  aria-label={statement.label}
                  onClick={() => {
                    setActiveOverviewStatement(statement.key);
                  }}
                >
                  <OverviewStatementIcon
                    kind={statement.icon}
                    className="landing-mobile-solution-icon landing-overview-mobile-button-icon"
                  />
                  <span className="landing-mobile-solution-label landing-overview-mobile-label">
                    {statement.navLabel}
                  </span>
                </button>
              );
            })}
          </nav>

          <article
            id="landing-overview-mobile-panel"
            className="landing-mobile-solution-panel landing-overview-mobile-panel"
            role="tabpanel"
            aria-live="polite"
            aria-labelledby={`landing-overview-mobile-tab-${activeOverviewStatementData.key}`}
          >
            <span className="landing-overview-rule landing-overview-mobile-rule" aria-hidden="true" />
            <h2 className="landing-overview-title landing-overview-mobile-title">
              {activeOverviewStatementData.titleLines.map((line, index) => (
                <span className="landing-overview-title-line" key={line}>
                  <span>
                    {index === activeOverviewStatementData.titleLines.length - 1 ? (
                      <strong>{line}</strong>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h2>
            <div className="landing-overview-mobile-copy">
              {activeOverviewStatementData.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>

      </section>

      <section id="services" className="landing-services" aria-label="Services overview">
        <div className="container landing-services-shell" id="services-catalog">
          <aside
            className="landing-services-aside scroll-section"
            data-scroll-reveal="early"
            aria-label="Services section introduction"
          >
            <div className="landing-services-sticky">
              <p className="landing-section-label">Our services</p>
              <div className="landing-services-heading-row">
                <ScrollSectionTitle className="landing-section-title landing-services-title">
                  <span className="landing-title-line">
                    <span>Moving Cargo</span>
                  </span>
                  <span className="landing-title-line">
                    <span>Without</span>
                  </span>
                  <span className="landing-title-line landing-title-line--accent">
                    <span>Compromise.</span>
                  </span>
                </ScrollSectionTitle>
                <span className="landing-services-rule" aria-hidden="true" />
              </div>
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
                className={`landing-service-entry scroll-section landing-service-entry--${service.mediaTone}${activeServiceIndex === index ? ' is-active' : ''
                  }`}
                key={service.label}
                style={{ '--landing-service-mobile-order': service.mobileOrder }}
              >
                <ServiceMobileIconStack icons={service.mobileIcons ?? [service.icon]} />
                {!isCompactHomeViewport && (
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
                )}
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

      <section
        id="clients"
        className="landing-testimonials scroll-section"
        aria-label="Client feedback"
      >
        <div className="landing-testimonials-desktop">
          <aside className="landing-testimonials-desktop-visual" aria-label="Felmex team">
            <figure className="landing-testimonials-desktop-photo">
              <img
                src="/testimonials/team-forward.png"
                alt="Felmex logistics team at work"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </aside>

          <div className="landing-testimonials-desktop-main">
            <header className="landing-testimonials-header">
              <p className="landing-section-label">Client Feedback</p>
              <ScrollSectionTitle className="landing-section-title landing-testimonials-title">
                <span className="landing-title-line landing-testimonials-title-line">
                  <span>Don't just take</span>
                </span>
                <span className="landing-title-line landing-testimonials-title-line">
                  <span>
                    <span className="landing-testimonials-title-accent">our word</span> for it
                  </span>
                </span>
              </ScrollSectionTitle>
              <p className="landing-section-text landing-testimonials-text">
                Teams rely on Felmex for calm communication, disciplined execution, and fast
                response when plans change.
              </p>
            </header>

            <div
              className="landing-testimonials-desktop-quotes"
              role="list"
              aria-label="Client testimonials"
            >
              {CLIENT_QUOTES.slice(0, 2).map((quote, index) => (
                <article
                  key={quote.company}
                  className={`landing-testimonial-panel scroll-section ${quote.tone}`}
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
                      <span className="landing-testimonial-quote-punctuation">&ldquo;</span>
                      {quote.quote}
                      <span className="landing-testimonial-quote-punctuation">&rdquo;</span>
                    </blockquote>
                    <span className="landing-testimonial-rule" aria-hidden="true" />
                    <div className="landing-testimonial-meta">
                      <p className="landing-testimonial-source">{quote.role}</p>
                      <p className="landing-testimonial-company">{quote.company}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="landing-testimonials-compact">
          <div className="container landing-testimonials-shell">
            <header className="landing-testimonials-header">
              <p className="landing-section-label">Client Feedback</p>
              <ScrollSectionTitle className="landing-section-title landing-testimonials-title">
                <span className="landing-title-line landing-testimonials-title-line">
                  <span>Don't just take</span>
                </span>
                <span className="landing-title-line landing-testimonials-title-line">
                  <span>
                    <span className="landing-testimonials-title-accent">our word</span> for it
                  </span>
                </span>
              </ScrollSectionTitle>
              <p className="landing-section-text landing-testimonials-text">
                Teams rely on Felmex for calm communication, disciplined execution, and fast
                response when plans change.
              </p>
            </header>
            <figure className="landing-testimonials-mobile-photo" aria-label="Felmex team">
              <img
                src="/testimonials/team-forward.png"
                alt="Felmex logistics team at work"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>

          <div className="landing-testimonials-bleed">
            <div className="landing-testimonials-content">
              <div
                className="landing-testimonials-accordion"
                role="list"
                aria-label="Client testimonials"
              >
                {CLIENT_QUOTES.slice(0, 2).map((quote, index) => (
                  <article
                    key={quote.company}
                    className={`landing-testimonial-panel scroll-section ${quote.tone}`}
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
                        <span className="landing-testimonial-quote-punctuation">&ldquo;</span>
                        {quote.quote}
                        <span className="landing-testimonial-quote-punctuation">&rdquo;</span>
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
              <p className="landing-testimonials-mobile-signoff">
                Further together <span aria-hidden="true" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="scroll-wrapper landing-final-curtain">
        <section
          id="blog"
          className="feature-section landing-journal scroll-section"
          aria-label="Project previews"
        >
          <div className="landing-journal-pin-wrap">
            <div className="landing-journal-shell">
              <div ref={projectPreviewStageRef} className="landing-project-preview-stage">
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
                  <h2 ref={projectPreviewTitleRef} className="landing-project-preview-title">
                    <span className="landing-project-preview-title-static">Our</span>
                    <span className="landing-project-preview-title-mask" aria-live="off">
                      <span className="landing-project-preview-title-typed">Current Work</span>
                    </span>
                  </h2>
                  <p className="landing-project-preview-brief">
                    Live updates from our active operations, proven track records from past projects,
                    and a strategic look at where we are heading next in global trade.
                  </p>
                  <span className="landing-project-preview-swipe-hint" aria-hidden="true">
                    <span>Swipe left to read</span>
                    <span>←</span>
                  </span>
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

                <div className="landing-project-mobile-feed" aria-label="Featured project case studies">
                  {HOME_MOBILE_PROJECTS.slice(0, 1).map((project) => (
                    <article className="landing-project-mobile-card" key={project.projectId}>
                      <header className="landing-project-mobile-identity">
                        <h3 className="landing-project-mobile-title">{project.title}</h3>
                        <p className="landing-project-mobile-meta">{project.meta}</p>
                      </header>

                      <div className="landing-project-mobile-media">
                        <img
                          className="landing-project-mobile-image"
                          src={project.image}
                          alt=""
                        />
                        <a className="landing-project-mobile-read-more" href="/blog">
                          <span>Read more</span>
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>

                      <div className="landing-project-mobile-teleprompter" aria-label={`${project.title} preview`}>
                        <div className="landing-project-mobile-teleprompter-track">
                          {[0, 1].map((copyIndex) => (
                            <div
                              className="landing-project-mobile-teleprompter-copy"
                              key={copyIndex}
                              aria-hidden={copyIndex === 1}
                            >
                              {Array.from(
                                { length: HOME_MOBILE_PROJECT_TELEPROMPTER_CYCLE_REPETITIONS },
                                (_, cycleIndex) =>
                                  project.paragraphs.map((paragraph, paragraphIndex) => (
                                    <p
                                      key={`${copyIndex}-${cycleIndex}-${paragraphIndex}`}
                                      aria-hidden={cycleIndex > 0}
                                    >
                                      {paragraph}
                                    </p>
                                  ))
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <aside className="landing-project-mobile-facts" aria-label="Project metadata">
                        <div className="landing-project-mobile-clients">
                          <p>clients</p>
                          <ul>
                            {project.clients.map((client) => (
                              <li key={client}>{client}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="landing-project-mobile-published">
                          <p>Published</p>
                          <span>{project.publishedOn}</span>
                        </div>
                      </aside>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-mobile-solutions" aria-label="Solutions">
          <div ref={compactSolutionsStageRef} className="landing-compact-solutions-stage">
            <div className="landing-compact-solutions-source">
              <figure className="landing-compact-solutions-primary">
                <img
                  src="/solutions-source-container.png"
                  alt="Felmex container lifted by a crane"
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <article className="landing-compact-solutions-copy">
                <div className="landing-compact-solutions-copy-title-clip">
                  <h2>SOURCE</h2>
                </div>
                <div className="landing-compact-solutions-copy-body-clip">
                  <p>{FINAL_OPERATION_STEPS[0].text}</p>
                </div>
              </article>

              <span className="landing-compact-solutions-handoff-hint">
                <span>Swipe to explore the solutions we offer</span>
                <span aria-hidden="true">→</span>
              </span>
            </div>

            <article className="landing-compact-solutions-handoff" aria-label="Remaining solutions">
              <figure className="landing-compact-solutions-peek" aria-hidden="true">
                <img src="/sea-freight.webp" alt="" loading="lazy" decoding="async" />
              </figure>

              <aside className="landing-compact-solutions-followup">
                <ul className="landing-compact-solutions-followup-list">
                  {FINAL_OPERATION_STEPS.slice(1).map((step) => (
                    <li className="landing-compact-solutions-followup-item" key={step.key}>
                      <h3>{step.label}</h3>
                      <p>{step.text}</p>
                    </li>
                  ))}
                </ul>
              </aside>
            </article>
          </div>

          <aside className="landing-compact-solutions-industries" aria-label="Industries we serve">
            <p className="landing-compact-solutions-industries-kicker">Industries We Serve</p>
            <div className="landing-compact-solutions-industries-rail">
              <div className="landing-compact-solutions-industries-track">
                {[0, 1].map((setIndex) => (
                  <div
                    className="landing-compact-solutions-industries-set"
                    key={setIndex}
                    aria-hidden={setIndex === 1}
                  >
                    {FINAL_INDUSTRIES.map((industry) => (
                      <span className="landing-compact-solutions-industries-item" key={industry}>
                        {industry}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="final-conviction"
          className="rising-group landing-close"
          aria-label="Final logistics flow"
        >
          <div className="final-section-canvas landing-close-canvas">
            <div className="landing-project-preview-desktop-panel" aria-hidden="true" />

            <article
              className="landing-project-preview-desktop-article"
              aria-labelledby="landing-project-preview-desktop-title"
            >
              <div className="landing-project-preview-desktop-identity">
                <p
                  id="landing-project-preview-desktop-title"
                  className="landing-project-preview-desktop-title"
                >
                  {HOME_DESKTOP_PROJECT_PREVIEW.title}
                </p>
                <figure className="landing-project-preview-desktop-portrait">
                  <img
                    src={HOME_DESKTOP_PROJECT_PREVIEW.image}
                    alt={HOME_DESKTOP_PROJECT_PREVIEW.imageAlt}
                    width="420"
                    height="552"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>

              <div className="landing-project-preview-desktop-story">
                <div
                  className={`landing-project-preview-desktop-copy${
                    prefersReducedMotion ? '' : ' is-teleprompting'
                  }`}
                >
                  <div className="landing-project-preview-desktop-copy-track">
                    {[0, 1].map((copyIndex) => (
                      <div
                        className="landing-project-preview-desktop-copy-set"
                        key={copyIndex}
                        aria-hidden={copyIndex === 1 ? true : undefined}
                      >
                        {HOME_DESKTOP_PROJECT_PREVIEW_PARAGRAPHS.map((paragraph, index) => (
                          <p key={`${copyIndex}-${index}-${paragraph}`}>{paragraph}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="landing-project-preview-desktop-facts" aria-label="Project details">
                <div className="landing-project-preview-desktop-clients">
                  <p>clients</p>
                  <ul>
                    {HOME_DESKTOP_PROJECT_CLIENTS.map((client) => (
                      <li key={client}>{client}</li>
                    ))}
                  </ul>
                </div>
                <div className="landing-project-preview-desktop-published">
                  <p>Published</p>
                  <span>{HOME_DESKTOP_PROJECT_PREVIEW.publishedOn}</span>
                </div>
              </aside>

              <a className="landing-project-preview-desktop-read-more" href="/projects">
                <span>Read more</span>
                <span aria-hidden="true">-&gt;</span>
              </a>
            </article>

            <aside className="banner-card landing-project-preview-process landing-project-preview-process--handoff landing-project-preview-process--legacy">
              <p>
                <span>At Felmex, every project is managed with a commitment to precision,</span>
                <span>transparency, and reliability. From initial planning to final delivery, our</span>
                <span>teams ensure every detail is coordinated across customs, carriers,</span>
                <span>and on-ground partners. With real-time visibility and proactive</span>
                <span>communication, we minimize risk, keep cargo moving,</span>
                <span>and deliver results our clients can depend on.</span>
              </p>
            </aside>

            <div className="landing-final-flow" aria-label="Felmex operations model">
              <div className="landing-final-step-frame" aria-hidden="true" />
              <nav className="landing-final-step-nav" aria-label="Operations stages" role="tablist">
                {FINAL_OPERATION_STEPS.map((step) => {
                  const isActive = step.key === activeFinalOperation;

                  return (
                    <button
                      id={`landing-final-tab-${step.key}`}
                      className={`landing-final-step-button${isActive ? ' is-active' : ''}`}
                      key={step.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="landing-final-operation-panel"
                      onClick={() => {
                        setActiveFinalOperation(step.key);
                      }}
                    >
                      <span>{step.label}</span>
                      <span className="landing-final-step-dot" aria-hidden="true" />
                    </button>
                  );
                })}
              </nav>

              <div
                id="landing-final-operation-panel"
                className="landing-final-operation-panel"
                role="tabpanel"
                aria-labelledby={`landing-final-tab-${activeFinalOperationStep.key}`}
              >
                <h2 className="landing-final-operation-copy">{activeFinalOperationStep.text}</h2>
              </div>

              <div className="landing-final-partners" aria-label="Industries we service">
                <p className="landing-final-partner-kicker">Industries We Service</p>
                <div className="landing-final-partner-rail">
                  <div className="landing-final-partner-track">
                    {[0, 1, 2, 3].map((setIndex) => (
                      <div
                        className="landing-final-partner-set"
                        key={setIndex}
                        aria-hidden={setIndex !== 0}
                      >
                        {FINAL_INDUSTRIES.map((industry) => (
                          <div className="landing-final-partner-item" key={`${setIndex}-${industry}`}>
                            <span className="landing-final-partner-name landing-final-industry-name">
                              {industry}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="landing-final-cta scroll-section">
              <div className="landing-final-cta-desktop">
                <div className="landing-final-cta-heading">
                  <ScrollSectionTitle id="landing-final-cta-title">
                    <span>Let&rsquo;s Move Your</span>
                    <span>Business</span>
                    <span>
                      Forward, <strong>Together.</strong>
                    </span>
                  </ScrollSectionTitle>
                  <span className="landing-final-cta-rule" aria-hidden="true" />
                </div>
                <div className="landing-final-cta-copy">
                  <p>
                    Partner with FELMEX Global Logistics for seamless, reliable, and scalable
                    logistics solutions that drive growth and open new opportunities.
                  </p>
                  <a className="landing-final-cta-link" href="/contact">
                    <span>Get in Touch</span>
                    <span className="landing-final-cta-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path
                          d="M4.8 12h13.4m-5.7-5.8 5.8 5.8-5.8 5.8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
              <ScrollSectionTitle>
                <span className="landing-final-cta-title-line">Let&rsquo;s Move Your</span>{' '}
                <span className="landing-final-cta-title-line">Business</span>{' '}
                <span className="landing-final-cta-title-line">
                  Forward, <strong>Together.</strong>
                </span>
              </ScrollSectionTitle>
              <p>
                Partner with FELMEX Global Logistics for seamless, reliable, and scalable
                logistics solutions that drive growth and open new opportunities.
              </p>
              <a className="landing-final-cta-link" href="/contact">
                <span>Get in Touch</span>
                <span className="landing-final-cta-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path
                      d="M4.8 12h13.4m-5.7-5.8 5.8 5.8-5.8 5.8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
