/**
 * The blue strip above a table — Figma 198:22840. `start` holds the search and
 * filters, `end` the primary action. Controls keep their own heights and share
 * a centre line, as the design has them (36px search and button, 34px select).
 */
export default function TableToolbar({ start, end }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-action-primary-hover p-4">
      <div className="flex min-w-0 flex-wrap items-center gap-4">{start}</div>
      {end && <div className="flex items-center">{end}</div>}
    </div>
  );
}
