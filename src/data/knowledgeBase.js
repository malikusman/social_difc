// ── DIFC Knowledge Base — source of truth the agent retrieves answers from ───
// Content reflects publicly available DIFC setup guidance (illustrative for demo).

export const KB_ARTICLES = [
  {
    id: 'kb-reg-01',
    title: 'How to register a company in DIFC',
    category: 'company-registration',
    tags: ['setup', 'incorporation', 'register', 'how to start', 'new company'],
    summary: 'Six-step incorporation path from activity selection to commercial licence.',
    body: `Setting up in DIFC follows six core steps:
1. Choose your business activity and legal structure (e.g. Private Company Ltd, branch, foundation).
2. Reserve a unique company name with the Registrar of Companies (ROC).
3. Submit your application via the DIFC Portal with a business plan, shareholder/director details and constitutional documents (Memorandum & Articles of Association).
4. Receive in-principle approval.
5. Lease approved office or co-working space within the Centre.
6. Receive your Commercial Licence and Certificate of Incorporation, then open a corporate bank account.

Regulated financial firms additionally require approval from the DFSA. Most non-regulated setups complete in 2–4 weeks once documents are in order.`,
    confidence: 0.97,
    lastUpdated: '2026-05-12',
    link: 'https://www.difc.com/business/establish-a-business',
  },
  {
    id: 'kb-fee-01',
    title: 'DIFC licence costs & fees',
    category: 'licensing-fees',
    tags: ['cost', 'fee', 'price', 'how much', 'licence fee', 'registration fee', 'renewal'],
    summary: 'Indicative registration, annual licence and office costs, plus Innovation discounts.',
    body: `Indicative DIFC cost ranges (vary by activity and structure):
• Application & registration: one-time fee depending on entity type.
• Annual commercial licence: renewed each year, typically 80–100% of the initial licence cost.
• Office/co-working: required physical space, priced by size and location.
• Innovation/FinTech licence: discounted rates from ~USD 1,500/year for qualifying tech startups under the Innovation Licence.
• Prescribed Companies (holding/SPV structures): low-cost incorporation with a modest annual renewal.

A typical first-year all-in budget for a standard non-regulated firm ranges from roughly AED 65,000 to AED 100,000. We recommend a tailored quote from the Business Development team.`,
    confidence: 0.9,
    lastUpdated: '2026-05-28',
    link: 'https://www.difc.com/business/establish-a-business/financial-firms',
  },
  {
    id: 'kb-fintech-01',
    title: 'DIFC Innovation Hub & FinTech licence',
    category: 'sector-fintech',
    tags: ['fintech', 'startup', 'innovation', 'tech', 'ai campus', 'accelerator', 'innovation licence'],
    summary: 'Innovation Licence, AI Campus and the Innovation Hub ecosystem for startups.',
    body: `The DIFC Innovation Hub is the largest cluster of tech and innovation firms in the region (1,000+ companies). Highlights:
• Innovation Licence: discounted commercial licence for tech firms and startups, with co-working access.
• Dubai AI Campus: dedicated community for AI and Web3 ventures.
• Access to venture capital, accelerators and the DFSA Innovation Testing Licence (regulatory sandbox) for fintech firms testing regulated products.
The Innovation Hub team supports startups from idea to scale-up.`,
    confidence: 0.94,
    lastUpdated: '2026-04-30',
    link: 'https://www.difc.com/whats-on/innovation-hub',
  },
  {
    id: 'kb-visa-01',
    title: 'Visas & employee sponsorship',
    category: 'visas-employees',
    tags: ['visa', 'employee', 'sponsor', 'residence', 'work permit', 'establishment card', 'staff'],
    summary: 'Establishment card, employee visa allocation and the GoVisaly portal.',
    body: `Once incorporated, your DIFC entity can sponsor employees:
1. Obtain your Establishment Card from DIFC Government Services.
2. Apply for employee residence visas; the number is linked to your leased office space.
3. Manage applications through the DIFC Government Services portal.
Family sponsorship and dependent visas are available to eligible employees. Processing typically takes a few working days per stage.`,
    confidence: 0.92,
    lastUpdated: '2026-05-05',
    link: 'https://www.difc.com/business/operating/government-services',
  },
  {
    id: 'kb-office-01',
    title: 'Office space & co-working in DIFC',
    category: 'office-space',
    tags: ['office', 'space', 'co-working', 'desk', 'lease', 'fit-out', 'rent'],
    summary: 'Physical office requirement, co-working desks and fitted offices.',
    body: `DIFC requires every registered entity to hold approved physical space within the Centre. Options:
• Co-working desks (DIFC Innovation Hub) — ideal for startups and small teams.
• Serviced/fitted offices — move-in ready, flexible terms.
• Core/shell offices — for larger firms wanting bespoke fit-out.
Your office size determines your employee visa allocation. The Real Estate & Leasing team can match space to your headcount plan.`,
    confidence: 0.91,
    lastUpdated: '2026-03-22',
    link: 'https://www.difc.com/business/operating/real-estate',
  },
  {
    id: 'kb-wills-01',
    title: 'DIFC Wills & Foundations',
    category: 'foundations-wills',
    tags: ['will', 'wills', 'foundation', 'inheritance', 'estate', 'succession', 'asset protection'],
    summary: 'Non-Muslim wills registration and DIFC Foundations for succession planning.',
    body: `• DIFC Wills Service Centre: allows non-Muslims to register a will covering assets in the UAE, ensuring distribution per their wishes under common-law principles.
• DIFC Foundations: a flexible vehicle for wealth structuring, succession planning and asset protection, popular with family offices.
Both are administered under DIFC's independent common-law framework. Appointments can be booked online.`,
    confidence: 0.93,
    lastUpdated: '2026-04-10',
    link: 'https://www.difc.com/business/establish-a-business/wills-service',
  },
  {
    id: 'kb-courts-01',
    title: 'DIFC Courts — jurisdiction & filing',
    category: 'difc-courts',
    tags: ['court', 'courts', 'dispute', 'litigation', 'claim', 'legal', 'judgment'],
    summary: 'Independent English-language common-law courts for civil & commercial disputes.',
    body: `The DIFC Courts are an independent English-language, common-law judiciary handling civil and commercial disputes. Parties worldwide can opt in to DIFC Courts jurisdiction by agreement. Services include the Small Claims Tribunal, a digital e-registry for filing, and enforcement of judgments. For specific case or filing queries, the DIFC Courts registry is the authoritative contact.`,
    confidence: 0.89,
    lastUpdated: '2026-02-18',
    link: 'https://www.difccourts.ae/',
  },
  {
    id: 'kb-sector-01',
    title: 'DIFC business sectors overview',
    category: 'sector-wealth',
    tags: ['sector', 'banking', 'wealth', 'asset management', 'insurance', 'family office', 'hedge fund'],
    summary: 'The five core clusters that make DIFC the leading financial centre in MEASA.',
    body: `DIFC hosts the largest concentration of financial firms in the MEASA region:
• Banking & Capital Markets — 25 of the world's top 30 banks.
• Wealth & Asset Management — 400+ firms, including hedge funds and 10,000+ funds managed or marketed.
• Insurance & Reinsurance — the region's leading hub.
• FinTech & Innovation — fastest-growing cluster, 1,000+ firms.
• Family Offices & Foundations — a global centre for private wealth.
Our Business Development team can advise on the right structure for your sector.`,
    confidence: 0.95,
    lastUpdated: '2026-05-20',
    link: 'https://www.difc.com/business',
  },
]
