# Session context — instructions (frozen format)

Handoff notes so a future session can answer, in under a minute: what this
session was about, what actually changed, what decisions were made and why, and
what is still unresolved.

## Rules

- **Do not edit, "fix", or reformat an existing session file.** They are a
  historical record.
- One file per session, named `YYYY-MM-DD-short-slug.md` (append `-2`, `-3` for
  the same day).
- Keep it well under one page. No large code blocks — reference paths/line
  ranges instead. No process narrative, no roadmap speculation.
- If a decision changes a standing rule, update `AGENTS.md`/`docs/DESIGN.md`
  directly. Do not record standing rules only here.

## Required structure (exact headers, in order)

```
## 1. Summary
## 2. What changed
## 3. Decisions made
## 4. Known issues / deferred work
## 5. Open questions / needs owner input
```

Omit a section only if it truly does not apply.
