"use client";

import { useReducedMotion } from "motion/react";
import { useHydrated } from "./use-hydrated";

/**
 * Hydration-safe reduced-motion flag. useReducedMotion() can return null on the
 * server; we settle it to `false` until hydrated so the first paint is stable.
 */
export function useReducedMotionSafe() {
  const hydrated = useHydrated();
  const prefersReduced = useReducedMotion();
  return hydrated ? Boolean(prefersReduced) : false;
}
