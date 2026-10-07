---
name: manzil-content
description: "Use when editing copy, cards, or data, or adding a scenario in Manzil. Content-as-data rules, zod validation, and the card-kind workflow."
---

# Manzil content

Everything the viewer reads or sees is scripted data. Components never hold copy.

## When to use

- Editing any dialogue, label, or card copy.
- Adding or changing a card kind.
- Adding a data set (destinations, knowledge, reports) or a new scenario.

## Rules

- **Copy lives only in `src/content/`.** Never hardcode a string in a component.
- **Validate with zod.** New shapes go in `src/content/schema.ts` and are parsed
  at module load so bad content fails the build, not the viewer.
- **Honest tone.** Manzil never overpromises. Warnings are specific and calm;
  the closer states the honesty boundary between stable knowledge and real-time
  conditions.
- **Fictional, no real people.** Use plausible but invented names and places.
- **No secrets, no real data.**

## Adding a card kind

1. Add the kind to `CardKindSchema` in `src/content/schema.ts`.
2. Create `src/components/cards/<Name>Card.tsx` using tokens only.
3. Add one case to the `CardFor` switch in
   `src/components/journey/ChatMessage.tsx`.
4. Add a placeholder step of that kind to `src/content/flow.ts`.
5. Run `@content-reviewer`, then `npm run check`.

## Editing copy

- Edit `src/content/flow.ts` (and future `src/content/*` data files).
- Keep beat IDs and step IDs from `docs/BLUEPRINT.md`.
- Match the voice: warm, direct, specific. Say the real thing ("the Hunza to
  Skardu transfer in one day is too long with older travellers"), not marketing.

## Adding a scenario (later)

The flow is data. A second `Flow` can be added and swapped in without touching
components. Keep the same schema and beat vocabulary so the shell and cards keep
working.

## Checklist

- [ ] Copy only in `src/content/`.
- [ ] Schema updated and parsed; `npm run check` green.
- [ ] `@content-reviewer` run for story/copy changes.
- [ ] Tone is honest and specific; no overpromising.
