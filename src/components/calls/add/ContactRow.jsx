import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import RowCard from "@/components/cards/RowCard";

/**
 * One directory contact — Quick Contacts & Speed Dial tab: a single-initial
 * avatar, the name with a grey tag chip, the number in primary-blue
 * monospace beside the account, and a bordered "Select & Dial" action. A
 * `listed` row, so the contacts read as one ruled list.
 */
export default function ContactRow({
  contact,
  dialLabel,
  dialIcon,
  onSelect,
  revealDelay = 0,
}) {
  return (
    <RowCard
      variant="listed"
      revealDelay={revealDelay}
      className="justify-between"
    >
      <div className="flex min-w-0 items-center gap-4">
        <UserAvatar name={contact?.name} size="row" maxInitials={1} />
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-label-lg truncate text-brand-black">
              {contact?.name}
            </span>
            <StatusBadge variant="tag" showDot={false} label={contact?.tag} />
          </div>
          <p className="text-body-sm text-text-tertiary">
            <span className="font-mono text-action-primary">
              {contact?.phone}
            </span>
            {contact?.account && ` • ${contact?.account}`}
          </p>
        </div>
      </div>

      <Button variant="neutral" onClick={() => onSelect?.(contact)}>
        <AssetIcon icon={dialIcon} className="text-action-primary" />
        {dialLabel}
      </Button>
    </RowCard>
  );
}
