---
name: motion-advanced
description: "Use only for Manzil's signature moments (the journey/route line, SVG path draw, gestures, text effects). Everything routine stays in motion-patterns."
---

# motion-advanced

Reserved for the few moments that must feel designed: the **journey/route line**
and anything built on it. If the pattern is a rise, stagger, swap, or scroll
reveal, stop — that is `motion-patterns`. This skill assumes `motion-foundations`
is already loaded.

## The Manzil signature: the journey/route line

`docs/DESIGN.md` §4 calls it out: *a route line that draws as the story advances*.
It is the visual spine of the hero journey and maps directly to the three layers:

| Story beat | Layer | Route line |
| --- | --- | --- |
| D1 → D2 | Discovery | Short entry line draws in. |
| P1 → P2 | Planning | Line extends; a **warning (P2) interrupts it** — pause, then redraw the adjusted route. |
| C1 → C2 | Companion | Line continues to the destination; check-in/report markers appear. |
| C3 | Closer | Line completes. |

Rules:

- The line's progress is driven by the **flow cursor** (`src/store/selectors.ts`,
  `src/engine/use-flow.ts`) — never by a timer. The demo is scripted, and the
  viewer drives it.
- Warnings are the only place `--warning` (`#b45309`) touches the line. The
  accent (`#2f6f5e`) is the default route colour.
- One thing moves at a time: the route may draw **or** the plan may reveal, not
  both at full tilt.

## SVG path draw with `pathLength`

`motion` normalises path length, so you animate `pathLength` 0→1 without measuring
the `d` attribute. Use `cadence` for a deliberate draw.

```tsx
"use client";
import { motion } from "motion/react";
import { motionTokens } from "@/lib/motion";

<motion.path
  d={routePath}
  fill="none"
  stroke="var(--accent)"
  strokeWidth={2}
  strokeLinecap="round"
  strokeDasharray="0 1"          // let pathLength own the dash
  initial={{ pathLength: 0 }}
  animate={{ pathLength: progress }}   // progress from flow, 0..1
  transition={{ duration: motionTokens.duration.cadence, ease: motionTokens.ease.inOut }}
/>
```

## Warning interrupt / redraw

At P2 the route should visibly react to the safety moment before it resumes.
Two safe techniques:

1. **Pause then redraw** — hold `progress`, shift the remaining segment to
   `--warning` for one beat, then continue on `--accent`. Drive the segment from
   step ids in `src/content/flow.ts`, not from wall-clock.
2. **Marker nudge** — a `scale`/`y` pulse on the warning marker (`springs.snappy`)
   plus a one-beat colour shift. Cheaper and reads clearly at phone width.

Do not add a second competing animated element. The interruption *is* the moment.

## Motion values + `useTransform` caveats

- Use `useMotionValue` / `useTransform` for cursor-driven values (route progress,
  marker position). Keep the derived mapping pure and in one place.
- **Do not** feed a motion value into a React state setter or a render branch —
  that forces a render per frame. Style/attribute only.
- Transform output for `pathLength` to `[0,1]`; for position, keep to
  `motionTokens.distance` multiples where a discrete offset is needed.
- `useTransform` is for *display transforms*. The story's truth stays in the
  store; the route is a projection of it.

## Reduced-motion fallback

The route line **never** disappears under reduced motion — it becomes static and
complete for the current step. Meaning survives; motion does not.

```tsx
const reduced = useReducedMotionSafe();
// ...
animate={{ pathLength: reduced ? progress : progress }}
transition={reduced ? { duration: 0 } : { duration: motionTokens.duration.cadence }}
```

Better: when reduced, render the full path to the current step with no
transition and skip the interrupt beat entirely (show the adjusted route once).
`globals.css` also clamps transitions globally; still branch explicitly.

## Performance notes

- Animate `pathLength` and `transform` only — no `d` morphing, no filter/blur
  animation on the line (paint-heavy on phones).
- One SVG route per view; keep the path data simple, `vector-effect:
  non-scaling-stroke` if it scales inside `DeviceFrame`.
- Avoid `will-change` blanketly; let `motion` manage compositing.
- Test at 300–390px — the line must stay legible and not collide with the chat
  column. If it cannot, it belongs behind the header, not over the messages.
- Bundle: do not reach for extra `motion` features (layout projection, 3D) for
  this.

## Checklist

- [ ] Progress is cursor-driven, not timed.
- [ ] Accent for route, `--warning` only for the interrupt.
- [ ] One signature element in motion at a time.
- [ ] Reduced motion = static, complete, meaningful route.
- [ ] Transform/opacity/`pathLength` only; no filters.
- [ ] Verified at 300–390px.

Related: `manzil-map` · `motion-patterns` · `motion-foundations` · `design-system`.
