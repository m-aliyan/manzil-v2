"use client";

import { create } from "zustand";
import { flow } from "@/content";
import { advanceCursor, initialCursor } from "./transitions";

interface DemoState {
  cursor: number;
  advance: () => void;
  reset: () => void;
}

/**
 * The shared demo world. One store, pure transitions, deterministic, resets to
 * step zero. Screens read through selectors and mutate only through actions.
 */
export const useDemo = create<DemoState>((set) => ({
  cursor: initialCursor(),
  advance: () => set((state) => ({ cursor: advanceCursor(flow.steps.length, state.cursor) })),
  reset: () => set({ cursor: initialCursor() }),
}));
