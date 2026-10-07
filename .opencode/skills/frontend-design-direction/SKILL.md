---
name: frontend-design-direction
description: "Use when starting new UI or choosing a design direction for Manzil. Enforces anti-slop rules: restraint over effects, purposeful hierarchy, no generic AI gradients/glass, tokens-only styling, and sparing use of motion."
---

# Manzil design direction

Manzil must read as a warm, trustworthy travel product — editorial, not
agency-cold; confident, not flashy. The bar is craft: it goes in front of
investors, incubators and industry.

## When to use

- Starting any new screen, section, or component.
- Making a look-and-feel decision (type, colour, layout, motion).
- Reviewing UI for quality and "AI-slop" signals.

## Direction, stated up front

- **Purpose:** make the Manzil idea felt — conversational planning, a safety
  warning that saves the trip, and a companion that stays on the road.
- **Audience:** domestic Pakistani travellers and the people who evaluate the
  startup.
- **Tone:** calm, human, honest. Never overpromise.
- **Memorable detail:** the journey/route line that draws as the story advances
  (see `manzil-map`).
- **Constraints:** mobile-first; phone-framed on desktop; tokens only; motion is
  transform/opacity only.

## Anti-patterns (do not ship these)

- Purple/blue "AI" gradients, glows, or glassmorphism.
- Decorative blobs and gratuitous background texture.
- Oversized hero text that pushes the real workflow below the fold.
- Cards nested inside cards; a single style used for everything.
- Motion for its own sake; scroll animations that fight the user.
- Vague marketing copy instead of concrete product language.

## How to work

1. Build the usable version first — real content, real states (empty too) — then
   apply polish (`make-interfaces-feel-better`).
2. Use existing tokens; extend the system deliberately (`design-system`).
3. Prefer hierarchy through type, spacing, and tone over effects.
4. Add motion last, from `motion-foundations` → `motion-patterns`.
5. Check it against `docs/DESIGN.md` and the mobile viewport (300–390px).

## Verification

- Does it feel like a considered product rather than a template?
- Is every colour a token? Every animation reduced-motion safe?
- Would the owner be happy to send this link to a stranger?
