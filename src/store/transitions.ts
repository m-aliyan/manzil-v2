export function advanceCursor(total: number, cursor: number): number {
  if (total <= 0) return 0;
  return Math.min(cursor + 1, total - 1);
}

export function initialCursor(): number {
  return 0;
}
