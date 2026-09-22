import IconTile from "@/components/atoms/IconTile";
import { cn } from "@/lib/cn";

/**
 * Badged footnote at the bottom of an auth card — Figma 43:8236.
 * Repeats across the auth screens with different copy.
 */
export default function CardNote({ icon, text, tone = "success", className }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconTile icon={icon} tone={tone} />
      <p className="text-body-sm text-text-secondary">{text}</p>
    </div>
  );
}
