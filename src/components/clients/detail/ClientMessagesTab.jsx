import DetailSection from "@/components/cards/DetailSection";
import MessageRow from "@/components/clients/detail/MessageRow";
import StaggerList from "@/components/lists/StaggerList";

/** Messages tab — Figma 202:30620: the account's threads, newest first. */
export default function ClientMessagesTab({ client, content }) {
  return (
    <DetailSection size="lg" title={content?.messages?.title}>
      <StaggerList items={client?.messages} className="gap-2">
        {(message, revealDelay) => (
          <MessageRow
            key={message?.id}
            message={message}
            separator={content?.labels?.separator}
            revealDelay={revealDelay}
          />
        )}
      </StaggerList>
    </DetailSection>
  );
}
