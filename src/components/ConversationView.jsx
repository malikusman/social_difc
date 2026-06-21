import { useState, useEffect, useRef } from 'react'
import {
  Bot, Sparkles, BrainCircuit, BookOpen, PencilLine, Send, ArrowUpRight, RefreshCw,
  CheckCircle2, ShieldAlert, UserCheck, Loader2, Languages, Heart, Target, Building2,
  ChevronRight, ExternalLink, Lock, Ban, Info, Clock, ShieldCheck,
} from 'lucide-react'
import { KB_ARTICLES } from '../data/knowledgeBase'
import { INTENTS, STATUS, TEAM } from '../data/meta'
import { relTime } from '../data/conversations'
import { ChannelIcon, Avatar } from './Brand'

const STEP_DEFS = [
  { key: 'ingest', label: 'Message ingested via official API', icon: Bot },
  { key: 'classify', label: 'Classifying intent & sentiment', icon: BrainCircuit },
  { key: 'retrieve', label: 'Retrieving from DIFC knowledge base', icon: BookOpen },
  { key: 'draft', label: 'Drafting grounded reply', icon: Sparkles },
  { key: 'review', label: 'Ready for human review', icon: UserCheck },
]

function ConfBar({ value, color = '#01516C' }) {
  return (
    <div className="h-1.5 rounded-full bg-difc-sand overflow-hidden">
      <div className="h-full rounded-full bar-fill" style={{ width: `${Math.round(value * 100)}%`, background: color }} />
    </div>
  )
}

function Bubble({ m, intentColor }) {
  const mine = m.from === 'ai' || m.from === 'agent'
  const isAgent = m.from === 'agent'
  return (
    <div className={`flex gap-2.5 ${mine ? 'flex-row-reverse' : ''} animate-fade-in`}>
      <div className="shrink-0">
        {m.from === 'customer'
          ? <Avatar initials="" size={28} color={intentColor} />
          : <div className={`grid place-items-center h-7 w-7 rounded-full text-white ${isAgent ? 'bg-difc-gold' : 'bg-difc-blue'}`}>
              {isAgent ? <UserCheck size={14} /> : <Bot size={14} />}
            </div>}
      </div>
      <div className={`max-w-[78%] ${mine ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed ${
          m.from === 'customer' ? 'bg-difc-sand text-difc-grey rounded-tl-sm'
          : isAgent ? 'bg-difc-gold/15 text-difc-grey rounded-tr-sm border border-difc-gold/30'
          : 'bg-difc-blue text-white rounded-tr-sm'}`}>
          {m.text}
        </div>
        <span className="text-[10.5px] text-difc-grey-light mt-1 px-1">
          {m.from === 'agent' ? `${m.agent} · ` : m.from === 'ai' ? 'AI Agent · ' : ''}{relTime(m.minsAgo)}
        </span>
      </div>
    </div>
  )
}

