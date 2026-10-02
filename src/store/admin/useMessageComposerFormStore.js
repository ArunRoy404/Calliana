import { messagesData } from "@/data/admin/messages.data";
import {
  messageComposerDefaultValues,
  messageComposerSchema,
} from "@/schemas/messages/message-composer.schema";
import { createFormStore } from "@/store/createFormStore";

/**
 * The inbox's reply box — Figma 167:51527. There is no SMS gateway yet, so a
 * valid send says so and clears the box rather than pretending the message
 * went out (rule 23).
 */
export const useMessageComposerFormStore = createFormStore({
  schema: messageComposerSchema,
  defaultValues: messageComposerDefaultValues,
  notFunctional: {
    message: messagesData?.composer?.notFunctionalMessage,
    description: messagesData?.composer?.notFunctionalDescription,
  },
  extend: () => ({ content: messagesData?.composer }),
});
