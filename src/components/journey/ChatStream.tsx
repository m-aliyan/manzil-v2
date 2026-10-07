"use client";

import { AnimatePresence } from "motion/react";
import type { FlowStep } from "@/content";
import { ChatMessage } from "./ChatMessage";

export function ChatStream({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence initial={false}>
        {steps.map((step) => (
          <ChatMessage key={step.id} step={step} />
        ))}
      </AnimatePresence>
    </div>
  );
}
