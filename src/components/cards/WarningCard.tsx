export function WarningCard({ text }: { text: string }) {
  return (
    <article className="w-full rounded-2xl border border-warning/30 bg-warning/5 p-4">
      <p className="mono-label mb-2 text-warning">Heads up</p>
      <p className="text-[15px] leading-relaxed text-foreground">{text}</p>
    </article>
  );
}
