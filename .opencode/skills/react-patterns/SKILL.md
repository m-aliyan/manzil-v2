---
name: react-patterns
description: "Use when writing or changing a `.tsx` component in Manzil. Covers React 19 + Next 16 App Router server/client boundaries, hook discipline, composition, and where state belongs (local state vs the zustand store)."
---

# react-patterns

Manzil is React 19.2 + Next 16 App Router, TypeScript strict. Components render
scripted content from `src/content/`; they never hold copy, raw colours, or raw
motion values. One responsibility per file, roughly ≤150 lines.

## Server or client? (decision tree)

1. Does it need an event handler, a hook, or a motion element? → `"use client"`.
2. Does it only format and render props/children? → Server Component (default).
3. Is it a store selector? → client (the store lives in `src/store/store.ts`).
4. Unsure? Start server; only add the directive when a build error forces it.

**Where the line already sits:**

| Server (no directive) | Client (`"use client"`) |
| --- | --- |
| `src/app/page.tsx`, `layout.tsx` | `src/components/journey/Experience.tsx` |
| `src/components/shell/Stage.tsx`, `DeviceFrame.tsx` | `ChatStream.tsx`, `ChatMessage.tsx` |
| `src/components/cards/*.tsx` | `src/engine/use-flow.ts` |
| `src/components/ui/Button.tsx`, `Container.tsx` | `src/store/*`, `src/lib/hooks/*` |

A `"use client"` file makes its whole import subtree client. Put it on the leaf
that actually needs interactivity, never on `page.tsx` to "make it work".

## Where state belongs

- **Derived, no mutation** → compute during render. `visibleSteps(flow, cursor)`
  in `src/engine/flow.ts` is pure; do not cache it in state.
- **Ephemeral, one component or a tiny subtree** (open/closed, draft input) →
  `useState` locally.
- **Shared across the journey, part of the story** (the cursor) → the zustand
  store. Read via `src/store/selectors.ts`; mutate only through store actions.

Rule: lift state only as far as the nearest common consumer. The cursor is
global because the header, stream and footer all care; a card's expanded state
is local.

## Composition over props

- Pass `children`, not a `kind`/`renderX` prop, when a parent is just a frame.
  `Stage` and `DeviceFrame` take `ReactNode` (`DeviceFrame.tsx:7`).
- `ChatMessage` composes a card via a `switch` on `step.kind`
  (`ChatMessage.tsx:44`). To add a card kind, add a case there — no prop
  drilling.
- Cards are pure `({ text })` components (`PlanCard.tsx:1`). Keep them that way;
  data-shaping happens in the engine/content layer, not inside a card.

## Hooks

- Top level only. Never call `useFlow`/`useCursor` conditionally or in a loop.
- One hook = one concern. `useFlow` composes store + pure engine into a view
  model (`use-flow.ts:8`); it does not render.
- Add new store reads as named selectors in `src/store/selectors.ts`, not inline
  `useDemo((s) => ...)` scattered through components.
- Client hooks live in `src/lib/hooks/` (`use-hydrated.ts`,
  `use-reduced-motion-safe.ts`). Reuse them instead of re-deriving flags.

## Lists & keys

- `steps.map(...)` keys on the stable step `id` (`ChatStream.tsx:12`), never on
  the array index — steps replay on reset and indices collide with animation.
- `AnimatePresence` needs the same stable `key` on its direct child.
- No index-based cross-file coupling; ids are stable (see `docs/BLUEPRINT.md`).

## Anti-patterns

- `"use client"` on a whole page or layout to fix one child.
- Copy, hex colours, or durations inline in a `.tsx`.
- `useEffect` to derive state from props/other state; compute it instead.
- Importing raw `flow` in a component instead of going through `useFlow()`.

Checklist: correct boundary · no `any` · stable keys · state in the right layer ·
no copy/colour/motion literals · one thing moves.

Related: `react-performance`, `motion-foundations`, `frontend-a11y`.
