# DIFC — Social Enquiry Intelligence (Interactive Prototype)

An interactive, **static-data** demonstration of an AI-powered social media enquiry
management bot for **Dubai International Financial Centre (DIFC)**. Built to show the
client the full agentic **+ human-in-the-loop** workflow, styled in DIFC's brand
(Regal Blue `#01516C`).

> This is a front-end prototype. All data is fictional and hard-coded — there are no
> live API connections, no back end, and no real customer data. It is designed purely
> to communicate the product vision in a meeting.

---

## What's inside

Five modules, navigable from the left sidebar:

1. **Overview** — analytics dashboard: enquiry volumes (AI vs. escalated), channel mix,
   intent categories, response times, 24/7 hourly coverage, business-line routing,
   language mix, and headline KPIs (deflection rate, SLA, CSAT, leads).
2. **Unified Inbox** — one inbox merging DMs **and** comments from all six channels
   (Instagram, LinkedIn, Facebook, X, TikTok, YouTube), with filters and live SLA timers.
3. **Agentic + Human-in-the-loop** — open any **"Needs Action"** conversation (e.g. the
   top Instagram or LinkedIn item) to watch the agent **classify intent, detect sentiment
   & language, retrieve a grounded answer from the knowledge base, and draft a reply** —
   then **Approve & Send, Edit, Regenerate, or Escalate** to a human. Every step is logged
   to an audit trail.
4. **Leads** — captured leads, scored, deduplicated and routed by business line.
5. **Channels & Setup** — compliance-first capability matrix per platform (what is
   automated vs. human-handled vs. N/A), grounded in the API feasibility research.

### Demo tips for the meeting
- Start on **Overview** for the numbers, then click **Open Live Inbox**.
- In the inbox, the first **Instagram** (Aisha Rahman) and **LinkedIn** (Robert King /
  Daniel Osei) items are "new" — opening them triggers the **live agentic animation**.
- Try **Escalate** on the complaint (Marcus Bell) and **Approve & Send** on a new lead.
- The **Channels** tab is where you explain *why* LinkedIn DMs are human-handled
  (no compliant API) — turning a limitation into a trust message.

---

## Run it

### Option A — Docker (recommended for the client)
```bash
docker compose up --build
```
Then open **http://localhost:8080**

To stop: `docker compose down`

### Option B — Local dev (Node 18+)
```bash
npm install
npm run dev      # http://localhost:5173
```
Production build: `npm run build` then `npm run preview`.

---

## Tech
- **React 18 + Vite** (static SPA)
- **Tailwind CSS** with a custom DIFC theme (`tailwind.config.js`)
- **Recharts** for charts, **lucide-react** for icons
- **Docker multi-stage build** → served by **nginx** (`Dockerfile`, `nginx.conf`)

## Branding — swapping in the official DIFC logo
The app ships with a brand-accurate lockup: official **Regal Blue `#01516C`**, a
"The Gate"-inspired emblem, the bilingual name, and a matching favicon. The emblem
is drawn as inline SVG in `src/components/Brand.jsx` (`DifcEmblem`).

DIFC's official logo vector files sit behind an email/login gate on brand-asset
sites, so they couldn't be auto-downloaded. If you have the official `.svg`/`.png`:

1. Drop it into `public/` (e.g. `public/difc-logo.svg` — a placeholder is already there).
2. In `src/components/Brand.jsx`, replace the `<svg>…</svg>` inside `DifcEmblem`
   with `<img src="/difc-logo.svg" width={size} height={size} alt="DIFC" />`.
3. Optionally replace `public/favicon.svg` with the official mark.

That single change updates the login screen, sidebar and favicon everywhere.

## Where to edit the data
All demo content is in `src/data/`:
- `conversations.js` — inbox conversations & agent reasoning
- `knowledgeBase.js` — DIFC FAQ articles the agent answers from
- `analytics.js` — dashboard charts & KPIs
- `leads.js` — captured leads table
- `meta.js` — channels, intents, business lines, team, statuses

---
*Prototype for demonstration only. Brand colours approximate DIFC's public identity.*
