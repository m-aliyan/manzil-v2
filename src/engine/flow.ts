import type { Flow, FlowStep } from "@/content";

/** Steps visible at a given cursor, clamped to the flow bounds. */
export function visibleSteps(flow: Flow, cursor: number): FlowStep[] {
  const clamped = Math.max(0, Math.min(cursor, flow.steps.length - 1));
  return flow.steps.slice(0, clamped + 1);
}

/** True while there is a step after the cursor. */
export function canAdvance(flow: Flow, cursor: number): boolean {
  return cursor < flow.steps.length - 1;
}

/** The step the cursor currently points at. */
export function currentStep(flow: Flow, cursor: number): FlowStep {
  const clamped = Math.max(0, Math.min(cursor, flow.steps.length - 1));
  return flow.steps[clamped];
}
