import { cn } from "@/lib/cn";
import { TONE_TEXT } from "@/lib/tones";

/**
 * A small caption over its figure — Figma 199:41236 ("Last call / Today
 * 10:42"). `tone` colours the figure (an open-task count in amber).
 */
export default function StatFigure({ label, value, tone }) {
  return (
    <div className="text-label-md flex shrink-0 flex-col justify-between gap-5 whitespace-nowrap">
      <p className="text-text-disabled">{label}</p>
      <p className={cn(TONE_TEXT?.[tone] ?? "text-text-primary")}>{value}</p>
    </div>
  );
}
