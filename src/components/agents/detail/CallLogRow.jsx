import StatusBadge from "@/components/atoms/StatusBadge";
import ToneIcon from "@/components/atoms/ToneIcon";
import RowCard from "@/components/cards/RowCard";

/**
 * One call in the agent's log — Figma 199:42079: a direction icon on its
 * tone's tint, the caller and number, where/when/how long, then the status
 * and what came of it.
 */
export default function CallLogRow({ call, revealDelay = 0 }) {
  return (
    <RowCard revealDelay={revealDelay}>
      <ToneIcon icon={call?.icon} tone={call?.tone} />

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="flex min-w-0 flex-wrap items-baseline gap-x-2">
          <span className="text-label-lg truncate text-text-primary">
            {call?.caller}
          </span>
          <span className="text-body-sm text-text-disabled">{call?.phone}</span>
        </p>
        <p className="text-label-md truncate text-text-tertiary">
          {call?.meta}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <StatusBadge
          variant="tag"
          label={call?.status?.label}
          tone={call?.status?.tone}
        />
        <p className="text-label-md hidden text-text-disabled sm:block">
          {call?.outcome}
        </p>
      </div>
    </RowCard>
  );
}
