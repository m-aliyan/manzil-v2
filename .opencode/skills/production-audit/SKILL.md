---
name: production-audit
description: "Use before sharing or launching Manzil — a local-evidence production-readiness review with a scored verdict and explicit evidence gaps."
---

# production-audit

Run before the link goes to investors, incubators or industry. **Local evidence
only** — no remote scanners, no network calls, no live-domain probes. Check the
repository and the running local build. Where you cannot verify from evidence, say
so instead of assuming.

## Risk lenses (Manzil-specific)

1. **Content correctness vs `docs/BLUEPRINT.md`** — the scripted demo must say what
   the blueprint says. Check beats D1–C3, the locked persona, and that no copy
   contradicts §2/§4. Any invented data, claim or booking is a blocker.
2. **Accessibility** — keyboard path through the hero journey, visible focus,
   accessible names, contrast, and a complete `prefers-reduced-motion` fallback.
3. **Performance / bundle** — build output size, no oversized dependency added
   without approval, LCP text server-rendered (never hidden until hydration).
4. **Metadata / OG** — title, description, and OG/Twitter image so the shared link
   reads well; favicon present.
5. **No secrets** — no keys, tokens, env values or credentials anywhere in the
   repo or client bundle. This demo needs none.
6. **No dead ends on the HERO path** — every interactive element does something
   sensible; the flow advances only on user action; no off-script drift.

## Scoring bands

- **Blocked** — a correctness, secret, or dead-end failure. Do not share.
- **Risky** — a real gap (a11y or metadata) a viewer will notice. Fix first.
- **Launchable with caveats** — sound; list the known, acceptable caveats.
- **Strong** — all lenses pass with cited local evidence.

## Output format

Lead with one sentence giving the band and the single most important reason. Then:

```
Blockers: <must-fix before sharing, or "none">
High-value fixes: <worth doing, ordered, or "none">
Evidence checked: <lens → what you inspected → result>
Evidence missing: <lens → what you could not verify and why, or "none">
Next action: <the one thing to do next>
```

## Rules

- Every claim needs local evidence (a file, a command output, a browser
  observation). No "seems fine".
- Anything unchecked goes under **Evidence missing** — an audit with no missing
  section should be justified, because remote checks are out of scope.
- Never run git, deployment, or remote scanning tools as part of this audit.
