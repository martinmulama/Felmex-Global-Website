export const SERVICE_DETAILS = {
  air: {
    intro:
      'Air freight is designed for cargo where timing is critical and delays can disrupt production, launches, or customer commitments. We coordinate capacity, documentation, and airport handoffs so urgent shipments move with control end-to-end.',
    whoItsFor: 'Teams moving urgent, high-value, or time-sensitive cargo across regional or global lanes.',
    painPoints: [
      'Missed uplift windows and unstable transit visibility',
      'Weak coordination between origin and destination handlers',
      'High emergency costs caused by reactive rebooking',
    ],
    consequence:
      'If this is not fixed, service promises slip, operating costs rise, and customer confidence drops.',
    offer:
      'We run a managed air freight workflow with proactive milestone updates and rapid escalation support.',
    whatYouGet: [
      {
        title: 'Priority & deferred air options',
        detail: 'Matched to urgency',
        icon: 'air',
      },
      {
        title: 'Milestone tracking',
        detail: 'From booking to final handoff',
        icon: 'pin',
      },
      {
        title: 'Pre-dispatch document checks',
        detail: 'To reduce clearance issues',
        icon: 'document',
      },
      {
        title: 'Exception handling support',
        detail: 'For schedule disruption',
        icon: 'shield',
      },
    ],
    howItWorks: [
      'Define shipment profile, timing, and lane requirements.',
      'Secure capacity and prepare documentation early.',
      'Monitor uplift, transit, and destination handling milestones.',
      'Close with delivery confirmation and reporting updates.',
    ],
    differentiation:
      'Our model focuses on prevention first, not just reaction after delays occur.',
  },
  sea: {
    intro:
      'Sea freight gives you scalable movement for planned-volume cargo at stronger cost efficiency. We manage FCL and LCL flows with clear route planning, carrier alignment, and transit oversight.',
    whoItsFor: 'Import and export teams moving regular containerized cargo across global trade lanes.',
    painPoints: [
      'Rolling schedules and inconsistent ETA reliability',
      'Port release delays that affect downstream delivery plans',
      'Limited container-level visibility through transit',
    ],
    consequence:
      'When unmanaged, inventory plans drift and landed-cost performance becomes harder to control.',
    offer:
      'We treat sea freight as a structured program with lane-level planning and proactive shipment monitoring.',
    whatYouGet: [
      {
        title: 'FCL and LCL planning',
        detail: 'By lane and volume pattern',
        icon: 'ship',
      },
      {
        title: 'Container milestone tracking',
        detail: 'With ETA monitoring',
        icon: 'pin',
      },
      {
        title: 'Port documentation coordination',
        detail: 'For smoother release',
        icon: 'document',
      },
      {
        title: 'Recovery planning',
        detail: 'For rolled or disrupted sailings',
        icon: 'shield',
      },
    ],
    howItWorks: [
      'Map cargo profile, lanes, and target transit windows.',
      'Book sailings based on reliability and cost fit.',
      'Track milestones and communicate schedule changes early.',
      'Coordinate destination handoff for final delivery.',
    ],
    differentiation:
      'We combine commercial flexibility with shipment-level control throughout the ocean cycle.',
  },
  road: {
    intro:
      'Road freight keeps regional and cross-border movement reliable through better dispatch and handoff coordination. We plan routes and monitor delivery checkpoints so cargo flows without avoidable delays.',
    whoItsFor: 'Businesses that depend on domestic distribution, border movement, and dependable last-mile delivery.',
    painPoints: [
      'Route disruption and low dispatch predictability',
      'Communication gaps between pickup, transit, and delivery teams',
      'Late proof-of-delivery closure and visibility gaps',
    ],
    consequence:
      'Without structured control, lead times become unstable and customer delivery trust declines.',
    offer:
      'We provide end-to-end road execution with active dispatch oversight and milestone communication.',
    whatYouGet: [
      {
        title: 'Cross-border dispatch coordination',
        detail: 'Across domestic and regional lanes',
        icon: 'truck',
      },
      {
        title: 'Route sequencing',
        detail: 'Aligned to delivery commitments',
        icon: 'route',
      },
      {
        title: 'Live status communication',
        detail: 'With fast escalation handling',
        icon: 'chat',
      },
      {
        title: 'Proof-of-delivery closure',
        detail: 'For cleaner service reporting',
        icon: 'receipt',
      },
    ],
    howItWorks: [
      'Plan routes, slots, and priority service windows.',
      'Coordinate pickup and movement milestones in sequence.',
      'Escalate and resolve in-transit exceptions quickly.',
      'Complete delivery closure with documented proof.',
    ],
    differentiation:
      'We run road freight with control-tower communication across every handoff point.',
  },
  rail: {
    intro:
      'Rail freight is ideal for bulk and corridor-based movement where consistency and cost control matter. We integrate rail with first-mile and last-mile operations for a smooth multimodal flow.',
    whoItsFor: 'Manufacturers and distributors moving high-volume freight along predictable inland corridors.',
    painPoints: [
      'Poor coordination between rail terminals and truck transfers',
      'Low visibility on schedule shifts across interchanges',
      'Complex handoffs that increase total transit uncertainty',
    ],
    consequence:
      'If unresolved, throughput slows and operational planning loses accuracy.',
    offer:
      'We manage rail logistics as one connected workflow from loading to final destination delivery.',
    whatYouGet: [
      {
        title: 'Rail lane suitability planning',
        detail: 'To design the right mode mix',
        icon: 'train',
      },
      {
        title: 'Terminal handoff coordination',
        detail: 'Across interchanges and transfers',
        icon: 'route',
      },
      {
        title: 'First-mile to last-mile linkage',
        detail: 'In one connected movement plan',
        icon: 'link',
      },
      {
        title: 'Milestone visibility',
        detail: 'Across terminals and destination delivery',
        icon: 'chart',
      },
    ],
    howItWorks: [
      'Assess lane fit and freight profile for rail use.',
      'Build a joined rail-truck movement plan.',
      'Track milestones across terminals and transitions.',
      'Coordinate destination delivery and completion.',
    ],
    differentiation:
      'We simplify multimodal complexity by owning the full rail-connected chain.',
  },
  warehouse: {
    intro:
      'Cold and general warehousing supports storage, handling, and dispatch readiness with strict control standards. We maintain stock visibility and movement discipline to keep outbound fulfillment fast and accurate.',
    whoItsFor: 'FMCG, retail, and distribution teams needing dependable storage plus quick release-to-delivery flow.',
    painPoints: [
      'Inventory uncertainty due to weak receiving controls',
      'Slow dispatch caused by unstructured pick-pack operations',
      'Handling risk for temperature-sensitive or high-value stock',
    ],
    consequence:
      'Without improvement, storage costs rise while service levels and order fulfillment speed decline.',
    offer:
      'We operate warehousing as a high-control node that keeps goods protected, visible, and dispatch-ready.',
    whatYouGet: [
      {
        title: 'Cold and ambient storage',
        detail: 'With handling discipline',
        icon: 'snow',
      },
      {
        title: 'Receiving and stock controls',
        detail: 'For visibility from put-away onward',
        icon: 'warehouse',
      },
      {
        title: 'Pick-pack-staging workflows',
        detail: 'To speed up release readiness',
        icon: 'checklist',
      },
      {
        title: 'Outbound dispatch coordination',
        detail: 'With inventory reporting',
        icon: 'truck',
      },
    ],
    howItWorks: [
      'Receive and verify inbound cargo against shipment plans.',
      'Assign storage based on handling and temperature needs.',
      'Process orders through controlled pick and staging.',
      'Release outbound cargo with route-aligned dispatch.',
    ],
    differentiation:
      'Our warehouse process is designed around downstream delivery speed, not just storage capacity.',
  },
  customs: {
    intro:
      'Customs clearance and brokerage protects your cargo flow by keeping compliance tight and border processing predictable. We validate declarations early and manage authority coordination through final release.',
    whoItsFor: 'Import-export operations that need reliable compliance execution and fewer border surprises.',
    painPoints: [
      'Declaration errors that trigger holds or amendments',
      'Low transparency during customs review stages',
      'Slow escalation when inspections or disputes arise',
    ],
    consequence:
      'When unmanaged, border delays increase dwell costs and disrupt delivery plans downstream.',
    offer:
      'We deliver compliance-first brokerage with proactive checks, clear status updates, and rapid exception handling.',
    whatYouGet: [
      {
        title: 'Declaration support',
        detail: 'For imports and exports',
        icon: 'document',
      },
      {
        title: 'Document validation',
        detail: 'Before customs submission',
        icon: 'checklist',
      },
      {
        title: 'Authority coordination',
        detail: 'Including inspection support',
        icon: 'building',
      },
      {
        title: 'Release tracking',
        detail: 'Through final clearance completion',
        icon: 'pin',
      },
    ],
    howItWorks: [
      'Review cargo profile and applicable regulatory requirements.',
      'Prepare and validate declarations and supporting documents.',
      'Submit, monitor, and engage authorities as required.',
      'Track clearance milestones until release closure.',
    ],
    differentiation:
      'We reduce customs risk by fixing compliance gaps before they reach the border.',
  },
  project: {
    intro:
      'OOG project logistics handles oversized and specialized cargo with detailed planning and risk-controlled execution. We coordinate route studies, permits, lifting plans, and milestone sequencing for safe movement.',
    whoItsFor: 'Project cargo owners and industrial teams moving heavy, non-standard, or oversized loads.',
    painPoints: [
      'Permit and route constraints for oversized movement',
      'Higher handling risk across lifting and transfer stages',
      'Complex stakeholder coordination across project timelines',
    ],
    consequence:
      'Without specialist planning, timelines slip and operational risk rises significantly.',
    offer:
      'We provide a project logistics framework that aligns engineering, compliance, and execution in one plan.',
    whatYouGet: [
      {
        title: 'Route feasibility planning',
        detail: 'For oversized cargo movement',
        icon: 'ruler',
      },
      {
        title: 'Permit coordination',
        detail: 'Across relevant jurisdictions',
        icon: 'document',
      },
      {
        title: 'Specialist lift oversight',
        detail: 'For rigging and handling stages',
        icon: 'crane',
      },
      {
        title: 'Milestone management',
        detail: 'Through final placement',
        icon: 'flag',
      },
    ],
    howItWorks: [
      'Scope dimensions, weight, and route limitations.',
      'Secure permits and specialist movement requirements.',
      'Execute transport with strict sequence control.',
      'Deliver and close with completion reporting.',
    ],
    differentiation:
      'Our project team combines technical planning rigor with grounded execution discipline.',
  },
  distribution: {
    intro:
      'FMCG inter-cross border distribution is built for fast-moving supply chains where replenishment timing is critical. We coordinate routes and delivery cycles to keep shelves stocked and network performance stable.',
    whoItsFor: 'FMCG brands and distributors running high-frequency cross-border replenishment programs.',
    painPoints: [
      'Stockouts caused by inconsistent replenishment timing',
      'Fragmented lane coordination across multiple markets',
      'Limited visibility across multi-drop delivery performance',
    ],
    consequence:
      'If not addressed, service levels drop, revenue opportunities are lost, and customer loyalty weakens.',
    offer:
      'We run a distribution model centered on repeatability, speed, and real-time operational coordination.',
    whatYouGet: [
      {
        title: 'Distribution planning',
        detail: 'For high-frequency FMCG cycles',
        icon: 'boxes',
      },
      {
        title: 'Route and dispatch setup',
        detail: 'Based on demand rhythms',
        icon: 'route',
      },
      {
        title: 'Multi-destination tracking',
        detail: 'Across every delivery checkpoint',
        icon: 'pin',
      },
      {
        title: 'Performance insights',
        detail: 'For ongoing optimization',
        icon: 'chart',
      },
    ],
    howItWorks: [
      'Map demand cadence and replenishment priorities by lane.',
      'Build route and dispatch plans for consistent turnaround.',
      'Coordinate movement and delivery checkpoints in real time.',
      'Review outcomes and refine for next-cycle performance.',
    ],
    differentiation:
      'Our distribution execution is tuned to FMCG speed and consistency, not generic freight timing.',
  },
};

