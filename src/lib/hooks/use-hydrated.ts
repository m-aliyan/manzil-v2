"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during SSR and the first client render, then true after
 * hydration. Use it to gate mount-only animations without hydration
 * mismatches (never branch rendered DOM on raw useReducedMotion()).
 */
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