export default function ConversationView({ conversation: c }) {
  const intent = INTENTS[c.intentKey]
  const article = KB_ARTICLES.find((a) => a.id === c.ai.kbArticleId)
  const isLive = c.status === 'new'
  const isSpam = c.ai.spam
  const isLinkedinDm = c.ai.linkedinDmNote

  const [stage, setStage] = useState(isLive ? -1 : 100) // -1 not started, 100 = pre-done
  const [thread, setThread] = useState(c.thread)
  const [reply, setReply] = useState(isLive ? '' : c.ai.suggestedReply)
  const [editing, setEditing] = useState(false)
  const [action, setAction] = useState(null) // 'sent' | 'escalated'
  const [sending, setSending] = useState(false)
  const [assignee, setAssignee] = useState(null)
  const timers = useRef([])

  // Live agentic pipeline
  useEffect(() => {
    if (!isLive) return
    const seq = [400, 1100, 1900, 2700]
    seq.forEach((t, i) => timers.current.push(setTimeout(() => setStage(i), t)))
    // typing of the reply during draft stage
    timers.current.push(setTimeout(() => {
      const full = c.ai.suggestedReply
      let n = 0
      const iv = setInterval(() => {
        n += 4
        setReply(full.slice(0, n))
        if (n >= full.length) { clearInterval(iv); setStage(4) }
      }, 14)
      timers.current.push(iv)
    }, 2900))
    return () => { timers.current.forEach((t) => { clearTimeout(t); clearInterval(t) }) }
  }, [isLive, c.ai.suggestedReply])

  const stepStatus = (i) => {
    if (!isLive) return 'done'
    if (stage > i) return 'done'
    if (stage === i || (i === 3 && stage === 3)) return 'active'
    if (stage >= i - 0) return 'active'
    return stage >= i ? 'active' : 'pending'
  }
  const reached = (i) => (isLive ? stage >= i : true)

  const ready = !isLive || stage >= 4

  function handleApprove() {
    setSending(true)
    setTimeout(() => {
      setThread((t) => [...t, { from: 'ai', text: reply, minsAgo: 0 }])
      setSending(false)
      setAction('sent')
    }, 900)
  }
  function handleEscalate() {
    const a = TEAM.find((t) => t.online) || TEAM[0]
    setAssignee(a)
    setThread((t) => [...t, { from: 'ai', text: `This enquiry has been routed to a specialist (${a.name}, ${a.role}) who will respond shortly. (You're chatting with DIFC's automated assistant.)`, minsAgo: 0 }])
    setAction('escalated')
  }

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Conversation column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-black/5 flex items-center gap-3">
          <div className="relative">
            <Avatar initials={c.customer.initials} size={44} color={intent.color} />
            <span className="absolute -bottom-1 -right-1 grid place-items-center h-5 w-5 rounded-full bg-white shadow"><ChannelIcon channel={c.channel} size={12} /></span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-difc-blue-deep truncate">{c.customer.name}</h3>
              {c.isLead && <span className="pill bg-difc-gold/10 text-difc-gold">● Lead · {c.ai.leadScore}</span>}
            </div>
            <p className="text-[12px] text-difc-grey-light truncate">{c.customer.handle} · {c.customer.region}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="pill" style={{ color: STATUS[action === 'sent' ? 'ai_handled' : action === 'escalated' ? 'escalated' : c.status].color, background: STATUS[action === 'sent' ? 'ai_handled' : action === 'escalated' ? 'escalated' : c.status].bg }}>
              {STATUS[action === 'sent' ? 'ai_handled' : action === 'escalated' ? 'escalated' : c.status].label}
            </span>
          </div>
        </div>

        {/* Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-difc-sand/40 to-white">
          <div className="text-center"><span className="text-[11px] text-difc-grey-light bg-white px-3 py-1 rounded-full border border-black/5">{c.type === 'dm' ? 'Direct message' : 'Public comment'} · {c.customer.region}</span></div>
          {thread.map((m, i) => <Bubble key={i} m={m} intentColor={intent.color} />)}
          {sending && (
            <div className="flex flex-row-reverse gap-2.5">
              <div className="grid place-items-center h-7 w-7 rounded-full bg-difc-blue text-white"><Bot size={14} /></div>
              <div className="px-4 py-3 rounded-2xl bg-difc-blue/90 rounded-tr-sm flex gap-1"><span className="typing-dot bg-white" /><span className="typing-dot bg-white" /><span className="typing-dot bg-white" /></div>
            </div>
          )}
        </div>

        {/* Outcome banner */}
        {action === 'sent' && (
          <div className="mx-5 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-center gap-2.5 animate-slide-up">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <p className="text-[13px] text-emerald-800 font-medium">Reply approved by Madiha Y. and sent · conversation marked AI Resolved · logged to audit trail.</p>
          </div>
        )}
        {action === 'escalated' && assignee && (
          <div className="mx-5 mb-4 rounded-xl bg-difc-gold/10 border border-difc-gold/30 px-4 py-3 flex items-center gap-2.5 animate-slide-up">
            <UserCheck size={18} className="text-difc-gold" />
            <p className="text-[13px] text-difc-grey font-medium">Escalated to <b>{assignee.name}</b> ({assignee.role}) with full context & suggested reply.</p>
          </div>
        )}
      </div>

      {/* ── Agent Copilot panel ── */}
      <div className="w-full lg:w-[400px] shrink-0 border-t border-black/5 lg:border-t-0 lg:border-l bg-difc-sand/50 flex flex-col">
        <div className="px-4 py-3 border-b border-black/5 bg-white flex items-center gap-2">
          <div className="grid place-items-center h-7 w-7 rounded-lg bg-difc-blue text-white"><Sparkles size={15} /></div>
          <div>
            <p className="text-[13px] font-bold text-difc-blue-deep leading-tight">Agent Copilot</p>
            <p className="text-[10.5px] text-difc-grey-light leading-tight">Agentic reasoning · human-in-the-loop</p>
          </div>
          {isLive && stage < 4 && <Loader2 size={16} className="ml-auto text-difc-blue animate-spin" />}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {/* Reasoning timeline */}
          <div className="bg-white rounded-xl p-3.5 border border-black/5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-difc-grey-light mb-2.5">Reasoning</p>
            <div className="space-y-2.5">
              {STEP_DEFS.map((s, i) => {
                const done = isLive ? stage > i || (i === 4 && stage >= 4) : true
                const active = isLive && stage === i
                const Icon = s.icon
                return (
                  <div key={s.key} className={`flex items-center gap-2.5 transition-opacity ${!isLive || stage >= i - 0 ? 'opacity-100' : 'opacity-35'}`}>
                    <div className={`grid place-items-center h-6 w-6 rounded-full shrink-0 ${done ? 'bg-emerald-100 text-emerald-600' : active ? 'bg-difc-blue text-white' : 'bg-difc-sand text-difc-grey-light'}`}>
                      {done ? <CheckCircle2 size={14} /> : active ? <Loader2 size={13} className="animate-spin" /> : <Icon size={13} />}
                    </div>
                    <span className={`text-[12.5px] ${done || active ? 'text-difc-grey font-medium' : 'text-difc-grey-light'}`}>{s.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Classification */}
          {reached(1) && (
            <div className="bg-white rounded-xl p-3.5 border border-black/5 animate-fade-in space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-difc-grey-light">Classification</p>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12.5px] font-semibold text-difc-blue-deep flex items-center gap-1.5"><Target size={13} style={{ color: intent.color }} /> {intent.label}</span>
                  <span className="text-[12px] font-bold text-difc-blue">{Math.round(c.ai.intentConfidence * 100)}%</span>
                </div>
                <ConfBar value={c.ai.intentConfidence} color={intent.color} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <Meta icon={Building2} label="Business line" value={c.ai.businessLine} />
                <Meta icon={Heart} label="Sentiment" value={c.sentiment} />
                <Meta icon={Languages} label="Language" value={c.language} />
                <Meta icon={Target} label="Lead score" value={c.isLead ? `${c.ai.leadScore}/100` : '—'} />
              </div>
            </div>
          )}

          {/* Knowledge source */}
          {reached(2) && article && (
            <div className="bg-white rounded-xl p-3.5 border border-black/5 animate-fade-in">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-difc-grey-light mb-2 flex items-center gap-1.5"><BookOpen size={12} /> Grounded in</p>
              <a href={article.link} target="_blank" rel="noreferrer" className="block rounded-lg border border-difc-blue/15 bg-difc-blue-soft/50 p-3 hover:bg-difc-blue-soft transition group">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[13px] font-semibold text-difc-blue-deep leading-snug">{article.title}</span>
                  <ExternalLink size={13} className="text-difc-blue shrink-0 mt-0.5 opacity-60 group-hover:opacity-100" />
                </div>
                <p className="text-[11.5px] text-difc-grey-light mt-1 leading-snug">{article.summary}</p>
                <p className="text-[10.5px] text-difc-grey-light mt-1.5">Match confidence {Math.round(article.confidence * 100)}% · updated {article.lastUpdated}</p>
              </a>
            </div>
          )}

          {/* Special-case notices */}
          {isSpam && (
            <Notice tone="rose" icon={Ban} title="Filtered as spam / solicitation"
              body="Classified as financial-solicitation spam (98% confidence). No public reply sent; comment hidden and flagged for moderation per platform policy. Zero human time consumed." />
          )}
          {isLinkedinDm && (
            <Notice tone="amber" icon={Lock} title="LinkedIn DM — human-handled"
              body="LinkedIn has no compliant API for automated DM replies. The agent auto-classified and routed this with full context to a human agent in the native LinkedIn inbox. Comments on LinkedIn posts CAN be automated." />
          )}
          {c.ai.needsHuman && !isLinkedinDm && (
            <Notice tone="amber" icon={Info} title="Arabic — gated for review"
              body="Arabic detected. Per Phase 1 scope, non-English replies are drafted by the agent but require human approval before sending. Full Arabic automation is a Phase 2 option." />
          )}
          {c.ai.escalationReason && (
            <Notice tone="rose" icon={ShieldAlert} title="Auto-escalation triggered" body={c.ai.escalationReason} />
          )}

          {/* Suggested reply + HITL */}
          {!isSpam && !isLinkedinDm && (
            <div className="bg-white rounded-xl p-3.5 border border-black/5 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-difc-grey-light flex items-center gap-1.5"><Sparkles size={12} className="text-difc-blue" /> Suggested reply</p>
                {c.ai.disclosure && <span className="pill bg-difc-blue-soft text-difc-blue text-[10px]"><Bot size={10} /> bot-disclosed</span>}
              </div>

              {ready ? (
                <>
                  <textarea
                    value={reply}
                    readOnly={!editing}
                    onChange={(e) => setReply(e.target.value)}
                    rows={editing ? 8 : 7}
                    className={`w-full text-[12.5px] leading-relaxed rounded-lg p-3 resize-none outline-none transition ${editing ? 'bg-white border border-difc-blue/30 ring-2 ring-difc-blue/10' : 'bg-difc-sand/70 border border-transparent text-difc-grey'}`}
                  />
                  {action ? (
                    <div className="mt-2 text-center text-[12px] text-emerald-700 font-semibold flex items-center justify-center gap-1.5">
                      <CheckCircle2 size={14} /> {action === 'sent' ? 'Sent & logged' : 'Routed to human agent'}
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button onClick={handleApprove} className="btn btn-primary"><Send size={14} /> Approve & Send</button>
                        <button onClick={() => setEditing((e) => !e)} className="btn btn-ghost"><PencilLine size={14} /> {editing ? 'Done editing' : 'Edit'}</button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <button onClick={() => { setReply(''); setTimeout(() => setReply(c.ai.suggestedReply), 250) }} className="btn btn-outline text-[12px]"><RefreshCw size={13} /> Regenerate</button>
                        <button onClick={handleEscalate} className="btn btn-danger text-[12px]"><ArrowUpRight size={13} /> Escalate</button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-1.5 p-3 text-difc-grey-light text-[12.5px]">
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  <span className="ml-1">Drafting…</span>
                </div>
              )}
            </div>
          )}

          {/* Audit trail */}
          <AuditTrail c={c} action={action} assignee={assignee} />
        </div>
      </div>
    </div>
  )
}

function Meta({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-difc-sand/60 p-2">
      <p className="text-[10px] text-difc-grey-light flex items-center gap-1"><Icon size={10} /> {label}</p>
      <p className="text-[12px] font-semibold text-difc-blue-deep leading-tight mt-0.5">{value}</p>
    </div>
  )
}

function Notice({ tone, icon: Icon, title, body }) {
  const tones = {
    rose: 'bg-rose-50 border-rose-200 text-rose-700',
    amber: 'bg-difc-gold/10 border-difc-gold/30 text-difc-grey',
  }
  return (
    <div className={`rounded-xl border p-3.5 animate-fade-in ${tones[tone]}`}>
      <p className="text-[12.5px] font-bold flex items-center gap-1.5 mb-1"><Icon size={14} /> {title}</p>
      <p className="text-[11.5px] leading-relaxed opacity-90">{body}</p>
    </div>
  )
}

function AuditTrail({ c, action, assignee }) {
  const base = [
    { t: `${c.receivedMinsAgo}m ago`, label: `Inbound ${c.type === 'dm' ? 'DM' : 'comment'} received via official API`, icon: Bot },
    { t: `${Math.max(0, c.receivedMinsAgo - 0)}m ago`, label: `Auto-classified: ${INTENTS[c.intentKey].label} (${Math.round(c.ai.intentConfidence * 100)}%)`, icon: BrainCircuit },
  ]
  if (action === 'sent') base.push({ t: 'just now', label: 'Reply approved by Madiha Y. & sent', icon: CheckCircle2 })
  if (action === 'escalated') base.push({ t: 'just now', label: `Escalated to ${assignee?.name}`, icon: UserCheck })
  if (c.status === 'ai_handled') base.push({ t: relTime(Math.floor(c.receivedMinsAgo * 0.6)), label: 'AI reply sent & resolved', icon: CheckCircle2 })
  if (c.status === 'escalated' || c.status === 'human') base.push({ t: relTime(Math.floor(c.receivedMinsAgo * 0.5)), label: 'Routed to human agent', icon: UserCheck })

  return (
    <div className="bg-white rounded-xl p-3.5 border border-black/5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-difc-grey-light mb-2.5 flex items-center gap-1.5"><ShieldCheck size={12} /> Audit trail</p>
      <div className="space-y-2.5 relative">
        <div className="absolute left-[9px] top-1 bottom-1 w-px bg-difc-sand-dark" />
        {base.map((e, i) => {
          const Icon = e.icon
          return (
            <div key={i} className="flex items-start gap-2.5 relative">
              <div className="grid place-items-center h-[19px] w-[19px] rounded-full bg-difc-blue-soft text-difc-blue shrink-0 z-10"><Icon size={11} /></div>
              <div className="flex-1 -mt-0.5">
                <p className="text-[12px] text-difc-grey leading-snug">{e.label}</p>
                <p className="text-[10px] text-difc-grey-light flex items-center gap-1"><Clock size={9} /> {e.t}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
