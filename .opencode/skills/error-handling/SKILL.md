---
name: error-handling
description: "Use when adding error handling to a Manzil module — typed errors, React error boundaries, content validation with zod, and user-facing fallbacks. Covers fail-the-build vs fail-safe choices."
---

# error-handling

Manzil is scripted with no network, so most failure comes from content and
developer mistakes. Two goals: **fail the build** for content/code errors, and
**fail safe** for anything a viewer could hit.

## Typed errors

- No bare `throw new Error("...")` for domain failures. Define a small typed
  error in the module that owns the concern, e.g.

  ```ts
  class FlowContentError extends Error {
    constructor(message: string, readonly stepId: string) {
      super(message);
      this.name = "FlowContentError";
    }
  }
  ```

- Keep the union narrow: content error vs unexpected error. Do not invent error
  codes for a prototype.
- Catch as `unknown`, then narrow (`error instanceof FlowContentError`). No
  `any` (TS strict).
- Never `console.log` an error (AGENTS rule 8). Surface it in UI or let it
  throw.

## Validate content at module load

- `src/content/flow.ts` runs `FlowSchema.parse(...)` at import (`flow.ts:8`), so
  bad copy, a missing `id`, or an empty `text` throws during `next build` — the
  build fails, not the viewer. Keep this boundary as `parse`, not `safeParse`.
- `schema.ts` is the single zod home (`FlowStepSchema`, `CardKindSchema`). Add
  fields there and let TS infer — never re-declare the types by hand.
- A new card kind added to `CardKindSchema` must also get a case in
  `ChatMessage.tsx:44`; the `default` branch is a safety net, not the plan.

## React error boundaries (client tree)

- The interactive tree is `Experience` → `ChatStream` → `ChatMessage` + cards.
  Wrap the risky subtree in an App Router `error.tsx` (a Client Component that
  reads `error` and calls `reset`) under `src/app/`. Read
  `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md`
  first — v16 may differ from training data.
- `global-error.tsx` is only for root-layout failures; don't overuse it.
- Boundaries catch render errors, not event-handler errors. Guard handlers
  (e.g. an out-of-range index) with code, not a boundary.

## Fail safe for the viewer

- `ChatMessage`'s `default` branch renders a plain text card for an unknown
  `kind` (`ChatMessage.tsx:54`). Extend the copy if needed, but never render
  blank.
- Engine helpers clamp out-of-range cursors (`src/engine/flow.ts:5`), so a bad
  cursor shows a valid step instead of crashing.
- Fallback copy tone: calm, first-person, on-brand ("That step didn't load.
  Start over?"), always with a visible recovery action. No stack traces, no
  blame, no emoji.

## Checklist

- [ ] Typed error where a domain failure is possible; `unknown` + narrowing.
- [ ] Content validated at module load so the build fails on invalid data.
- [ ] Client subtree has an `error.tsx` with a working `reset` action.
- [ ] Every `switch`/lookup has a non-blank `default`.
- [ ] No `console.log`, no `any`, no swallowed `catch`.
- [ ] Viewer-facing fallback copy reviewed for tone (`@content-reviewer`).

Related: `react-patterns`, `security-review`, `verification-loop`.
