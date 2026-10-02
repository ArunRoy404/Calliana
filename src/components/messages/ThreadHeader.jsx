import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import MetaLine from "@/components/atoms/MetaLine";
import UserAvatar from "@/components/atoms/UserAvatar";

/**
 * The open conversation's header — Figma 167:51527: the contact's picture,
 * name and "account • channel", with "Mark Resolved" at the right (no
 * backend yet, so it carries `notFunctional`).
 *
 * Between `md` and `xl`, where the inbox has no client-info column, a
 * "Client info" button sits beside it and calls `onOpenClientInfo` — icon
 * only below `lg`, so the contact's name keeps its room.
 */
export default function ThreadHeader({
  conversation,
  thread,
  notFunctional,
  onOpenClientInfo,
}) {
  return (
    <header className="flex shrink-0 items-center justify-between gap-4 border-b border-solid border-border-default p-4">
      <div className="flex min-w-0 items-center gap-3">
        <UserAvatar
          name={conversation?.contactName}
          src={conversation?.avatar}
        />
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-h4 truncate text-brand-text-black">
            {conversation?.contactName}
          </h2>
          <MetaLine
            size="sm"
            separator={thread?.separator}
            items={[conversation?.account, conversation?.channel]}
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="neutral"
          size="xs"
          aria-label={thread?.clientInfoLabel}
          onClick={onOpenClientInfo}
          className="hidden md:flex xl:hidden"
        >
          <AssetIcon icon={thread?.clientInfoIcon} />
          <span className="hidden lg:inline">{thread?.clientInfoLabel}</span>
        </Button>
        <Button variant="success" size="xs" {...notFunctional}>
          {thread?.resolveLabel}
        </Button>
      </div>
    </header>
  );
}
