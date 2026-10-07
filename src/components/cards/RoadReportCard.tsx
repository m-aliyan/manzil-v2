export function RoadReportCard({ text }: { text: string }) {
  return (
    <article className="w-full rounded-2xl border border-hairline bg-surface p-4">
      <p className="mono-label mb-2 text-muted">Traveller report</p>
      <p className="text-[15px] leading-relaxed text-foreground">{text}</p>
    </article>
  );
}
