import { z } from "zod";

/**
 * The flow is the whole demo: an ordered list of steps. Each step is one thing
 * the viewer sees (a Manzil message, a user message, or a card) plus the
 * suggested replies that advance the story. This is scripted — there is no
 * model — but it is interactive: nothing advances until the viewer acts.
 */
export const BeatSchema = z.enum(["cover", "discovery", "plan", "warning", "companion", "close"]);

export const ActorSchema = z.enum(["user", "manzil", "card"]);

export const CardKindSchema = z.enum(["text", "plan", "warning", "checkin", "report", "closer"]);

export const FlowStepSchema = z.object({
  id: z.string().min(1),
  beat: BeatSchema,
  actor: ActorSchema,
  kind: CardKindSchema.default("text"),
  text: z.string().min(1),
  /** Suggested replies shown to the viewer. Empty means a single continue action. */
  choices: z.array(z.string().min(1)).default([]),
});

export const FlowSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  steps: z.array(FlowStepSchema).min(1),
});

export type Beat = z.infer<typeof BeatSchema>;
export type Actor = z.infer<typeof ActorSchema>;
export type CardKind = z.infer<typeof CardKindSchema>;
export type FlowStep = z.infer<typeof FlowStepSchema>;
export type Flow = z.infer<typeof FlowSchema>;
