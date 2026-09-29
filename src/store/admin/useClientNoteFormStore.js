import { clientDetailData } from "@/data/admin/client-detail.data";
import {
  clientNoteDefaultValues,
  clientNoteSchema,
} from "@/schemas/clients/client-note.schema";
import { createFormStore } from "@/store/createFormStore";

/**
 * The note composer on a client's Support Instructions tab — Figma 202:30951.
 * Notes aren't stored yet, so `submitAndClose` validates, says so and clears
 * the box rather than pretending the note was saved.
 */
export const useClientNoteFormStore = createFormStore({
  schema: clientNoteSchema,
  defaultValues: clientNoteDefaultValues,
  notFunctional: {
    message: clientDetailData?.notes?.notFunctionalMessage,
    description: clientDetailData?.notes?.notFunctionalDescription,
  },
  extend: () => ({ content: clientDetailData?.notes }),
});
