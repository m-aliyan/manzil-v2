---
name: accessibility
description: "Use for WCAG 2.2 audits and inclusive design decisions in Manzil that go beyond component-level checks — contrast, target size, focus not obscured, motion, and text resize."
---

# accessibility

The audit-layer view of Manzil. Use `frontend-a11y` while building; use this
skill to judge the whole experience against WCAG 2.2 and to write a prioritized
fix list.

## WCAG 2.2 at a glance (POUR)

- **Perceivable** — text alternatives, contrast, scalable text.
- **Operable** — keyboard, target size, no traps, enough time.
- **Understandable** — predictable, labelled, errors explained.
- **Robust** — semantics assistive tech can parse.

WCAG 2.2 added target size (minimum) and focus-not-obscured; check both.

## Criteria that matter most here

| SC | Requirement | Manzil surface |
| --- | --- | --- |
| 1.4.3 / 1.4.11 | Text 4.5:1 (3:1 large); UI/graphics 3:1 | `--muted #6b7075` on `--surface #fff` and `--background`; `--warning` on tint; focus ring vs dark stage |
| 2.4.7 / 2.4.13 | Visible, sufficient focus | `focus-visible:ring-2 ring-accent/50` (`Button.tsx:6`) |
| 2.4.11 | Focus not obscured | ring clipped by `DeviceFrame` `overflow-hidden` or sticky header/footer in `Experience.tsx` |
| 2.5.8 | Target size ≥ 24×24 CSS px | reply chips, continue/reset, future icon buttons |
| 2.3.3 / 2.2.2 | Motion from interaction; pause/stop | entrances honour `useReducedMotionSafe()`; the globals.css rule is only a backstop |
| 1.4.4 | Resize text to 200% | `[15px]` bubbles and `mono-label` must not clip in the 390px frame |
| 1.4.12 | Text spacing | `leading-relaxed` and no fixed text-block heights |
| 3.3.1 / 3.3.3 | Error identification/suggestion | free-text input must say when input is unmapped |
| 2.1.1 | Keyboard | chips, input, buttons all reachable |

Note: the app never advances on its own, so timing criteria (2.2.x) are largely
satisfied by design — keep it that way.

## Audit procedure

1. **Inventory** interactive surfaces: `Experience.tsx` (continue/reset, and the
   Phase-2 chips + input), `ChatStream`/`ChatMessage`, `Button`.
2. **Keyboard-only pass**: Tab through everything; confirm order, visible focus,
   no trap; Space/Enter activate.
3. **Contrast**: sample each token pair actually used, including states (hover,
   muted label, warning tint, disabled). Judge 4.5:1 text / 3:1 UI.
4. **Zoom/text**: 200% and ~320px width; confirm the phone frame doesn't clip.
5. **Motion**: enable "reduce motion"; confirm entrances settle and meaning
   survives.
6. **Screen-reader smoke**: verify the stream is announced politely.
7. Write findings as a prioritized fix list with exact locations.

## Output format

```
SC 1.4.11 (P2) — focus ring vs dark stage
  file: src/components/ui/Button.tsx:6
  now: ring-accent/50 over bg-stage
  fix: raise ring width/contrast; recheck in the desktop frame
```

Track: Severity (P1 blocks use / P2 degrades / P3 polish) · SC · `file:line` ·
what+why · concrete fix. No fix list without locations.

## Anti-patterns

- Passing contrast only in the light default while the stage/frame is dark.
- `aria-label` that overrides visible text with different wording.
- Treating the globals `prefers-reduced-motion` rule as the full fallback.
- `tabIndex > 0`, clickable `<div>`, placeholder-as-label, colour-only status.
- Auditing only the phone viewport and ignoring the desktop stage and frame.

Related: `frontend-a11y`, `design-system`, `verification-loop`, `@a11y-reviewer`.
