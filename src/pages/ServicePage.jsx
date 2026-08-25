import { useEffect, useRef, useState } from 'react';
import { SplitPanelPreloader } from '../components/preloader/SplitPanelPreloader';
import { ScrollSectionTitle } from '../components/scroll-reveal/ScrollSectionTitle';
import './ServicePage.css';

const SERVICE_COMPACT_FAQ_QUERY =
  '(max-width: 760px), (min-width: 768px) and (max-width: 1024px)';

function isServiceCompactFaqViewport() {
  return (
    typeof window !== 'undefined' && window.matchMedia(SERVICE_COMPACT_FAQ_QUERY).matches
  );
}

const SERVICE_CATEGORIES = [
  {
    id: 'multimodal',
    label: 'Multimodal Transport Solutions',
    navLabelLines: ['Multi-Modal', 'Transport Solutions'],
    navIcon: 'network',
    compactLabel: 'Solutions',
    kicker: 'Seamless. Connected. Reliable.',
    titleLines: ['Multi-Modal', 'Transport Solutions'],
    description:
      'We move your cargo seamlessly across road, rail, sea and air through integrated solutions that connect more places, reduce transit time and deliver value at every step.',
    panelDescription:
      'We connect air, sea, road, and rail to deliver flexible, cost-effective transport solutions.',
    quoteHighlights: ['air', 'sea', 'road', 'rail'],
    features: [
      {
        icon: 'boxPin',
        title: 'Last Mile',
        copy: 'Efficient last mile delivery ensuring your cargo reaches its final destination on time.',
      },
      {
        icon: 'plane',
        title: 'Air',
        copy: 'Fast and secure air freight solutions for urgent and high-value shipments.',
      },
      {
        icon: 'ship',
        title: 'Sea',
        copy: 'Global sea freight connections with major ports worldwide for FCL and LCL cargo.',
      },
      {
        icon: 'train',
        title: 'Rail',
        copy: 'Cost-effective rail solutions for long-distance, heavy and time-sensitive cargo.',
      },
      {
        icon: 'truck',
        title: 'Road',
        copy: 'Extensive road network for flexible and reliable door-to-door delivery.',
      },
    ],
  },
  {
    id: 'freight',
    label: 'International Freight Forwarding',
    navLabelLines: ['International', 'Freight Forwarding'],
    navIcon: 'plane',
    compactLabel: 'Freight',
    kicker: 'Global Reach. Local Expertise.',
    titleLines: ['International', 'Freight', 'Forwarding'],
    description:
      'We simplify complex shipping with reliable international freight forwarding solutions. From origin to destination, cargo moves securely, efficiently and on schedule.',
    panelDescription:
      'We coordinate international cargo movement with reliable routes, documents, and milestone control.',
    quoteHighlights: ['international cargo', 'routes', 'documents', 'milestone control'],
    features: [
      {
        icon: 'globePin',
        title: 'Global Network',
        copy: 'Trusted partners and agents worldwide keep shipment handoffs coordinated across borders.',
      },
      {
        icon: 'clipboardShield',
        title: 'End-to-End Solutions',
        copy: 'Forwarding support covers booking, documents, transit updates and destination handoff.',
      },
      {
        icon: 'ship',
        title: 'Flexible Options',
        copy: 'Sea, air and land freight options are matched to cargo type, timeline and budget.',
      },
      {
        icon: 'officer',
        title: 'Expert Compliance',
        copy: 'International regulations and documentation are managed to reduce clearance delays.',
      },
      {
        icon: 'boxPin',
        title: 'Cargo Visibility',
        copy: 'Shipment milestones are tracked from origin through final delivery confirmation.',
      },
    ],
  },
  {
    id: 'customs',
    label: 'Customs & Trade Facilitation',
    navLabelLines: ['Customs & Trade', 'Facilitation'],
    navIcon: 'documentCheck',
    compactLabel: 'Customs',
    kicker: 'Clearance. Compliance. Confidence.',
    titleLines: ['Customs &', 'Trade', 'Facilitation'],
    description:
      'We streamline cross-border trade by simplifying customs procedures and keeping documentation compliant so cargo moves faster and with fewer delays.',
    panelDescription:
      'We simplify declarations, document checks, and authority coordination for smoother border movement.',
    quoteHighlights: ['declarations', 'document checks', 'authority coordination'],
    features: [
      {
        icon: 'documentCheck',
        title: 'Efficient Clearance',
        copy: 'Accurate documents and proactive processing support faster customs release.',
      },
      {
        icon: 'shieldCheck',
        title: 'Compliance',
        copy: 'Import and export requirements are reviewed against current regulatory expectations.',
      },
      {
        icon: 'globePin',
        title: 'Duty Guidance',
        copy: 'Tariff, duty and exemption guidance helps control landed cost and risk.',
      },
      {
        icon: 'documentPen',
        title: 'Documentation',
        copy: 'Declarations and supporting paperwork are prepared for smooth submission.',
      },
      {
        icon: 'boxSearch',
        title: 'Risk Review',
        copy: 'Classification and inspection risks are flagged early to reduce disruptions.',
      },
    ],
  },
  {
    id: 'supply-chain',
    label: 'Supply Chain Management',
    navLabelLines: ['Supply Chain', 'Management'],
    navIcon: 'network',
    compactLabel: 'Supply',
    kicker: 'Plan. Optimize. Deliver.',
    titleLines: ['Supply Chain', 'Management'],
    description:
      'We design and manage efficient, resilient supply chains that improve control, reduce friction and keep operations moving with clear visibility.',
    panelDescription:
      'We connect planning, visibility, and execution so your supply chain stays clear and controlled.',
    quoteHighlights: ['planning', 'visibility', 'execution'],
    features: [
      {
        icon: 'monitorChart',
        title: 'Strategy',
        copy: 'Supply chain plans are aligned to service goals, cost pressure and operating rhythm.',
      },
      {
        icon: 'gear',
        title: 'Forecasting',
        copy: 'Demand planning helps balance stock, capacity and delivery expectations.',
      },
      {
        icon: 'truck',
        title: 'Sourcing',
        copy: 'Supplier and procurement coordination supports reliable movement from origin.',
      },
      {
        icon: 'warehouseBox',
        title: 'Inventory',
        copy: 'Inventory flow is organized around storage, release timing and dispatch readiness.',
      },
      {
        icon: 'network',
        title: 'Visibility',
        copy: 'Connected milestones make exceptions easier to spot and resolve quickly.',
      },
    ],
  },
  {
    id: 'warehouse',
    label: 'Warehousing & Distribution',
    navLabelLines: ['Warehousing &', 'Distribution'],
    navIcon: 'warehouse',
    compactLabel: 'Storage',
    kicker: 'Store. Control. Dispatch.',
    titleLines: ['Warehousing &', 'Distribution'],
    description:
      'We protect, manage and move inventory through secure warehousing and structured distribution workflows built for speed and accuracy.',
    panelDescription:
      'We manage storage, inventory control, and dispatch workflows with dependable handling discipline.',
    quoteHighlights: ['storage', 'inventory control', 'dispatch workflows'],
    features: [
      {
        icon: 'warehouse',
        title: 'Storage',
        copy: 'Secure storage options are planned around condition, access and dispatch needs.',
      },
      {
        icon: 'documentCheck',
        title: 'Inventory Accuracy',
        copy: 'Receiving and stock controls keep inventory visible and reliable.',
      },
      {
        icon: 'boxCheck',
        title: 'Fulfillment',
        copy: 'Pick, pack and staging workflows prepare cargo for accurate outbound movement.',
      },
      {
        icon: 'truck',
        title: 'Distribution',
        copy: 'Outbound dispatch is coordinated with route plans and delivery commitments.',
      },
      {
        icon: 'shieldCheck',
        title: 'Cargo Protection',
        copy: 'Controlled handling reduces damage, loss and avoidable service delays.',
      },
    ],
  },
  {
    id: 'parcel',
    label: 'Parcel & Courier',
    navLabelLines: ['Parcel &', 'Courier'],
    navIcon: 'truckFast',
    compactLabel: 'More',
    kicker: 'Fast. Tracked. Reliable.',
    titleLines: ['Parcel &', 'Courier'],
    description:
      'We coordinate reliable document, parcel and priority delivery movement with clear tracking from pickup to final handoff.',
    panelDescription:
      'We move documents, parcels, and priority deliveries with clear tracking from pickup to handoff.',
    quoteHighlights: ['documents', 'parcels', 'priority deliveries', 'tracking'],
    features: [
      {
        icon: 'truckFast',
        title: 'Express Movement',
        copy: 'Priority courier handling supports time-sensitive documents and commercial parcels.',
      },
      {
        icon: 'boxPin',
        title: 'Tracking',
        copy: 'Pickup, transit and delivery milestones keep every handoff visible.',
      },
      {
        icon: 'boxShield',
        title: 'Secure Handling',
        copy: 'Sensitive and high-value parcels move with careful handling controls.',
      },
      {
        icon: 'truck',
        title: 'Last Mile',
        copy: 'Route planning and recipient checks reduce failed delivery attempts.',
      },
      {
        icon: 'documentCheck',
        title: 'Confirmation',
        copy: 'Proof-of-delivery capture closes the shipment with confidence.',
      },
    ],
  },
];

