---
name: verification-loop
description: Use before calling any Manzil task done. The mandatory loop: run `npm run check`, inspect the real output, and report Verified / Measured / Not verified / Risks.
---

# verification-loop

The last thing before "done". No task is finished until this loop has run and the
honest report has been posted. `AGENTS.md` §9 is the definition of done; this
skill is how you satisfy it.

## Steps, in order

1. **`npm run check`** — runs `lint` → `typecheck` → `build`. Run it, wait for it
   to finish, read the actual output. Paste the tail (last ~15 lines) into your
   reply. A green build with `src/content/` zod validation is part of this.
2. **Dev server + console** — start `npm run dev`, open the app, and watch the
   browser console through the whole hero path. Any error or warning is a failure;
   note the exact message.
3. **Mobile 300–390px** — narrow the viewport to 320 and 390px. Confirm the frame
   disappears, content is full-bleed, and nothing overflows or clips. Desktop: the
   `DeviceFrame` / `Stage` render centred.
4. **Reduced motion** — emulate `prefers-reduced-motion: reduce` (DevTools →
   Rendering). Every animation must fall back to a static, legible state with no
   blank frame and no hidden hero.
5. **Diff review** — inspect exactly the files you touched. No `console.log`, no
   dead/commented code, no secrets, no hardcoded colours or raw motion values,
   copy edited only in `src/content/`. Confirm scope: nothing changed that you did
   not intend.

## Report format (copy this exactly)

```
Verified: <what you actually ran/saw, and how>
Measured: <numbers you observed — viewport widths, check result, etc.>
Not verified: <anything you could not or did not run, or "none">
Risks: <accessibility / reduced-motion / mobile / bundle concerns, or "none">
```

## Rules

- Never write "should work", "looks fine", or "probably". Tests do not exist in
  this repo (`npm run check` is the whole gate) — this loop is the substitute.
- If you did not do a check, write **not verified** for it. Do not imply it.
- State *how* each check was performed ("built via `npm run check`", "saw 320px in
  DevTools device toolbar"), not just that it passed.
- One missing item means the task is NOT done. Say so plainly.
