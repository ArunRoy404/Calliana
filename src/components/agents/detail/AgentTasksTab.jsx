import TaskRow from "@/components/agents/detail/TaskRow";
import StaggerList from "@/components/lists/StaggerList";

/** Tasks tab — Figma 199:42926: the agent's open follow-ups. */
export default function AgentTasksTab({ agent }) {
  return (
    <StaggerList items={agent?.tasks}>
      {(task, revealDelay) => (
        <TaskRow key={task?.id} task={task} revealDelay={revealDelay} />
      )}
    </StaggerList>
  );
}
