import AssignedClientRow from "@/components/agents/detail/AssignedClientRow";
import { nestedRevealDelayAt } from "@/lib/motion";

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

      <ul className="flex flex-col gap-4">
        {clients?.map((client, index) => (
          <AssignedClientRow
            key={client?.id}
            client={client}
            labels={labels}
            notFunctional={notFunctional}
            revealDelay={nestedRevealDelayAt(0, index)}
          />
        ))}
      </ul>
    </>
  );
}
