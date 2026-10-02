import StatusBadge from "@/components/atoms/StatusBadge";
import CardField from "@/components/cards/CardField";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { TONE_TEXT } from "@/lib/tones";

/**
 * The top of a call's detail panel (Figma 202:39212) — its status and
 * follow-up tags, ruled off above a two-column grid of the call's key fields
 * (`content.infoFields`). A field with a `tone` tints its value ("PURPOSE
 * TAG" reads in primary blue).
 *
 * Reveals after `revealDelay`.
 */
export default function CallInfoCard({ call, fields = [], revealDelay = 0 }) {
  return (
    <Reveal
      delay={revealDelay}
      className="flex flex-col gap-4 rounded-8 border border-solid border-border-default bg-surface-base p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-solid border-border-default pb-3">
        <StatusBadge
          variant="tag"
          label={call?.status?.label}
          tone={call?.status?.tone}
        />
        <StatusBadge
          variant="tag"
          label={call?.followUp?.label}
          tone={call?.followUp?.tone}
          showDot={false}
        />
      </div>

      <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
        {fields?.map((field) => (
          <CardField key={field?.id} label={field?.label}>
            <span
              className={cn(
                "text-label-lg truncate",
                TONE_TEXT?.[field?.tone] ?? "text-brand-black",
              )}
            >
              {call?.[field?.id]}
            </span>
          </CardField>
        ))}
      </dl>
    </Reveal>
  );
}
