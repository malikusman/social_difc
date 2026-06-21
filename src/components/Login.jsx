import { useState } from 'react'
import { Bot, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, MessageSquare, BarChart3, Loader2, Building2 } from 'lucide-react'
import { DifcEmblem } from './Brand'

// Stylised "The Gate" arch — DIFC's iconic building, drawn as SVG
function GateArch({ className = '' }) {
  return (
    <svg viewBox="0 0 200 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 220 V70 a80 80 0 0 1 160 0 V220 H150 V70 a50 50 0 0 0 -100 0 V220 Z" fill="currentColor" />
      <rect x="86" y="120" width="28" height="100" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

const FEATURES = [
  { icon: MessageSquare, title: 'Unified inbox', desc: 'DMs & comments from 6 channels in one place' },
  { icon: Sparkles, title: 'Agentic replies', desc: 'Auto-classify, draft & route — grounded in DIFC knowledge' },
  { icon: ShieldCheck, title: 'Human-in-the-loop', desc: 'Approve, edit or escalate — full audit trail' },
  { icon: BarChart3, title: 'Live analytics', desc: 'Volumes, SLAs, leads & deflection in real time' },
]

export default function Login({ onSignIn }) {
  const [email, setEmail] = useState('madiha.yusuf@difc.ae')
  const [password, setPassword] = useState('demo-access')
  const [loading, setLoading] = useState(false)

  function submit(e) {
    e?.preventDefault()
    setLoading(true)
    setTimeout(() => onSignIn(), 950)
  }

  return (
    <div className="h-screen w-screen flex bg-difc-sand overflow-hidden">
      {/* ── Left: branded hero ── */}
      <div className="hidden lg:flex w-[54%] relative flex-col justify-between p-12 text-white bg-gradient-to-br from-difc-blue via-difc-blue-dark to-difc-blue-deep overflow-hidden">
        {/* decorative shapes */}
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/[0.04]" />
        <div className="absolute right-32 top-40 h-60 w-60 rounded-full bg-difc-gold/10 blur-2xl" />
        <GateArch className="absolute -right-6 bottom-0 h-[60%] text-white/[0.05]" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />

        {/* top brand */}
        <div className="relative flex items-center gap-3.5">
          <DifcEmblem size={48} light />
          <div>
            <div className="difc-font-display text-2xl font-extrabold tracking-[0.04em] leading-none">DIFC</div>
            <div className="text-[12px] font-medium text-white/80 leading-tight mt-1">Dubai International Financial Centre</div>
            <div dir="rtl" className="text-[12px] text-white/55 leading-tight mt-0.5">مركز دبي المالي العالمي</div>
          </div>
        </div>

        {/* middle message */}
        <div className="relative max-w-md animate-slide-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-semibold mb-5">
            <Bot size={14} className="text-difc-gold-light" /> AI-Powered · Human-in-the-loop
          </span>
          <h1 className="difc-font-display text-[40px] leading-[1.1] font-extrabold">
            Social Enquiry<br />Intelligence
          </h1>
          <p className="mt-4 text-[15px] text-white/75 leading-relaxed">
            Every question across Instagram, LinkedIn, Facebook, X, TikTok and YouTube —
            understood, answered and routed in seconds. Your team stays in control.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="rounded-xl bg-white/[0.07] border border-white/10 p-3.5 backdrop-blur-sm">
                  <Icon size={18} className="text-difc-gold-light mb-1.5" />
                  <p className="text-[13px] font-semibold leading-tight">{f.title}</p>
                  <p className="text-[11px] text-white/55 mt-0.5 leading-snug">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* bottom stats */}
        <div className="relative flex items-center gap-8">
          <Stat value="75%" label="Auto-resolved" />
          <div className="h-8 w-px bg-white/15" />
          <Stat value="14s" label="Avg response" />
          <div className="h-8 w-px bg-white/15" />
          <Stat value="24/7" label="Coverage" />
        </div>
      </div>

      {/* ── Right: sign-in ── */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* mobile brand */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
          <DifcEmblem size={32} />
          <span className="difc-font-display text-2xl font-extrabold text-difc-blue tracking-[0.04em]">DIFC</span>
        </div>

        <div className="w-full max-w-[400px] animate-fade-in">
          <div className="mb-8">
            <div className="mb-4"><DifcEmblem size={48} /></div>
            <h2 className="difc-font-display text-2xl font-bold text-difc-blue-deep">Welcome back</h2>
            <p className="text-[14px] text-difc-grey-light mt-1">Sign in to the Social Enquiry console.</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <Field icon={Mail} label="Work email" type="email" value={email} onChange={setEmail} placeholder="you@difc.ae" />
            <Field icon={Lock} label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-difc-grey cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="rounded border-difc-grey-light/40 text-difc-blue focus:ring-difc-blue/30" />
                Keep me signed in
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-difc-blue hover:underline">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3 text-[15px] disabled:opacity-80">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in…</> : <>Sign in <ArrowRight size={17} /></>}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-black/[0.07]" />
            <span className="text-[11px] text-difc-grey-light font-medium">OR</span>
            <div className="h-px flex-1 bg-black/[0.07]" />
          </div>

          <button onClick={submit} className="btn btn-outline w-full py-3">
            <Building2 size={17} /> Continue with DIFC SSO
          </button>

          <p className="text-[11px] text-difc-grey-light text-center mt-6 leading-relaxed">
            Prototype environment · demo credentials pre-filled.<br />
            Any sign-in opens the live console.
          </p>
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="difc-font-display text-2xl font-bold">{value}</p>
      <p className="text-[11px] text-white/55">{label}</p>
    </div>
  )
}

function Field({ icon: Icon, label, type, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-semibold text-difc-grey">{label}</span>
      <div className="relative mt-1.5">
        <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-difc-grey-light" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl bg-difc-sand border border-transparent focus:border-difc-blue/30 focus:bg-white focus:ring-4 focus:ring-difc-blue/8 outline-none pl-10 pr-3.5 py-3 text-[14px] transition"
        />
      </div>
    </label>
  )
}
