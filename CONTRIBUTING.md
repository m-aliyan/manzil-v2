# Contributing — Manzil Demo

Human-facing workflow. Agents follow `AGENTS.md`; the owner runs all git and
Vercel commands manually.

## Setup

Requirements: Node 20+ (LTS recommended), npm.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Quality gate

A change is complete only when:

```bash
npm run check    # lint + typecheck + build
```

passes, and reduced-motion + mobile (300–390px) behaviour has been checked.

Format with `npm run format` (Prettier) before finishing.

## Branches

- `main` — always deployable (Vercel deploys it).
- `feat/<short-name>` for features, `fix/<short-name>` for fixes.

## Commits

Use Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.
Reference the BLUEPRINT beat ID when relevant, e.g.
`feat(journey): P2 warning card reads from flow`.

## Pull requests

- `npm run check` green.
- No `console.log`, no secrets, no ad-hoc motion values, no raw hex.
- Story/copy changes reviewed with `@content-reviewer`.
- UI changes match `docs/DESIGN.md`.
- Touch `.tsx`? Run `@react-reviewer` (and `@a11y-reviewer` if interactive).

## Content changes

- All copy lives in `src/content/` (zod-validated). Never hardcode copy in
  components.
- New story steps go in `src/content/flow.ts`; keep beat IDs from
  `docs/BLUEPRINT.md`.

## Deployment

The owner connects the repo to Vercel and deploys `main`. Agents do not run
deployment commands.
