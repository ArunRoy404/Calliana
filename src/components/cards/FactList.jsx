import { cn } from "@/lib/cn";

/**
 * Labelled facts, one per line, the value in primary blue — the live call's
 * Caller Profile ("Name: Carlos Romero") and Client Support Instructions
 * ("Working Hours: Mon – Fri…"). `facts` is `[{ id, label, value }]`.
 *
 * `layout`:
 * - `between` (default) — label at the left, value pushed to the right.
 * - `start` — the value follows its label, wrapping under itself (a long
 *   address).
 *
 * Not a reveal of its own: it arrives with the card around it.
 */
const LAYOUTS = {
  between: { row: "justify-between", value: "truncate text-right" },
  start: { row: "", value: "wrap-break-word" },
};

export default function FactList({ facts = [], layout = "between" }) {
  const look = LAYOUTS?.[layout] ?? LAYOUTS?.between;

  return (
    <dl className="flex flex-col gap-3">
      {facts?.map((fact) => (
        <div key={fact?.id} className={cn("flex min-w-0 gap-4", look?.row)}>
          <dt className="text-body-sm shrink-0 text-text-primary">
            {fact?.label}
          </dt>
          <dd
            className={cn("text-body-md min-w-0 text-status-info", look?.value)}
          >
            {fact?.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
