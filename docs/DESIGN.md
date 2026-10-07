# DESIGN — Manzil Demo (design contract)

> The visual source of truth. Tokens live once in `src/app/globals.css`; motion
> tokens live once in `src/lib/motion.ts`. Components reference tokens only —
> **never hardcode hex, durations, or easings**.

**Status: SCAFFOLD. The full identity is locked in the Phase 2 design step.**
Values below marked `TBD` are placeholders to be decided, not final.

## 1. Intent (north star)

Set by the project owner; refine in Phase 2.

- Feel: warm, trustworthy, grounded. Editorial rather than agency-cold; not the
  generic dark-gradient AI look.
- It should read as a travel product for a high-stakes family trip — calm,
  confident, human.
- Reference points for quality (inspiration only, never imitation): quiet,
  code-driven "wow" sites with restraint and craft.

## 2. Colour

Defined as CSS variables in `src/app/globals.css` and surfaced to Tailwind via
`@theme inline`. Provisional values:

| Token          | Purpose                              | Value (provisional)     |
| -------------- | ------------------------------------ | ----------------------- |
| `--background` | App surface base                     | `#faf9f6`               |
| `--surface`    | Cards / raised                       | `#ffffff`               |
| `--foreground` | Primary text / strong fills          | `#16181a`               |
| `--muted`      | Secondary text                       | `#6b7075`               |
| `--hairline`   | Borders / dividers                   | `rgba(22,24,26,0.12)`   |
| `--accent`     | Primary brand action / journey line  | `#2f6f5e`               |
| `--warning`    | Safety warnings only                 | `#b45309`               |
| `--stage`      | Desktop stage backdrop               | `#14181a`               |

Rules: no gradients or decorative blobs unless added to this contract. Warnings
are the only place `--warning` appears, sparingly.

## 3. Typography

- **TBD** — font families chosen in Phase 2 (self-host via `next/font`).
- Provisional: system sans for body, a distinct display face for headings.
- Fluid `clamp()` scale; display tracking tight (`-0.02em`); body measure ~60ch.
- `.mono-label` utility for eyebrows/labels (11px, `0.22em`, uppercase).

## 4. Motion

- All values come from `src/lib/motion.ts`. Transform/opacity only.
- One thing moves at a time. Slow, deliberate, no bounce.
- Every animation has a reduced-motion static fallback.
- Signature motion idea (to be designed): a **journey/route line** that draws as
  the story advances.

## 5. Frame & layout

- 8px spacing base. App column is the phone width on desktop.
- Cards `rounded-2xl`, pills `rounded-full`, hairline borders, soft shadows only.
- Desktop: `Stage` backdrop + centred `DeviceFrame`. Mobile: full-bleed.

## 6. Accessibility

- One `h1` per view, sensible heading order, visible focus, sufficient contrast.
- Interactive controls are keyboard-operable and labelled.
- Reduced motion never removes meaning — static content stays fully readable.
