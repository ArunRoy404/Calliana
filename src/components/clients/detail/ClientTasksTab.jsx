import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import DetailSection from "@/components/cards/DetailSection";
import ClientTaskRow from "@/components/clients/detail/ClientTaskRow";
import StaggerList from "@/components/lists/StaggerList";
import { notFunctionalProps } from "@/lib/notFunctional";

/**
 * Tasks tab — Figma 202:30801: a full-width "Create Task", then the account's
 * follow-ups.
 */
export default function ClientTasksTab({ client, content }) {
  const labels = content?.tasks;

  return (
    <DetailSection
      size="lg"
      action={
        <Button variant="neutral" fullWidth {...notFunctionalProps(content)}>
          <AssetIcon icon={labels?.actionIcon} />
          {labels?.actionLabel}
        </Button>
      }
    >
      <StaggerList items={client?.tasks}>
        {(task, revealDelay) => (
          <ClientTaskRow
            key={task?.id}
            task={task}
            dueIcon={labels?.dueIcon}
            revealDelay={revealDelay}
          />
        )}
      </StaggerList>
    </DetailSection>
  );
}
