/**
 * A labelled value inside a card's field grid — a small caps label over its
 * value. Renders a `dt`/`dd` pair, so the parent is a `dl`. `meta` adds a
 * quieter line under the value (a contact's last call: "4m 42s •
 * Appointment inquiry").
 */
export default function CardField({ label, meta, children }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <dt className="text-label-sm truncate text-text-tertiary">{label}</dt>
      <dd className="flex min-h-[20.5px] min-w-0 items-center">{children}</dd>
      {meta && <dd className="text-body-sm text-text-secondary">{meta}</dd>}
    </div>
  );
}
