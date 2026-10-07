export function PlanCard({ text }: { text: string }) {
  return (
    <article className="w-full rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
      <p className="mono-label mb-2 text-muted">Day-by-day plan</p>
      <p className="text-[15px] leading-relaxed text-foreground">{text}</p>
    </article>
  );
}
