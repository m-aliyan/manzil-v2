---
name: design-system
description: "Use when defining, extending, or auditing Manzil's visual language — colour tokens, typography, spacing, radii, shadows, and theme. Load before any token, colour, type, or theme change, or when reviewing styling changes."
---

# Manzil design system

The visual contract lives in `docs/DESIGN.md`. The tokens themselves live once in
`src/app/globals.css`. Components use tokens; they never hardcode a colour.

## When to use

- Adding or changing a colour, font, radius, shadow, or spacing scale.
- Building a new component or screen that needs styling.
- Auditing an existing screen for token compliance.
- Reviewing any change that touches `className` styling or `globals.css`.

## Where tokens live

- `src/app/globals.css` — `:root` CSS variables + an `@theme inline` block that
  maps them to Tailwind utilities (`bg-surface`, `text-muted`, `border-hairline`,
  `text-accent`, `text-warning`, `bg-stage`, …).
- `src/lib/motion.ts` — motion tokens (see `motion-foundations`).
- `docs/DESIGN.md` — the written contract and the palette table.

## The tokens (provisional — see docs/DESIGN.md)

| Token          | Utility examples                | Use                             |
| -------------- | ------------------------------- | ------------------------------- |
| `--background` | `bg-background`                 | App surface base                |
| `--surface`    | `bg-surface`                    | Cards / raised surfaces         |
| `--foreground` | `text-foreground`, `bg-foreground` | Primary text and strong fills |
| `--muted`      | `text-muted`                    | Secondary text                  |
| `--hairline`   | `border-hairline`               | Borders and dividers            |
| `--accent`     | `text-accent`, `bg-accent`      | Primary action / journey line   |
| `--warning`    | `text-warning`, `bg-warning/5`  | Safety warnings only, sparingly |
| `--stage`      | `bg-stage`                      | Desktop stage backdrop          |

## Rules

- **No raw hex in components.** If you need a colour, it is a token. If the token
  does not exist, add it to `globals.css` and `docs/DESIGN.md` in the same change.
- No gradients, glassmorphism, or decorative blobs unless `docs/DESIGN.md`
  explicitly allows them.
- Warnings are the only place `--warning` appears, and only for genuine safety
  information — never for decoration.
- Prefer hairline borders and tone over heavy shadows (depth is tonal, not
  elevation). Soft shadows only where a card must lift off the chat.
- Assume/verify contrast: body text on `--background`/`--surface` must pass WCAG
  AA. `--muted` is for secondary text only, never for small critical copy.

## Adding a token (checklist)

1. Add the CSS variable in `:root` and map it under `@theme inline` in
   `src/app/globals.css`.
2. Add a row to the palette table in `docs/DESIGN.md`.
3. Use the utility, not the variable directly, in components.
4. Re-check contrast and reduced-motion implications.

## Anti-patterns

- `style={{ color: "#..." }}` or arbitrary `text-[#...]` classes.
- Dark "AI" gradients on the app surface.
- A new colour for a one-off; extend the system instead.
- Overriding a token with `!important` instead of fixing the token.
