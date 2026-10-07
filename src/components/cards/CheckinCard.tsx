export function CheckinCard({ text }: { text: string }) {
  return (
    <article className="w-full rounded-2xl border border-accent/30 bg-accent/5 p-4">
      <p className="mono-label mb-2 text-accent">On the road</p>
      <p className="text-[15px] leading-relaxed text-foreground">{text}</p>
    </article>
  );
}
