---
name: manzil-blueprint
description: "Use when any task may touch scope, story, or product intent. Enforces docs/BLUEPRINT.md as the source of truth — beat IDs, HERO/SUPPORT, the three layers, non-goals, and the conflict-stop rule."
---

# Manzil blueprint discipline

`docs/BLUEPRINT.md` is the source of truth for what Manzil is, what this
prototype includes, and how it is structured. Read it fully before any task.

## When to use

- Any task touching the story, scope, screens, or product intent.
- Whenever you are unsure whether something belongs in the demo.
- Before adding anything the blueprint does not mention.

## The rules

1. **Read `docs/BLUEPRINT.md` first.**
2. **On conflict: stop and report.** Do not improvise around the blueprint.
3. If the blueprint is silent, choose the simplest option that fits its spirit and
   note the decision — or ask the owner (see AGENTS.md "ASK, DON'T ASSUME").

## The three layers

- **Discovery** — help the traveller decide where to go.
- **Planning** — a conversation that produces a realistic, safety-aware plan.
- **Companion** — check-ins, what's ahead, and crowdsourced road reports.

The differentiator is **trust**: warnings, honest adjustments, and a clear
boundary between what Manzil knows and does not.

## Beats and tags

| ID  | Beat                      | Layer     | Tag     |
| --- | ------------------------- | --------- | ------- |
| D1  | Cover / hook              | —         | HERO    |
| D2  | Discovery dialogue        | Discovery | HERO    |
| P1  | Day-by-day plan           | Planning  | HERO    |
| P2  | Warning + plan adjustment | Planning  | HERO    |
| C1  | Companion check-in        | Companion | HERO    |
| C2  | Traveller road report     | Companion | HERO    |
| C3  | Closer                    | —         | SUPPORT |

- IDs are **stable** — use them in filenames, comments and commits.
- **Cut SUPPORT before HERO** if time is short.
- **No dead ends on the HERO path** — every interactive element does something.

## Non-goals

No real data, AI, backend, auth, payments, maps API, bookings, or analytics.
`video/` stays empty until Phase 3.

## Build order

1. Phase 1 — foundations (done).
2. Phase 2 — lock design + hero scenario + script, then build the journey.
3. Phase 3 — capture the locked demo and build the video.
