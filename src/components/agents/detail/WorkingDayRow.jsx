import AssetIcon from "@/components/atoms/AssetIcon";
import StatusBadge from "@/components/atoms/StatusBadge";
import Reveal from "@/components/motion/Reveal";

/**
 * One day of an agent's working week — Figma 198:35224: the day, its hours
 * and whether it is worked, on a grey tile. `hoursIcon` leads the hours (the
 * business profile's clock — a closed day shows its "—" alone); `action` sits at the end of the row (its
 * on/off `Switch`).
 */
export default function WorkingDayRow({
  day,
  hoursIcon,
  action,
  revealDelay = 0,
}) {
  return (
    <Reveal
      as="li"
      delay={revealDelay}
      className="flex items-center gap-2 rounded-4 border border-solid border-border-strong bg-action-secondary p-4"
    >
      <p className="text-h4 min-w-0 flex-1 truncate text-text-secondary">
        {day?.day}
      </p>
      <p className="text-h4 flex min-w-0 flex-1 items-center gap-2 text-text-secondary">
        {hoursIcon && day?.isOpen !== false && (
          <AssetIcon icon={hoursIcon} className="shrink-0" />
        )}
        <span className="truncate">{day?.hours}</span>
      </p>
      <StatusBadge
        variant="tag"
        label={day?.status?.label}
        tone={day?.status?.tone}
      />
      {action}
    </Reveal>
  );
}
