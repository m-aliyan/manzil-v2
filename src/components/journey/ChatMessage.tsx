"use client";

import { motion } from "motion/react";
import type { FlowStep } from "@/content";
import { riseIn, transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CheckinCard } from "@/components/cards/CheckinCard";
import { PlanCard } from "@/components/cards/PlanCard";
import { RoadReportCard } from "@/components/cards/RoadReportCard";
import { WarningCard } from "@/components/cards/WarningCard";

const CARD_KINDS = new Set(["plan", "warning", "checkin", "report", "closer"]);

export function ChatMessage({ step }: { step: FlowStep }) {
  const isUser = step.actor === "user";
  const isCard = CARD_KINDS.has(step.kind);

  return (
    <motion.div
      layout="position"
      initial={riseIn.initial}
      animate={riseIn.animate}
      transition={transitions.enter}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      {isCard ? (
        <CardFor step={step} />
      ) : (
        <div
          className={cn(
            "max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed",
            isUser
              ? "bg-foreground text-background"
              : "border border-hairline bg-surface text-foreground",
          )}
        >
          {step.text}
        </div>
      )}
    </motion.div>
  );
}

function CardFor({ step }: { step: FlowStep }) {
  switch (step.kind) {
    case "plan":
      return <PlanCard text={step.text} />;
    case "warning":
      return <WarningCard text={step.text} />;
    case "checkin":
      return <CheckinCard text={step.text} />;
    case "report":
      return <RoadReportCard text={step.text} />;
    default:
      return (
        <div className="w-full rounded-2xl border border-hairline bg-surface px-4 py-3 text-[15px] leading-relaxed text-foreground">
          {step.text}
        </div>
      );
  }
}
