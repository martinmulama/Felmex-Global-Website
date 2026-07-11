import { useState } from 'react';
import './ServicePage.css';

const SERVICE_HANDLING_PRINCIPLES = [
  {
    icon: 'globe',
    title: 'Global Coverage',
    description: 'Extensive network of trusted partners and carriers worldwide.',
  },
  {
    icon: 'shield',
    title: 'Reliable & Secure',
    description: 'Your cargo is protected with industry-leading safety standards.',
  },
  {
    icon: 'cube',
    title: 'Flexible Solutions',
    description: 'FCL, LCL, and specialty shipping options tailored to your needs.',
  },
  {
    icon: 'stopwatch',
    title: 'On-Time Delivery',
    description: 'Dependable transit times and proactive shipment tracking.',
  },
  {
    icon: 'headset',
    title: 'Expert Support',
    description: 'Dedicated logistics experts supporting you every step.',
  },
];

const SERVICE_CATEGORY_GROUPS = [
  {
    id: 'multimodal',
    label: 'Multi-Modal Transport Solutions',
    icon: 'distribution',
    intro:
      'One accountable plan connecting air, sea, road, rail, warehousing, and delivery teams.',
    entries: [
      {
        title: 'Customs Clearance',
        summary:
          'Fast, compliant, and hassle-free customs clearance with complete documentation support.',
        metrics: [
          { value: '10K+', label: 'Shipments Cleared Annually' },
          { value: '99.2%', label: 'Compliance Accuracy' },
          { value: '24H', label: 'Average Clearance Time' },
        ],
      },
      {
        title: 'Ocean Freight',
        summary:
          'Reliable FCL and LCL solutions with global reach and competitive transit times.',
        metrics: [
          { value: '150+', label: 'Global Ports Served' },
          { value: '98%', label: 'On-Time Performance' },
          { value: '24/7', label: 'Real-Time Tracking' },
        ],
      },
      {
        title: 'Air Freight',
        summary:
          'Speed-critical shipments delivered with priority handling and global airline partnerships.',
        metrics: [
          { value: '200+', label: 'Airlines Partnered' },
          { value: '120+', label: 'Countries Connected' },
          { value: '99.7%', label: 'On-Time Performance' },
        ],
      },
      {
        title: 'Warehousing & Distribution',
        summary:
          'Secure storage, inventory management, and efficient distribution tailored to your needs.',
        metrics: [
          { value: '500K+', label: 'Sq. Ft. Warehouse Space' },
          { value: '99.5%', label: 'Inventory Accuracy' },
          { value: '48H', label: 'Average Order Turnaround' },
        ],
      },
      {
        title: 'Project Cargo',
        summary:
          'Specialized handling for oversized and complex cargo with end-to-end expertise.',
        metrics: [
          { value: '500+', label: 'Projects Delivered' },
          { value: '60+', label: 'Heavy Lift Specialists' },
          { value: '100%', label: 'Safety Record' },
        ],
      },
    ],
  },
  {
    id: 'freight',
    label: 'International Freight Forwarding',
    icon: 'sea',
    intro:
      'Structured freight forwarding for global lanes, carrier coordination, and destination handoff control.',
    entries: [
      {
        title: 'Ocean Freight',
        summary:
          'FCL and LCL cargo is planned with sailing reliability, port readiness, and downstream delivery in view.',
        highlights: ['Carrier booking', 'Port coordination', 'ETA visibility'],
      },
      {
        title: 'Air Freight',
        summary:
          'Urgent and high-value cargo moves through priority handling, document checks, and destination monitoring.',
        highlights: ['Priority routing', 'Airport handoff', 'Urgent support'],
      },
      {
        title: 'Road Linkage',
        summary:
          'Inland pickup and delivery legs are tied to freight milestones so port or airport release does not stall.',
        highlights: ['Dispatch planning', 'Border readiness', 'Delivery control'],
      },
      {
        title: 'Rail Options',
        summary:
          'Corridor-based cargo can shift into rail-connected movement where volume, cost, and reliability align.',
        highlights: ['Lane review', 'Terminal handoff', 'Mode balance'],
      },
      {
        title: 'Destination Handoff',
        summary:
          'Arrival, release, and final delivery are sequenced with clear reporting until the shipment is closed.',
        highlights: ['Arrival tracking', 'Release support', 'Final delivery'],
      },
    ],
  },
  {
    id: 'customs',
    label: 'Customs & Trade Facilitation',
    icon: 'customs',
    intro:
      'Compliance-first clearance support that reduces border friction before it becomes cargo delay.',
    entries: [
      {
        title: 'Document Review',
        summary:
          'Commercial, transport, and regulatory documents are checked early for gaps that can trigger holds.',
        highlights: ['Pre-checks', 'Data accuracy', 'Risk flags'],
      },
      {
        title: 'Declaration Support',
        summary:
          'Clearance entries are prepared with the right classification, values, and supporting details.',
        highlights: ['Entry preparation', 'Tariff support', 'Submission readiness'],
      },
      {
        title: 'Authority Coordination',
        summary:
          'We manage communication with relevant agencies and keep clients informed through review stages.',
        highlights: ['Agency follow-up', 'Stage updates', 'Clear responses'],
      },
      {
        title: 'Inspection Handling',
        summary:
          'Inspection requests, amendments, and release issues are escalated with practical next steps.',
        highlights: ['Inspection support', 'Issue response', 'Release focus'],
      },
      {
        title: 'Trade Advisory',
        summary:
          'Recurring clearance patterns are reviewed to help teams improve documentation and future border flow.',
        highlights: ['Compliance guidance', 'Process learning', 'Better readiness'],
      },
    ],
  },
  {
    id: 'supply-chain',
    label: 'Supply Chain Management',
    icon: 'rail',
    intro:
      'Practical supply chain coordination that turns movement, storage, partners, and reporting into one operating rhythm.',
    entries: [
      {
        title: 'Demand Alignment',
        summary:
          'Shipment planning starts with business timing, replenishment pressure, and the service promise to protect.',
        highlights: ['Need mapping', 'Flow planning', 'Priority setting'],
      },
      {
        title: 'Route Sequencing',
        summary:
          'Routes, pickup windows, and handoff responsibilities are organized around reliable execution.',
        highlights: ['Lane design', 'Window control', 'Partner clarity'],
      },
      {
        title: 'Inventory Flow',
        summary:
          'Stock movement is connected to receiving, storage, dispatch, and delivery decisions.',
        highlights: ['Stock visibility', 'Release timing', 'Fulfillment rhythm'],
      },
      {
        title: 'Performance Review',
        summary:
          'Operational outcomes are reviewed to improve repeatability, communication, and future planning.',
        highlights: ['Service checks', 'Root cause review', 'Better cadence'],
      },
      {
        title: 'Scalable Control',
        summary:
          'The same management rhythm can support new lanes, new markets, and changing cargo patterns.',
        highlights: ['Growth support', 'Lane expansion', 'Stable process'],
      },
    ],
  },
  {
    id: 'warehouse',
    label: 'Warehousing & Distribution',
    icon: 'warehouse',
    intro:
      'Storage, handling, staging, and dispatch built around visibility, protection, and faster release.',
    entries: [
      {
        title: 'Receiving Control',
        summary:
          'Inbound cargo is checked against shipment plans and prepared for accurate stock visibility.',
        highlights: ['Goods verification', 'Receiving records', 'Put-away readiness'],
      },
      {
        title: 'Storage Management',
        summary:
          'Cold and general storage decisions are made around cargo condition, access needs, and dispatch priority.',
        highlights: ['Condition care', 'Stock control', 'Space discipline'],
      },
      {
        title: 'Pick Pack Staging',
        summary:
          'Orders are prepared through structured handling steps that keep outbound cargo accurate and ready.',
        highlights: ['Order accuracy', 'Handling care', 'Staging flow'],
      },
      {
        title: 'Distribution Dispatch',
        summary:
          'Outbound release is coordinated with route plans, vehicle availability, and delivery commitments.',
        highlights: ['Dispatch timing', 'Route alignment', 'Delivery readiness'],
      },
      {
        title: 'Proof Closure',
        summary:
          'Delivery outcomes and inventory movement are closed with records that support clean reporting.',
        highlights: ['Proof records', 'Stock updates', 'Service closure'],
      },
    ],
  },
  {
    id: 'parcel',
    label: 'Parcel & Courier',
    icon: 'parcel',
    intro:
      'Reliable document, parcel, e-commerce, medical, and commercial courier movement with clear handoff control.',
    entries: [
      {
        title: 'Pickup Scheduling',
        summary:
          'Collection is planned around sender readiness, route availability, and delivery urgency.',
        highlights: ['Collection plan', 'Sender updates', 'Priority check'],
      },
      {
        title: 'Parcel Sorting',
        summary:
          'Items are prepared by destination, handling need, and service level before dispatch.',
        highlights: ['Destination sorting', 'Handling labels', 'Dispatch queue'],
      },
      {
        title: 'Priority Movement',
        summary:
          'Time-sensitive parcels are monitored through movement and handoff points to reduce avoidable waiting.',
        highlights: ['Fast routing', 'Handoff checks', 'Movement updates'],
      },
      {
        title: 'Recipient Updates',
        summary:
          'Delivery communication keeps the receiving side ready and reduces failed handoff risk.',
        highlights: ['Arrival notice', 'Contact clarity', 'Handoff readiness'],
      },
      {
        title: 'Delivery Confirmation',
        summary:
          'Final proof and service notes are captured so clients can close the delivery cycle with confidence.',
        highlights: ['Proof capture', 'Client update', 'Cycle closure'],
      },
    ],
  },
];

