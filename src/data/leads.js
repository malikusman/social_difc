// ── Captured leads (static) — routed by business line, deduplicated ──────────

export const LEADS = [
  { id: 'L-2041', name: 'Robert King', org: 'Atlas Reinsurance', channel: 'linkedin', intent: 'Insurance & Reinsurance', line: 'Business Development', score: 91, value: 'High', status: 'Qualified', captured: '5m ago' },
  { id: 'L-2040', name: 'Grace Mwangi', org: 'Savannah Capital', channel: 'linkedin', intent: 'Wealth & Asset Mgmt', line: 'Business Development', score: 95, value: 'High', status: 'In Progress', captured: '1h ago' },
  { id: 'L-2039', name: 'Helena Vogt', org: 'Vogt Family Office', channel: 'linkedin', intent: 'Foundations & Wills', line: 'Wills / Foundations', score: 88, value: 'High', status: 'Qualified', captured: '1h ago' },
  { id: 'L-2038', name: 'Aisha Rahman', org: 'Rahman Asset Mgmt', channel: 'instagram', intent: 'Company Registration', line: 'Registrar of Companies', score: 82, value: 'High', status: 'New', captured: '3m ago' },
  { id: 'L-2037', name: 'Fatima Al Zahra', org: 'AZ Advisory', channel: 'instagram', intent: 'Office Space', line: 'Real Estate & Leasing', score: 79, value: 'Medium', status: 'In Progress', captured: '55m ago' },
  { id: 'L-2036', name: 'Daniel Osei', org: 'PayStack MENA', channel: 'linkedin', intent: 'FinTech & Innovation', line: 'DIFC Innovation Hub', score: 74, value: 'Medium', status: 'New', captured: '8m ago' },
  { id: 'L-2035', name: 'Khalid Mansour', org: 'Mansour Holdings', channel: 'instagram', intent: 'Company Registration', line: 'Registrar of Companies', score: 70, value: 'Medium', status: 'New', captured: '11m ago' },
  { id: 'L-2034', name: 'Priya Nair', org: 'Nair Consulting', channel: 'facebook', intent: 'Licensing & Fees', line: 'Business Development', score: 68, value: 'Medium', status: 'New', captured: '14m ago' },
  { id: 'L-2033', name: 'Lina Saab', org: 'Lina Builds', channel: 'tiktok', intent: 'FinTech & Innovation', line: 'DIFC Innovation Hub', score: 55, value: 'Low', status: 'Nurture', captured: '3h ago' },
  { id: 'L-2032', name: 'Sofia Marchetti', org: 'Marchetti Wealth', channel: 'instagram', intent: 'Wealth & Asset Mgmt', line: 'Business Development', score: 84, value: 'High', status: 'Qualified', captured: '4h ago' },
  { id: 'L-2031', name: 'Andre Costa', org: 'Costa Ventures', channel: 'linkedin', intent: 'FinTech & Innovation', line: 'DIFC Innovation Hub', score: 66, value: 'Medium', status: 'Nurture', captured: '6h ago' },
  { id: 'L-2030', name: 'Mei Lin', org: 'Lin Capital', channel: 'facebook', intent: 'Company Registration', line: 'Registrar of Companies', score: 72, value: 'Medium', status: 'In Progress', captured: '8h ago' },
]

export const LEAD_STATUS_COLORS = {
  New: { color: '#0A6E8F', bg: '#E6EEF1' },
  Qualified: { color: '#15803d', bg: '#dcfce7' },
  'In Progress': { color: '#B8924A', bg: '#FBF2DF' },
  Nurture: { color: '#6b21a8', bg: '#f3e8ff' },
}
