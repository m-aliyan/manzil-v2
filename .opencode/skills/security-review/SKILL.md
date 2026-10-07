---
name: security-review
description: "Use when anything in Manzil touches input, third-party scripts, headers, or secrets. Static, backend-free prototype security: no keys, no injected HTML, zod-validated input, headers, and dependency hygiene."
---

# security-review

Manzil is a fully static, backend-free prototype: no auth, no database, no
network, no environment secrets. That is the security model — the job is to keep
it that way. Run this before any change that touches input, scripts, config, or
dependencies.

## Hard rules

1. **No secrets, ever.** There is nothing to hide and no `.env` key is needed.
   Never place an API key, token, or credential in code, `next.config.ts`, or a
   committed file. If a feature seems to need one, stop and report.
2. **No third-party scripts without written approval.** No analytics, remote
   fonts, chat widgets, or embeds. A new script adds supply-chain, privacy, and
   bundle cost. Propose it with a size estimate first (AGENTS rule 4).
3. **No `dangerouslySetInnerHTML`.** All copy lives in `src/content/` as plain
   strings rendered as text (`ChatMessage.tsx:37`). If formatting is wanted,
   model it as structured content, not an HTML string. React escapes text by
   default — keep it that way.
4. **No new dependencies.** Pinned deps only (`AGENTS.md`); never `npm update`,
   never canary/beta. A new dep needs written approval first.
5. **No `eval`, `new Function`, `setTimeout(string)`, or dynamic `import()` of
   remote URLs.**

## Input handling

- The only future input is the Phase-2 free-text field. Its text **maps onto the
  canonical next step** (`choices` in `flow.ts`) — it must never be executed,
  fetched with, or rendered as HTML.
- Treat it as untrusted: cap length, match/derive locally, discard on no match,
  and show a friendly, recoverable message.
- Any structured input parsed anywhere goes through zod (`src/content/schema.ts`
  is the precedent) and is rejected on failure, not silently coerced.
- Usability and security align: because the demo is on-script, refusing
  off-script input is correct behaviour.

## Headers & config (`next.config.ts`, `proxy.ts`)

- The current config sets `poweredByHeader: false` (`next.config.ts:4`) — keep
  it.
- To add security headers, prefer `headers()` in `next.config.ts` (or
  `proxy.ts` in v16; see `nextjs-turbopack`). Baseline for this static app:
  `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, a Content Security Policy
  (`default-src 'self'`), and `frame-ancestors 'none'`.
- Any external link needs `rel="noopener noreferrer"`; none exist today.

## Dependency hygiene

- `package.json` deps are pinned. Review any lockfile change. Runtime libs:
  React/Next, `motion`, `zustand`, `zod`, `clsx`, `tailwind-merge`, `cva`,
  `lucide-react`, `lenis`.
- Prefer deleting code over adding a library.

## Pre-deploy checklist

- [ ] No secrets, keys, or tokens anywhere in the tree.
- [ ] No third-party `<script>`/`<iframe>`/remote asset.
- [ ] No `dangerouslySetInnerHTML`, `eval`, or HTML-string rendering.
- [ ] Input (when added) is length-capped, mapped, zod-checked, discarded safely.
- [ ] Security headers present; `poweredByHeader: false` retained.
- [ ] No new or unpinned dependency snuck in.
- [ ] `npm run check` green (owner runs it).

Related: `error-handling`, `nextjs-turbopack`, `accessibility`, `@security-reviewer`.