const SERVICE_BODY_ITEMS = [
  {
    number: '01',
    titleLines: ['Ocean', 'Freight'],
    summary:
      'Reliable and cost-effective ocean freight solutions for shipments of any size, anywhere in the world. We provide flexible options, strong carrier relationships, and expert handling to ensure your cargo arrives safely and on schedule.',
    summaryLines: [
      'Reliable and cost-effective ocean freight solutions',
      'for shipments of any size, anywhere in the world.',
      'We provide flexible options, strong carrier',
      'relationships, and expert handling to ensure your',
      'cargo arrives safely and on schedule.',
    ],
    href: '/contact',
    titleSide: 'left',
  },
  {
    number: '02',
    titleLines: ['Air', 'Freight'],
    summary:
      'Fast and secure air freight services to meet your urgent shipping needs. With priority handling and global reach, we keep your cargo moving - on time, every time.',
    summaryLines: [
      'Fast and secure air freight services to meet your',
      'urgent shipping needs. With priority handling',
      'and global reach, we keep your cargo moving',
      '- on time, every time.',
    ],
    href: '/contact',
    titleSide: 'right',
    showCopyNumber: true,
  },
  {
    number: '03',
    titleLines: ['Customs', 'Brokerage'],
    summary:
      'Expert customs clearance and compliance support to keep your cargo moving without delays. We handle documentation, regulatory requirements, and duty optimization with precision.',
    summaryLines: [
      'Expert customs clearance and compliance support',
      'to keep your cargo moving without delays. We',
      'handle documentation, regulatory requirements,',
      'and duty optimization with precision.',
    ],
    href: '/contact',
    titleSide: 'left',
  },
  {
    number: '04',
    titleLines: ['Warehousing', '& Distribution'],
    summary:
      'Secure warehousing and efficient distribution solutions tailored to your supply chain needs. From inventory management to order fulfilment, we help you store smarter and deliver faster.',
    summaryLines: [
      'Secure warehousing and efficient distribution',
      'solutions tailored to your supply chain needs.',
      'From inventory management to order fulfilment,',
      'we help you store smarter and deliver faster.',
    ],
    href: '/contact',
    titleSide: 'right',
    showCopyNumber: true,
  },
  {
    number: '05',
    titleLines: ['Courier &', 'Last Mile'],
    summary:
      'Dependable last-mile delivery services that ensure your shipments reach their final destination on time. Flexible, tracked, and customer-focused delivery solutions you can count on.',
    summaryLines: [
      'Dependable last-mile delivery services that',
      'ensure your shipments reach their final destination',
      'on time. Flexible, tracked, and customer-focused',
      'delivery solutions you can count on.',
    ],
    href: '/contact',
    titleSide: 'left',
  },
];

