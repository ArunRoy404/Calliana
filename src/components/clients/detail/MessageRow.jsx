import StatusBadge from "@/components/atoms/StatusBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import RowCard from "@/components/cards/RowCard";

/**
 * One message thread — Figma 202:30625: the sender's picture, name •
 * channel and the time, then the latest message and — when the thread has a
 * `status` — where it stands (the client home's conversations carry none).
 */
export default function MessageRow({ message, separator, revealDelay = 0 }) {
  return (
    <RowCard variant="divider" revealDelay={revealDelay}>
      <UserAvatar name={message?.sender} src={message?.avatar} size="row" />

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <p className="flex min-w-0 items-center gap-2">
            <span className="text-body-lg truncate text-text-primary">
              {message?.sender}
            </span>
            <span aria-hidden className="text-body-sm text-text-secondary">
              {separator}
            </span>
            <span className="text-body-sm shrink-0 text-text-secondary">
              {message?.channel}
            </span>
          </p>
          <p className="text-body-sm shrink-0 text-text-secondary">
            {message?.time}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-body-md min-w-0 text-text-secondary">
            {message?.text}
          </p>
          {message?.status && (
            <StatusBadge
              variant="tag"
              label={message?.status?.label}
              tone={message?.status?.tone}
            />
          )}
        </div>
      </div>
    </RowCard>
  );
}
