---
name: manzil-story-engine
description: "Use when adding or changing story steps or beats in Manzil. Explains the flow schema, the interactive engine, and how to edit src/content/flow.ts safely."
---

# Manzil story engine

The demo is an **interactive, scripted** journey. Content defines the steps; a
tiny pure engine walks them as the viewer acts. Nothing advances on its own.

## When to use

- Adding, editing, or removing a story step or beat.
- Changing how the viewer advances (replies, input).
- Debugging why a step does or does not appear.

## The data model

`src/content/schema.ts` (zod):

```ts
FlowStep = {
  id: string;              // stable, unique, e.g. "d2-ask"
  beat: "cover" | "discovery" | "plan" | "warning" | "companion" | "close";
  actor: "user" | "manzil" | "card";
  kind: "text" | "plan" | "warning" | "checkin" | "report" | "closer";
  text: string;
  choices: string[];       // suggested replies; empty = single continue
}
Flow = { id, title, steps: FlowStep[] }
```

`src/content/flow.ts` parses the flow with `FlowSchema` at module load — invalid
content fails the build, which is exactly what we want.

## The engine

- `src/engine/flow.ts` — pure helpers: `visibleSteps`, `canAdvance`,
  `currentStep`. No React, no store.
- `src/store/store.ts` — the cursor plus `advance` / `reset`; transitions in
  `src/store/transitions.ts` are pure and deterministic.
- `src/engine/use-flow.ts` — composes the two into the `useFlow()` view model
  (`steps`, `step`, `canAdvance`, `advance`, `reset`).

## How to add a step

1. Open `src/content/flow.ts`.
2. Append a `FlowStep` with a unique `id` and the correct `beat`, `actor`, `kind`.
3. Run `@content-reviewer` (copy against `docs/BLUEPRINT.md`).
4. Run `npm run check`.

Copy lives **only** here — never hardcode dialogue in a component.

## How to add a beat / act

1. Check `docs/BLUEPRINT.md`: does the beat already exist (D1, D2, P1, P2, C1,
   C2, C3)? Do not invent beats that are not in the blueprint.
2. If it is a new *kind* of card, follow `manzil-content` instead.
3. Keep HERO beats free of dead ends.

## Non-negotiables

- **Interactive, not autoplay.** No timers, no auto-advance. The viewer acts.
- Keep step `id`s stable once they are referenced; use beat IDs from the
  blueprint in ids where sensible.
- Do not branch rendered DOM on hydration-sensitive browser APIs.
