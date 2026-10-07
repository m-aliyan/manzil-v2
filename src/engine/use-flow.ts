"use client";

import { flow } from "@/content";
import { canAdvance, currentStep, visibleSteps } from "@/engine/flow";
import { useAdvance, useCursor, useReset } from "@/store/selectors";

/** Compose the store + pure engine into the view model the journey renders. */
export function useFlow() {
  const cursor = useCursor();
  const advance = useAdvance();
  const reset = useReset();

  return {
    cursor,
    step: currentStep(flow, cursor),
    steps: visibleSteps(flow, cursor),
    canAdvance: canAdvance(flow, cursor),
    advance,
    reset,
  };
}
