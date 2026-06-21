import { useState } from 'react'
import { UserPlus, TrendingUp, Building2, Download, Search, ArrowUpDown } from 'lucide-react'
import { LEADS, LEAD_STATUS_COLORS } from '../data/leads'
import { ChannelChip, Avatar } from './Brand'

function ScoreRing({ score }) {
  const color = score >= 85 ? '#15803d' : score >= 70 ? '#B8924A' : '#0A6E8F'
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-9 w-9">
        <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#eef1f2" strokeWidth="4" />
          <circle cx="18" cy="18" r="15.5" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 97.4} 97.4`} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[10.5px] font-bold" style={{ color }}>{score}</span>
      </div>
    </div>
  )
}

export default function Leads() {
  const [q, setQ] = useState('')
  const [valFilter, setValFilter] = useState('all')

  const rows = LEADS.filter((l) => {
    const qok = !q || `${l.name} ${l.org} ${l.intent} ${l.line}`.toLowerCase().includes(q.toLowerCase())
    const vok = valFilter === 'all' || l.value === valFilter
    return qok && vok
  })

  const high = LEADS.filter((l) => l.value === 'High').length
  const qualified = LEADS.filter((l) => l.status === 'Qualified').length

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={UserPlus} accent="#01516C" value="487" label="Leads captured (30d)" />
        <Stat icon={TrendingUp} accent="#15803d" value={`${high}`} label="High-value (this view)" />
        <Stat icon={Building2} accent="#B8924A" value={`${qualified}`} label="Qualified & routed" />
        <Stat icon={TrendingUp} accent="#0A6E8F" value="AED 4.2M" label="Est. pipeline value" />
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-black/[0.04]">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-black/5">
          <h3 className="text-[15px] font-bold difc-font-display text-difc-blue-deep">Captured Leads</h3>
          <span className="pill bg-difc-blue-soft text-difc-blue">{rows.length} shown</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative w-full md:w-auto">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-difc-grey-light" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads…" className="w-full md:w-56 rounded-xl bg-difc-sand border border-transparent focus:border-difc-blue/20 focus:bg-white outline-none pl-9 pr-3 py-2 text-sm transition" />
            </div>
            {['all', 'High', 'Medium', 'Low'].map((v) => (
              <button key={v} onClick={() => setValFilter(v)} className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${valFilter === v ? 'bg-difc-blue text-white' : 'bg-difc-sand text-difc-grey hover:bg-difc-sand-dark'}`}>{v === 'all' ? 'All' : v}</button>
            ))}
            <button className="btn btn-ghost text-[12px]"><Download size={14} /> Export</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-difc-grey-light border-b border-black/5">
                <th className="px-4 py-3 font-semibold">Lead</th>
                <th className="px-4 py-3 font-semibold">Channel</th>
                <th className="px-4 py-3 font-semibold">Enquiry</th>
                <th className="px-4 py-3 font-semibold">Routed to</th>
                <th className="px-4 py-3 font-semibold"><span className="inline-flex items-center gap-1">Score <ArrowUpDown size={11} /></span></th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Captured</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => {
                const sc = LEAD_STATUS_COLORS[l.status] || { color: '#434343', bg: '#f5f5f5' }
                return (
                  <tr key={l.id} className="border-b border-black/[0.03] hover:bg-difc-sand/40 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={l.name.split(' ').map((p) => p[0]).join('').slice(0, 2)} size={34} color="#01516C" />
                        <div>
                          <p className="text-[13px] font-semibold text-difc-blue-deep leading-tight">{l.name}</p>
                          <p className="text-[11px] text-difc-grey-light leading-tight">{l.org}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><ChannelChip channel={l.channel} /></td>
                    <td className="px-4 py-3 text-[12.5px] text-difc-grey">{l.intent}</td>
                    <td className="px-4 py-3 text-[12.5px] text-difc-grey">{l.line}</td>
                    <td className="px-4 py-3"><ScoreRing score={l.score} /></td>
                    <td className="px-4 py-3"><span className="pill" style={{ color: sc.color, background: sc.bg }}>{l.status}</span></td>
                    <td className="px-4 py-3 text-[12px] text-difc-grey-light">{l.captured}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-3 text-[11px] text-difc-grey-light border-t border-black/5">Leads are auto-deduplicated and routed by business line. CRM/ticketing hand-off (Salesforce / Dynamics / Zendesk) is a Phase 2 integration.</p>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, accent, value, label }) {
  return (
    <div className="stat-card">
      <div className="grid place-items-center h-10 w-10 rounded-xl mb-3" style={{ background: `${accent}14`, color: accent }}><Icon size={19} /></div>
      <p className="text-[24px] font-bold difc-font-display text-difc-blue-deep leading-none">{value}</p>
      <p className="text-[12.5px] text-difc-grey-light mt-1.5">{label}</p>
    </div>
  )
}
