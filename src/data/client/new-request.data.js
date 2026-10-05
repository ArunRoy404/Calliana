import {
  REQUEST_CATEGORIES,
  REQUEST_URGENCIES,
} from "@/data/client/requests.data";

/**
 * "Submit New Request to Secretary Desk" — the drawer the client requests
 * list's "New Instruction Request" opens. Field `name`s match the keys in
 * `src/schemas/client/new-request.schema.js`; the category and urgency
 * choices are the list's own (rule 0).
 */
export const newRequestData = {
  title: "Submit New Request to Secretary Desk",
  subtitle:
    "Your assigned operators will review and acknowledge this update immediately",

  fields: {
    title: {
      name: "title",
      label: "REQUEST TITLE",
      type: "text",
      placeholder: "e.g. Schedule follow-up call with Dr. Rodríguez",
    },
    instructions: {
      name: "instructions",
      label: "DETAILED INSTRUCTION FOR SECRETARY",
      type: "textarea",
      placeholder:
        "Any special handling instructions for agents when calling this client…",
    },
  },

  selects: {
    category: {
      name: "category",
      label: "REQUEST CATEGORY",
      options: REQUEST_CATEGORIES.filter(
        (category) => category?.requestable,
      ).map(({ value, label }) => ({ value, label })),
    },
    urgency: {
      name: "urgency",
      label: "URGENCY",
      options: REQUEST_URGENCIES.map(({ value, formLabel }) => ({
        value,
        label: formLabel,
      })),
    },
  },

  /** No required-fields note: Cancel and Submit Request sit at the right. */
  footer: {
    cancelLabel: "Cancel",
    submitLabel: "Submit Request",
  },

  notFunctionalMessage: "Requests aren’t wired up yet",
  notFunctionalDescription:
    "The details are valid — your request will reach the secretary team once the backend is connected.",
};
