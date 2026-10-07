---
name: motion-foundations
description: "Load before writing any animation in Manzil. Defines the motion base layer: `motion/react` (import from `motion/react`, never framer-motion), the tokens in `src/lib/motion.ts`, reduced-motion rules, and the transform/opacity-only rule."
---

# motion-foundations

The base layer under every animation in Manzil. Read this **before** writing
`motion` code. Routine patterns belong in `motion-patterns`; signature moments in
`motion-advanced`. This skill only sets the rules and the tokens.

## When to use

- Any file that imports from `motion/react`, uses `<motion.*>`, `AnimatePresence`,
  `useTransform`, or an enter/exit transition.
- Any time you are about to type a duration, easing, spring, or distance value.
- Reviewing a diff that touches motion (auto-invoked by the reviewer agents).

## Non-negotiable rules

1. **Import from `motion/react`.** Never `framer-motion` (not a dependency).
   `src/lib/motion.ts` itself does `import type { Transition } from "motion/react"`.
2. **Transform + opacity only.** Animate `opacity`, `x`, `y`, `scale`, `rotate`.
   Never animate `width`, `height`, `top/left`, `margin`, `padding`, `border`,
   or `box-shadow`. Layout animation = jank. `ChatMessage` uses `layout="position"`
   for reflow, not animated layout values.
3. **No raw values.** Every duration, ease, distance, spring, scale, and viewport
   margin comes from `src/lib/motion.ts`. If a value is missing there, propose
   adding it to the token file — do not inline it in a component.
4. **`"use client"` is required** on any component that renders a motion element
   or calls a motion hook. Server Components render the settled state as static
   markup only.
5. **Reduced motion is mandatory.** Read the flag through
   `src/lib/hooks/use-reduced-motion-safe.ts` (not raw `useReducedMotion`).
   Every animation has a settled static equivalent that keeps its meaning.

## Token table (`src/lib/motion.ts`)

| Export | Values | Use |
| --- | --- | --- |
| `motionTokens.duration` | `fast 0.2`, `base 0.45`, `slow 0.7`, `crawl 1.2`, `cadence 1.8` | How long. `base` for messages/cards; `cadence` for the journey line. |
| `motionTokens.ease` | `out [0.22,1,0.36,1]`, `inOut [0.65,0,0.35,1]` | Easing curves. `out` for entrances, `inOut` for swaps. |
| `motionTokens.distance` | `xs 6`, `sm 12`, `md 20`, `lg 32`, `xl 48` | Rise/offset distance. `sm` is the default rise. |
| `motionTokens.scale` | `hover 1.02`, `press 0.98` | Micro-interactions only. Never larger. |
| `springs.snappy` | `{ type:"spring", stiffness:420, damping:32 }` | Interactive/completion feel. |
| `springs.gentle` | `{ type:"spring", stiffness:220, damping:30 }` | Soft reveals, no bounce. |
| `viewportOnce` | `{ once:true, margin:"-80px" }` | `whileInView` — reveals once, 80px early. |
| `transitions.enter` | `{ duration: base, ease: out }` | Standard entrance. |
| `transitions.quick` | `{ duration: fast, ease: out }` | Hover/press/instant feedback. |
| `riseIn` | `initial {opacity:0,y:12}`, `animate {opacity:1,y:0}`, `exit {opacity:0,y:-6}` | The canonical message/card entrance. |

## SSR & hydration

- **LCP is text.** Server-render the settled, visible state. Never hide the hero
  or chat content until hydration — no `initial={{ opacity: 0 }}` on the first
  paint of content the viewer must read.
- **Never branch rendered DOM on raw `useReducedMotion()`** — it returns `null`
  on the server and causes hydration mismatch. Use
  `useReducedMotionSafe()` (settles to `false` until hydrated) and
  `src/lib/hooks/use-hydrated.ts`.
- `src/app/globals.css` already carries a `prefers-reduced-motion` catch-all
  (`animation/transition-duration: 0.001ms`). It is a backstop, not a substitute
  for a correct static fallback.

## Checklist

- [ ] Imports come from `motion/react`.
- [ ] Every value traces back to `src/lib/motion.ts`.
- [ ] Only transform/opacity animate.
- [ ] `"use client"` present where motion runs.
- [ ] Reduced motion via `useReducedMotionSafe()`, with a static equivalent.
- [ ] First paint shows settled content (no hydration-hidden LCP).
- [ ] One thing moves at a time.

Related: `motion-patterns` (catalog) · `motion-advanced` (journey line) ·
`design-system` (tokens/colour) · `frontend-a11y` (focus/motion meaning).
