# Session 2026-10-07 — foundations

## 1. Summary

Stood up the Manzil interactive-prototype repository from an empty folder:
pinned Next.js 16 scaffold, typed content/engine/store skeleton with a working
interactive flow, full customised agent environment, and docs. `npm run check`
green.

## 2. What changed

- Config: `package.json` (pinned), `tsconfig.json`, `next.config.ts`,
  `postcss.config.mjs`, `eslint.config.mjs`, `.prettierrc`, `.gitignore`.
- App/skeleton: `src/app/{layout,page,globals.css}`, `src/components/{shell,journey,cards,ui}`,
  `src/content/{schema,flow,index}.ts`, `src/engine/{flow,use-flow}.ts`,
  `src/store/{store,transitions,selectors}.ts`, `src/lib/{motion,utils}.ts`,
  `src/lib/hooks/*`.
- Docs: `docs/{BLUEPRINT,DESIGN,ARCHITECTURE}.md`, `docs/session-context/INSTRUCTIONS.md`.
- Agent env: `opencode.json`, `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`,
  `README.md`, `.opencode/{skills,agents,command}`.
- `video/` created as an empty placeholder.

## 3. Decisions made

- Next.js App Router (not TanStack Start), npm, no tests; `check` = lint +
  typecheck + build.
- Mobile-first UI: `DeviceFrame` is a desktop-only presentation layer; phones go
  full-bleed. No presenter panel and no playback controls — the viewer drives it.
- The demo is an interactive, scripted flow (not autoplay); the linear version is
  a future video.
- Content-as-data with zod validation; pure engine; one Zustand world.
- No git or deployment commands are run by the agent — the owner handles GitHub
  and Vercel manually.

## 4. Known issues / deferred work

- Design identity (colours, fonts, motion signature) is a scaffold in
  `docs/DESIGN.md` — locked in Phase 2.
- Hero persona and script are placeholders in `src/content/flow.ts` — locked in
  Phase 2.
- The generic "Continue" button is a Phase 1 stand-in for the real suggested
  replies / free-text input.
- Route/journey line and dedicated card designs come in Phase 2.

## 5. Open questions / needs owner input

- None blocking. Phase 2 needs the owner's input on design direction and the
  locked hero scenario.
