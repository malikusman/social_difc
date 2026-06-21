import { CHANNELS } from '../data/meta'

// ── DIFC "The Gate" emblem ───────────────────────────────────────────────────
// Stylised portal/arch inspired by DIFC's iconic Gate building. Tile + glyph.
// To use the official asset instead, drop it in /public and swap the <svg> for
// <img src="/difc-logo.svg" .../> — see README "Branding".
export function DifcEmblem({ size = 38, light = false }) {
  const tile = light ? '#FFFFFF' : '#01516C'
  const glyph = light ? '#01516C' : '#FFFFFF'
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DIFC">
      <rect width="48" height="48" rx="11" fill={tile} />
      {/* The Gate: portal with arched void */}
      <path
        d="M11 38 V21 a13 13 0 0 1 26 0 V38 H30 V21 a6 6 0 0 0 -12 0 V38 Z"
        fill={glyph}
      />
      <rect x="22" y="30" width="4" height="8" rx="1" fill={glyph} opacity="0.55" />
    </svg>
  )
}

// DIFC wordmark lockup (brand-accurate; uses Plus Jakarta Sans + brand blue)
export function DifcLogo({ light = false, withEmblem = true, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {withEmblem && <DifcEmblem size={36} light={light} />}
      <div>
        <div className={`difc-font-display font-extrabold tracking-[0.04em] leading-none ${light ? 'text-white' : 'text-difc-blue'}`}>
          <span className="text-[20px]">DIFC</span>
        </div>
        <div className={`text-[8.5px] font-semibold uppercase tracking-[0.14em] mt-1 ${light ? 'text-white/55' : 'text-difc-grey-light'}`}>
          Social Enquiry Intelligence
        </div>
      </div>
    </div>
  )
}

// Compact brand glyphs as inline SVG paths
const GLYPHS = {
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </g>
  ),
  linkedin: (
    <g fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9z" />
    </g>
  ),
  facebook: (
    <g fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </g>
  ),
  x: (
    <g fill="currentColor">
      <path d="M17.5 3h3l-7.1 8.12L22 21h-6.4l-4.6-6-5.3 6H2.7l7.6-8.7L2 3h6.6l4.16 5.5zM16.3 19h1.66L7.8 4.9H6z" />
    </g>
  ),
  tiktok: (
    <g fill="currentColor">
      <path d="M16.5 3c.3 2.2 1.6 3.7 3.5 4v3c-1.4.05-2.7-.3-3.9-1v6.1A6.1 6.1 0 1 1 10 9.1v3.2a2.9 2.9 0 1 0 2.3 2.84V3z" />
    </g>
  ),
  youtube: (
    <g fill="currentColor">
      <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.77-1.78C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.83.42A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.77 1.78C4.7 18.9 12 18.9 12 18.9s7.3 0 8.83-.42a2.5 2.5 0 0 0 1.77-1.78C23 15.2 23 12 23 12zM9.75 15V9l5.2 3z" />
    </g>
  ),
}

export function ChannelIcon({ channel, size = 16, className = '' }) {
  const meta = CHANNELS[channel]
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={{ color: meta?.color }}>
      {GLYPHS[channel]}
    </svg>
  )
}

export function ChannelChip({ channel, withLabel = false }) {
  const meta = CHANNELS[channel]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold"
      style={{ backgroundColor: `${meta.color}14`, color: meta.color }}
      title={`${meta.label} · ${meta.surface}`}
    >
      <ChannelIcon channel={channel} size={13} />
      {withLabel && meta.label}
    </span>
  )
}

export function Avatar({ initials, color = '#01516C', size = 40 }) {
  return (
    <div
      className="shrink-0 rounded-full grid place-items-center font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.36, background: `linear-gradient(135deg, ${color}, ${shade(color, -18)})` }}
    >
      {initials}
    </div>
  )
}

function shade(hex, percent) {
  const n = parseInt(hex.slice(1), 16)
  let r = (n >> 16) + percent
  let g = ((n >> 8) & 0xff) + percent
  let b = (n & 0xff) + percent
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
