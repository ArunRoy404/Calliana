import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import MetaLine from "@/components/atoms/MetaLine";
import UserAvatar from "@/components/atoms/UserAvatar";

/**
 * The open conversation's header — Figma 167:51527: the contact's picture,
 * name and "account • channel", with "Mark Resolved" at the right (no
 * backend yet, so it carries `notFunctional`).
 *
 * Below `xl` it also carries the phone's two controls — back to the list
 * (`onBack`) and the client-details drawer (`onOpenInfo`); both drop away
 * once the three columns fit side by side.
 */
export default function ThreadHeader({
  conversation,
  thread,
  notFunctional,
  onBack,
  onOpenInfo,
}) {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b border-solid border-border-default p-3 sm:gap-4 sm:p-4">
      <Button
        variant="ghost"
        size="square"
        aria-label={thread?.backLabel}
        onClick={onBack}
        className="xl:hidden"
      >
        <Icon name="ArrowLeft" size={18} />
      </Button>

      <div className="flex min-w-0 flex-1 items-center gap-3">
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

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="square"
          aria-label={thread?.infoLabel}
          onClick={onOpenInfo}
          className="xl:hidden"
        >
          <Icon name="Info" size={18} />
        </Button>
        <Button variant="success" size="xs" {...notFunctional}>
          {thread?.resolveLabel}
        </Button>
      </div>
    </header>
  );
}
