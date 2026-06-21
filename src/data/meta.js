// ── Reference data: channels, intents, business lines, team ──────────────────

export const CHANNELS = {
  instagram: { id: 'instagram', label: 'Instagram', color: '#E1306C', short: 'IG', surface: 'DM + Comments' },
  linkedin:  { id: 'linkedin',  label: 'LinkedIn',  color: '#0A66C2', short: 'IN', surface: 'Comments (DMs: human)' },
  facebook:  { id: 'facebook',  label: 'Facebook',  color: '#1877F2', short: 'FB', surface: 'DM + Comments' },
  x:         { id: 'x',         label: 'X',         color: '#111827', short: 'X',  surface: 'DM + Mentions' },
  tiktok:    { id: 'tiktok',    label: 'TikTok',    color: '#0EA5A0', short: 'TT', surface: 'Comments' },
  youtube:   { id: 'youtube',   label: 'YouTube',   color: '#FF0000', short: 'YT', surface: 'Comments' },
}

export const INTENTS = {
  'company-registration': { label: 'Company Registration', color: '#01516C', businessLine: 'Registrar of Companies (ROC)' },
  'licensing-fees':       { label: 'Licensing & Fees',     color: '#0A6E8F', businessLine: 'Business Development' },
  'visas-employees':      { label: 'Visas & Employees',    color: '#2E8B9E', businessLine: 'Government Services' },
  'office-space':         { label: 'Office Space',         color: '#3F7D8C', businessLine: 'Real Estate & Leasing' },
  'sector-fintech':       { label: 'FinTech & Innovation', color: '#B8924A', businessLine: 'DIFC Innovation Hub' },
  'sector-wealth':        { label: 'Wealth & Asset Mgmt',  color: '#8A6D2F', businessLine: 'Business Development' },
  'sector-banking':       { label: 'Banking & Capital',    color: '#6E5524', businessLine: 'Business Development' },
  'sector-insurance':     { label: 'Insurance & Reinsurance', color: '#9C7E3A', businessLine: 'Business Development' },
  'foundations-wills':    { label: 'Foundations & Wills',  color: '#566B5E', businessLine: 'Wills Service / Foundations' },
  'difc-courts':          { label: 'DIFC Courts',          color: '#4A5568', businessLine: 'DIFC Courts' },
  'events-general':       { label: 'Events & General',     color: '#7C8A93', businessLine: 'Marketing & Community' },
  'complaint':            { label: 'Complaint / Sensitive',color: '#C0392B', businessLine: 'Client Relations (priority)' },
}

export const BUSINESS_LINES = [
  'Registrar of Companies (ROC)',
  'Business Development',
  'Government Services',
  'Real Estate & Leasing',
  'DIFC Innovation Hub',
  'Wills Service / Foundations',
  'DIFC Courts',
  'Marketing & Community',
  'Client Relations (priority)',
]

export const TEAM = [
  { id: 'a1', name: 'Layla Al Marri',    role: 'Client Relations Lead',  initials: 'LM', online: true },
  { id: 'a2', name: 'Omar Haddad',       role: 'Business Development',    initials: 'OH', online: true },
  { id: 'a3', name: 'Sara Khan',         role: 'Innovation Hub',          initials: 'SK', online: false },
  { id: 'a4', name: 'James Whitfield',   role: 'Registrar Services',      initials: 'JW', online: true },
]

export const STATUS = {
  new:        { label: 'New', color: '#0A6E8F', bg: '#E6EEF1' },
  ai_handled: { label: 'AI Resolved', color: '#15803d', bg: '#dcfce7' },
  awaiting:   { label: 'Awaiting Approval', color: '#B8924A', bg: '#FBF2DF' },
  escalated:  { label: 'Escalated', color: '#C0392B', bg: '#FDE8E4' },
  human:      { label: 'With Agent', color: '#6b21a8', bg: '#f3e8ff' },
}

// SLA target minutes by priority
export const SLA_TARGET_MIN = { high: 15, medium: 60, low: 240 }
