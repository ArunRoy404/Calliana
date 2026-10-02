import Button from "@/components/atoms/Button";
import CountBadge from "@/components/atoms/CountBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import RowCard from "@/components/cards/RowCard";

/**
 * One conversation in the inbox list — Figma 167:51527: the contact's
 * picture, name and time, the latest message, then the channel and the
 * unread count. The whole row is one button; the open conversation is
 * tinted (`aria-current`). Reveals after `revealDelay`.
 */
export default function ConversationRow({
  conversation,
  isActive = false,
  onOpen,
  revealDelay = 0,
}) {
  return (
    <RowCard variant="flush" revealDelay={revealDelay}>
      <Button
        variant="row"
        size="row"
        aria-current={isActive || undefined}
        onClick={() => onOpen?.(conversation?.id)}
      >
        <UserAvatar name={conversation?.name} src={conversation?.avatar} />

        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="text-label-lg truncate text-brand-black">
              {conversation?.name}
            </span>
            <span className="text-body-sm shrink-0 text-text-tertiary">
              {conversation?.time}
            </span>
          </span>
          <span className="text-body-sm truncate text-text-secondary">
            {conversation?.preview}
          </span>
          <span className="flex items-center justify-between gap-2">
            <span className="text-label-sm text-text-tertiary">
              {conversation?.channel}
            </span>
            <CountBadge count={conversation?.unread} />
          </span>
        </span>
      </Button>
    </RowCard>
  );
}