export const DEFAULT_SERVICE_DETAIL = {
  intro: '',
  whoItsFor: '',
  painPoints: [],
  consequence: '',
  offer: '',
  whatYouGet: [],
  howItWorks: [],
  differentiation: '',
};

export const SERVICE_MEDIA = {
  air: '/air-freight.webp',
  sea: '/sea-freight.webp',
  road: '/road-freight.webp',
  rail: '/rail-freight.webp',
  warehouse: '/cold-general-warehousing.webp',
  customs: '/customs-clearance-brokerage.webp',
  project: '/sea-freight.webp',
  distribution: '/cold-general-warehousing.webp',
};

export const SERVICE_STRIP_ITEMS = [
  {
    value: 'Plan',
    label: 'before delays compound',
    detail: 'Routing, documentation, and handling checkpoints are aligned before cargo starts moving.',
  },
  {
    value: 'Track',
    label: 'every handoff clearly',
    detail: 'Milestones stay visible across pickup, border processing, transit, storage, and delivery.',
  },
  {
    value: 'Clear',
    label: 'border friction early',
    detail: 'Compliance checks and customs coordination happen before holds start slowing the flow.',
  },
  {
    value: 'Shift',
    label: 'fast when plans change',
    detail: 'Teams get escalation support and recovery options when schedules, lanes, or volumes move.',
  },
  {
    value: 'Scale',
    label: 'across modes and markets',
    detail: 'Air, sea, road, rail, warehousing, and distribution run through one operating model.',
  },
  {
    value: 'Close',
    label: 'with proof and control',
    detail: 'Delivery confirmation, reporting, and final handoff discipline keep the shipment cycle complete.',
  },
];

export const SERVICE_STRIP_COPIES = 2;

export const SERVICE_STATS = [
  { value: '8', label: 'core service lines', iconKey: 'distribution' },
  {
    value: 'Serving',
    label: 'Africa, Europe, Asia, Middle East, Americas and Oceania',
    iconKey: 'sea',
  },
  { value: '24/7', label: 'shipment visibility', iconKey: 'air' },
  { value: '1', label: 'accountable logistics partner', iconKey: 'customs' },
];
