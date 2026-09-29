import AppImage from "@/components/atoms/AppImage";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import StatusBadge from "@/components/atoms/StatusBadge";
import RowCard from "@/components/cards/RowCard";
import StatFigure from "@/components/cards/StatFigure";

/**
 * One client assigned to the agent — Figma 199:41222: an icon tile, the
 * client and its status, the contact, last call and open tasks, and a remove
 * button.
 */
const REMOVE_ICON = { src: "/icons/close-circle.svg", width: 24, height: 24 };

export default function AssignedClientRow({
  client,
  labels,
  notFunctional,
  revealDelay = 0,
}) {
  return (
    <RowCard
      emphasis
      revealDelay={revealDelay}
      className="flex-wrap sm:flex-nowrap"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-8 bg-surface-selected text-action-primary">
        <Icon name="BriefcaseBusiness" size={16} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-label-lg truncate text-text-primary">
            {client?.name}
          </p>
          <StatusBadge
            variant="outline"
            showDot={false}
            label={client?.status?.label}
            tone={client?.status?.tone}
          />
        </div>
        <p className="text-label-md truncate text-text-tertiary">
          {client?.contact}
        </p>
      </div>

      <StatFigure label={labels?.lastCall} value={client?.lastCall} />
      <StatFigure
        label={labels?.openTasks}
        value={client?.openTasks?.value}
        tone={client?.openTasks?.tone}
      />

      <Button
        variant="ghost"
        size="none"
        aria-label={labels?.removeClient}
        className="shrink-0 rounded-999 p-0 hover:bg-transparent hover:opacity-70"
        {...notFunctional}
      >
        <AppImage
          src={REMOVE_ICON.src}
          width={REMOVE_ICON.width}
          height={REMOVE_ICON.height}
        />
      </Button>
    </RowCard>
  );
}
