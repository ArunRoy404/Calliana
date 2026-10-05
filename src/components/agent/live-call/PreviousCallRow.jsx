import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import RowCard from "@/components/cards/RowCard";
import { cn } from "@/lib/cn";

const CHEVRON = { lucide: "ChevronDown", size: 18 };

/**
 * One of the caller's previous calls, as a bordered row that opens beneath
 * itself: when, with whom, its category tags and status; open, who handled
 * it, how long it took, its operational message on a tinted strip, and
 * "Copy message into active note". `isOpen` comes from the URL; `onToggle`
 * and `onCopy` are the store's actions. Reveals after `revealDelay`.
 */
export default function PreviousCallRow({
  call,
  labels,
  separator,
  isOpen = false,
  onToggle,
  onCopy,
  revealDelay = 0,
}) {
  return (
    <RowCard
      variant="compact"
      revealDelay={revealDelay}
      className="gap-0 p-0 shadow-card"
    >
      <Button
        variant="row"
        size="row"
        aria-expanded={isOpen}
        aria-label={labels?.toggleLabel}
        onClick={onToggle}
        className="flex-wrap items-center gap-2 px-4 py-3"
      >
        <span className="text-body-lg text-text-primary">
          {call?.when} {separator} {call?.professional} {separator}
        </span>
        {call?.tags?.map((tag) => (
          <span
            key={tag}
            className="text-body-md rounded-4 border border-solid border-border-default bg-action-secondary px-2 py-0.5 text-text-secondary"
          >
            {tag}
          </span>
        ))}
        <span className="ml-auto flex items-center gap-3">
          <StatusBadge
            variant="tag"
            label={call?.status?.label}
            tone={call?.status?.tone}
          />
          <AssetIcon
            icon={CHEVRON}
            className={cn(
              "shrink-0 transition-transform duration-200 ease-reveal",
              isOpen && "rotate-180",
            )}
          />
        </span>
      </Button>

      {isOpen && (
        <div className="flex flex-col gap-3 border-t border-solid border-border-default px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-body-sm text-text-primary">
              {labels?.handledByLabel}{" "}
              <span className="text-body-md text-status-info">
                {call?.agent}
              </span>
            </p>
            <p className="text-body-sm text-text-primary">
              {labels?.durationLabel}{" "}
              <span className="text-body-md text-status-info">
                {call?.duration}
              </span>
            </p>
          </div>
          <p className="text-body-sm flex flex-col gap-1 rounded-4 bg-surface-selected p-3 text-text-secondary shadow-card sm:flex-row sm:gap-3">
            <span className="text-body-md shrink-0 text-status-info">
              {labels?.messageLabel}
            </span>
            <span>“{call?.message}”</span>
          </p>
          <Button
            variant="link"
            size="none"
            className="text-body-sm self-end text-status-warning"
            onClick={onCopy}
          >
            {labels?.copyLabel}
          </Button>
        </div>
      )}
    </RowCard>
  );
}
