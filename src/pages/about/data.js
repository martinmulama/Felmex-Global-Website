export const OVERVIEW_STACK_MOBILE_QUERY = '(max-width: 900px)';

export const HERO_OPERATING_ITEMS = [
  {
    title: 'Structured planning',
    detail: 'before movement begins',
    icon: 'checklist',
  },
  {
    title: 'Practical milestone',
    detail: 'reporting during transit',
    icon: 'signal',
  },
  {
    title: 'Clear closure after',
    detail: 'delivery confirmation',
    icon: 'shield',
  },
];

export const OVERVIEW_CARDS = [
  {
    id: 'who-we-are',
    tone: 'is-abyss',
    label: 'Who we are',
    index: '01',
    title: 'A logistics partner focused on certainty, not noise.',
    intro: [
      'We support importers, exporters, distributors, and growing regional operations with multimodal logistics built around reliability.',
      'Our model protects handoffs, clarifies accountability, and keeps communication practical so teams can make fast decisions.',
    ],
    highlights: [
      'Serving Africa, Europe, Asia, Middle East, Americas and Oceania',
      '24/7 operations support',
      'Air, sea, road, rail',
    ],
    agendaTitle: 'Execution mandate',
    agendaCopy:
      'We keep every shipment practical, visible, and owned from start to closure.',
    agendaItems: [
      'Single team accountability across every handoff.',
      'Early risk signalling before disruption becomes delay.',
      'Decision clarity with cost, timing, and tradeoff context.',
    ],
    signal: [
      {
        value: 'Serving',
        label: 'Africa, Europe, Asia, Middle East, Americas and Oceania',
        icon: 'globe',
      },
      { value: '24/7', label: 'Ops response', icon: 'cube' },
      { value: '4', label: 'Modes', icon: 'plane' },
    ],
    cta: { label: 'Get a quote', href: '/contact' },
  },
  {
    id: 'how-we-operate',
    tone: 'is-graphite',
    label: 'How we operate',
    index: '02',
    title: 'Principles behind every Felmex shipment.',
    points: [
      'One accountable team owns movement from booking to proof of delivery.',
      'Compliance and documentation are validated early to reduce border friction.',
      'Commercial terms and tradeoffs are explained clearly before execution starts.',
      'Milestone reporting stays consistent across every stage of the shipment.',
    ],
    agendaTitle: 'Operating standard',
    agendaCopy:
      'The same disciplined operating standard applies to every lane and every account.',
    agendaItems: [
      'Documentation and customs readiness locked in early.',
      'Escalation ownership defined before movement begins.',
      'Client updates tied to practical milestones, not noise.',
    ],
    signal: [
      { value: '1', label: 'Accountable team' },
      { value: '100%', label: 'Pre-check discipline' },
      { value: 'Live', label: 'Milestone reporting' },
    ],
    cta: { label: 'Explore services', href: '/services' },
  },
  {
    id: 'our-workflow',
    tone: 'is-midnight',
    label: 'Our workflow',
    index: '03',
    title: 'From first brief to final delivery closure.',
    steps: [
      'Understand lane requirements, urgency, and compliance constraints.',
      'Build the movement plan with mode, checkpoints, and ownership defined.',
      'Execute with live tracking and early exception handling.',
      'Close with proof of delivery and next-shipment insights.',
    ],
    agendaTitle: 'Outcome focus',
    agendaCopy:
      'Our workflow is designed to reduce surprises and improve repeat-shipment performance.',
    agendaItems: [
      'Tighter lead-time control and faster response windows.',
      'Cleaner closure data for procurement and operations teams.',
      'Continuous improvement between one shipment and the next.',
    ],
    signal: [
      { value: '01', label: 'Plan' },
      { value: '02', label: 'Execute' },
      { value: '03', label: 'Close' },
    ],
    cta: { label: 'Talk to our team', href: '/contact' },
  },
];

export const CONTINENT_REACH = [
  {
    id: 'africa',
    label: 'Africa',
    copy: 'Our operating base starts in East Africa, where regional road, port, and customs work shaped the discipline behind every Felmex movement.',
  },
  {
    id: 'europe',
    label: 'Europe',
    copy: 'European trade lanes extended that discipline into planned import and export programs with stronger documentation follow-through.',
  },
  {
    id: 'asia',
    label: 'Asia',
    copy: 'Asian sourcing corridors added volume, timing pressure, and manufacturing handoffs that sharpened our planning workflows.',
  },
  {
    id: 'middle-east',
    label: 'Middle East',
    copy: 'Middle East hubs became a bridge for transit, consolidation, and commercial routing between Africa, Asia, and Europe.',
  },
  {
    id: 'americas',
    label: 'Americas',
    copy: 'Cross-ocean programs into the Americas pushed us to keep long-distance milestones clear from origin planning to final closure.',
  },
  {
    id: 'oceania',
    label: 'Oceania',
    copy: 'Oceania completes the reach with distance-heavy movements that depend on practical routing, early exceptions, and patient visibility.',
  },
];

