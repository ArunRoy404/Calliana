import CallLogRow from "@/components/agents/detail/CallLogRow";
import { nestedRevealDelayAt } from "@/lib/motion";

/** Calls tab — Figma 199:42058: the agent's recent calls, newest first. */
export default function AgentCallsTab({ agent }) {
  return (
    <ul className="flex flex-col gap-4">
      {agent?.calls?.map((call, index) => (
        <CallLogRow
          key={call?.id}
          call={call}
          revealDelay={nestedRevealDelayAt(0, index)}
        />
      ))}
    </ul>
  );
}
