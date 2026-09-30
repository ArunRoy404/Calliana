import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import RowCard from "@/components/cards/RowCard";

/** One assigned operator — Queue Details panel, Figma 381:38657. */
export default function OperatorRow({ operator, removeLabel, notFunctional, revealDelay = 0 }) {
  return (
    <RowCard variant="emphasis" revealDelay={revealDelay} className="justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <UserAvatar name={operator?.name} size="chip" />
        <div className="flex min-w-0 flex-col">
          <span className="text-label-lg truncate text-brand-black">{operator?.name}</span>
          <span className="text-body-sm text-text-tertiary">
            Ext. {operator?.ext} • {operator?.role}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <StatusBadge
          variant="tag"
          label={operator?.status?.label}
          tone={operator?.status?.tone}
        />
        <Button variant="outline" size="compact" {...notFunctional}>
          {removeLabel}
        </Button>
      </div>
    </RowCard>
  );
}
