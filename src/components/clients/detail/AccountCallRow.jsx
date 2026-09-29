import StatusBadge from "@/components/atoms/StatusBadge";
import RowCard from "@/components/cards/RowCard";

/**
 * One call on a client's account — Figma 198:31350 (Overview's recent calls)
 * and 202:30523 (the Calls tab, which adds the caller's number): the caller,
 * then time • agent • outcome, with the status and duration on the right.
 */
export default function AccountCallRow({ call, revealDelay = 0 }) {
  return (
    <RowCard variant="ruled" revealDelay={revealDelay}>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="flex min-w-0 flex-wrap items-center gap-x-2">
          <span className="text-label-lg truncate text-brand-black">
            {call?.caller}
          </span>
          {call?.phone && (
            <span className="text-body-md text-status-info">{call?.phone}</span>
          )}
        </p>
        <p className="text-body-md text-text-secondary">{call?.meta}</p>
      </div>

      <StatusBadge
        variant="tag"
        showDot={false}
        label={call?.status?.label}
        tone={call?.status?.tone}
      />
      {call?.duration && (
        <p className="text-body-md shrink-0 text-text-secondary">
          {call?.duration}
        </p>
      )}
    </RowCard>
  );
}