function splitServiceTitle(title) {
  const words = title.trim().split(/\s+/);

  if (words.length <= 2) {
    return words;
  }

  const ampersandIndex = words.indexOf('&');
  if (ampersandIndex > 0 && ampersandIndex < words.length - 1) {
    return [words.slice(0, ampersandIndex).join(' '), words.slice(ampersandIndex).join(' ')];
  }

  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')];
}

function getTitleFit(title) {
  if (title.length > 30) return 'tight';
  if (title.length > 21) return 'dense';
  return undefined;
}

function getServiceBodyItems(category) {
  if (category.id === 'multimodal') {
    return SERVICE_BODY_ITEMS;
  }

  return category.entries.map((entry, index) => {
    const title = entry.title.trim();
    const isRightSideTitle = index % 2 === 1;

    return {
      number: String(index + 1).padStart(2, '0'),
      titleLines: splitServiceTitle(title),
      titleFit: getTitleFit(title),
      summary: entry.summary,
      href: '/contact',
      titleSide: isRightSideTitle ? 'right' : 'left',
      showCopyNumber: isRightSideTitle,
    };
  });
}

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

function ServiceCategoryIcon({ kind }) {
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
    <svg className="svc-category-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      {icons[kind] ?? icons.distribution}
    </svg>
  );
}

