import { FlowSchema, type Flow } from "./schema";

/**
 * PLACEHOLDER flow. The hero persona and the real script are locked in Phase 2
 * (see docs/BLUEPRINT.md). This proves the schema and the interactive engine
 * end to end. Edit copy here and nowhere else.
 */
export const flow: Flow = FlowSchema.parse({
  id: "hero",
  title: "Hero journey",
  steps: [
    {
      id: "cover",
      beat: "cover",
      actor: "manzil",
      kind: "text",
      text: "Planning a trip up north? Tell me a little about it and I'll shape a plan that actually fits — not a brochure.",
    },
    {
      id: "discovery-1",
      beat: "discovery",
      actor: "manzil",
      kind: "text",
      text: "Who's travelling, roughly how many days do you have, and where are you starting from?",
      choices: ["Family of five, eight days, from Karachi"],
    },
    {
      id: "discovery-2",
      beat: "discovery",
      actor: "user",
      kind: "text",
      text: "Family of five — my parents are in their sixties — eight days, starting from Karachi. The budget is fixed.",
    },
    {
      id: "plan-1",
      beat: "plan",
      actor: "card",
      kind: "plan",
      text: "A first pass: Hunza and Skardu, flying in and out so the road days stay gentle on your parents.",
    },
    {
      id: "warning-1",
      beat: "warning",
      actor: "card",
      kind: "warning",
      text: "One thing to fix before you commit — the Hunza to Skardu transfer in a single day is too long with older travellers. I've reworked the middle of the trip.",
    },
    {
      id: "companion-1",
      beat: "companion",
      actor: "card",
      kind: "checkin",
      text: "Day four. You've reached Gilgit. Here's what's ahead tomorrow and what to carry for it.",
    },
    {
      id: "companion-2",
      beat: "companion",
      actor: "card",
      kind: "report",
      text: "A traveller coming the other way reports a short closure near Chilas, cleared by mid-morning. Plan around it.",
    },
    {
      id: "close",
      beat: "close",
      actor: "manzil",
      kind: "closer",
      text: "That's Manzil: it helps you decide, plans honestly, and stays with you on the road.",
    },
  ],
});
