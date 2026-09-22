import StatusDot from "@/components/atoms/StatusDot";
import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_BORDER, TONE_SURFACE } from "@/lib/tones";

/** One tinted alert row — Figma 191:16869. */
export default function AttentionItem({ item }) {
  const tone = item?.tone ?? DEFAULT_TONE;

  return (
    <li
      className={cn(
        "flex items-center gap-3 border border-solid px-4 py-3",
        TONE_SURFACE?.[tone] ?? TONE_SURFACE?.[DEFAULT_TONE],
        TONE_BORDER?.[tone] ?? TONE_BORDER?.[DEFAULT_TONE],
      )}
    >
      <StatusDot tone={tone} />
      <p className="text-body-sm min-w-0 flex-1 text-text-secondary">
        {item?.label}
      </p>
    </li>
  );
}
