import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import {
  MessageSquare, Bot, Timer, UserPlus, ShieldCheck, TrendingUp, TrendingDown, ArrowUpRight, Languages,
} from 'lucide-react'
import {
  KPIS, VOLUME_TREND, CHANNEL_SPLIT, INTENT_SPLIT, RESPONSE_BY_CHANNEL, HOURLY_LOAD, ROUTING, LANGUAGE_MIX,
} from '../data/analytics'

const fmt = (n) => n.toLocaleString('en-US')

function Delta({ value, invert = false }) {
  const good = invert ? value < 0 : value > 0
  const Icon = value > 0 ? TrendingUp : TrendingDown
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${good ? 'text-emerald-600' : 'text-rose-500'}`}>
      <Icon size={13} /> {value > 0 ? '+' : ''}{value}%
    </span>
  )
}

function Kpi({ icon: Icon, label, value, suffix, delta, invert, accent = '#01516C', note }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className="grid place-items-center h-10 w-10 rounded-xl" style={{ background: `${accent}14`, color: accent }}>
          <Icon size={19} />
        </div>
        {delta !== undefined && <Delta value={delta} invert={invert} />}
      </div>
      <p className="mt-3.5 text-[26px] font-bold difc-font-display text-difc-blue-deep leading-none">
        {value}<span className="text-base font-semibold text-difc-grey-light">{suffix}</span>
      </p>
      <p className="mt-1.5 text-[13px] text-difc-grey-light font-medium">{label}</p>
      {note && <p className="mt-1 text-[11px] text-difc-grey-light/80">{note}</p>}
    </div>
  )
}

function Card({ title, subtitle, children, action, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-card border border-black/[0.04] p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold difc-font-display text-difc-blue-deep">{title}</h3>
          {subtitle && <p className="text-[12px] text-difc-grey-light mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-difc-blue-deep text-white px-3 py-2 shadow-lg text-xs">
      {label && <p className="font-semibold mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
          {p.name}: <span className="font-semibold">{fmt(p.value)}</span>
        </p>
      ))}
    </div>
  )
}

export default function Dashboard({ onOpenInbox }) {
  const maxHour = Math.max(...HOURLY_LOAD)
  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">
      {/* Hero banner */}
      <div className="rounded-2xl bg-gradient-to-br from-difc-blue to-difc-blue-deep p-6 text-white shadow-card relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/[0.04]" />
        <div className="absolute right-20 -bottom-16 h-44 w-44 rounded-full bg-difc-gold/10" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium">Welcome back · Last 30 days</p>
            <h2 className="difc-font-display text-2xl font-extrabold mt-1">DIFC Social Enquiry Intelligence</h2>
            <p className="text-white/75 text-sm mt-1.5 max-w-xl">
              Your AI agent handled <b className="text-white">{fmt(KPIS.aiResolved)}</b> of {fmt(KPIS.totalEnquiries)} enquiries
              autonomously this period — a <b className="text-white">{KPIS.aiResolvedPct}%</b> deflection rate, with humans focused on the {KPIS.escalationRatePct}% that matter most.
            </p>
          </div>
          <button onClick={onOpenInbox} className="btn bg-white text-difc-blue hover:bg-white/90">
            Open Live Inbox <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Kpi icon={MessageSquare} label="Total Enquiries" value={fmt(KPIS.totalEnquiries)} delta={KPIS.totalDeltaPct} accent="#01516C" />
        <Kpi icon={Bot} label="AI Auto-Resolved" value={KPIS.aiResolvedPct} suffix="%" note={`${fmt(KPIS.aiResolved)} conversations`} accent="#15803d" />
        <Kpi icon={Timer} label="Avg First Response" value={KPIS.avgFirstResponseSec} suffix="s" delta={KPIS.avgFirstResponseDeltaPct} invert accent="#0A6E8F" />
        <Kpi icon={UserPlus} label="Leads Captured" value={fmt(KPIS.leadsCaptured)} delta={KPIS.leadsDeltaPct} accent="#B8924A" />
        <Kpi icon={ShieldCheck} label="SLA Compliance" value={KPIS.slaCompliancePct} suffix="%" accent="#2E8B9E" />
        <Kpi icon={TrendingUp} label="CSAT Score" value={KPIS.csat} suffix="/5" accent="#6E5524" />
      </div>

      {/* Row 2: trend + channel donut */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card title="Enquiry Volume" subtitle="AI-resolved vs. escalated to human · last 14 days" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={VOLUME_TREND} margin={{ left: -18, right: 6, top: 6 }}>
              <defs>
                <linearGradient id="gAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#01516C" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#01516C" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gHum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B8924A" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#B8924A" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef1f2" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#8A8F94' }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fontSize: 11, fill: '#8A8F94' }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
              <Area type="monotone" dataKey="ai" name="AI resolved" stroke="#01516C" strokeWidth={2.5} fill="url(#gAi)" />
              <Area type="monotone" dataKey="human" name="Escalated" stroke="#B8924A" strokeWidth={2.5} fill="url(#gHum)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Channel Mix" subtitle="Instagram & LinkedIn lead volume">
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={CHANNEL_SPLIT} dataKey="value" nameKey="channel" cx="50%" cy="50%" innerRadius={52} outerRadius={82} paddingAngle={2} stroke="none">
                {CHANNEL_SPLIT.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip content={<ChartTip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-1">
            {CHANNEL_SPLIT.map((c) => (
              <div key={c.channel} className="flex items-center gap-1.5 text-[11px] text-difc-grey">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c.color }} />
                {c.channel} <span className="ml-auto font-semibold">{fmt(c.value)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 3: intent bar + response time + language */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card title="Enquiries by Category" subtitle="Auto-classified intent" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={INTENT_SPLIT} layout="vertical" margin={{ left: 56, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef1f2" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#8A8F94' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="intent" tick={{ fontSize: 11, fill: '#434343' }} axisLine={false} tickLine={false} width={130} />
              <Tooltip content={<ChartTip />} cursor={{ fill: '#f5f7f8' }} />
              <Bar dataKey="value" name="Enquiries" radius={[0, 6, 6, 0]} barSize={16}>
                {INTENT_SPLIT.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="space-y-5">
          <Card title="Avg AI Response" subtitle="Seconds to first reply, by channel">
            <div className="space-y-2.5">
              {RESPONSE_BY_CHANNEL.map((r) => (
                <div key={r.channel}>
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="text-difc-grey font-medium">{r.channel}</span>
                    <span className="text-difc-blue font-semibold">{r.sec}s</span>
                  </div>
                  <div className="h-2 rounded-full bg-difc-sand overflow-hidden">
                    <div className="h-full rounded-full bar-fill" style={{ width: `${(r.sec / 45) * 100}%`, background: r.channel === 'LinkedIn' ? '#B8924A' : '#01516C' }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-difc-grey-light mt-3">LinkedIn slower — comments only; DMs routed to humans.</p>
          </Card>

          <Card title="Language Mix" subtitle="English now · Arabic gated for review">
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={110}>
                <PieChart>
                  <Pie data={LANGUAGE_MIX} dataKey="value" nameKey="lang" cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={2} stroke="none">
                    {LANGUAGE_MIX.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1.5">
                {LANGUAGE_MIX.map((l) => (
                  <div key={l.lang} className="flex items-center gap-1.5 text-[12px] text-difc-grey">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: l.color }} />
                    {l.lang} <span className="ml-auto font-semibold">{l.value}%</span>
                  </div>
                ))}
                <p className="text-[10.5px] text-difc-grey-light flex items-center gap-1 pt-1"><Languages size={11} /> Arabic ready for Phase 2</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 4: hourly load + routing */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card title="24/7 Coverage" subtitle="Hourly enquiry load — AI covers every hour" className="xl:col-span-1">
          <div className="flex items-end gap-[3px] h-[150px]">
            {HOURLY_LOAD.map((v, h) => (
              <div key={h} className="flex-1 group relative flex items-end h-full" title={`${h}:00 · ${v} enquiries`}>
                <div
                  className="w-full rounded-t-sm transition-all"
                  style={{ height: `${(v / maxHour) * 100}%`, background: v === maxHour ? '#B8924A' : '#01516C', opacity: 0.35 + (v / maxHour) * 0.65 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-difc-grey-light mt-1.5">
            <span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>
          </div>
        </Card>

        <Card title="Routing Readiness — by Business Line" subtitle="Phase 2: hand-off to CRM / internal teams" className="xl:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
            {ROUTING.map((r) => (
              <div key={r.line}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-difc-grey font-medium truncate">{r.line}</span>
                  <span className="text-difc-blue-deep font-semibold">{fmt(r.value)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-difc-sand overflow-hidden">
                  <div className="h-full rounded-full bar-fill bg-gradient-to-r from-difc-blue to-difc-blue-light" style={{ width: `${r.pct * 3.8}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
