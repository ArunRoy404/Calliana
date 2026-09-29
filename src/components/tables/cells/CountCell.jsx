/**
 * A small count in a white disc — Figma 198:26129 (a client's open tasks).
 * The row field holds the figure as it should read ("03").
 */
export default function CountCell({ column, row }) {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-999 bg-surface-base text-[11px] leading-4 font-bold tracking-[0.1px] text-text-primary">
      {row?.[column?.field]}
    </span>
  );
}
