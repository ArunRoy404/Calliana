import StatusBadge from "@/components/atoms/StatusBadge";
import Reveal from "@/components/motion/Reveal";

/**
 * One day of an agent's working week — Figma 198:35224: the day, its hours
 * and whether it is worked, on a grey tile.
 */
export default function WorkingDayRow({ day, revealDelay = 0 }) {
  return (
    <Reveal
      as="li"
      delay={revealDelay}
      className="flex items-center gap-2 rounded-4 border border-solid border-border-strong bg-action-secondary p-4"
    >
      <p className="text-h4 min-w-0 flex-1 truncate text-text-secondary">
        {day?.day}
      </p>
      <p className="text-h4 min-w-0 flex-1 truncate text-text-secondary">
        {day?.hours}
      </p>
      <StatusBadge
        variant="tag"
        label={day?.status?.label}
        tone={day?.status?.tone}
      />
    </Reveal>
  );
}
