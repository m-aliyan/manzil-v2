# BLUEPRINT — Manzil Interactive Prototype (source of truth)

> Read this fully before any work. On conflict with it: stop and report, do not improvise.

## 1. Purpose

Manzil is a startup concept: a conversational, safety-aware trip-planning and
travel-companion tool for domestic Pakistani travellers heading to northern
Pakistan. This repository is **not the product**. It is an **interactive
prototype** — a scripted, clickable "MVP feel" that lets anyone understand the
idea in a few minutes by using it, not by reading a document.

The bar is craft: it goes on a shareable link and in front of real people
(investors, incubators, industry). It should feel like a confident product, not
a mockup.

## 2. The idea (three layers)

- **Discovery** — for travellers who do not yet know where to go. Manzil helps
  them decide before it helps them plan.
- **Planning** — a back-and-forth conversation that produces a realistic,
  tailored plan. Safety and feasibility are first-class, not small print.
- **Companion** — after the plan is final, Manzil stays with the traveller:
  check-ins, what lies ahead, and crowdsourced road reports that feed the next
  traveller.

The differentiator is **trust**: warnings that interrupt a plan, honest
adjustments, and a clear boundary between what Manzil knows and does not.

## 3. What this build is (and is not)

- **Interactive and scripted.** The viewer drives it; every next beat comes from
  their action. Deterministic — no model, no backend, no real data, no bookings.
- **Content-as-data.** All copy lives in `src/content/` and is validated by zod.
  Components never hardcode dialogue.
- **One hero journey** through all three layers.
- **Mobile-first.** Framed as a phone on desktop; full-bleed on phones.
- **Not autoplay.** The linear, self-playing version is a separate future video.

## 4. Hero journey (persona + script locked in Phase 2)

Beat inventory. IDs are **stable** — use them in filenames, comments and commits.

| ID  | Beat                       | Layer     | Tag     |
| --- | -------------------------- | --------- | ------- |
| D1  | Cover / hook               | —         | HERO    |
| D2  | Discovery dialogue         | Discovery | HERO    |
| P1  | Day-by-day plan            | Planning  | HERO    |
| P2  | Warning + plan adjustment  | Planning  | HERO    |
| C1  | Companion check-in         | Companion | HERO    |
| C2  | Traveller road report      | Companion | HERO    |
| C3  | Closer                     | —         | SUPPORT |

Rules: **cut SUPPORT before HERO** if time is short. **No dead ends on the HERO
path** — every interactive element does something sensible.

**Working scenario (to be locked in Phase 2).** A family of five from Karachi,
including elderly parents, roughly eight days, Hunza + Skardu, on a fixed
budget. Chosen because it naturally produces the safety moments that make the
idea land: altitude/acclimatisation for older travellers, a transfer too long
for a single day, weather-dependent flights, and cash/ATM gaps.

## 5. Presentation model

- **One mobile-first UI.** There is no separate desktop build.
- **Desktop:** the app sits inside a phone frame (`DeviceFrame`) centred on a
  designed stage (`Stage`). The bezel is presentation only.
- **Mobile:** the frame disappears and the app fills the viewport.
- **No presenter panel and no playback controls.** The viewer drives the story
  by interacting with the app itself. Restart = refresh.

## 6. Interaction model

- `src/content/flow.ts` defines an ordered list of **steps**. Each step is an
  actor (`user` / `manzil` / `card`), a kind, text, and optional suggested
  replies (`choices`).
- The engine (`src/engine/`) walks the flow, driven entirely by viewer actions.
  Nothing advances on its own.
- `src/store/` holds the cursor and a reset; transitions are pure.
- Phase 2 replaces the placeholder continue button with the real suggested-reply
  chips and a free-text input whose input maps onto the canonical next step, so
  the conversation never goes off-script.

## 7. Visual identity

The design contract lives in `docs/DESIGN.md`. Tokens are defined once in
`src/app/globals.css`; components never hardcode colour or motion values.

## 8. Non-goals

No real data, AI, backend, auth, payments, maps API, bookings, or analytics.
`video/` stays an empty placeholder until the demo locks.

## 9. Build order

1. **Phase 1 — Foundations** (this scaffold): configs, agent environment, typed
   skeleton, `npm run check` green.
2. **Phase 2 — Design + Story + Build**: lock `docs/DESIGN.md`, lock the hero
   persona and script, build the interactive journey (chat + cards + map),
   polish motion.
3. **Phase 3 — Video**: capture the locked demo and build the HyperFrames video.

## 10. Definition of done

See `AGENTS.md` → "Definition of done". A change is done only when
`npm run check` passes and reduced-motion and mobile behaviour have been
verified.
