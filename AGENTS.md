<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Manzil — agent rules

This is an **interactive prototype** of the Manzil startup idea (northern Pakistan
trip planning), not a product. Scripted, deterministic, no backend, no model, no
real data. Quality of craft matters more than breadth: it goes on a shareable
link and in front of real people.

`docs/BLUEPRINT.md` is the **source of truth**. Read it fully before any task.

## 1. The rules that matter most

1. **BLUEPRINT first.** Read `docs/BLUEPRINT.md`. If a request conflicts with it,
   stop and report — do not improvise.
2. **PLAN FIRST.** Before writing or editing code, post a plan (template below)
   and wait for approval. One task at a time.
3. **ASK, DON'T ASSUME.** If a decision has more than one reasonable answer,
   offer 2–3 options with a recommendation and let the owner choose.
4. **NO NEW DEPENDENCIES** without written approval and a stated size cost.
   Never run `npm update`, never edit pinned versions, never use canary/beta.
5. **VERIFY BEFORE DONE.** Run `npm run check` and paste the real output. If you
   did not check it, say "not verified".
6. **NEVER run git or deployment commands.** The owner handles GitHub and Vercel
   manually. This is enforced in `opencode.json`.

## 2. Plan template (required reply before editing)

- **Goal** — one sentence.
- **Files** — what I will create or change.
- **Approach** — 3–6 short bullets.
- **Decisions needed** — a list, or "none".
- **Risks** — accessibility, reduced-motion, mobile, or bundle; or "none".
- **How I'll verify** — which commands and what I'll look at.

Then stop and wait for approval.

## 3. How guidance loads (context budget)

- **Always-ON** (via `opencode.json` → `instructions`): this file, `docs/DESIGN.md`,
  and the skills `design-system`, `frontend-design-direction`, `verification-loop`.
- **On-demand skills** — load with the skill tool when the task matches.
- **On-demand subagents** — auto-invoked from their description or via `@name`;
  reviewers are read-only.

## 4. Skill router

| Task                                        | Load                                                               |
| ------------------------------------------- | ------------------------------------------------------------------ |
| Stay on-script / respect the source of truth | `manzil-blueprint`                                                 |
| Add or change story steps / acts            | `manzil-story-engine` (+ `manzil-blueprint`)                        |
| Edit copy, cards, data, add a scenario      | `manzil-content`                                                    |
| The journey/route map                       | `manzil-map`                                                        |
| Any token, colour, type, theme work         | `design-system`                                                     |
| New UI / design direction                   | `frontend-design-direction`                                         |
| Polish pass (radius, spacing, feel)         | `make-interfaces-feel-better`                                       |
| Animation — start here first                | `motion-foundations` → `motion-patterns` → `motion-advanced` (hero only) |
| New `.tsx` component                        | `react-patterns` (+ `frontend-a11y`)                                |
| Slow page / bundle / re-renders             | `react-performance`                                                 |
| Slow dev / HMR                              | `nextjs-turbopack`                                                  |
| Interactive elements, focus, contrast       | `frontend-a11y` / `accessibility`                                   |
| Error handling in a module                  | `error-handling`                                                    |
| Anything touching input or scripts          | `security-review`                                                   |
| Before calling anything done                | `verification-loop` → `browser-qa`                                  |
| Branch/commit/PR conventions                | `git-workflow` (advice only; the owner runs git)                    |
| Pre-share / pre-launch                      | `production-audit` / `deployment-patterns`                          |

## 5. Agent router

`@planner`, `@architect`, `@code-reviewer` (+ `@typescript-reviewer`,
`@react-reviewer` for `.tsx`), `@a11y-reviewer`, `@performance-reviewer`,
`@security-reviewer`, `@content-reviewer`, `@build-fixer`, `@doc-updater`.
Run `@content-reviewer` after any story or copy change.

## 6. Workflow recipes

- **New story step / beat:** load `manzil-story-engine`, edit `src/content/flow.ts`
  only, run `@content-reviewer`, then `npm run check`.
- **New card:** load `manzil-content`; add a kind to `CardKindSchema`, a component
  in `src/components/cards/`, and one case in `ChatMessage`.
- **New section / screen:** load `frontend-design-direction` + `design-system`,
  build with tokens only, then `motion-patterns` for the entrance.
- **Pre-done:** load `verification-loop`, run `npm run check`, report
  Verified / Measured / Not verified / Risks.

## 7. Where things live

- Source of truth: `docs/BLUEPRINT.md`. Design contract: `docs/DESIGN.md`.
  Architecture: `docs/ARCHITECTURE.md`.
- Story + all copy: `src/content/` (zod-validated). **Edit copy here only.**
- Engine: `src/engine/`. Store: `src/store/` (selectors/actions only).
- Frame: `src/components/shell/` (`Stage`, `DeviceFrame`).
- Conversation: `src/components/journey/`. Cards: `src/components/cards/`.
- Tokens: `src/app/globals.css`. Motion: `src/lib/motion.ts`.
- Video: `video/` stays an empty placeholder until Phase 3.

## 8. Non-obvious rules (learned the hard way)

- **Animate `transform`/`opacity` only.** All motion values come from
  `src/lib/motion.ts`. Never animate layout properties.
- **Reduced motion is mandatory.** Every animation has a static fallback.
- **Hydration safety.** Never branch rendered DOM on raw `useReducedMotion()`
  (null on server). Use `src/lib/hooks/use-reduced-motion-safe.ts` and
  `use-hydrated.ts`.
- **LCP is text** — server-render the settled, visible state; never hide the hero
  until hydration.
- **Server Components by default.** Add `"use client"` only where interaction or
  motion requires it.
- **No hardcoded colours** (tokens only) and **no raw motion values**. No
  `console.log`, no dead/commented code, no secrets, no magic numbers (constants
  belong in `src/config/` once it exists).
- **`cn` is `clsx` + `tailwind-merge`** — dedupe conflicting utility classes
  rather than stacking both.
- **TypeScript strict, no `any`.** One responsibility per file, roughly ≤150 lines.
- **The demo is scripted.** There is no model and no network. Everything the
  viewer sees comes from `src/content/`.

## 9. Definition of done (all required)

1. `npm run check` passed (paste the tail of the real output).
2. Dev server loads with no console errors (state how you checked).
3. Reduced-motion and mobile (300–390px) behaviour considered (state what you did).
4. Story changes reviewed by `@content-reviewer`; UI changes legible against
   `docs/DESIGN.md`.
5. Anything unverified is listed honestly. If any item is missing, it is NOT done.

## 10. Git & deployment

The owner runs all git and Vercel commands manually. Agents never run `git`,
`vercel`, or any deployment command. Do not commit, push, or open PRs.
