import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import RowCard from "@/components/cards/RowCard";

const DIAL_ICON = { lucide: "Phone", size: 14 };

/** One directory contact — Quick Contacts & Speed Dial tab. */
export default function ContactRow({ contact, dialLabel, onSelect, revealDelay = 0 }) {
  return (
    <RowCard variant="boxed" revealDelay={revealDelay} className="justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <UserAvatar name={contact?.name} size="row" />
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-label-lg truncate text-brand-black">{contact?.name}</span>
            <StatusBadge variant="outline" showDot={false} tone="primary" label={contact?.tag} />
          </div>
          <p className="text-body-sm text-text-tertiary">
            <span className="text-status-info">{contact?.phone}</span>
            {contact?.account && ` • ${contact?.account}`}
          </p>
        </div>
      </div>

      <Button variant="info" size="compact" onClick={() => onSelect?.(contact)}>
        <AssetIcon icon={DIAL_ICON} />
        {dialLabel}
      </Button>
    </RowCard>
  );
}