function HandlingIcon({ kind }) {
  if (kind === 'globe') {
    return (
      <svg className="svc-handling-icon" viewBox="0 0 64 64" focusable="false" aria-hidden="true">
        <circle cx="31" cy="31" r="26" className="svc-line-icon-stroke" />
        <path d="M5 31h52M31 5c7.2 7.4 10.8 16.1 10.8 26S38.2 49.6 31 57M31 5C23.8 12.4 20.2 21.1 20.2 31S23.8 49.6 31 57" className="svc-line-icon-stroke" />
        <path d="M11.8 15.2c5.3 3.2 11.7 4.8 19.2 4.8s13.9-1.6 19.2-4.8M11.8 46.8c5.3-3.2 11.7-4.8 19.2-4.8s13.9 1.6 19.2 4.8" className="svc-line-icon-stroke" />
        <circle cx="55.4" cy="12.1" r="6" className="svc-line-icon-fill" />
      </svg>
    );
  }

  if (kind === 'shield') {
    return (
      <svg className="svc-handling-icon" viewBox="0 0 64 64" focusable="false" aria-hidden="true">
        <path
          d="M32 7.5c7.7 5.5 15.6 6.1 21.8 6.8v15.4c0 13.4-8.3 22.9-21.8 27.3C18.5 52.6 10.2 43.1 10.2 29.7V14.3c6.2-.7 14.1-1.3 21.8-6.8Z"
          className="svc-line-icon-stroke"
        />
        <path d="m23.6 32 6.1 6.1 12.7-13.5" className="svc-line-icon-accent" />
      </svg>
    );
  }

  if (kind === 'cube') {
    return (
      <svg className="svc-handling-icon" viewBox="0 0 64 64" focusable="false" aria-hidden="true">
        <path d="M32 5.8 55 18.9v26.2L32 58.2 9 45.1V18.9L32 5.8Z" className="svc-line-icon-stroke" />
        <path d="M9.5 19.1 32 32.2l22.5-13.1M32 32.2v25.3" className="svc-line-icon-stroke" />
        <path d="m20.8 12.5 22.6 13.1" className="svc-line-icon-stroke" />
        <circle cx="18.2" cy="43.7" r="2.8" className="svc-line-icon-fill" />
      </svg>
    );
  }

  if (kind === 'stopwatch') {
    return (
      <svg className="svc-handling-icon" viewBox="0 0 64 64" focusable="false" aria-hidden="true">
        <path d="M31.7 16.2a21.2 21.2 0 1 1 0 42.4 21.2 21.2 0 0 1 0-42.4ZM25.1 5.9h13.2M31.7 6.2v8.3M45.9 15.5l4.7-4.7" className="svc-line-icon-stroke" />
        <path d="M31.7 37.4 43 25.8" className="svc-line-icon-accent" />
        <circle cx="31.7" cy="37.4" r="3.3" className="svc-line-icon-fill" />
        <path d="M2.8 27.7h9M6.4 36.8h6.5M2.8 45.9h9" className="svc-line-icon-accent" />
      </svg>
    );
  }

  return (
    <svg className="svc-handling-icon" viewBox="0 0 64 64" focusable="false" aria-hidden="true">
      <path d="M9.2 35.5v-5.7c0-12 9.1-21.7 22.8-21.7s22.8 9.7 22.8 21.7v5.7" className="svc-line-icon-stroke" />
      <path d="M18.8 31.7h-4.1a5 5 0 0 0-5 5v7.5a5 5 0 0 0 5 5h4.1V31.7ZM45.2 31.7h4.1a5 5 0 0 1 5 5v7.5a5 5 0 0 1-5 5h-4.1V31.7Z" className="svc-line-icon-stroke" />
      <path d="M45.2 49.2c-2.6 4.5-6.8 6.7-12.7 6.7h-5.2" className="svc-line-icon-stroke" />
      <circle cx="32" cy="55.9" r="4" className="svc-line-icon-fill" />
    </svg>
  );
}

