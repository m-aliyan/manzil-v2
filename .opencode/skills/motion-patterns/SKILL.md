---
name: motion-patterns
description: "Use for standard Manzil animation patterns — chat message rise, card reveal, list stagger, AnimatePresence swaps, sheet/modal, scroll reveal — built on motion-foundations tokens."
---

# motion-patterns

The catalog of routine Manzil animations. Everything here composes tokens from
`src/lib/motion.ts` and obeys `motion-foundations`. If a moment is not listed,
it is probably routine — build it from these primitives. Signature moments go to
`motion-advanced`.

## Rules for every pattern

- Import `motion`, `AnimatePresence` from `motion/react`; tokens from `@/lib/motion`.
- **Key every `AnimatePresence` child** by a stable id (`step.id`).
- **Always define `exit`** whenever you use `AnimatePresence` — otherwise removed
  items pop out.
- **Stagger 0.05–0.09s**; more than that feels slow and off-script.
- Never animate layout properties; use `layout="position"` for reflow.
- Reduced motion: render the settled state directly, no `initial`.

## Message / card rise (canonical)

`riseIn` + `transitions.enter` is the house entrance — already used by
`src/components/journey/ChatMessage.tsx`.

```tsx
"use client";
import { motion } from "motion/react";
import { riseIn, transitions } from "@/lib/motion";

<motion.div
  layout="position"
  initial={riseIn.initial}
  animate={riseIn.animate}
  exit={riseIn.exit}
  transition={transitions.enter}
>
  {children}
</motion.div>
```

## New messages in the stream

`src/components/journey/ChatStream.tsx`: `initial={false}` means the existing
history does **not** replay on mount — only genuinely new steps animate.

```tsx
<AnimatePresence initial={false}>
  {steps.map((step) => (
    <ChatMessage key={step.id} step={step} />
  ))}
</AnimatePresence>
```

Keep `ChatStream` dumb: it maps steps. The parent (`Experience.tsx`) owns flow.
A card is just a `kind` routed inside `ChatMessage`; no bespoke animation per card.

## List stagger

Use for chips, day-by-day rows, or option lists. Cap the delay so long lists do
not drag: `delay: index * 0.06` but clamp (`Math.min(index, 6) * 0.06`).

```tsx
{items.map((item, i) => (
  <motion.li
    key={item.id}
    initial={riseIn.initial}
    animate={riseIn.animate}
    transition={{ ...transitions.enter, delay: Math.min(i, 6) * 0.06 }}
  >
    {item.label}
  </motion.li>
))}
```

## Swap (viewport / tab / step change)

One thing leaves, one arrives — use `mode="wait"` and a keyed child. Ease with
`inOut` for a symmetric handoff.

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeView}
    initial={{ opacity: 0, y: motionTokens.distance.sm }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -motionTokens.distance.xs }}
    transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease.inOut }}
  />
</AnimatePresence>
```

## Bottom sheet / modal

Bottom sheets are the Manzil idiom for plan detail and warnings. Enter from
`y` (transform), never `height`. Anchor to the frame the way `DeviceFrame` does.

```tsx
<AnimatePresence>
  {open && (
    <motion.div
      key="scrim"
      className="absolute inset-0 z-40 bg-foreground/20"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={transitions.quick}
      onClick={onClose}
    />
  )}
  {open && (
    <motion.section
      key="sheet"
      role="dialog" aria-modal="true" aria-labelledby={titleId}
      className="absolute inset-x-0 bottom-0 z-50 rounded-t-2xl bg-surface p-5 shadow-2xl"
      initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
      transition={springs.gentle}
    >
      {children}
    </motion.section>
  )}
</AnimatePresence>
```

Sheet requirements: `role="dialog"` + `aria-modal`, labelled title, focus moved
into the sheet on open, **Escape closes**, focus restored on close. This is
accessibility, not motion — pair with `frontend-a11y`.

## Scroll reveal

Use `whileInView` + `viewportOnce` only for content below the fold. Never for
the hero or anything on the LCP path.

```tsx
<motion.div
  initial={{ opacity: 0, y: motionTokens.distance.md }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={viewportOnce}
  transition={{ duration: motionTokens.duration.slow, ease: motionTokens.ease.out }}
/>
```

## Micro-interactions

Hover/press on buttons and cards use `motionTokens.scale`: `hover 1.02`,
`press 0.98`, `transitions.quick`. `src/components/ui/Button.tsx` uses a CSS
`active:scale-[0.98]`; keep any motion variant consistent with it.

## Checklist

- [ ] Child keyed; `exit` defined.
- [ ] Stagger ≤ 0.09s and clamped.
- [ ] No layout property animated (`layout="position"` where needed).
- [ ] Tokens imported, none inlined.
- [ ] Reduced motion renders settled state.
- [ ] Sheet: focus trap, Escape, restore.
