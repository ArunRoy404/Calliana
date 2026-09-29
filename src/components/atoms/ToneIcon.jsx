import Icon from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_SURFACE, TONE_TEXT } from "@/lib/tones";

/**
 * A lucide icon on its tone's tint — Figma 199:42080 (the call-direction
 * tile). `icon` is a lucide name from the data file.
 */
export default function ToneIcon({ icon, tone = DEFAULT_TONE, className }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-8",
        TONE_SURFACE?.[tone] ?? TONE_SURFACE?.[DEFAULT_TONE],
        TONE_TEXT?.[tone] ?? TONE_TEXT?.[DEFAULT_TONE],
        className,
      )}
    >
      <Icon name={icon} size={14} />
    </span>
  );
}
