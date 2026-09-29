import AssetIcon from "@/components/atoms/AssetIcon";
import StatusBadge from "@/components/atoms/StatusBadge";
import RowCard from "@/components/cards/RowCard";

/**
 * One task on a client's account — Figma 202:30805: the task mark and title
 * with its priority, then when it is due and where it stands, indented under
 * the title.
 */
export default function ClientTaskRow({ task, dueIcon, revealDelay = 0 }) {
  return (
    <RowCard variant="outlined" revealDelay={revealDelay}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex min-w-0 items-center gap-2">
          <AssetIcon icon={task?.icon} className="shrink-0" />
          <span className="text-label-lg text-text-primary">{task?.title}</span>
        </p>
        <StatusBadge
          variant="tag"
          label={task?.priority?.label}
          tone={task?.priority?.tone}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pl-8">
        <span className="text-label-md flex items-center gap-2 text-brand-black">
          <AssetIcon icon={dueIcon} className="shrink-0" />
          {task?.due}
        </span>
        <StatusBadge
          variant="tag"
          showDot={false}
          label={task?.status?.label}
          tone={task?.status?.tone}
        />
      </div>
    </RowCard>
  );
}
