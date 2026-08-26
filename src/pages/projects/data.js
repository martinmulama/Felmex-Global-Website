export const HERO_METRICS = [
  {
    value: 'Serving',
    label: 'Africa, Europe, Asia, Middle East, Americas and Oceania',
    icon: 'globe',
  },
  {
    value: 'OOG',
    label: 'Current oversized cargo capability',
    icon: 'project',
  },
  {
    value: '24/7',
    label: 'Live execution oversight',
    icon: 'signal',
  },
];

export const PROJECT_SHOWCASES = [
  {
    id: 'heavy-lift',
    index: '01',
    category: 'Project logistics',
    status: 'Active program',
    faceMeta: 'Current movement: port release to inland installation site',
    title: 'Felmex is currently coordinating oversized equipment delivery from port to project site.',
    summary:
      'Our project logistics desk is currently handling oversized and non-standard cargo by aligning route surveys, permit sequencing, escort planning, and site delivery windows before the cargo starts moving.',
    image: '/sea-freight.webp',
    imageAlt: 'Container ship and port infrastructure representing complex project cargo planning',
    supportLabel: 'What Felmex is doing',
    supportValue: 'Route feasibility checks, permit alignment, lifting coordination, and milestone ownership through inland delivery.',
    points: [
      'Pre-movement planning is being used to reduce surprises once equipment leaves the port.',
      'Permit and escort readiness are coordinated per route leg instead of treated as last-minute add-ons.',
      'Site delivery timing is managed alongside handling risk, not after dispatch has already begun.',
    ],
    services: ['OOG project logistics', 'Customs clearance', 'Road coordination'],
    readMoreHref: '/services',
  },
  {
    id: 'cold-chain',
    index: '02',
    category: 'Controlled distribution',
    status: 'Active program',
    faceMeta: 'Current movement: cold storage staging to timed dispatch release',
    title: 'Felmex is currently running storage-led dispatch programs for sensitive cargo.',
    summary:
      'Our warehousing and distribution teams are currently supporting temperature-sensitive and fast-turn stock programs where receiving discipline, stock visibility, and timed release all affect downstream delivery performance.',
    image: '/cold-general-warehousing.webp',
    imageAlt: 'Warehouse operation set up for controlled storage and dispatch',
    supportLabel: 'What Felmex is doing',
    supportValue: 'Receiving control, stock visibility, release readiness, and outbound lane timing for dispatch-sensitive inventory.',
    points: [
      'Storage and release decisions are being tied to service windows rather than general warehouse cadence.',
      'Warehouse, transport, and delivery teams are working from one handoff sequence to prevent avoidable lag.',
      'Dispatch readiness stays central for high-turn and temperature-sensitive cargo programs.',
    ],
    services: ['Cold warehousing', 'Road freight', 'Cross-border distribution'],
    readMoreHref: '/services',
  },
  {
    id: 'cross-border',
    index: '03',
    category: 'Cross-border program',
    status: 'Active program',
    faceMeta: 'Current movement: border clearance through inland handoff continuity',
    title: 'Felmex is currently managing customs-led freight through border and inland handoffs.',
    summary:
      'Our customs and inland operations teams are currently supporting freight programs that depend on early document validation, border-stage visibility, and reliable continuation after release.',
    image: '/road-freight.webp',
    imageAlt: 'Road freight movement supporting cross-border project execution',
    supportLabel: 'What Felmex is doing',
    supportValue: 'Documentation readiness, customs follow-through, and inland dispatch continuity after clearance.',
    points: [
      'Compliance checks are being completed early so border pressure does not turn into avoidable holds.',
      'Client updates are tied to milestones that procurement and operations teams can act on immediately.',
      'Inland delivery planning starts before release so cargo keeps moving after customs clearance.',
    ],
    services: ['Customs brokerage', 'Road freight', 'Client reporting'],
    readMoreHref: '/services',
  },
];

