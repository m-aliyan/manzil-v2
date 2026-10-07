"use client";

import { useDemo } from "./store";

export function useCursor() {
  return useDemo((state) => state.cursor);
}

export function useAdvance() {
  return useDemo((state) => state.advance);
}

export function useReset() {
  return useDemo((state) => state.reset);
}