export function ServicePage() {
  const [activeCategoryId, setActiveCategoryId] = useState(SERVICE_CATEGORY_GROUPS[0].id);
  const activeCategory =
    SERVICE_CATEGORY_GROUPS.find((category) => category.id === activeCategoryId) ??
    SERVICE_CATEGORY_GROUPS[0];
  const activeServiceBodyItems = getServiceBodyItems(activeCategory);

  return (
    <section className="svc-page" id="services-top" aria-label="Felmex services">
      <section className="svc-hero" aria-label="Services introduction">
        <div className="svc-hero-copy">
          <p className="svc-hero-kicker">Our Services</p>
          <h1 className="svc-hero-title">
            All Services<span>.</span>
          </h1>
          <span className="svc-hero-rule" aria-hidden="true" />
          <p className="svc-hero-subtitle">
            <span>End-to-end logistics solutions designed to move your business forward.</span>
            <span>Explore services built for efficiency, reliability, and growth.</span>
          </p>
          <a className="svc-hero-link" href="#svc-services-canvas">
            <span className="svc-hero-link-icon" aria-hidden="true">
              <ArrowIcon />
            </span>
            <span>View all services</span>
          </a>
        </div>
      </section>

      <section
        className="svc-reference-section"
        id="svc-services-canvas"
        aria-label="How Felmex handles services"
      >
        <div className="svc-reference-shell">
          <header className="svc-reference-header">
            <span className="svc-reference-mark" aria-hidden="true" />
            <h2 className="svc-reference-title">How we handle our services</h2>
            <p className="svc-reference-copy">
              At Felmex, every service is managed with a commitment to precision, transparency, and
              reliability. From initial planning to final delivery, our teams ensure every detail is
              coordinated across customs, carriers, and on-ground partners. With real-time visibility
              and proactive communication, we minimize risk, keep cargo moving, and deliver results
              our clients can depend on.
            </p>
          </header>

          <nav className="svc-reference-nav" aria-label="Service categories">
            <div className="svc-reference-nav-track" role="tablist" aria-label="Service categories">
              <svg
                className="svc-reference-nav-rail"
                viewBox="0 0 1200 64"
                preserveAspectRatio="none"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  d="M0 48H24V25H36V5H164V25H176V48H224V25H236V5H364V25H376V48H424V25H436V5H564V25H576V48H624V25H636V5H764V25H776V48H824V25H836V5H964V25H976V48H1024V25H1036V5H1164V25H1176V48H1200"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {SERVICE_CATEGORY_GROUPS.map((category) => {
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
                    onClick={() => setActiveCategoryId(category.id)}
                  >
                    <span className="svc-reference-tab-step" aria-hidden="true" />
                    <span className="svc-reference-tab-icon" aria-hidden="true">
                      <ServiceCategoryIcon kind={category.icon} />
                    </span>
                    <span className="svc-reference-tab-label">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          <div
            className="svc-reference-board"
            id="svc-services-shot"
            role="tabpanel"
            aria-labelledby={`svc-category-tab-${activeCategory.id}`}
            aria-label={`${activeCategory.label} services`}
          >
            <div
              key={activeCategory.id}
              className="svc-reference-card-stack"
              role="list"
              aria-label={`${activeCategory.label} service lines`}
              data-category={activeCategory.id}
            >
              {activeServiceBodyItems.map((item) => {
                const titleId = `svc-reference-title-${activeCategory.id}-${item.number}`;
                const titleFitClass = item.titleFit
                  ? ` svc-reference-card--title-${item.titleFit}`
                  : '';
                const sideClass =
                  item.titleSide === 'right' ? ' svc-reference-card--reverse' : '';
                const hasFixedSummaryLines =
                  Array.isArray(item.summaryLines) && item.summaryLines.length > 0;

                return (
                  <article
                    className={`svc-reference-card${sideClass}${titleFitClass}`}
                    key={`${activeCategory.id}-${item.number}`}
                    role="listitem"
                    aria-labelledby={titleId}
                  >
                    <div className="svc-reference-title-panel">
                      <p className="svc-reference-number">{item.number}</p>
                      <span className="svc-reference-panel-rule" aria-hidden="true" />
                      <h3 className="svc-reference-card-title" id={titleId}>
                        {item.titleLines.map((line, lineIndex) => (
                          <span key={`${line}-${lineIndex}`}>
                            {line}
                            {lineIndex === item.titleLines.length - 1 ? (
                              <span className="svc-reference-title-dot">.</span>
                            ) : null}
                          </span>
                        ))}
                      </h3>
                      {item.titleSide === 'right' ? (
                        <a className="svc-reference-title-link" href={item.href}>
                          <span>View details</span>
                          <span className="svc-reference-link-icon" aria-hidden="true">
                            <ArrowIcon />
                          </span>
                        </a>
                      ) : null}
                    </div>

                    <div className="svc-reference-detail-panel">
                      {item.showCopyNumber ? (
                        <>
                          <p className="svc-reference-copy-number">{item.number}</p>
                          <span className="svc-reference-copy-rule" aria-hidden="true" />
                        </>
                      ) : null}
                      <p
                        className={`svc-reference-summary${
                          hasFixedSummaryLines ? ' svc-reference-summary--fixed-lines' : ''
                        }`}
                      >
                        {(item.summaryLines ?? [item.summary]).map((line, lineIndex, lines) => (
                          <span className="svc-reference-summary-line" key={`${line}-${lineIndex}`}>
                            {line}
                            {lineIndex < lines.length - 1 ? ' ' : null}
                          </span>
                        ))}
                      </p>
                      <a className="svc-reference-link" href={item.href}>
                        <span>View details</span>
                        <span className="svc-reference-link-icon" aria-hidden="true">
                          <ArrowIcon />
                        </span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="svc-handling-strip" id="svc-service-principles" aria-label="Felmex service strengths">
        <div className="svc-handling-shell">
          <div className="svc-handling-heading">
            <p>Service handling principles</p>
            <h2>
              <span>Built to keep cargo</span>
              <span>
                moving with <strong>control.</strong>
              </span>
            </h2>
          </div>
          <div className="svc-handling-grid" role="list" aria-label="Felmex service strengths">
            {SERVICE_HANDLING_PRINCIPLES.map((item) => (
              <article className="svc-handling-item" key={item.title} role="listitem">
                <div className="svc-handling-icon-wrap" aria-hidden="true">
                  <HandlingIcon kind={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="svc-handling-final-cta">
            <h2>
              Let&rsquo;s Move Your Business Forward, <strong>Together.</strong>
            </h2>
            <p>
              Partner with FELMEX Global Logistics for seamless, reliable, and scalable logistics
              solutions that drive growth and open new opportunities.
            </p>
            <a className="svc-handling-final-cta-link" href="/contact">
              <span>Get in Touch</span>
              <span className="svc-handling-final-cta-arrow" aria-hidden="true">
                -&gt;
              </span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
