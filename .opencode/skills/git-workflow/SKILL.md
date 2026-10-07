---
name: git-workflow
description: "Use for branch, commit, and PR conventions in Manzil. Advice only — the owner runs git; agents never run git commands."
---

# git-workflow

**IMPORTANT — agents NEVER run git.** No `git add`, `commit`, `push`, `branch`,
`merge`, `rebase`, `stash`, or `gh` commands, ever. `opencode.json` denies them.
This skill only **advises the owner**, who runs git manually. If asked to act,
produce the exact commands for the owner to run and stop.

## Branches

- `main` is the Vercel **production** branch. Treat it as deployable.
- Work on short-lived branches off `main`. Branch pushes get Vercel previews;
  `main` goes to production.
- Naming: `feat/<topic>` or `fix/<topic>`, kebab-case, e.g.
  `feat/companion-road-report`, `fix/altitude-warning-copy`.

## Commits — Conventional Commits

Format: `type(scope): summary`. Types: `feat`, `fix`, `docs`, `style`, `refactor`,
`perf`, `chore`. Scope is the area, e.g. `story`, `cards`, `map`, `motion`.

Reference Manzil beat IDs so history maps to the blueprint:

- `feat(story): add C3 closer beat`
- `fix(story): correct P2 altitude warning for elderly travellers`
- `feat(cards): render P1 day-by-day plan card`
- `style(design): align chip radius to design tokens`

One logical change per commit. Keep the summary ≤72 chars; explain *why* in the
body.

## Before a commit, all must be true

- `npm run check` is green (paste the real output — see `verification-loop`).
- No `console.log`, no dead/commented code, no secrets or keys.
- Copy edited **only** in `src/content/`; components untouched for wording.
- No new dependency without written approval and a stated size cost.
- Scope is clean — the diff contains only the intended files.
- Story/copy changes reviewed by `@content-reviewer`.

## PR checklist

- [ ] Branch is off current `main` and named `feat/` or `fix/`.
- [ ] Title is a Conventional Commit; body lists the beats touched (e.g. C1, C2).
- [ ] `npm run check` green; cited in the description.
- [ ] Reduced-motion and 300–390px behaviour stated (see definition of done).
- [ ] Screenshots/notes for UI changes; `docs/DESIGN.md` respected.
- [ ] No secrets, no unintended files, no new deps (or approved with size cost).
- [ ] Merge to `main` only when green — `main` deploys to production.
