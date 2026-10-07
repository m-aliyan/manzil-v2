---
name: browser-qa
description: "Use to visually verify the running Manzil demo — smoke, interaction, visual, and accessibility checks. Read-only by default; report findings with evidence."
---

# browser-qa

Visual QA for the running prototype. **Read-only by default**: observe and report,
do not fix during a QA pass. Manzil is a scripted demo — nothing advances on its
own — so most checks are about the viewer staying in control and the craft holding
up.

## Phase 1 — Smoke

- Page loads with no console errors (state the exact error if any).
- Desktop: the app renders inside the `DeviceFrame` on the `Stage`, centred.
- Mobile (320 / 390px): the frame disappears, the app is full-bleed, no horizontal
  scroll, no clipped content.
- Refresh resets to the cover / hook (D1). There is no autoplay.

## Phase 2 — Interaction

- Walk the hero beats D1 → D2 → P1 → P2 → C1 → C2, then C3 as it lands.
- The flow advances **only** on a user action — no self-advancing beats.
- Suggested-reply chips and the free-text input map onto the canonical next step;
  the conversation never goes off-script or dead-ends.
- Cards render with real content (day-by-day plan, warning/adjustment, road
  report); no empty or placeholder cards on the HERO path.

## Phase 3 — Visual

- Spacing, radius, type and contrast read against `docs/DESIGN.md`; tokens only,
  no hardcoded colour.
- Motion uses `transform` / `opacity` only and matches `src/lib/motion.ts`.
- No layout shift when beats enter; LCP text is not hidden until hydration.

## Phase 4 — Accessibility

- Keyboard-only path: every interactive control reaches focus in a sensible order
  with a visible focus ring.
- Controls have accessible names/labels; chips and input are announced.
- `prefers-reduced-motion: reduce` yields a static, complete state.
- Contrast passes for body and interactive text.

## Evidence

Describe what you saw with specifics: beat ID, viewport width, exact console
message, the element and its state. Screenshots or quotes beat adjectives.

## Report format

```
Smoke: <pass/fail + evidence>
Interaction: <pass/fail + evidence>
Visual: <pass/fail + evidence>
Accessibility: <pass/fail + evidence>
Findings: <ordered list, most severe first, each with evidence>
```

## Rules

- If you cannot establish expected behaviour (no `docs/DESIGN.md` value, no
  baseline), mark that check **INCONCLUSIVE** and say what is missing. Never guess
  a pass.
- Do not fix inside a QA pass; report, then fix as a separate approved task.
