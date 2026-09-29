import Icon from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";
import { CONTROL_SIZE_HEIGHT } from "@/lib/controls";

/**
 * Search box — Figma 42:868 (top bar) / 198:22842 (table toolbar). One
 * component for both; the call site sets only the width. `size` picks the
 * shared control height: `md` (forms, top bar) or `sm` (a table's filter bar).
 *
 * Controlled when given `value` and `onValueChange` (a table's store query),
 * uncontrolled otherwise.
 */
export default function SearchField({
  search,
  value,
  onValueChange,
  size = "md",
  className,
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 rounded-6 border border-solid border-border-default bg-surface-base px-[13px] backdrop-blur-[30px] transition-colors duration-200 ease-out focus-within:border-border-focus",
        CONTROL_SIZE_HEIGHT?.[size] ?? CONTROL_SIZE_HEIGHT?.md,
        className,
      )}
    >
      <Icon name="Search" className="text-text-secondary" />
      <span className="sr-only">{search?.label}</span>
      <input
        type="search"
        placeholder={search?.placeholder}
        value={value}
        onChange={(event) => onValueChange?.(event?.target?.value ?? "")}
        className="text-body-sm min-w-0 flex-1 bg-transparent text-text-primary outline-none placeholder:text-brand-gray-dark"
      />
    </label>
  );
}
