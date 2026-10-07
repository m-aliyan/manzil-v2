"use client";

import { Button } from "@/components/ui/Button";
import { useFlow } from "@/engine/use-flow";
import { ChatStream } from "./ChatStream";

/**
 * PLACEHOLDER shell for Phase 1. It proves the interactive engine end to end:
 * the viewer taps to advance and nothing moves on its own. Phase 2 replaces the
 * single button with the real suggested-reply chips and free-text input.
 */
export function Experience() {
  const { steps, canAdvance, advance, reset } = useFlow();

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
        <span className="mono-label text-foreground">Manzil</span>
        <span className="mono-label text-muted">prototype</span>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <ChatStream steps={steps} />
      </div>

      <footer className="border-t border-hairline px-5 py-4">
        <Button className="w-full" onClick={canAdvance ? advance : reset}>
          {canAdvance ? "Continue" : "Start over"}
        </Button>
      </footer>
    </div>
  );
}
