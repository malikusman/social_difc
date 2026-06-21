// ── Dashboard analytics (static, illustrative) ──────────────────────────────

export const KPIS = {
  totalEnquiries: 3482,
  totalDeltaPct: 18.4,
  aiResolved: 2613,
  aiResolvedPct: 75.0,
  avgFirstResponseSec: 14,
  avgFirstResponseDeltaPct: -62,
  leadsCaptured: 487,
  leadsDeltaPct: 24.1,
  slaCompliancePct: 96.3,
  escalationRatePct: 11.2,
  csat: 4.6,
}

// Enquiry volume over last 14 days (AI vs escalated to human)
export const VOLUME_TREND = [
  { day: '07 Jun', ai: 168, human: 31 },
  { day: '08 Jun', ai: 152, human: 24 },
  { day: '09 Jun', ai: 205, human: 38 },
  { day: '10 Jun', ai: 221, human: 33 },
  { day: '11 Jun', ai: 198, human: 29 },
  { day: '12 Jun', ai: 176, human: 22 },
  { day: '13 Jun', ai: 142, human: 18 },
  { day: '14 Jun', ai: 159, human: 21 },
  { day: '15 Jun', ai: 231, human: 41 },
  { day: '16 Jun', ai: 248, human: 44 },
  { day: '17 Jun', ai: 263, human: 39 },
  { day: '18 Jun', ai: 241, human: 35 },
  { day: '19 Jun', ai: 219, human: 30 },
  { day: '20 Jun', ai: 188, human: 27 },
]

// Channel split (volume share). Instagram + LinkedIn lead.
export const CHANNEL_SPLIT = [
  { channel: 'Instagram', value: 1142, color: '#E1306C' },
  { channel: 'LinkedIn', value: 968, color: '#0A66C2' },
  { channel: 'Facebook', value: 612, color: '#1877F2' },
  { channel: 'X', value: 348, color: '#111827' },
  { channel: 'TikTok', value: 244, color: '#0EA5A0' },
  { channel: 'YouTube', value: 168, color: '#FF0000' },
]

// Intent / enquiry category breakdown
export const INTENT_SPLIT = [
  { intent: 'Company Registration', value: 742, color: '#01516C' },
  { intent: 'Licensing & Fees', value: 631, color: '#0A6E8F' },
  { intent: 'FinTech & Innovation', value: 458, color: '#B8924A' },
  { intent: 'Visas & Employees', value: 389, color: '#2E8B9E' },
  { intent: 'Office Space', value: 311, color: '#3F7D8C' },
  { intent: 'Wealth & Asset Mgmt', value: 268, color: '#8A6D2F' },
  { intent: 'Foundations & Wills', value: 201, color: '#566B5E' },
  { intent: 'DIFC Courts', value: 174, color: '#4A5568' },
  { intent: 'Events & General', value: 233, color: '#7C8A93' },
  { intent: 'Complaints', value: 75, color: '#C0392B' },
]

// Response time by channel (avg, seconds for AI first-touch)
export const RESPONSE_BY_CHANNEL = [
  { channel: 'Instagram', sec: 9 },
  { channel: 'Facebook', sec: 11 },
  { channel: 'X', sec: 13 },
  { channel: 'TikTok', sec: 18 },
  { channel: 'YouTube', sec: 22 },
  { channel: 'LinkedIn', sec: 41 },
]

// Hourly enquiry heat (0-23h) — shows peak load coverage
export const HOURLY_LOAD = [
  4, 3, 2, 2, 1, 2, 5, 11, 19, 28, 34, 31,
  29, 33, 38, 36, 30, 27, 33, 41, 38, 26, 15, 8,
]

// Business-line routing volumes (Phase-2 handoff readiness)
export const ROUTING = [
  { line: 'Registrar of Companies (ROC)', value: 742, pct: 21 },
  { line: 'Business Development', value: 899, pct: 26 },
  { line: 'DIFC Innovation Hub', value: 458, pct: 13 },
  { line: 'Government Services', value: 389, pct: 11 },
  { line: 'Real Estate & Leasing', value: 311, pct: 9 },
  { line: 'Wills / Foundations', value: 201, pct: 6 },
  { line: 'DIFC Courts', value: 174, pct: 5 },
  { line: 'Marketing & Community', value: 233, pct: 7 },
  { line: 'Client Relations (priority)', value: 75, pct: 2 },
]

// Language mix
export const LANGUAGE_MIX = [
  { lang: 'English', value: 81, color: '#01516C' },
  { lang: 'Arabic', value: 14, color: '#B8924A' },
  { lang: 'Other', value: 5, color: '#7C8A93' },
]
