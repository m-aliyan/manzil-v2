---
name: make-interfaces-feel-better
description: "Use for polish passes on Manzil UI — concentric radii, optical alignment, text wrapping, hit areas, borders/shadows, and micro-interactions. Load when refining an existing screen or component."
---

# make-interfaces-feel-better

The finish pass. Motion tokens are in `motion-foundations`; this is about the
static craft that makes Manzil read as a confident product rather than a mockup.
Apply after a screen works, before calling it done. Legibility rules live in
`docs/DESIGN.md`; colour/type tokens in `src/app/globals.css`.

## Principles, with Manzil examples

### Concentric radii

Nested corners must share a centre: **outer radius = inner radius + padding**.
`DeviceFrame` already does this — bezel `rounded-[3rem]` (48px) with `p-3` (12px)
→ inner `rounded-[2.375rem]` (38px). Keep the pattern inside the app:

- A `rounded-2xl` card (16px) with `p-4` (16px) containing a pill or icon tile:
  the inner radius should be `16 − 16` → use `rounded-md`/inner smaller so the gap
  reads uniform. Never put a `rounded-2xl` child tight inside a `rounded-full`
  parent.
- Buttons are `rounded-full`; a full pill inside a rounded card is fine, but do
  not nest two near-equal radii with padding between them.

### Optical alignment

Geometric centring is not optical centring.

- Icons next to text (`Button` uses `gap-2`): nudge optical, not mathematical,
  if a glyph like a chevron looks low. Trust the eye at 15px.
- The `mono-label` eyebrow (11px, `0.22em` uppercase) has trailing letter-space;
  when flush-left in a card, the text looks indented. That is acceptable inside
  `p-4`; do not add extra left padding.
- Chat bubbles: user bubbles right-aligned, Manzil left; keep the first line of
  text aligned across a conversation, not the bubble edges.

### Text wrapping

`globals.css` sets `h1,h2,h3 { text-wrap: balance }` and `p,li { text-wrap: pretty }`
— keep that on headings and body. Never `white-space: nowrap` on copy that must
reflow at 300px. Body measure ~60ch; within the 390px frame the chat column
already enforces this, so do not widen `max-w-[85%]` casually.

### Numbers & labels

Use `tabular-nums` on anything numeric that sits in a column (budget figures,
day numbers, elevations) so digits do not jitter. The `mono-label` utility is
for eyebrows/status only — do not use it for sentences.

### Hit areas

Touch targets ≥ 40–44px. `Button` sizes are `sm: h-9` (36px) — do **not** use
`sm` as a primary tap target in the phone frame; use `md: h-11` (44px) or `lg`.
Icon-only controls need a 44px invisible hit area even if the glyph is small.
Suggested-reply chips must be at least 40px tall on the HERO path.

### Borders over heavy shadows

Manzil is warm and editorial, not agency-cold. Prefer `border border-hairline`
with `shadow-sm` (as in `PlanCard`). Reserve `shadow-2xl` for the `DeviceFrame`
and modal sheets. Warning cards (`WarningCard`) use `border-warning/30 bg-warning/5`
— do not add a loud shadow to a warning; the colour is the signal.

### Micro-interactions

- Press: `scale 0.98` (`motionTokens.scale.press`) via `active:scale-[0.98]`, as
  `Button` already does. Hover: `1.02`, only where a pointer exists (`md:`).
- Transition **transform/opacity only** — never `transition-all`. `Button` uses
  `transition-colors` deliberately.
- Duration/curve from `src/lib/motion.ts`; no ad-hoc `ease-in-out 300ms`.
- Keep the CSS press and any `motion` press identical so they do not fight.

## Before / after

| Feels off | Feels right |
| --- | --- |
| `transition: all .3s ease` | `transition-colors` + `active:scale-[0.98]` |
| Two different radii nested tight | Concentric: outer = inner + padding |
| `shadow-xl` on every card | `border-hairline` + `shadow-sm`; shadow only for frame/sheet |
| Icon `h-8 w-8` tap target | 44px hit area, glyph centred |
| `text-sm` in 36px (`sm`) button | `md` (44px) for taps in the frame |
| Right-aligned numbers jitter | `tabular-nums` |
| Hard hex in a className | Token class (`text-warning`, `bg-accent`) |
| Heading wrapping awkwardly | `text-wrap: balance` (already global) |

## Pass checklist (cards & chat bubbles)

- [ ] Nested radii are concentric; nothing looks pinched.
- [ ] Tap targets ≥ 44px on the HERO path (chips, buttons, icon controls).
- [ ] Borders/hairlines carry the separation; shadows only frame/sheet/warning-free.
- [ ] Press/hover use token scale + transform/opacity, not `transition-all`.
- [ ] `ChatMessage` bubbles align to the text column; `max-w-[85%]` respected.
- [ ] `PlanCard` / `WarningCard` / `CheckinCard` / `RoadReportCard` share
      `rounded-2xl`, `p-4`, token colours — no one-off styling.
- [ ] Numeric content is `tabular-nums`; paragraphs wrap `pretty`.
- [ ] Colour is tokens only; warnings sparing.
- [ ] Checked at 300–390px and with reduced motion before declaring done.

Related: `frontend-design-direction` · `design-system` · `motion-foundations` ·
`frontend-a11y` · `verification-loop`.
