import Icon from "@/components/atoms/Icon";
import StatusBadge from "@/components/atoms/StatusBadge";
import RowCard from "@/components/cards/RowCard";
import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_TEXT } from "@/lib/tones";

/**
 * One task — Figma 199:42977: a check icon and title, priority and status
 * tags, and underneath the client and when it is due.
 */
export default function TaskRow({ task, revealDelay = 0 }) {
  return (
    <RowCard revealDelay={revealDelay} className="flex-col items-stretch gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex min-w-0 items-center gap-2">
          <Icon
            name="SquareCheck"
            size={14}
            className={cn(TONE_TEXT?.[task?.tone] ?? TONE_TEXT?.[DEFAULT_TONE])}
          />
          <span className="text-label-lg truncate text-text-primary">
            {task?.title}
          </span>
        </p>

        <div className="flex items-center gap-2">
          <StatusBadge
            variant="tag"
            label={task?.priority?.label}
            tone={task?.priority?.tone}
          />
          <StatusBadge
            variant="tag"
            label={task?.status?.label}
            tone={task?.status?.tone}
          />
        </div>
      </div>

      <div className="text-body-sm flex flex-wrap items-center gap-3 pl-5 text-text-tertiary">
        <span>{task?.client}</span>
        <span className="flex items-center gap-1">
          <Icon name="Clock" size={11} />
          {task?.due}
        </span>
      </div>
    </RowCard>
  );
}
