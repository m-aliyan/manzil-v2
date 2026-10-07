---
description: Run the relevant reviewers on the current changes
---

Review the current changes against `AGENTS.md`, `docs/BLUEPRINT.md` and
`docs/DESIGN.md`.

Dispatch the reviewers that fit the changes (they are read-only):

- `@content-reviewer` — for any story, flow, or copy change.
- `@react-reviewer` and `@typescript-reviewer` — for `.tsx`/`.ts` changes.
- `@a11y-reviewer` — when interaction or UI changed.
- `@performance-reviewer` — when bundle or rendering paths changed.
- `@security-reviewer` — when input, scripts, headers, or config changed.

For each reviewer, give the exact files to examine. Summarise findings with
severity, file:line, and a one-line fix, and end with the overall verdict:
PASS / PASS WITH FIXES / FAIL.
