---
name: frontend-a11y
description: "Use when building interactive elements in Manzil — labels, keyboard navigation, focus, ARIA, and contrast. Practical, component-level accessibility for the chat input, suggested-reply chips, and cards."
---

# frontend-a11y

Component-level accessibility for Manzil. Semantic HTML does most of the work;
ARIA is a patch, not a starting point. Use `accessibility` for the WCAG 2.2
audit view.

## Semantic HTML first

- Real `<button>` for actions, `<a>`/`<Link>` for navigation. Never a clickable
  `<div>`. `src/components/ui/Button.tsx` renders a real `<button>` with
  `type="button"` by default (`Button.tsx:32`) — use it.
- Cards already use `<article>` with a visible mono label (`PlanCard.tsx:3`).
  Keep a visible text label so sighted and AT users get the same context.
- One `<main>` per page (`Stage.tsx:7`); `header`/`footer` in `Experience.tsx`
  are landmarks.

## Labels & descriptions

- Every input gets a programmatic label. Prefer a visible `<label htmlFor>`.
  The Phase-2 chat textarea may be visually compact — then use a visually hidden
  `<label>` (`sr-only`), never placeholder-as-label.
- Tie hints/errors with `aria-describedby`. An error needs an
  `aria-live="assertive"` region and `aria-invalid` on the field.
- Suggested-reply chips are buttons whose accessible name is the reply text; no
  extra `aria-label` unless the visible text is abbreviated.

## Keyboard & focus

- Everything operable by mouse must be operable by keyboard, in a logical order.
- Visible focus is mandatory and already styled: `focus-visible:ring-2
  focus-visible:ring-accent/50` (`Button.tsx:6`). Do not remove outlines.
  Watch `DeviceFrame`'s `overflow-hidden` (`DeviceFrame.tsx:10`) and the sticky
  header/footer in `Experience.tsx` — they can **clip** a focus ring.
- No keyboard traps. The chat scroll area must let Tab move through chips and
  back to the input.
- Do not use `tabIndex > 0`. Roving tabindex only for a true composite widget.

## ARIA for the scripted stream

- Mark the conversation as a live log so new Manzil/card steps are announced:
  `role="log"` and `aria-live="polite"` on the stream wrapper (`ChatStream`),
  plus `aria-relevant="additions"`.
- Announce user-sent messages once, politely. Do not use
  `aria-live="assertive"` for routine story beats — it interrupts.
- Decorative art (`Stage` gradient, `DeviceFrame` notch) is already
  `aria-hidden`; keep it that way.
- Entrances use `motion` and honour `useReducedMotionSafe()`
  (`use-reduced-motion-safe.ts`); the static fallback must keep the meaning.

## Component checklist

- [ ] Input: `<label>` (visible or `sr-only`), `id`, `aria-describedby`; errors
      via `aria-live`.
- [ ] Chips/`Button`: real `<button>`, name = visible text, ~44px target,
      Enter/Space works.
- [ ] Stream: `role="log"` + `aria-live="polite"`, additions relevant.
- [ ] Cards: `<article>` + label; state never conveyed by colour alone (the
      warning card uses text + the `warning` token).
- [ ] Focus ring never clipped by overflow or sticky bars.
- [ ] Reduced motion honoured with no loss of meaning.
- [ ] Contrast checked against tokens (`accessibility`).

Related: `accessibility`, `react-patterns`, `motion-foundations`.
