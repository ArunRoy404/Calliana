import AssignedClientRow from "@/components/agents/detail/AssignedClientRow";
import StaggerList from "@/components/lists/StaggerList";

/**
 * Assigned Clients tab — Figma 199:41309: a count, then one row per client.
 */
export default function AgentClientsTab({ agent, content, notFunctional }) {
  const labels = content?.labels;
  const clients = agent?.clients ?? [];

  return (
    <>
      <p className="text-label-md text-text-tertiary">
        {labels?.clientsCount?.replace("{count}", clients?.length)}
      </p>

      <StaggerList items={clients}>
        {(client, revealDelay) => (
          <AssignedClientRow
            key={client?.id}
            client={client}
            labels={labels}
            notFunctional={notFunctional}
            revealDelay={revealDelay}
          />
        )}
      </StaggerList>
    </>
  );
}
