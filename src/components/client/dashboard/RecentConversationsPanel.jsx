import PanelLink from "@/components/actions/PanelLink";
import DetailSection from "@/components/cards/DetailSection";
import MessageRow from "@/components/clients/detail/MessageRow";
import StaggerList from "@/components/lists/StaggerList";

/**
 * "Recent Conversations" — the inbox's latest threads, one ruled
 * `MessageRow` each (who • channel, when, the last message). "Inbox" opens
 * them all. Reveals after `revealDelay`; its rows follow it in.
 */
export default function RecentConversationsPanel({
  conversations,
  messages,
  separator,
  revealDelay = 0,
}) {
  return (
    <DetailSection
      size="lg"
      title={conversations?.title}
      subtitle={conversations?.subtitle}
      action={<PanelLink link={conversations?.link} />}
      revealDelay={revealDelay}
    >
      <StaggerList items={messages} revealDelay={revealDelay} className="gap-3">
        {(message, delay) => (
          <MessageRow
            key={message?.id}
            message={message}
            separator={separator}
            revealDelay={delay}
          />
        )}
      </StaggerList>
    </DetailSection>
  );
}
