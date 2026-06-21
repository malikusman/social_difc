import { useState } from 'react'
import { BookOpen, Search, ExternalLink, CheckCircle2, Plus, FileText } from 'lucide-react'
import { KB_ARTICLES } from '../data/knowledgeBase'
import { INTENTS } from '../data/meta'

export default function KnowledgeBase() {
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState(KB_ARTICLES[0].id)

  const rows = KB_ARTICLES.filter((a) =>
    !q || `${a.title} ${a.summary} ${a.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase())
  )
  const open = KB_ARTICLES.find((a) => a.id === openId)

  return (
    <div className="h-full flex">
      {/* List */}
      <div className="w-[420px] shrink-0 border-r border-black/5 flex flex-col bg-difc-sand/50">
        <div className="p-4 border-b border-black/5 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[15px] font-bold difc-font-display text-difc-blue-deep flex items-center gap-2"><BookOpen size={17} /> DIFC Knowledge Base</h3>
            <button className="btn btn-ghost text-[12px]"><Plus size={14} /> Article</button>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-difc-grey-light" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles, tags…" className="w-full rounded-xl bg-difc-sand border border-transparent focus:border-difc-blue/20 focus:bg-white outline-none pl-9 pr-3 py-2 text-sm transition" />
          </div>
          <p className="text-[11px] text-difc-grey-light mt-2.5">{KB_ARTICLES.length} articles · the agent grounds every answer in this source of truth.</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {rows.map((a) => {
            const intent = INTENTS[a.category]
            const active = a.id === openId
            return (
              <button key={a.id} onClick={() => setOpenId(a.id)} className={`w-full text-left rounded-xl p-3.5 border transition ${active ? 'bg-white border-difc-blue/30 shadow-card' : 'border-transparent hover:bg-white/70'}`}>
                <div className="flex items-start gap-2">
                  <div className="grid place-items-center h-8 w-8 rounded-lg shrink-0" style={{ background: `${intent.color}14`, color: intent.color }}><FileText size={15} /></div>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold text-difc-blue-deep leading-snug">{a.title}</p>
                    <p className="text-[11.5px] text-difc-grey-light mt-0.5 line-clamp-2">{a.summary}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="pill text-[10px]" style={{ color: intent.color, background: `${intent.color}12` }}>{intent.label}</span>
                      <span className="text-[10px] text-difc-grey-light">{Math.round(a.confidence * 100)}% conf.</span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 min-w-0 overflow-y-auto bg-white">
        {open && (
          <div className="max-w-2xl mx-auto p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="pill" style={{ color: INTENTS[open.category].color, background: `${INTENTS[open.category].color}12` }}>{INTENTS[open.category].label}</span>
              <span className="pill bg-emerald-50 text-emerald-600"><CheckCircle2 size={12} /> Published</span>
              <span className="text-[11px] text-difc-grey-light ml-auto">Updated {open.lastUpdated}</span>
            </div>
            <h1 className="difc-font-display text-2xl font-extrabold text-difc-blue-deep">{open.title}</h1>
            <p className="text-[14px] text-difc-grey-light mt-2">{open.summary}</p>

            <div className="my-5 rounded-xl bg-difc-blue-soft/50 border border-difc-blue/10 p-4 flex items-start gap-3">
              <div className="grid place-items-center h-9 w-9 rounded-lg bg-difc-blue text-white shrink-0"><BookOpen size={17} /></div>
              <div>
                <p className="text-[12.5px] font-semibold text-difc-blue-deep">Used by the AI agent</p>
                <p className="text-[12px] text-difc-grey mt-0.5">Retrieval confidence {Math.round(open.confidence * 100)}% · cited automatically when matching enquiries arrive.</p>
              </div>
            </div>

            <div className="prose-difc whitespace-pre-line text-[14px] leading-relaxed text-difc-grey">{open.body}</div>

            <div className="mt-6 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-difc-grey-light mr-1">Trigger tags:</span>
              {open.tags.map((t) => <span key={t} className="pill bg-difc-sand text-difc-grey">{t}</span>)}
            </div>

            <a href={open.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-difc-blue hover:underline">
              View source on difc.com <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
