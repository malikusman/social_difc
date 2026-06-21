import { useState } from 'react'
import { LayoutDashboard, Inbox as InboxIcon, Users, BookOpen, Radio, Bot, Search, Bell, ChevronRight, LogOut, Menu, X } from 'lucide-react'
import { DifcLogo, Avatar } from './components/Brand'
import Dashboard from './components/Dashboard'
import Inbox from './components/Inbox'
import Leads from './components/Leads'
import KnowledgeBase from './components/KnowledgeBase'
import Channels from './components/Channels'
import Login from './components/Login'

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, sub: 'Analytics & KPIs' },
  { id: 'inbox', label: 'Unified Inbox', icon: InboxIcon, sub: 'Agentic + human-in-the-loop' },
  { id: 'leads', label: 'Leads', icon: Users, sub: 'Captured & routed' },
  { id: 'kb', label: 'Knowledge Base', icon: BookOpen, sub: 'Answer sources' },
  { id: 'channels', label: 'Channels & Setup', icon: Radio, sub: 'Connections & policy' },
]

const TITLES = {
  overview: 'Operations Overview',
  inbox: 'Unified Enquiry Inbox',
  leads: 'Lead Management',
  kb: 'Knowledge Base',
  channels: 'Channels & Integration Setup',
}

export default function App() {
  const [view, setView] = useState('overview')
  const [authed, setAuthed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (!authed) return <Login onSignIn={() => setAuthed(true)} />

  return (
    <div className="flex h-screen overflow-hidden bg-difc-sand">
      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex w-[264px] shrink-0 bg-difc-blue-deep flex-col">
        <div className="px-5 pt-6 pb-5 border-b border-white/10">
          <DifcLogo light />
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-white/35 mb-2">Workspace</p>
          {NAV.map((n) => {
            const Icon = n.icon
            const active = view === n.id
            return (
              <button key={n.id} onClick={() => setView(n.id)} className={`nav-item w-full text-left ${active ? 'active' : ''}`}>
                <Icon size={18} className="shrink-0" />
                <span className="flex-1 min-w-0">
                  <span className="block leading-tight">{n.label}</span>
                  <span className="block text-[10.5px] font-normal text-white/40 leading-tight">{n.sub}</span>
                </span>
                {active && <ChevronRight size={15} className="text-white/60" />}
              </button>
            )
          })}
        </nav>

        {/* Agent status card */}
        <div className="m-3 rounded-2xl bg-white/[0.06] p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-pulse-ring" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold text-white">AI Agent · Active</span>
          </div>
          <p className="text-[11px] text-white/55 leading-relaxed">
            Monitoring 6 channels · auto-classifying · drafting replies for human approval.
          </p>
        </div>

        <div className="px-3 py-3 border-t border-white/10">
          <button onClick={() => setAuthed(false)} className="nav-item w-full text-left text-white/60 hover:text-white">
            <LogOut size={17} /> <span className="flex-1">Sign out</span>
          </button>
          <p className="px-3.5 mt-1 text-[10px] text-white/30">Prototype · static data · v1.0</p>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-30 lg:hidden transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className={`absolute inset-0 bg-black/40 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`} onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-72 bg-difc-blue-deep flex flex-col shadow-2xl transform transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-white/10">
            <DifcLogo light />
            <button onClick={() => setMobileMenuOpen(false)} className="grid place-items-center h-10 w-10 rounded-xl bg-white/10 text-white hover:bg-white/15 transition">
              <X size={18} />
            </button>
          </div>
          <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-white/35 mb-2">Workspace</p>
            {NAV.map((n) => {
              const Icon = n.icon
              const active = view === n.id
              return (
                <button key={n.id} onClick={() => { setView(n.id); setMobileMenuOpen(false) }} className={`nav-item w-full text-left ${active ? 'active' : ''}`}>
                  <Icon size={18} className="shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="block leading-tight">{n.label}</span>
                    <span className="block text-[10.5px] font-normal text-white/40 leading-tight">{n.sub}</span>
                  </span>
                  {active && <ChevronRight size={15} className="text-white/60" />}
                </button>
              )
            })}
          </nav>
          <div className="m-3 rounded-2xl bg-white/[0.06] p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-pulse-ring" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-white">AI Agent · Active</span>
            </div>
            <p className="text-[11px] text-white/55 leading-relaxed">
              Monitoring 6 channels · auto-classifying · drafting replies for human approval.
            </p>
          </div>
          <div className="px-3 py-3 border-t border-white/10">
            <button onClick={() => { setAuthed(false); setMobileMenuOpen(false) }} className="nav-item w-full text-left text-white/60 hover:text-white">
              <LogOut size={17} /> <span className="flex-1">Sign out</span>
            </button>
            <p className="px-3.5 mt-1 text-[10px] text-white/30">Prototype · static data · v1.0</p>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 shrink-0 bg-white border-b border-black/5 flex items-center gap-4 px-6">
          <div className="flex items-center gap-2.5">
            <h1 className="difc-font-display text-[17px] font-bold text-difc-blue-deep">{TITLES[view]}</h1>
            <span className="pill bg-difc-blue-soft text-difc-blue">
              <Bot size={12} /> Agentic
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="grid place-items-center h-10 w-10 rounded-xl hover:bg-difc-sand transition lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={18} className="text-difc-grey" />
            </button>
            <div className="relative hidden md:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-difc-grey-light" />
              <input
                placeholder="Search enquiries, leads, articles…"
                className="w-72 rounded-xl bg-difc-sand border border-transparent focus:border-difc-blue/20 focus:bg-white outline-none pl-9 pr-3 py-2 text-sm transition"
              />
            </div>
            <button className="relative grid place-items-center h-10 w-10 rounded-xl hover:bg-difc-sand transition">
              <Bell size={18} className="text-difc-grey" />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-difc-gold ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-black/5">
              <Avatar initials="MY" size={36} color="#01516C" />
              <div className="hidden lg:block leading-tight">
                <p className="text-sm font-semibold text-difc-blue-deep">Madiha Y.</p>
                <p className="text-[11px] text-difc-grey-light">Growth & Martech</p>
              </div>
            </div>
          </div>
        </header>

        {/* View */}
        <main className="flex-1 overflow-hidden">
          {view === 'overview' && <Dashboard onOpenInbox={() => setView('inbox')} />}
          {view === 'inbox' && <Inbox />}
          {view === 'leads' && <Leads />}
          {view === 'kb' && <KnowledgeBase />}
          {view === 'channels' && <Channels />}
        </main>
      </div>
    </div>
  )
}
