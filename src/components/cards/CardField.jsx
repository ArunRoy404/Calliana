/**
 * A labelled value inside a card's field grid — a small caps label over its
 * value. Renders a `dt`/`dd` pair, so the parent is a `dl`.
 */
export default function CardField({ label, children }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <dt className="text-label-sm truncate text-text-tertiary">{label}</dt>
      <dd className="flex min-h-[20.5px] min-w-0 items-center">{children}</dd>
    </div>
  );
}
