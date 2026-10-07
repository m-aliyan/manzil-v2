import type { ReactNode } from "react";
import { DeviceFrame } from "./DeviceFrame";

/** The stage: a designed backdrop that centers the app frame on desktop. */
export function Stage({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-stage">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(70% 55% at 50% 0%, rgba(255,255,255,0.10), transparent 70%)",
        }}
      />
      <DeviceFrame>{children}</DeviceFrame>
    </main>
  );
}
