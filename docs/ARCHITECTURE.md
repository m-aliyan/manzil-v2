# ARCHITECTURE — Manzil Demo

Small by design. The whole demo is scripted content walked by a tiny pure engine,
rendered by components, with one shared store. Boundaries are enforced so the app
stays easy to extend and re-skin.

## 1. Layers and dependency direction

```
content (data)  →  engine (pure logic)  →  store (runtime state)  →  components (render)
```

- **content** knows nothing about React.
- **engine** is pure functions over content. No React, no store imports.
- **store** holds runtime state and calls engine helpers. It is the only mutable
  layer.
- **components** render; they read via store selectors/hooks and never import raw
  content directly (except through the flow hook).

A component never contains copy, and never contains a raw colour, duration, or
easing.

## 2. Folders

| Path                            | Responsibility                                            |
| ------------------------------- | --------------------------------------------------------- |
| `src/app/`                      | Next App Router entry, layout, global tokens (`globals.css`) |
| `src/components/shell/`         | `Stage`, `DeviceFrame` — the presentation frame           |
| `src/components/journey/`       | `Experience`, `ChatStream`, `ChatMessage` — the conversation |
| `src/components/cards/`         | Plan, Warning, Check-in, Road-Report cards                |
| `src/components/ui/`            | Primitive, token-driven UI (Container, Button)            |
| `src/content/`                  | All scripted data + zod schemas (`schema.ts`, `flow.ts`)  |
| `src/engine/`                   | Pure flow logic + the `useFlow` view-model hook           |
| `src/store/`                    | Zustand world: `store`, `transitions` (pure), `selectors`  |
| `src/lib/`                      | `motion.ts` tokens, `utils.ts` (`cn`), reusable hooks     |
| `src/types/`                    | Shared type re-exports                                    |

## 3. Data flow

1. `src/content/flow.ts` is parsed by `FlowSchema` at module load. Invalid
   content fails the build — a cheap guarantee that content and code agree.
2. `useFlow()` composes the store cursor with pure engine helpers into the view
   model the journey renders (`steps`, `step`, `canAdvance`, `advance`, `reset`).
3. Advancing the cursor reveals the next step. Transitions in
   `src/store/transitions.ts` are pure and deterministic.

## 4. Rendering model

- Server Components by default. `"use client"` only where interaction or motion
  requires it: the `Experience` tree, `ChatMessage`, `ChatStream`, and the store.
- `Stage` and `DeviceFrame` are presentational and can stay server-rendered.
- The store is a module-level singleton; its initial state is deterministic, so
  SSR and hydration agree.

## 5. State & reset

- One store (`src/store/store.ts`): the cursor plus `advance` / `reset`.
- No persistence. Refresh resets the demo — intended, and honest for a prototype.

## 6. Extension points (already shaped)

- **New beat / step:** add to `src/content/flow.ts`; no component changes needed.
- **New card kind:** add to `CardKindSchema`, add a card component, wire one case
  in `ChatMessage`.
- **New scenario:** the flow is data — a second `Flow` can be swapped in later.
