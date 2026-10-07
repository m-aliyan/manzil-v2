import type { ReactNode } from "react";

/**
 * The frame is a desktop presentation layer only. On phones it disappears and
 * the app fills the viewport, so there is one UI and no separate mobile build.
 */
export function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[100dvh] w-full md:h-[844px] md:w-[390px] md:rounded-[3rem] md:bg-black md:p-3 md:shadow-2xl md:shadow-black/40">
      <div className="relative h-full w-full overflow-hidden bg-background md:rounded-[2.375rem]">
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-2 hidden h-7 w-32 -translate-x-1/2 rounded-full bg-black md:block"
        />
      </div>
    </div>
  );
}
