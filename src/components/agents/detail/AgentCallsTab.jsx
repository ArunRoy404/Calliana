import CallLogRow from "@/components/agents/detail/CallLogRow";
import StaggerList from "@/components/lists/StaggerList";

/** Calls tab — Figma 199:42058: the agent's recent calls, newest first. */
export default function AgentCallsTab({ agent }) {
  return (
    <StaggerList items={agent?.calls}>
      {(call, revealDelay) => (
        <CallLogRow key={call?.id} call={call} revealDelay={revealDelay} />
      )}
    </StaggerList>
  );
}
