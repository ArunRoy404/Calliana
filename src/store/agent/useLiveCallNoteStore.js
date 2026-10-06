import { liveCallData } from "@/data/agent/live-call.data";
import { fillTemplate } from "@/lib/fillTemplate";
import {
  liveCallNoteDefaultValues,
  liveCallNoteSchema,
} from "@/schemas/agent/live-call-note.schema";
import { createFormStore } from "@/store/createFormStore";

const NOTE = liveCallData?.note;
const MAX = NOTE?.maxLength ?? 2000;

/**
 * The live call's wrap-up form — the note written while the caller speaks,
 * its categories, the professional and the outcome (`liveCallNoteSchema`).
 * There is no backend yet, so "Wrap Up & Save Call" validates, says the
 * save is not wired up, and starts a fresh note — it never pretends the
 * call was saved.
 *
 * `insertText` adds a canned response or a previous call's message to the
 * end of the note on its own line, never past the character limit;
 * `countLabel` is the "Characters: 98/2000" line under the editor.
 */
export const useLiveCallNoteStore = createFormStore({
  schema: liveCallNoteSchema,
  defaultValues: liveCallNoteDefaultValues,
  notFunctional: {
    message: liveCallData?.notFunctionalMessage,
    description: liveCallData?.notFunctionalDescription,
  },
  extend: (set, get) => ({
    content: liveCallData,

    insertText: (text) =>
      get()?.setField?.("note", (previous = "") =>
        (previous ? `${previous}\n${text}` : text).slice(0, MAX),
      ),

    countLabel: (note = "") =>
      fillTemplate(NOTE?.countTemplate, { count: note.length, max: MAX }),
  }),
});
