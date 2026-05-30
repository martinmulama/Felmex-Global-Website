const REPORTS = [
  {
    slug: 'east-africa-surface-freight-outlook-q2-2026',
    category: 'Felmex Intelligence',
    title: 'East Africa Surface Freight Outlook: Corridor Reliability Is Improving, But Gate Friction Persists',
    dek: 'Q2 planning should prioritize early compliance lock-in, dual-lane routing for sensitive cargo, and disciplined gate-slot execution across Mombasa and Dar corridors.',
    date: 'March 27, 2026',
    updated: 'March 27, 2026',
    readTime: '7 min read',
    analyst: 'Network Strategy Desk',
    image: '/road-freight.webp',
    imageAlt: 'Cargo truck convoy moving through a regional freight corridor',
    imageCaption: 'Regional road freight remains the most flexible mode for time-sensitive inland distribution.',
    stats: [
      { label: 'Gate-release improvement', value: '18%' },
      { label: 'Average corridor dwell reduction', value: '11h' },
      { label: 'Volatility reduction with dual-lane routing', value: '24%' },
    ],
    keyTakeaways: [
      'Early document readiness produced the strongest reliability gains this quarter.',
      'Final gate release remains the largest source of dispatch-time variance.',
      'Dual-lane planning outperformed single-lane commitments during peak congestion days.',
    ],
    sections: [
      {
        id: 'network-performance',
        heading: '1. Corridor Performance Is Stabilizing',
        paragraphs: [
          'Through Q1 2026, corridor execution improved as shippers front-loaded documentation and tightened dispatch synchronization between port-side teams and inland consolidation partners.',
          'The most consistent gains were visible on flows with daily carrier coordination calls and pre-verified customs packets. These lanes showed fewer severe rollover incidents and shorter dwell at transfer nodes.',
        ],
      },
      {
        id: 'remaining-friction',
        heading: '2. The Bottleneck Has Shifted To Gate Handoffs',
        paragraphs: [
          'While vessel and rail sequencing is cleaner than a year ago, last-mile gate exits still create schedule drift. Variability now clusters around release windows, amendment cycles, and off-peak staffing gaps.',
          'In practical terms, this means route planning alone no longer protects delivery promises. Teams need gate-slot discipline and operational redundancy built into dispatch plans before trucks are assigned.',
        ],
      },
      {
        id: 'planning-approach',
        heading: '3. What To Prioritize In Q2',
        paragraphs: [
          'Felmex recommends locking compliance readiness 48 hours earlier for sensitive cargo classes and pre-allocating surge capacity only to high-penalty deliveries.',
          'Where possible, pair a primary inland route with a pre-cleared fallback lane. This improves continuity when localized delays appear and prevents a single handoff event from cascading across the schedule.',
        ],
      },
      {
        id: 'operating-rhythm',
        heading: '4. Operating Rhythm Matters More Than One-Off Fixes',
        paragraphs: [
          'Weekly scenario planning is outperforming monthly planning cycles in volatile lanes. The shorter cadence allows teams to respond to policy shifts, weather events, and terminal congestion before service deterioration compounds.',
          'Organizations that tied control-tower updates to daily dispatch thresholds made faster routing decisions and reduced emergency escalations in the final 72 hours before delivery milestones.',
        ],
      },
    ],
    sources: [
      {
        label: 'Port of Los Angeles February 2026 cargo release',
        href: 'https://portoflosangeles.org/references/2026-news-releases/news_031226_feb_cargo',
      },
      {
        label: 'Drewry World Container Index (March 2026)',
        href: 'https://www.drewry.co.uk/maritime-research-opinion-browser/world-container-index-assessed-by-drewry',
      },
      {
        label: 'IATA January 2026 air cargo performance',
        href: 'https://www.iata.org/en/pressroom/2026-releases/2026-03-02-01/',
      },
    ],
  },
];

export const DEFAULT_REPORT_SLUG = REPORTS[0].slug;

export function findReportBySlug(slug) {
  return REPORTS.find((report) => report.slug === slug) ?? null;
}