export const ONGOING_PROJECTS = [
  {
    id: 'port-to-plant',
    index: '01',
    eyebrow: 'Project logistics article',
    publishedOn: 'May 2, 2026',
    readTime: '5 min read',
    title: 'Port-to-Plant Heavy Lift',
    subtitle: 'Oversized cargo routing from berth release to inland installation sequencing.',
    image: '/sea-freight.webp',
    imageAlt: 'Container vessel and heavy cargo movement representing port-to-plant project logistics',
    lead:
      'A live heavy-lift program is currently being controlled from port release through route readiness, escort alignment, and site delivery timing.',
    body:
      'This workstream brings together permit timing, route feasibility, lifting windows, and milestone communication so oversized units do not stall between the port and the final project site. The team is coordinating each handoff against real delivery constraints rather than treating inland execution as a separate phase.',
    meta: [
      { label: 'Lane', value: 'Port release to inland project site' },
      { label: 'Cargo', value: 'Oversized industrial units' },
      { label: 'Focus', value: 'Route control, escorts, cranage timing' },
      { label: 'Published', value: 'May 2, 2026' },
      { label: 'Read time', value: '5 minutes' },
    ],
    services: ['OOG logistics', 'Customs coordination', 'Road execution'],
    quote:
      'Route and lifting coordination are being tracked together so the cargo reaches site when the team is actually ready to receive it.',
    quoteAttribution: 'Current focus / project desk / inland control',
  },
  {
    id: 'cold-chain-release',
    index: '02',
    eyebrow: 'Warehousing article',
    publishedOn: 'April 28, 2026',
    readTime: '3 min read',
    title: 'Cold Chain Dispatch Window',
    subtitle: 'Sensitive inventory staging with timed release into downstream delivery lanes.',
    image: '/cold-general-warehousing.webp',
    imageAlt: 'Controlled warehouse environment supporting cold chain dispatch planning',
    lead:
      'A temperature-sensitive stock program is being staged around dispatch windows, release readiness, and warehouse-to-transport continuity.',
    body:
      'The emphasis here is on keeping receiving discipline, storage control, and outbound release tied to the same operating rhythm. Dispatch decisions are being made with delivery timing in mind, which helps protect service windows for cargo that cannot afford casual warehousing lag.',
    bodyParagraphs: [
      'The emphasis here is on keeping receiving discipline, storage control, and outbound release tied to the same operating rhythm. Dispatch decisions are being made with delivery timing in mind, which helps protect service windows for cargo that cannot afford casual warehousing lag.',
      'Inbound stock is checked against arrival documentation, temperature condition, and handling priority before it is absorbed into the staging plan. The warehouse is acting as a controlled buffer, not a passive holding point, so inventory can be received, verified, arranged, and released without losing downstream timing discipline.',
      'The dispatch window is built backwards from the delivery commitment. Loading slots, vehicle readiness, paperwork, and customer-side receiving capacity are reviewed before stock leaves controlled storage. If one input shifts, the release plan can move early enough for the warehouse and transport teams to adjust together.',
      'Visibility matters because cold chain work often fails in the quiet spaces between teams. A pallet can be correctly stored and still miss its service window if outbound staging, driver reporting, or route timing is handled separately. For this program, stock status, release priority, and lane readiness are reviewed as one operating picture.',
      'Urgent-release stock is being separated from slower-moving inventory so the dispatch floor does not become crowded by mixed priorities. Clear bay allocation, labelled staging zones, and concise dispatch notes give the transport desk a cleaner handoff, reducing last-minute searching and avoidable door-open time when vehicles arrive for collection.',
      'The result is a dispatch model where storage and movement reinforce each other. Receiving discipline protects the product, staging discipline protects the release plan, and transport coordination protects the final delivery window. For sensitive inventory, that connected rhythm turns warehousing into an active part of service performance.',
    ],
    meta: [
      { label: 'Mode', value: 'Warehousing to road distribution' },
      { label: 'Cargo', value: 'Sensitive and fast-turn inventory' },
      { label: 'Focus', value: 'Release timing and stock visibility' },
      { label: 'Published', value: 'April 28, 2026' },
      { label: 'Read time', value: '3 minutes' },
    ],
    services: ['Cold storage', 'Dispatch planning', 'Distribution control'],
    quote:
      'Release timing matters as much as storage discipline, so both teams are working from one dispatch-ready view.',
    quoteAttribution: 'Current focus / warehouse control / timed dispatch',
  },
  {
    id: 'border-continuity',
    index: '03',
    eyebrow: 'Customs article',
    publishedOn: 'April 19, 2026',
    readTime: '6 min read',
    title: 'Border Release Continuity',
    subtitle: 'Customs-led freight handoffs managed through clearance and inland continuation.',
    image: '/road-freight.webp',
    imageAlt: 'Cross-border road freight movement representing customs and inland continuity',
    lead:
      'Cross-border movements are currently being managed around document readiness, border-stage visibility, and inland continuation after customs release.',
    body:
      'The work is not stopping at brokerage clearance. Documentation checks, border follow-through, and inland dispatch planning are being treated as one continuous operating flow so released cargo keeps moving instead of waiting for the next handoff to get organised.',
    meta: [
      { label: 'Lane', value: 'Border clearance to inland delivery' },
      { label: 'Cargo', value: 'Program freight with customs dependency' },
      { label: 'Focus', value: 'Release continuity and reporting' },
      { label: 'Published', value: 'April 19, 2026' },
      { label: 'Read time', value: '6 minutes' },
    ],
    services: ['Customs brokerage', 'Road freight', 'Client milestone updates'],
    quote:
      'The critical moment is right after release, so inland movement is already being lined up before customs completes.',
    quoteAttribution: 'Current focus / brokerage team / inland handoff',
  },
  {
    id: 'airbridge-spares',
    index: '04',
    eyebrow: 'Air freight article',
    publishedOn: 'April 10, 2026',
    readTime: '4 min read',
    title: 'Airbridge Spares Response',
    subtitle: 'Urgent engineering spares routed from air arrival into site-critical delivery windows.',
    image: '/air-freight.webp',
    imageAlt: 'Aircraft and urgent cargo movement representing airbridge spare parts response',
    lead:
      'Time-critical spares are being routed from airport receipt into immediate inland delivery with escalation ownership already defined.',
    body:
      'This program is structured around speed, but not at the expense of visibility. Arrival handling, customs touchpoints, and final delivery priorities are being controlled as one response workflow so urgent replacements get to site with fewer administrative pauses.',
    meta: [
      { label: 'Mode', value: 'Air import to final-mile delivery' },
      { label: 'Cargo', value: 'Engineering and shutdown spares' },
      { label: 'Focus', value: 'Rapid release and direct dispatch' },
      { label: 'Published', value: 'April 10, 2026' },
      { label: 'Read time', value: '4 minutes' },
    ],
    services: ['Air freight', 'Clearance support', 'Priority dispatch'],
    quote:
      'The objective is to shorten decision time between arrival and delivery, not only the movement time itself.',
    quoteAttribution: 'Current focus / urgent cargo desk / rapid execution',
  },
  {
    id: 'rail-linked-program',
    index: '05',
    eyebrow: 'Rail logistics article',
    publishedOn: 'March 30, 2026',
    readTime: '5 min read',
    title: 'Rail-Linked Inland Repositioning',
    subtitle: 'Rail and road sequencing for long-haul inland equipment continuity.',
    image: '/rail-freight.webp',
    imageAlt: 'Rail-linked freight corridor representing inland repositioning and multimodal sequencing',
    lead:
      'An inland repositioning program is being coordinated across rail and road legs so long-haul equipment movement stays controlled across mode changes.',
    body:
      'Instead of treating modal transfer as a handoff gap, the team is managing schedule alignment, ground handling, and onward release as one joined plan. That helps keep inland continuity intact where timing, cargo handling, and corridor coordination all matter at the same time.',
    meta: [
      { label: 'Mode', value: 'Rail corridor plus road handoff' },
      { label: 'Cargo', value: 'Equipment and structured replenishment' },
      { label: 'Focus', value: 'Mode change continuity' },
      { label: 'Published', value: 'March 30, 2026' },
      { label: 'Read time', value: '5 minutes' },
    ],
    services: ['Rail freight', 'Road coordination', 'Program control'],
    quote:
      'The transfer point between rail and road is being planned as an active milestone, not a passive assumption.',
    quoteAttribution: 'Current focus / inland corridors / modal control',
  },
];
