---
name: manzil-map
description: "Use for the journey/route line and any map or waypoint visuals in the demo."
---

# Manzil map & journey line

The route line is Manzil's signature visual: it carries the story across the
three layers and gives the demo a memorable, ownable motif.

## When to use

- Building or changing the journey/route line.
- Adding any map, waypoint, or position visual.
- Animating the line as the story advances.

## The concept

- **Discovery:** the line is loose and uncertain — the traveller does not know
  where they are going yet.
- **Planning:** the line resolves into a plotted itinerary as the plan is built.
- **Companion:** the line carries a position marker; check-ins move it along.
- **Warnings:** when a warning fires (P2), the line visibly breaks and **redraws**
  along the adjusted route. This is the safety differentiator made visual.

## Implementation notes

- Prefer inline SVG paths over a canvas for crispness and easy styling. Draw with
  `motion` `pathLength` (`0 → 1`) — see `motion-advanced`.
- Coordinates and waypoint metadata are **content**, not layout: keep the data in
  `src/content/` so the line stays scripted.
- Style with tokens only (`--accent` for the line, `--warning` for the break).
- No external map API. If a stylised basemap is needed later, keep it as an
  asset in `public/` and confirm with the owner.
- Animate `transform`/`opacity`/`pathLength` only.

## Reduced motion

- Provide a static fallback: render the fully drawn line with all waypoints and
  the current position, no drawing animation. Meaning must survive without motion.

## Verification

- Does the line read at 300–390px width?
- Does the break-and-redraw communicate "the plan changed"?
- Reduced-motion: is everything still legible with no animation?
