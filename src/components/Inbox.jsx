import { useState, useMemo } from 'react'
import { Filter, MessageCircle, MessagesSquare } from 'lucide-react'
import { CONVERSATIONS, relTime } from '../data/conversations'
import { CHANNELS, INTENTS, STATUS } from '../data/meta'
import { ChannelIcon, Avatar } from './Brand'
import ConversationView from './ConversationView'

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'Needs Action' },
  { id: 'awaiting', label: 'Awaiting Approval' },
  { id: 'escalated', label: 'Escalated' },
  { id: 'ai_handled', label: 'AI Resolved' },
]

function SlaBadge({ mins, slaMin }) {
  const remaining = slaMin - mins
  const danger = remaining <= 5
  const warn = remaining > 5 && remaining <= 20
  const tone = danger ? 'text-rose-600 bg-rose-50' : warn ? 'text-difc-gold bg-difc-gold/10' : 'text-emerald-600 bg-emerald-50'
  const label = remaining <= 0 ? 'SLA breached' : `${remaining}m to SLA`
  return <span className={`pill ${tone}`}>{label}</span>
}

function ListItem({ c, active, onClick }) {
  const st = STATUS[c.status]
  const intent = INTENTS[c.intentKey]
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3.5 py-3 rounded-xl border transition-all ${active ? 'bg-white border-difc-blue/30 shadow-card' : 'border-transparent hover:bg-white/70'}`}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar initials={c.customer.initials} size={42} color={intent.color} />
          <span className="absolute -bottom-1 -right-1 grid place-items-center h-5 w-5 rounded-full bg-white shadow">
            <ChannelIcon channel={c.channel} size={12} />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[13.5px] font-semibold text-difc-blue-deep truncate">{c.customer.name}</span>
            <span className="text-[11px] text-difc-grey-light ml-auto shrink-0">{relTime(c.receivedMinsAgo)}</span>
          </div>
          <p className="text-[12px] text-difc-grey-light truncate flex items-center gap-1">
            {c.type === 'dm' ? <MessageCircle size={11} /> : <MessagesSquare size={11} />}
            {c.type === 'dm' ? 'Direct message' : 'Comment'} · {c.customer.region}
          </p>
          <p className="text-[12.5px] text-difc-grey mt-1 line-clamp-2 leading-snug">{c.preview}</p>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="pill" style={{ color: st.color, background: st.bg }}>{st.label}</span>
            <span className="pill" style={{ color: intent.color, background: `${intent.color}12` }}>{intent.label}</span>
            {(c.status === 'new' || c.status === 'escalated') && <SlaBadge mins={c.receivedMinsAgo} slaMin={c.slaMin} />}
            {c.isLead && <span className="pill bg-difc-gold/10 text-difc-gold">● Lead</span>}
          </div>
        </div>
      </div>
    </button>
  )
}

export default function Inbox() {
  const [channelFilter, setChannelFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeId, setActiveId] = useState('c-001')

  const filtered = useMemo(() => {
    return CONVERSATIONS.filter((c) => {
      const chOk = channelFilter === 'all' || c.channel === channelFilter
      const stOk =
        statusFilter === 'all' ||
        (statusFilter === 'new' && (c.status === 'new')) ||
        statusFilter === c.status
      return chOk && stOk
    })
  }, [channelFilter, statusFilter])

  const active = CONVERSATIONS.find((c) => c.id === activeId) || filtered[0]
  const counts = {
    new: CONVERSATIONS.filter((c) => c.status === 'new').length,
    awaiting: CONVERSATIONS.filter((c) => c.status === 'awaiting').length,
    escalated: CONVERSATIONS.filter((c) => c.status === 'escalated').length,
  }

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* List column */}
      <div className="w-full md:w-[380px] shrink-0 border-b border-black/5 md:border-b-0 md:border-r flex flex-col bg-difc-sand">
        {/* Channel filter strip */}
        <div className="px-4 pt-4 pb-3 border-b border-black/5 bg-white">
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
            <button
              onClick={() => setChannelFilter('all')}
              className={`shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${channelFilter === 'all' ? 'bg-difc-blue text-white' : 'bg-difc-sand text-difc-grey hover:bg-difc-sand-dark'}`}
            >
              All channels
            </button>
            {Object.values(CHANNELS).map((ch) => (
              <button
                key={ch.id}
                onClick={() => setChannelFilter(ch.id)}
                title={ch.label}
                className={`shrink-0 grid place-items-center h-8 w-8 rounded-lg transition ${channelFilter === ch.id ? 'ring-2 ring-difc-blue bg-white' : 'bg-difc-sand hover:bg-difc-sand-dark'}`}
              >
                <ChannelIcon channel={ch.id} size={16} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {STATUS_FILTERS.map((f) => {
              const badge = f.id === 'new' ? counts.new : f.id === 'awaiting' ? counts.awaiting : f.id === 'escalated' ? counts.escalated : null
              return (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11.5px] font-semibold transition ${statusFilter === f.id ? 'bg-difc-blue-soft text-difc-blue' : 'text-difc-grey-light hover:bg-difc-sand'}`}
                >
                  {f.label}
                  {badge ? <span className="bg-difc-gold text-white rounded-full px-1.5 text-[10px]">{badge}</span> : null}
                </button>
              )
            })}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
          <p className="px-2 py-1 text-[11px] font-semibold text-difc-grey-light flex items-center gap-1.5">
            <Filter size={11} /> {filtered.length} conversation{filtered.length !== 1 ? 's' : ''}
          </p>
          {filtered.map((c) => (
            <ListItem key={c.id} c={c} active={c.id === active?.id} onClick={() => setActiveId(c.id)} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-difc-grey-light text-sm py-16">No conversations match this filter.</div>
          )}
        </div>
      </div>

      {/* Conversation detail */}
      <div className="flex-1 min-w-0 bg-white">
        {active ? <ConversationView key={active.id} conversation={active} /> : (
          <div className="h-full grid place-items-center text-difc-grey-light">Select a conversation</div>
        )}
      </div>
    </div>
  )
}
