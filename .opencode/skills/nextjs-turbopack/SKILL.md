---
name: nextjs-turbopack
description: "Use for Next.js 16 / Turbopack specifics in Manzil, and when dev or HMR is slow. Covers the default bundler, proxy.ts vs middleware.ts, next typegen for clean clones, and common slow-dev causes."
---

# nextjs-turbopack

Manzil runs Next `16.3.6` (App Router) on React `19.2.8`. This is **not** the
Next you may know from training data. Before using an unfamiliar API, read the
vendored docs under `node_modules/next/dist/docs/` (start at
`01-app/02-guides/upgrading/version-16.md`). Heed deprecation notices.

## Next 16 facts to get right

- **Turbopack is the default** for both `next dev` and `next build`; you no
  longer pass `--turbopack`. Do not add it, and do not add a `webpack` config —
  a custom webpack config now **fails the build**.
- **`proxy.ts` replaced `middleware.ts`.** Docs and file conventions still list
  both (`.../03-file-conventions/middleware.md` and `proxy.md`); the rename is a
  v16 change, not a bug. New request-interception code goes in `proxy.ts`
  (project root or `src/`), one file per project. A stale `middleware.ts`
  reference elsewhere is expected; migrate it, don't report it.
- **`next typegen`** generates route types and `next-env.d.ts` without a full
  build (`.../cli/next.md`). On a **clean clone**, `tsc --noEmit` can fail until
  types exist; the fix is `next typegen` (or running `next dev`/`next build`
  once). `next-env.d.ts` should be gitignored. Agents do not run it — ask the
  owner.
- Turbopack config is now top-level `turbopack` in `next.config.ts`, not
  `experimental.turbopack`.

## Common slow-dev causes and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| HMR reloads a huge chunk | `"use client"` too high in the tree | move it down (`react-patterns`) |
| Every save recompiles broadly | barrel imports / import cycles | import directly; avoid `src/content/index.ts` in hot paths |
| First compile very slow on Windows | real-time AV scanning `node_modules`/`.next` | exclude the project folder in Defender |
| Stale or corrupt build state | old `.next` cache after dep/config churn | owner stops dev, deletes `.next`, restarts |
| Dev loop / continuously rebuilding | a file written during render or build | never write files from components (`security-review`) |

## Where the build output lives

- Compiled output and cache: `.next/` at the project root. The route /
  First-Load-JS table is printed by `next build` to the terminal — that is the
  measuring surface for `react-performance`.
- The docs are vendored at `node_modules/next/dist/docs/` — read those, not the
  web, so guidance matches this exact version.

## Notes

- `next.config.ts` currently only sets `poweredByHeader: false`; security
  headers belong there (`security-review`).
- Platform is Windows. The owner runs `npm run check`
  (`eslint` → `tsc --noEmit` → `next build`); agents never run npm or git.

Checklist: vendored docs read · no webpack config · correct `proxy.ts` naming ·
typegen considered on a clean clone · slow-dev cause named.

Related: `react-performance`, `security-review`, `verification-loop`.
