import AssetIcon from "@/components/atoms/AssetIcon";
import { cn } from "@/lib/cn";

/**
 * An icon before a short piece of text, on one line — a caller's phone and
 * location, a call's purpose, "Matched Contact". `icon` is an `AssetIcon`
 * descriptor; the text truncates rather than wrapping under the icon. The
 * colour and size come from the parent, so `className` only adds them when
 * this one differs.
 */
export default function IconLabel({ icon, children, className }) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-1.5", className)}>
      <AssetIcon icon={icon} className="shrink-0" />
      <span className="truncate">{children}</span>
    </span>
  );
}
