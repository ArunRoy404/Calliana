import { agentsData } from "@/data/admin/agents.data";
import {
  CLIENT_CATEGORIES,
  CLIENT_STATUS_OPTIONS,
} from "@/data/admin/clients.data";

/**
 * "Add new client account" side panel — Figma 202:31067.
 *
 * Field `name`s match the keys in `src/schemas/clients/add-client.schema.js`.
 * The business types and statuses are the same lists the clients table
 * filters by, and the agents are the directory's own, so a new client can
 * only be given values the rest of the app understands.
 */
export const addClientData = {
  title: "ADD NEW CLIENT ACCOUNT",
  subtitle: "Register a business or clinic to the CTI routing directory",

  sections: {
    business: "BUSINESS INFORMATION*",
    contact: "PRIMARY CONTACT*",
    assignment: "ASSIGNMENT*",
  },

  fields: {
    businessName: {
      name: "businessName",
      label: "COMPANY / BUSINESS NAME",
      autoComplete: "organization",
      placeholder: "e.g. Laura Alegre Clinic",
    },
    address: {
      name: "address",
      label: "BUSINESS ADDRESS",
      autoComplete: "street-address",
      placeholder: "Street, City, Country",
    },
    contactName: {
      name: "contactName",
      label: "CONTACT NAME",
      autoComplete: "name",
      placeholder: "e.g. DR. HELENA VIDAL",
    },
    phone: {
      name: "phone",
      label: "PHONE",
      type: "tel",
      autoComplete: "tel",
      placeholder: "+34 600 000 000 000",
    },
    email: {
      name: "email",
      label: "EMAIL",
      type: "email",
      autoComplete: "email",
      placeholder: "contact@gmail.com",
    },
    notes: {
      name: "notes",
      label: "Support Instructions / Notes",
      type: "textarea",
      rows: 4,
      placeholder:
        "Any special handling instructions for agents when calling this client…",
    },
  },

  selects: {
    businessType: {
      name: "businessType",
      label: "BUSINESS TYPE",
      options: CLIENT_CATEGORIES,
    },
    assignedAgent: {
      name: "assignedAgent",
      label: "ASSIGNED AGENT",
      placeholder: "Select Agent…",
      options: agentsData?.rows?.map((agent) => ({
        value: agent?.id,
        label: agent?.name,
      })),
    },
    status: {
      name: "status",
      label: "INITIAL STATUS",
      options: CLIENT_STATUS_OPTIONS,
    },
  },

  footer: {
    requiredMark: "*",
    requiredNote: "Required fields",
    cancelLabel: "Cancel",
    submitLabel: "Save Client Account",
  },

  notFunctionalMessage: "Client accounts aren’t saved yet",
  notFunctionalDescription:
    "The account will be created once the backend is connected.",
};
