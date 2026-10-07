import { clientDetailData } from "@/data/admin/client-detail.data";
import { CLIENT_STATUS_FILTER, clientsData } from "@/data/admin/clients.data";

/**
 * The agent workspace's Client Accounts — built from the design screenshots
 * (the Figma node was not reachable). The same clients list and client page
 * as the admin's (`clientsData`, `clientDetailData`: rows, columns, card,
 * tabs and the sample record), not a copy. What differs is the agent's:
 * there is no "Add Client Account" (agents do not create accounts), the
 * category filter names each account's practice the way the agent's
 * dropdown does, the page's actions drop "Edit Client", and every link
 * stays inside `/agent`.
 */

/** Where "View Account" goes; the store fills `{id}` per row. */
export const AGENT_CLIENT_DETAIL_HREF = "/agent/clients/{id}";

export const agentClientsData = {
  ...clientsData,
  addAction: undefined,

  filters: [
    {
      param: "category",
      field: "category",
      label: "Filter by category",
      allValue: "all",
      options: [
        { value: "all", label: "All Categories" },
        { value: "medical", label: "Medical & Dermatology" },
        { value: "dental", label: "Dental Practice" },
        { value: "finance", label: "Financial Advisory" },
        { value: "legal", label: "Legal Consultancy" },
      ],
    },
    CLIENT_STATUS_FILTER,
  ],
};

/**
 * The agent's own links on a client's page, layered over
 * `agentClientDetailData` by the agent's clients store: "Message" opens the
 * client's latest conversation in the agent's inbox (the store fills
 * `{conversation}`; a client with none lands on the inbox), and both
 * "Create Task" buttons (the header's and the Tasks tab's) open the agent's
 * Task & Follow-ups with its create drawer. Schedule Appointment has no
 * agent page yet, so it stays not-wired-up.
 */
export const AGENT_CLIENT_DETAIL_LINKS = {
  actions: {
    message: {
      hrefTemplate: "/agent/messages?conversation={conversation}",
      fallbackHref: "/agent/messages",
    },
    task: { href: "/agent/tasks?panel=add" },
  },
  tasks: { actionHref: "/agent/tasks?panel=add" },
};

export const agentClientDetailData = {
  ...clientDetailData,
  breadcrumb: [
    { id: "clients", label: "CLIENTS", href: "/agent/clients" },
    { id: "detail", label: "CLIENT DETAILS" },
  ],
  back: { label: "Back to clients", href: "/agent/clients" },
  actions: clientDetailData?.actions?.filter((action) => action?.id !== "edit"),
};
