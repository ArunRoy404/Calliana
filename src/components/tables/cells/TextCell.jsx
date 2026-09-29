import { cn } from "@/lib/cn";

/**
 * Plain value — Figma 198:22879. `column.wrap` lets long values (emails) break
 * anywhere rather than overflow a narrow column.
 */
export default function TextCell({ column, row }) {
  return (
    <span
      className={cn(
        "text-label-md min-w-0 text-brand-black",
        column?.wrap ? "break-all" : "whitespace-nowrap",
      )}
    >
      {row?.[column?.field]}
    </span>
  );
}