export const TEAM_MEMBERS = [
  {
    id: 'lilian',
    name: 'Lilian Mwende',
    role: 'Managing Director',
    focus: 'Commercial and growth strategy',
    bio: 'Leads long-term partnerships and regional expansion while keeping client outcomes at the center of execution.',
    photo: 'https://images.unsplash.com/photo-1763757321162-95c0de309d22?auto=format&fit=crop&w=900&q=80',
    base: 'Nairobi HQ',
    experience: '12+ years in freight leadership',
    specialties: ['Strategic partnerships', 'Regional expansion', 'Executive escalation'],
    accent: '#eb3027',
  },
  {
    id: 'brian',
    name: 'Brian Kimani',
    role: 'Head of Operations',
    focus: 'Multimodal execution control',
    bio: 'Coordinates air, sea, road, and rail movements with strict milestone ownership across handoff points.',
    photo: 'https://images.unsplash.com/photo-1769636929354-59165ba73c7e?auto=format&fit=crop&w=900&q=80',
    base: 'Mombasa Hub',
    experience: '10+ years in operations control',
    specialties: ['Air and sea handoffs', 'Milestone governance', 'Exception recovery'],
    accent: '#1d63ee',
  },
  {
    id: 'sarah',
    name: 'Sarah Achieng',
    role: 'Compliance Lead',
    focus: 'Customs and border readiness',
    bio: 'Oversees declarations and documentation quality to reduce holds, amendments, and cross-border delays.',
    photo: 'https://images.unsplash.com/photo-1769636930016-5d9f0ca653aa?auto=format&fit=crop&w=900&q=80',
    base: 'Nairobi HQ',
    experience: '9+ years in trade compliance',
    specialties: ['Customs documentation', 'Border readiness', 'Regulatory updates'],
    accent: '#2e9f3f',
  },
  {
    id: 'daniel',
    name: 'Daniel Otieno',
    role: 'Warehouse Manager',
    focus: 'Storage and dispatch performance',
    bio: 'Runs controlled receiving, stock visibility, and release workflows for faster outbound reliability.',
    photo: 'https://images.unsplash.com/photo-1610903866883-c280999dcc0e?auto=format&fit=crop&w=900&q=80',
    base: 'Inland Warehouse',
    experience: '8+ years in warehouse operations',
    specialties: ['Inventory visibility', 'Dispatch cadence', 'SLA compliance'],
    accent: '#e67e22',
  },
  {
    id: 'faith',
    name: 'Faith Njeri',
    role: 'Client Success Manager',
    focus: 'Service reporting and escalation',
    bio: 'Keeps stakeholders aligned with proactive updates, practical issue resolution, and performance follow-through.',
    photo: 'https://images.unsplash.com/photo-1769636929266-8057f2c5ed52?auto=format&fit=crop&w=900&q=80',
    base: 'Nairobi HQ',
    experience: '7+ years in client delivery',
    specialties: ['Stakeholder communication', 'Performance reporting', 'Issue resolution'],
    accent: '#7c4dff',
  },
  {
    id: 'samuel',
    name: 'Samuel Kibet',
    role: 'Transport Coordinator',
    focus: 'Route planning and delivery consistency',
    bio: 'Manages dispatch cadence and lane adjustments to protect lead-time commitments under changing conditions.',
    photo: 'https://images.unsplash.com/photo-1668752600261-e56e7f3780b6?auto=format&fit=crop&w=900&q=80',
    base: 'Regional Transport Desk',
    experience: '8+ years in transport planning',
    specialties: ['Route optimization', 'Carrier coordination', 'Lead-time control'],
    accent: '#0d9488',
  },
];

export const TEAM_PILLARS = [
  {
    id: 'commercial',
    label: 'Commercial direction',
    icon: 'target',
  },
  {
    id: 'execution',
    label: 'Execution control',
    icon: 'shield',
  },
  {
    id: 'compliance',
    label: 'Compliance readiness',
    icon: 'document',
  },
  {
    id: 'client',
    label: 'Client communication',
    icon: 'message',
  },
];
