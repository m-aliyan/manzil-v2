# Manzil — Interactive Prototype

Turns the Manzil research brief into something you can use rather than read: an
interactive, scripted journey through the idea — **Discovery → Planning (a
warning that saves the trip) → Companion (check-in + traveller road report)**.

This is a pitch prototype, not a product. No backend, no AI, no real data; all
content is scripted and lives in `src/content/`.

- Stack: Next.js 16 (App Router) · React 19 · Tailwind v4 · `motion` · `lenis` ·
  `zustand` · `zod`. Hosted on Vercel.
- Mobile-first: framed as a phone on desktop, full-bleed on phones.
- Interactive, never autoplay — the viewer drives it.

## Quickstart

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # lint + typecheck + build
```

## Where things live

| Path                     | What                                                     |
| ------------------------ | -------------------------------------------------------- |
| `docs/BLUEPRINT.md`      | Source of truth — read first                              |
| `docs/DESIGN.md`         | Design contract (tokens, type, motion)                    |
| `docs/ARCHITECTURE.md`   | Layers and data flow                                      |
| `src/content/`           | All scripted copy + zod schemas (edit copy here only)     |
| `src/engine/`            | Pure flow logic + `useFlow` view-model                    |
| `src/store/`             | Zustand world: store, pure transitions, selectors         |
| `src/components/shell/`  | `Stage` + `DeviceFrame` (the phone frame)                 |
| `src/components/journey/`| The conversation UI                                       |
| `src/components/cards/`  | Plan, Warning, Check-in, Road-Report cards                |
| `src/app/globals.css`    | Design tokens                                             |
| `src/lib/motion.ts`      | Motion tokens (single source)                             |
| `video/`                 | Empty placeholder — HyperFrames video comes in Phase 3    |

## Status

Phase 1 (foundations) is complete. Phase 2 locks the design and the hero
scenario, then builds the full interactive journey. See `docs/session-context/`.
