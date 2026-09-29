import TaskRow from "@/components/agents/detail/TaskRow";
import { nestedRevealDelayAt } from "@/lib/motion";

/** Tasks tab — Figma 199:42926: the agent's open follow-ups. */
export default function AgentTasksTab({ agent }) {
  return (
    <ul className="flex flex-col gap-4">
      {agent?.tasks?.map((task, index) => (
        <TaskRow
          key={task?.id}
          task={task}
          revealDelay={nestedRevealDelayAt(0, index)}
        />
      ))}
    </ul>
  );
}
