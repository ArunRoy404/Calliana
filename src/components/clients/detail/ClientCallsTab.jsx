import DetailSection from "@/components/cards/DetailSection";
import AccountCallRow from "@/components/clients/detail/AccountCallRow";
import StaggerList from "@/components/lists/StaggerList";

/** Calls tab — Figma 202:30518: every call on the account, newest first. */
export default function ClientCallsTab({ client, content }) {
  return (
    <DetailSection size="lg" title={content?.calls?.title}>
      <StaggerList items={client?.calls}>
        {(call, revealDelay) => (
          <AccountCallRow key={call?.id} call={call} revealDelay={revealDelay} />
        )}
      </StaggerList>
    </DetailSection>
  );
}
