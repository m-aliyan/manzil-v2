---
name: react-performance
description: "Use when a Manzil page is slow, the client bundle grows, or components re-render excessively. Prioritized diagnosis plus zustand selector discipline for a static, scripted prototype."
---

# react-performance

Manzil has no network, no data fetching, and a tiny store — so the usual
waterfall advice is mostly N/A. The real risks are an over-wide client tree and
careless store subscriptions. Work the list top-down.

## Priority checklist (highest impact first)

1. **Boundary bloat.** A stray `"use client"` drags the frame, cards, and content
   into the client bundle. Move the directive to the leaf that needs it. This is
   almost always the biggest win here.
2. **Bundle size.** The only heavy deps are `motion`, `lucide-react`, and
   `lenis`. Import narrowly: `import { motion } from "motion/react"`, never a
   barrel. Do not add deps (AGENTS rule 4).
3. **Client fetching.** There is none by design. A `useEffect` fetch or an
   external `<script>` is wrong for this prototype — stop and report.
4. **Re-renders.** Store subscriptions and unstable props.
5. **Rendering cost.** Long lists and per-item work.

## zustand selector discipline (`src/store/selectors.ts`)

- Select **primitives or stable references**. `useCursor()` selects
  `state.cursor` (`selectors.ts:6`) — good.
- Actions are stable; select them once. `useAdvance()`/`useReset()` return the
  function itself, so they never cause re-renders.
- **Never return a new object/array from a selector** — it is `!==` every render
  and re-renders forever. Bad:
  `useDemo((s) => ({ cursor: s.cursor, advance: s.advance }))`.
  Select the values separately, or use `useShallow` from
  `zustand/react/shallow`.
- Never subscribe to the whole store (`useDemo()` with no selector).
- Add each new read as a named hook here so the rule lives in one file.

## Before you memoize

React is fast; the bundle is usually the problem, not CPU. **Do not** reach for
`useMemo`/`useCallback`/`React.memo` unless you can point at measured or obvious
churn:

- the re-render is a list of many items, or
- a child is genuinely expensive AND receives an unstable prop/function, or
- a value is recreated every render and passed into context (fix with selectors
  rather than memo).

`ChatMessage` is animated but cheap; memoizing it without evidence just adds
noise. Prefer moving the client boundary (`react-patterns`) over annotation.

## Bundle trimming

- Keep presentational shell/cards server-rendered so they stay out of JS.
- If a client component is below the fold or behind interaction, dynamic import
  it (`dynamic(() => import("./Heavy"), { ssr: false })`) — only with a reason
  and a stated size.
- Icons: import the specific icon, never the whole `lucide-react` namespace.

## Measuring (agents do not run npm — ask the owner)

- `next build` prints the route table: **First Load JS** per route. Compare
  before/after; a jump signals a boundary regression.
- Compiled output and cache live in `.next/` (see `nextjs-turbopack` for the
  slow-dev angle).
- Loop: `npm run build` → note First Load JS → change → rebuild.

Checklist: narrowest client boundary · primitive selectors · no new-object
selectors · no unjustified memo · no new deps · measured, not guessed.

Related: `react-patterns`, `nextjs-turbopack`, `verification-loop`.
