import type { Transition } from "motion/react";

/**
 * The single source of truth for motion. No component may hardcode a raw
 * duration, easing, or spring configuration — import from here instead.
 * Values are refined in the design step (docs/DESIGN.md).
 */
export const motionTokens = {
  duration: {
    fast: 0.2,
    base: 0.45,
    slow: 0.7,
    crawl: 1.2,
    cadence: 1.8,
  },
  ease: {
    out: [0.22, 1, 0.36, 1] as [number, number, number, number],
    inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  },
  distance: {
    xs: 6,
    sm: 12,
    md: 20,
    lg: 32,
    xl: 48,
  },
  scale: {
    hover: 1.02,
    press: 0.98,
  },
} as const;

export const springs = {
  snappy: { type: "spring", stiffness: 420, damping: 32 },
  gentle: { type: "spring", stiffness: 220, damping: 30 },
} satisfies Record<string, Transition>;

export const viewportOnce = { once: true, margin: "-80px" } as const;

export const transitions = {
  enter: {
    duration: motionTokens.duration.base,
    ease: motionTokens.ease.out,
  } satisfies Transition,
  quick: {
    duration: motionTokens.duration.fast,
    ease: motionTokens.ease.out,
  } satisfies Transition,
};

/** A standard rise-and-fade entrance for chat messages and cards. */
export const riseIn = {
  initial: { opacity: 0, y: motionTokens.distance.sm },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -motionTokens.distance.xs },
};
