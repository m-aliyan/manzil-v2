---
name: deployment-patterns
description: "Use for Vercel deployment considerations for Manzil — environment, headers, caching, and rollback. Advice only; the owner deploys."
---

# deployment-patterns

**Advice only.** The owner connects Vercel and deploys manually; agents never run
`vercel`, `git`, or any deployment command. This skill tells you what to check and
recommend, and what to hand the owner as a short list of steps.

## Vercel flow

- The owner connects the GitHub repo to a Vercel project.
- `main` is the **production** branch; every push to `main` deploys to production.
- Every other branch gets a **preview** deployment — share previews for review,
  promote only when green.
- Build settings are the defaults for Next.js: `next build`, framework
  auto-detected, standard (not static) output.

## Environment

- **No environment variables or secrets are required.** This is a static, scripted
  demo — no backend, no model, no network. If a Vercel env var appears, question
  why.
- Never commit `.env*` files or keys.

## Headers and caching (`next.config.ts`)

Recommend, for the owner to review before applying:

- Security headers: `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Frame-Options: SAMEORIGIN`, and a sensible `Permissions-Policy`.
- A `Content-Security-Policy` appropriate to a static demo (`'self'` scripts,
  self-hosted assets/fonts). Keep it the owner's decision; CSP can break Next.
- Caching: immutable, long-lived cache for hashed `/_next/static/*` assets; HTML
  revalidated normally. Do **not** force-cache HTML.

## Static export is NOT used

Manzil ships a standard `next build` to Vercel, not `output: 'export'`. Do not add
`export` config; keep the default runtime so Next features (metadata, OG image
routes) keep working.

## Rollback

- Vercel → Deployments → the last good production deployment → **Promote to
  Production** (or redeploy that commit). The owner performs this.
- Because `main` is production, rollback is instant and needs no revert.

## Pre-share checklist

- [ ] `main` deployed and green; `npm run check` passed locally first.
- [ ] Hero path complete on desktop and 300–390px; no dead ends.
- [ ] Reduced-motion fallback verified.
- [ ] Metadata + OG image render in the link preview.
- [ ] No secrets or stray env vars in the project.
- [ ] Production URL tested on a real phone, not just DevTools.
