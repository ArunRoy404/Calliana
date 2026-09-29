import { Fragment } from "react";

import { cn } from "@/lib/cn";

/**
 * A line of facts with a separator between each — Figma 198:31057 ("Contact:
 * Dr. Laura Alegre • +34 934 112 900 • contact@…"). `items` are nodes or
 * strings; empty ones are skipped so no separator is left dangling. The
 * separators are decorative, so screen readers skip them.
 */
export default function MetaLine({ items = [], separator = "•", className }) {
  const present = items?.filter(Boolean) ?? [];

  return (
    <p
      className={cn(
        "text-body-md flex flex-wrap items-center gap-x-2 gap-y-1 text-text-secondary",
        className,
      )}
    >
      {present?.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <span aria-hidden>{separator}</span>}
          <span className="min-w-0 break-words">{item}</span>
        </Fragment>
      ))}
    </p>
  );
}
