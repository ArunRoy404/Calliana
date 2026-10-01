import { connection } from "next/server";

import TasksDirectory from "@/app/(dashboard)/admin/tasks/_components/TasksDirectory";

export const metadata = {
  title: "Task & Follow-ups · Calliana",
  description: "Track client commitments and triage follow-ups.",
};

/**
 * Task & Follow-ups — Figma 208:42520. The shell lives in the layout.
 *
 * The page's state lives in its URL, so a shared link
 * (`?view=overdue&priority=urgent&page=2`) arrives already filtered and paged.
 */
export default async function TasksPage() {
  await connection();
  return <TasksDirectory />;
}