const PROCESS_STEPS = [
  {
    icon: 'inquiry',
    title: 'Inquiry',
    copy: 'Share your requirements and we provide the best solution.',
  },
  {
    icon: 'planning',
    title: 'Planning',
    copy: 'We plan the optimal route and select the right mode of transport.',
  },
  {
    icon: 'documentation',
    title: 'Documentation',
    copy: 'We handle all paperwork and compliance seamlessly.',
  },
  {
    icon: 'transportation',
    title: 'Transportation',
    copy: 'Your cargo is moved safely with real-time tracking and updates.',
  },
  {
    icon: 'delivery',
    title: 'Delivery',
    copy: 'Delivered on time to your destination, every time.',
  },
];

const FINAL_STATEMENT_LINES = [
  'We go beyond logistics',
  'to deliver reliability,',
  'efficiency and peace of mind',
  'at every step of the journey',
];

const FAQ_ITEMS = [
  {
    question: 'What services do you offer?',
    answer:
      'We provide freight forwarding, customs and trade support, multimodal transport, warehousing, distribution, supply chain management, and parcel courier solutions.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Shipping timelines depend on the cargo type, service mode, origin, destination, and clearance requirements. We confirm realistic transit times after reviewing the shipment details.',
  },
  {
    question: 'How can I get a quote?',
    answer:
      'You can request a quote by filling out our online form, emailing us directly or contacting our team. We will respond with a tailored quote based on your specific shipping needs.',
  },
  {
    question: 'Can I track my shipment?',
    answer:
      'Yes. We provide shipment updates and milestone visibility so you can follow cargo movement from pickup through final delivery.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'We support manufacturers, retailers, FMCG teams, distributors, project cargo operators, importers, exporters, and businesses that need dependable cargo movement.',
  },
  {
    question: 'How do you ensure the safety of my cargo?',
    answer:
      'We use documented handling procedures, trusted partners, secure handoffs, and milestone visibility to reduce risk from pickup through final delivery.',
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightedQuote({ text, highlights = [] }) {
  const normalizedHighlights = highlights
    .filter(Boolean)
    .sort((first, second) => second.length - first.length);

  if (!normalizedHighlights.length) {
    return text;
  }

  const highlightPattern = new RegExp(`(${normalizedHighlights.map(escapeRegExp).join('|')})`, 'gi');

  return text.split(highlightPattern).map((part, index) => {
    const isHighlight = normalizedHighlights.some(
      (highlight) => highlight.toLowerCase() === part.toLowerCase()
    );

    if (!isHighlight) {
      return part;
    }

    return (
      <strong className="svc-quote-highlight" key={`${part}-${index}`}>
        {part}
      </strong>
    );
  });
}

function ServiceIcon({ kind }) {
  const icons = {
    boxPin: (
      <>
        <path d="M12 18.5 30 9l18 9.5v20L30 48 12 38.5v-20Z" />
        <path d="M12 18.5 30 28l18-9.5M30 28v20M21 13.7l18 9.5" />
        <path className="svc-icon-accent" d="M40 40c0 7 8 14 8 14s8-7 8-14a8 8 0 0 0-16 0Z" />
        <circle className="svc-icon-accent-fill" cx="48" cy="40" r="2.8" />
      </>
    ),
    plane: (
      <>
        <path d="M30.5 5.5c1-1.8 3-1.8 4 0 1.2 2.2 1.9 6.2 1.9 10.4v8.8l20.1 12.9c1.4.9 2.2 2.5 2.2 4.2v4.4L36.4 39.5v8.6l7.1 5.2v4.1L32.5 54l-11 3.4v-4.1l7.1-5.2v-8.6L6.3 46.2v-4.4c0-1.7.8-3.3 2.2-4.2l20.1-12.9v-8.8c0-4.2.7-8.2 1.9-10.4Z" />
      </>
    ),
    ship: (
      <>
        <path d="M13 39h38l-5 10H18l-5-10ZM19 32h26v7H19zM25 24h14v8H25zM31 12h2v12" />
        <path className="svc-icon-accent" d="M20 33h25v6H20z" />
        <path d="M27 18h10M12 52c2.2 1.8 4.4 1.8 6.6 0s4.4-1.8 6.6 0 4.4 1.8 6.6 0 4.4-1.8 6.6 0 4.4 1.8 6.6 0 4.4-1.8 6.6 0" />
      </>
    ),
    train: (
      <>
        <path d="M21 8h22a6 6 0 0 1 6 6v23a8 8 0 0 1-8 8H23a8 8 0 0 1-8-8V14a6 6 0 0 1 6-6Z" />
        <path d="M20 19h24M24 53l6-8M40 53l-6-8M20 56h24" />
        <path className="svc-icon-accent" d="M22 31h.1M42 31h.1" />
      </>
    ),
    truck: (
      <>
        <path d="M9 22h30v22H9zM39 30h9l7 8v6H39V30Z" />
        <circle className="svc-icon-accent" cx="20" cy="47" r="4" />
        <circle className="svc-icon-accent" cx="47" cy="47" r="4" />
        <path d="M14 44h2M24 44h19" />
      </>
    ),
    globePin: (
      <>
        <circle cx="27" cy="28" r="20" />
        <path d="M7 28h40M27 8c6 5.8 9 12.5 9 20s-3 14.2-9 20M27 8c-6 5.8-9 12.5-9 20s3 14.2 9 20" />
        <path d="M44 39.2c0 7.5 8.2 14.8 8.2 14.8s8.2-7.3 8.2-14.8a8.2 8.2 0 0 0-16.4 0Z" />
        <circle cx="52.2" cy="39.1" r="2.8" />
      </>
    ),
    clipboardShield: (
      <>
        <path d="M18 9.5h28v43H18zM25 9.5V6h14v3.5M24.5 21h12M24.5 29h12M24.5 37h8" />
        <path d="M45 34.5 55 38v7.6c0 5.5-3.5 9.4-10 11.4-6.5-2-10-5.9-10-11.4V38l10-3.5Z" />
        <path d="m40.6 45.2 3.1 3.1 6-6.2" />
      </>
    ),
    officer: (
      <>
        <path d="M21 20h22l-3.5-7h-15L21 20ZM24 20c2.2 3.2 13.8 3.2 16 0M24.5 31.2c0 5.5 3.4 10 7.5 10s7.5-4.5 7.5-10v-4.8h-15v4.8Z" />
        <path d="M18 56v-5.2c0-5.2 6.3-9.4 14-9.4s14 4.2 14 9.4V56M28 43l4 6 4-6M23 52v4M41 52v4" />
      </>
    ),
    documentCheck: (
      <>
        <path d="M18 8h25l8 8v38H18zM43 8v8h8M25 23h15M25 31h11M25 39h8" />
        <circle cx="45" cy="42" r="10" />
        <path d="m40.4 42.2 3.2 3.2 6.4-7" />
      </>
    ),
    shieldCheck: (
      <>
        <path d="M32 8c8.6 6.1 17.5 6.8 24 7.6v14.8c0 14-9.1 23.1-24 27.6C17.1 53.5 8 44.4 8 30.4V15.6C14.5 14.8 23.4 14.1 32 8Z" />
        <path d="m21.2 33.2 7 7L43.5 24" />
      </>
    ),
    documentPen: (
      <>
        <path d="M17 8h29v48H17zM24 19h14M24 27h14M24 35h9M24 43h7" />
        <path d="m39 47 13-13 5 5-13 13-7 2 2-7ZM49 37l5 5" />
      </>
    ),
    boxSearch: (
      <>
        <path d="M12 20.5 30 11l18 9.5v20L30 50 12 40.5v-20Z" />
        <path d="M12 20.5 30 30l18-9.5M30 30v20M21 15.7l18 9.5" />
        <circle cx="46" cy="44" r="9" />
        <path d="m52.5 50.5 6 6" />
      </>
    ),
    monitorChart: (
      <>
        <path d="M11 12h42v31H11zM25 53h14M32 43v10" />
        <path d="m20 34 8-8 6 5 10-13M41 18h7v7" />
      </>
    ),
    gear: (
      <>
        <path d="M32 21a11 11 0 1 0 0 22 11 11 0 0 0 0-22Z" />
        <path d="M32 8v8M32 48v8M15 15l5.7 5.7M43.3 43.3 49 49M8 32h8M48 32h8M15 49l5.7-5.7M43.3 20.7 49 15" />
      </>
    ),
    warehouseBox: (
      <>
        <path d="M10 24 32 10l22 14v30H10V24Z" />
        <path d="M18 54V34h28v20M24 39h16M24 45h16M32 34v20" />
        <path d="M26 18h12M22 25h20" />
      </>
    ),
    network: (
      <>
        <circle cx="18" cy="39" r="7" />
        <circle cx="32" cy="18" r="7" />
        <circle cx="47" cy="44" r="7" />
        <path d="m22 33 6-9M37 24l7 14M25 40h15" />
      </>
    ),
    warehouse: (
      <>
        <path d="M8 25 32 10l24 15v31H8V25Z" />
        <path d="M18 56V35h28v21M24 56V43h16v13M20 28h24M27 21h10" />
      </>
    ),
    boxCheck: (
      <>
        <path d="M12 19 30 9.5 48 19v21L30 49.5 12 40V19Z" />
        <path d="M12 19 30 28.5 48 19M30 28.5v21M21 14.2l18 9.5" />
        <path d="m39 43.5 4 4 8-8.5" />
      </>
    ),
    boxShield: (
      <>
        <path d="M13 20.5 31 11l18 9.5v21L31 51 13 41.5v-21Z" />
        <path d="M13 20.5 31 30l18-9.5M31 30v21M22 15.7l18 9.5" />
        <path d="M47 35.5 57 39v7.5c0 5.1-3.4 8.8-10 10.5-6.6-1.7-10-5.4-10-10.5V39l10-3.5Z" />
        <path d="m42.8 45.6 3.1 3.1 5.6-6" />
      </>
    ),
    truckFast: (
      <>
        <path d="M18 23h25v20H18zM43 30h8l6 7v6H43V30Z" />
        <circle cx="27" cy="46" r="4" />
        <circle cx="50" cy="46" r="4" />
        <path d="M7 27h8M4 35h11M9 43h6" />
      </>
    ),
  };

  return (
    <svg className="svc-line-icon" viewBox="0 0 64 64" focusable="false" aria-hidden="true">
      {icons[kind] ?? icons.boxPin}
    </svg>
  );
}

function MobileServiceIcon({ kind }) {
  const solidTruck = (
    <>
      <path d="M7 22h33v22H7V22Zm33 7h10.5L57 37v7H40V29Z" />
      <circle cx="19" cy="48" r="5" />
      <circle cx="48" cy="48" r="5" />
      <path d="M11 45h4M24 45h20" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </>
  );
  const solidPlane = (
    <>
      <path d="M30.5 5.5c1-1.8 3-1.8 4 0 1.2 2.2 1.9 6.2 1.9 10.4v8.8l20.1 12.9c1.4.9 2.2 2.5 2.2 4.2v4.4L36.4 39.5v8.6l7.1 5.2v4.1L32.5 54l-11 3.4v-4.1l7.1-5.2v-8.6L6.3 46.2v-4.4c0-1.7.8-3.3 2.2-4.2l20.1-12.9v-8.8c0-4.2.7-8.2 1.9-10.4Z" />
    </>
  );
  const solidShip = (
    <>
      <path d="M14 38h36l-5.4 10H19.4L14 38Zm8-11h20v9H22v-9Zm6-9h8v7h-8v-7Z" />
      <path d="M32 10v8M19 54c2.4 1.8 4.9 1.8 7.3 0s4.9-1.8 7.3 0 4.9 1.8 7.3 0 4.9-1.8 7.3 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
  const solidTrain = (
    <>
      <path d="M20 8h24a6 6 0 0 1 6 6v25a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8V14a6 6 0 0 1 6-6Zm2 11v12h20V19H22Z" />
      <circle cx="25" cy="38" r="3" fill="#ffffff" />
      <circle cx="39" cy="38" r="3" fill="#ffffff" />
      <path d="m25 55 7-8 7 8M19 56h26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
  const solidClipboard = (
    <>
      <path d="M20 10h8.2a5 5 0 0 1 7.6 0H44a4 4 0 0 1 4 4v40H16V14a4 4 0 0 1 4-4Zm9 5h6v-3h-6v3Z" />
      <path d="M24 26h3M24 34h3M24 42h3M32 26h9M32 34h9M32 42h6" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="47" cy="47" r="10" />
      <path d="m42.5 47.2 3.1 3.1 6-6.3" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
  const solidWarehouse = (
    <>
      <path d="M8 25 32 10l24 15v31H8V25Zm11 28h26V34H19v19Z" />
      <path d="M24 53V42h16v11M24 27h16M29 20h6" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
  const solidBox = (
    <>
      <path d="M12 20 32 10l20 10v23L32 54 12 43V20Z" />
      <path d="M12 20 32 31l20-11M32 31v23M22 15l20 11" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.88" />
    </>
  );
  const solidNetwork = (
    <>
      <path d="M32 20 44 27v14l-12 7-12-7V27l12-7Z" />
      <path d="M18 22a19 19 0 0 1 30 5M50 25l-1.5 8-7-4M46 45a19 19 0 0 1-30-5M14 42l1.5-8 7 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
  const solidDocument = (
    <>
      <path d="M18 8h25l8 8v40H18V8Zm25 0v10h8" />
      <path d="M25 25h16M25 33h16M25 41h8" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    </>
  );
  const solidShield = (
    <>
      <path d="M32 7c8.5 6 17.2 6.7 24 7.5v15.3C56 44 46.8 53 32 58 17.2 53 8 44 8 29.8V14.5C14.8 13.7 23.5 13 32 7Z" />
      <path d="m21.5 33.2 7.1 7.1 14.8-16" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
  const solidGlobePin = (
    <>
      <circle cx="27" cy="28" r="20" />
      <path d="M7 28h40M27 8c5.8 5.5 8.8 12.2 8.8 20S32.8 42.5 27 48M27 8c-5.8 5.5-8.8 12.2-8.8 20S21.2 42.5 27 48" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M44 39.5c0 7.6 8.5 15.2 8.5 15.2S61 47.1 61 39.5a8.5 8.5 0 0 0-17 0Z" />
      <circle cx="52.5" cy="39.4" r="3" fill="#ffffff" />
    </>
  );
  const solidParcel = (
    <>
      <path d="M28 18 48 28v20L28 58 8 48V28l20-10Z" />
      <path d="M8 28 28 38l20-10M28 38v20M18 23l20 10" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M4 31h10M1 39h13M6 47h8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </>
  );
  const icons = {
    boxPin: solidTruck,
    plane: solidPlane,
    ship: solidShip,
    train: solidTrain,
    truck: solidTruck,
    globePin: solidGlobePin,
    clipboardShield: solidClipboard,
    officer: solidShield,
    documentCheck: solidClipboard,
    shieldCheck: solidShield,
    documentPen: solidDocument,
    boxSearch: solidBox,
    monitorChart: solidNetwork,
    gear: solidNetwork,
    warehouseBox: solidWarehouse,
    network: solidNetwork,
    warehouse: solidWarehouse,
    boxCheck: solidBox,
    boxShield: solidShield,
    truckFast: solidParcel,
  };

  return (
    <svg className="svc-solid-icon" viewBox="0 0 64 64" focusable="false" aria-hidden="true">
      {icons[kind] ?? solidBox}
    </svg>
  );
}

function ProcessIcon({ kind }) {
  const icons = {
    inquiry: (
      <>
        <path d="M10 13h31a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8H27l-12 8v-8h-5a8 8 0 0 1-8-8V21a8 8 0 0 1 8-8Z" />
        <path d="M42 27h8a7 7 0 0 1 7 7v11a7 7 0 0 1-7 7h-2v7l-9-7H29a7 7 0 0 1-6.4-4.2" opacity="0.95" />
        <circle className="svc-process-icon-cutout-fill" cx="18" cy="29" r="2.1" />
        <circle className="svc-process-icon-cutout-fill" cx="26" cy="29" r="2.1" />
        <circle className="svc-process-icon-cutout-fill" cx="34" cy="29" r="2.1" />
      </>
    ),
    planning: (
      <>
        <path d="M18 10h8.2a5 5 0 0 1 7.6 0H46a4 4 0 0 1 4 4v42H18V10Zm11 5h6v-3h-6v3Z" />
        <path className="svc-process-icon-cutout" d="M28 27h13M28 38h13M28 49h13" />
        <path className="svc-process-icon-cutout" d="m13 27.5 3 3 6.2-7M13 38.5l3 3 6.2-7M13 49.5l3 3 6.2-7" />
      </>
    ),
    documentation: (
      <>
        <path d="M17 7h27l9 9v41H17V7Zm27 0v11h9" />
        <path className="svc-process-icon-cutout" d="M25 27h19M25 36h19M25 45h12" />
      </>
    ),
    transportation: (
      <>
        <path d="M9 28 32 15l23 13v24H9V28Zm9 20h28V33H18v15Z" />
        <path className="svc-process-icon-cutout" d="M24 48V37M32 48V37M40 48V37M26 18v-5h12v5M8 56h48" />
        <circle className="svc-process-icon-cutout-fill" cx="32" cy="13" r="2.8" />
      </>
    ),
    delivery: (
      <>
        <circle cx="32" cy="32" r="24" />
        <path className="svc-process-icon-cutout" d="m20.5 32.5 7.4 7.4 16.2-17.3" />
      </>
    ),
  };

  return (
    <svg className="svc-process-solid-icon" viewBox="0 0 64 64" focusable="false" aria-hidden="true">
      {icons[kind] ?? icons.inquiry}
    </svg>
  );
}

export function ServicePage() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(SERVICE_CATEGORIES[0].id);
  const [isCompactFaqViewport, setIsCompactFaqViewport] = useState(() =>
    isServiceCompactFaqViewport()
  );
  const [openFaqIndex, setOpenFaqIndex] = useState(() =>
    isServiceCompactFaqViewport() ? null : 0
  );
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const processGridRef = useRef(null);
  const activeCategoryIndex = Math.max(
    SERVICE_CATEGORIES.findIndex((category) => category.id === activeCategoryId),
    0
  );
  const activeCategory = SERVICE_CATEGORIES[activeCategoryIndex] ?? SERVICE_CATEGORIES[0];
  const handleProcessScroll = () => {
    const processGrid = processGridRef.current;

    if (!processGrid) {
      return;
    }

    const cards = Array.from(processGrid.querySelectorAll('.svc-process-card'));
    const gridRect = processGrid.getBoundingClientRect();
    const gridStart = gridRect.left;
    let closestCardIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const distance = Math.abs(cardRect.left - gridStart);

      if (distance < closestDistance) {
        closestCardIndex = index;
        closestDistance = distance;
      }
    });

    setActiveProcessIndex((currentIndex) =>
      currentIndex === closestCardIndex ? currentIndex : closestCardIndex
    );
  };

  const scrollProcessToIndex = (index) => {
    const processGrid = processGridRef.current;
    const targetCard = processGrid?.querySelectorAll('.svc-process-card')[index];

    targetCard?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const handleFaqToggle = (index) => {
    setOpenFaqIndex((currentIndex) => {
      if (isCompactFaqViewport && currentIndex === index) {
        return null;
      }

      return index;
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia(SERVICE_COMPACT_FAQ_QUERY);

    const syncFaqState = () => {
      setIsCompactFaqViewport(mediaQuery.matches);
      setOpenFaqIndex((currentIndex) => (mediaQuery.matches ? null : currentIndex ?? 0));
    };

    syncFaqState();
    mediaQuery.addEventListener('change', syncFaqState);

    return () => {
      mediaQuery.removeEventListener('change', syncFaqState);
    };
  }, []);

  useEffect(() => {
    const handleWindowLoad = () => setIsAppLoaded(true);

    window.addEventListener('load', handleWindowLoad);

    if (document.readyState === 'complete') {
      handleWindowLoad();
    }

    return () => {
      window.removeEventListener('load', handleWindowLoad);
    };
  }, []);

  return (
    <section
      className={`svc-page${isAppLoaded ? ' is-loaded' : ''}`}
      id="services-top"
      aria-label="Felmex services"
    >
      <SplitPanelPreloader isAppLoaded={isAppLoaded} />

      <section className="svc-hero" aria-label="Services introduction">
        <div className="svc-hero-copy">
          <div className="clip-mask svc-hero-kicker-mask">
            <p className="svc-hero-kicker svc-hero-reveal">Our Services</p>
          </div>
          <div className="clip-mask svc-hero-title-mask">
            <h1 className="svc-hero-title svc-hero-reveal">
              All Services<span>.</span>
            </h1>
          </div>
          <span className="svc-hero-rule" aria-hidden="true" />
          <p className="svc-hero-subtitle">
            <span className="clip-mask svc-hero-subtitle-line-mask">
              <span className="svc-hero-reveal">
                End-to-end logistics solutions designed to move your business forward.
              </span>
            </span>
            <span className="clip-mask svc-hero-subtitle-line-mask">
              <span className="svc-hero-reveal">
                Explore services built for efficiency, reliability, and growth.
              </span>
            </span>
          </p>
          <div className="clip-mask svc-hero-link-mask">
            <a className="svc-hero-link svc-hero-reveal" href="#svc-services-canvas">
              <span className="svc-hero-link-icon" aria-hidden="true">
                <ArrowIcon />
              </span>
              <span>View all services</span>
            </a>
          </div>
        </div>
      </section>

      <section className="svc-reference-section" id="svc-services-canvas" aria-label="Felmex service categories">
        <div className="svc-reference-board">
          <div className="svc-reference-canvas" data-category={activeCategory.id}>
            <h1 className="svc-mobile-services-title">Our Services</h1>

            <section
              className="svc-reference-scene scroll-section"
              data-scroll-reveal="early"
              id="svc-services-shot"
              role="tabpanel"
              aria-labelledby={`svc-category-tab-${activeCategory.id}`}
              aria-label={`${activeCategory.label} services`}
            >
              <div className="svc-reference-white-field" aria-hidden="true" />
              <div className="svc-reference-hero-copy">
                <p className="svc-reference-kicker">
                  {String(activeCategoryIndex + 1).padStart(2, '0')}
                </p>
                <ScrollSectionTitle className="svc-reference-scene-title">
                  {activeCategory.titleLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </ScrollSectionTitle>
                <span className="svc-reference-title-rule" aria-hidden="true" />
                <p className="svc-reference-scene-copy">
                  <HighlightedQuote
                    text={activeCategory.panelDescription ?? activeCategory.description}
                    highlights={activeCategory.quoteHighlights}
                  />
                </p>
                <div className="svc-reference-dots" aria-label="Featured service slides">
                  {SERVICE_CATEGORIES.map((category) => {
                    const isActive = category.id === activeCategory.id;

                    return (
                      <button
                        className={`svc-reference-dot${isActive ? ' is-active' : ''}`}
                        type="button"
                        key={category.id}
                        aria-label={`Show ${category.label}`}
                        aria-selected={isActive}
                        onClick={() => setActiveCategoryId(category.id)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="svc-reference-feature-list" role="list" aria-label={`${activeCategory.label} capabilities`}>
                {activeCategory.features.map((feature) => (
                  <article className="svc-reference-feature" key={feature.title} role="listitem">
                    <div className="svc-reference-feature-icon" aria-hidden="true">
                      <ServiceIcon kind={feature.icon} />
                    </div>
                    <span className="svc-reference-feature-rule" aria-hidden="true" />
                    <div className="svc-reference-feature-copy">
                      <h3>{feature.title}</h3>
                      <p>{feature.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className="svc-mobile-service-shell">
              <nav className="svc-reference-nav" aria-label="Service categories">
                <div className="svc-reference-nav-track" role="tablist" aria-label="Service categories">
                  {SERVICE_CATEGORIES.map((category) => {
                    const isActive = category.id === activeCategory.id;

                    return (
                      <button
                        className={`svc-reference-tab${isActive ? ' is-active' : ''}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="svc-services-shot"
                        id={`svc-category-tab-${category.id}`}
                        key={category.id}
                        aria-label={category.label}
                        onClick={() => setActiveCategoryId(category.id)}
                      >
                        <span className="svc-reference-tab-icon" aria-hidden="true">
                          <ServiceIcon kind={category.navIcon} />
                        </span>
                        <span className="svc-reference-tab-label">
                          {category.navLabelLines.map((line) => (
                            <span className="svc-reference-tab-label-line" key={line}>
                              {line}
                            </span>
                          ))}
                        </span>
                        <span className="svc-reference-tab-compact">{category.compactLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              <section className="svc-service-detail-section scroll-section" aria-label={`${activeCategory.label} capabilities`}>
                <div className="svc-service-detail-white-field" aria-hidden="true" />

                <div className="svc-service-detail-copy">
                  <p className="svc-service-detail-kicker">{activeCategory.kicker}</p>
                  <ScrollSectionTitle className="svc-service-detail-title">
                    {activeCategory.titleLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </ScrollSectionTitle>
                  <span className="svc-service-detail-title-rule" aria-hidden="true" />
                  <p className="svc-service-detail-description">{activeCategory.description}</p>
                </div>

                <div className="svc-service-detail-feature-list" role="list" aria-label={`${activeCategory.label} capabilities`}>
                  {activeCategory.features.map((feature) => (
                    <article className="svc-service-detail-feature" key={feature.title} role="listitem">
                      <div className="svc-service-detail-feature-icon" aria-hidden="true">
                        <ServiceIcon kind={feature.icon} />
                        <MobileServiceIcon kind={feature.icon} />
                      </div>
                      <span className="svc-service-detail-feature-rule" aria-hidden="true" />
                      <div className="svc-service-detail-feature-copy">
                        <h3>{feature.title}</h3>
                        <p>{feature.copy}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <section className="svc-process-section scroll-section" aria-label="How Felmex works">
              <div className="svc-process-heading">
                <ScrollSectionTitle>How we work</ScrollSectionTitle>
                <span className="svc-process-heading-rule" aria-hidden="true" />
                <p>
                  Our streamlined process ensures your cargo is handled with care, delivered on time,
                  and backed by full visibility at every stage.
                </p>
              </div>

              <div
                className="svc-process-grid"
                role="list"
                aria-label="Felmex service process"
                ref={processGridRef}
                onScroll={handleProcessScroll}
              >
                {PROCESS_STEPS.map((step) => (
                  <article className="svc-process-card" key={step.title} role="listitem">
                    <div className="svc-process-card-icon" aria-hidden="true">
                      <ProcessIcon kind={step.icon} />
                    </div>
                    <span className="svc-process-card-rule" aria-hidden="true" />
                    <div className="svc-process-card-copy">
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="svc-process-dots" aria-label="Process carousel navigation">
                {PROCESS_STEPS.map((step, index) => (
                  <button
                    className={`svc-process-dot${index === activeProcessIndex ? ' is-active' : ''}`}
                    type="button"
                    key={step.title}
                    aria-label={`Show ${step.title} process step`}
                    aria-current={index === activeProcessIndex ? 'step' : undefined}
                    onClick={() => scrollProcessToIndex(index)}
                  />
                ))}
              </div>
            </section>

            <section className="svc-solution-section" aria-label="Felmex logistics promise">
              <img
                className="svc-solution-image"
                src="/service-promise-ship.png"
                alt=""
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />

              <div className="svc-solution-brief scroll-section">
                <ScrollSectionTitle>
                  <span>Integrated</span>
                  <span className="svc-solution-title-accent">Logistics</span>
                  <span>Solutions</span>
                </ScrollSectionTitle>
                <p>
                  Our integrated logistics solutions are built to drive efficiency, reduce costs and
                  create lasting value across your supply chain<span className="svc-red-punctuation">.</span>
                </p>
              </div>

              <div className="svc-solution-statement scroll-section">
                <ScrollSectionTitle>
                  <span>Reliable</span>
                  <span className="svc-solution-title-accent">Delivery</span>
                </ScrollSectionTitle>
                <p>
                  We go beyond logistics to deliver reliability, efficiency and peace of mind at
                  every step of the journey<span className="svc-red-punctuation">.</span>
                </p>
              </div>
            </section>

            <section className="svc-faq-section scroll-section" aria-labelledby="svc-faq-title">
              <div className="svc-faq-heading">
                <span className="svc-faq-heading-rule" aria-hidden="true" />
                <ScrollSectionTitle id="svc-faq-title">
                  Frequently Asked Questions<span>.</span>
                </ScrollSectionTitle>
                <p>
                  Find answers to common questions about our services, processes and how we can
                  help your business<span>.</span>
                </p>
              </div>

              <div className="svc-faq-list">
                {FAQ_ITEMS.map((item, index) => {
                  const isFaqOpen = index === openFaqIndex;
                  const answerId = `svc-faq-answer-${index + 1}`;
                  const buttonId = `svc-faq-button-${index + 1}`;

                  return (
                    <article
                      className={`svc-faq-item${isFaqOpen ? ' is-open' : ''}`}
                      key={item.question}
                    >
                      <button
                        className="svc-faq-button"
                        type="button"
                        id={buttonId}
                        aria-expanded={isFaqOpen}
                        aria-controls={answerId}
                        onClick={() => handleFaqToggle(index)}
                      >
                        <span className="svc-faq-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="svc-faq-divider" aria-hidden="true" />
                        <span className="svc-faq-question">{item.question}</span>
                        <span className="svc-faq-toggle" aria-hidden="true" />
                      </button>
                      <div
                        className="svc-faq-answer"
                        id={answerId}
                        role="region"
                        aria-labelledby={buttonId}
                        aria-hidden={!isFaqOpen}
                      >
                        <div className="svc-faq-answer-inner">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="svc-final-cta scroll-section" aria-label="Start a logistics conversation">
              <div className="svc-final-cta-panel">
                <div className="svc-final-cta-heading">
                  <ScrollSectionTitle>
                    <span>Let&rsquo;s Move Your </span>
                    <span>Business </span>
                    <span>
                      Forward, <strong>Together.</strong>
                    </span>
                  </ScrollSectionTitle>
                  <span className="svc-final-cta-rule" aria-hidden="true" />
                </div>
                <div className="svc-final-cta-copy">
                  <p>
                    Partner with FELMEX Global Logistics for seamless, reliable, and scalable
                    logistics solutions that drive growth and open new opportunities.
                  </p>
                  <a className="svc-final-cta-link" href="/contact">
                    <span>Get in Touch</span>
                    <span className="svc-final-cta-arrow" aria-hidden="true">
                      <span className="svc-final-cta-arrow-text">-&gt;</span>
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M4.8 12h13.4m-5.7-5.8 5.8 5.8-5.8 5.8" />
                      </svg>
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
