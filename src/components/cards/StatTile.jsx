import TextureLayer from "@/components/decor/TextureLayer";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { TONE_TEXT } from "@/lib/tones";

/**
 * A headline figure on a textured tile — Figma 198:31279 ("Open Tasks / 2",
 * "Next Appointment / Tomorrow 10:30"). `tone` colours the figure (open tasks
 * in amber); `texture` is the faint image under the white — the stat cards'
 * own, whose 26% is baked into its alpha. Reveals after `revealDelay`.
 */
export default function StatTile({
  label,
  value,
  tone,
  texture,
  revealDelay = 0,
}) {
  return (
    <Reveal
      delay={revealDelay}
      className="relative isolate flex min-w-0 flex-col gap-[3px] overflow-hidden border border-solid border-border-strong bg-surface-base p-4"
    >
      <TextureLayer src={texture} />
      <p className="text-body-sm text-text-secondary">{label}</p>
      <p
        className={cn(
          "text-h3 truncate",
          TONE_TEXT?.[tone] ?? "text-brand-ink-black",
        )}
      >
        {value}
      </p>
    </Reveal>
  );
}
