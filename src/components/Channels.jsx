import { CheckCircle2, AlertTriangle, XCircle, Bot, UserCheck, ShieldCheck, Workflow } from 'lucide-react'
import { ChannelIcon } from './Brand'

// Capability matrix grounded in the feasibility research
const CHANNEL_SETUP = [
  {
    id: 'instagram', label: 'Instagram', handle: '@DIFC',
    api: 'Meta Graph API (Instagram Login)', dm: 'auto', comments: 'auto',
    note: 'Full inbound DM + comment automation. 24-hour reply window; bot disclosed. Requires App Review + Business Verification.',
  },
  {
    id: 'facebook', label: 'Facebook', handle: 'DIFC',
    api: 'Messenger Platform + Graph API', dm: 'auto', comments: 'auto',
    note: 'Full DM + comment automation via Pages. Same 24-hour window. Pairs with Instagram under one Meta app.',
  },
  {
    id: 'linkedin', label: 'LinkedIn', handle: 'DIFC',
    api: 'Community Management API (partner-gated)', dm: 'human', comments: 'auto',
    note: 'Comments on Page posts can be automated. No compliant API for DM automation — DMs routed to human agents in the native inbox.',
  },
  {
    id: 'x', label: 'X', handle: '@DIFC',
    api: 'X API v2 (paid tier)', dm: 'auto', comments: 'auto',
    note: 'DMs + mentions automatable, but API access is a recurring paid cost (pay-per-use / Pro tier). Cost to confirm.',
  },
  {
    id: 'tiktok', label: 'TikTok', handle: '@DIFC',
    api: 'TikTok API for Business', dm: 'none', comments: 'auto',
    note: 'Comment management via Business API. DM API is partner-gated and region-restricted — treat as comments-only.',
  },
  {
    id: 'youtube', label: 'YouTube', handle: 'DIFC',
    api: 'YouTube Data API v3', dm: 'none', comments: 'auto',
    note: 'Comment read/reply/moderation only — YouTube has no DM system. Daily write quota applies.',
  },
]

const CAP = {
  auto: { label: 'Automated', icon: CheckCircle2, cls: 'text-emerald-600 bg-emerald-50' },
  human: { label: 'Human-handled', icon: UserCheck, cls: 'text-difc-gold bg-difc-gold/10' },
  none: { label: 'N/A', icon: XCircle, cls: 'text-difc-grey-light bg-difc-sand' },
}

function Cap({ kind }) {
  const c = CAP[kind]
  const Icon = c.icon
  return <span className={`pill ${c.cls}`}><Icon size={12} /> {c.label}</span>
}

export default function Channels() {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">
      {/* Banner */}
      <div className="rounded-2xl bg-white shadow-card border border-black/[0.04] p-5 flex items-start gap-3">
        <div className="grid place-items-center h-11 w-11 rounded-xl bg-difc-blue text-white shrink-0"><ShieldCheck size={22} /></div>
        <div>
          <h2 className="difc-font-display text-lg font-bold text-difc-blue-deep">Compliant by design — official APIs only</h2>
          <p className="text-[13px] text-difc-grey-light mt-1 max-w-3xl">Every connection below uses official platform APIs (no scraping, no unofficial automation). Capabilities reflect what each platform genuinely permits — this is what keeps a government brand's verified accounts safe.</p>
        </div>
      </div>

      {/* Channel cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {CHANNEL_SETUP.map((ch) => (
          <div key={ch.id} className="bg-white rounded-2xl shadow-card border border-black/[0.04] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-difc-sand"><ChannelIcon channel={ch.id} size={22} /></div>
              <div className="flex-1">
                <p className="font-bold text-difc-blue-deep">{ch.label}</p>
                <p className="text-[11.5px] text-difc-grey-light">{ch.handle} · Connected</p>
              </div>
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-pulse-ring" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" /></span>
            </div>
            <p className="text-[11px] text-difc-grey-light mb-2">{ch.api}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] text-difc-grey-light w-16">DMs</span><Cap kind={ch.dm} />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] text-difc-grey-light w-16">Comments</span><Cap kind={ch.comments} />
            </div>
            <p className="text-[11.5px] text-difc-grey leading-relaxed border-t border-black/5 pt-3">{ch.note}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="rounded-2xl bg-white shadow-card border border-black/[0.04] p-5">
        <h3 className="text-[15px] font-bold difc-font-display text-difc-blue-deep mb-4 flex items-center gap-2"><Workflow size={17} /> How an enquiry flows</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { icon: Bot, t: 'Capture', d: 'Inbound DM/comment received via official API webhook' },
            { icon: Bot, t: 'Understand', d: 'Intent, sentiment, language & lead signals classified' },
            { icon: ShieldCheck, t: 'Ground', d: 'Answer retrieved from DIFC knowledge base' },
            { icon: UserCheck, t: 'Human-in-loop', d: 'Agent approves, edits or escalates the draft' },
            { icon: CheckCircle2, t: 'Resolve & log', d: 'Reply sent, lead captured, audit trail recorded' },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="relative rounded-xl bg-difc-sand/50 p-4">
                <div className="grid place-items-center h-9 w-9 rounded-lg bg-difc-blue text-white mb-2"><Icon size={17} /></div>
                <p className="text-[13px] font-bold text-difc-blue-deep">{i + 1}. {s.t}</p>
                <p className="text-[11.5px] text-difc-grey-light mt-1 leading-snug">{s.d}</p>
              </div>
            )
          })}
        </div>
        <div className="mt-4 rounded-xl bg-difc-gold/10 border border-difc-gold/30 p-3.5 flex items-start gap-2.5">
          <AlertTriangle size={16} className="text-difc-gold shrink-0 mt-0.5" />
          <p className="text-[12px] text-difc-grey leading-relaxed"><b>Phase 1 scope:</b> English auto-replies on Instagram & Facebook DMs + comments across all channels; LinkedIn DMs and Arabic replies are human-approved. <b>Phase 2:</b> CRM/ticketing routing, full Arabic automation, and SLA workflow integration.</p>
        </div>
      </div>
    </div>
  )
}
