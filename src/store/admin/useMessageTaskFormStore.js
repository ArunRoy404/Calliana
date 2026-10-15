import { messageTaskData } from "@/data/admin/message-forms.data";
import {
  messageTaskDefaultValues,
  messageTaskSchema,
} from "@/schemas/messages/message-forms.schema";
import { useMessagesStore } from "@/store/admin/useMessagesStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The inbox's "Create action task" drawer — a follow-up from the open
 * conversation, seeded from it. There is no backend yet, so a valid submit
 * says so and closes.
 */
export const useMessageTaskFormStore = createFormStore({
  content: messageTaskData,
  schema: messageTaskSchema,
  defaultValues: messageTaskDefaultValues,
  closePanel: () => useMessagesStore.getState()?.closeRecordPanel?.("task"),
  fromRecord: (conversation) => ({
    title: conversation?.taskTitle,
    taskType: conversation?.taskType,
    priority: conversation?.taskPriority,
    dueDate: conversation?.taskDueDate,
    dueTime: conversation?.taskDueTime,
    assignee: conversation?.taskAssignee,
    instructions: conversation?.taskInstructions,
  }),
});
