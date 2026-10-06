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

export const agentClientDetailData = {
  ...clientDetailData,
  breadcrumb: [
    { id: "clients", label: "CLIENTS", href: "/agent/clients" },
    { id: "detail", label: "CLIENT DETAILS" },
  ],
  back: { label: "Back to clients", href: "/agent/clients" },
  actions: clientDetailData?.actions?.filter((action) => action?.id !== "edit"),
};
