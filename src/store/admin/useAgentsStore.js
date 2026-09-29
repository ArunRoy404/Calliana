import { agentDetailData } from "@/data/admin/agent-detail.data";
import { agentsData } from "@/data/admin/agents.data";
import { createTableStore } from "@/store/createTableStore";

/**
 * Overlay one agent's own row (name, contact, live status) on the sample
 * detail record, so each agent's panel reads as theirs until real per-agent
 * data exists.
 */
function buildAgentDetail(row) {
  const sample = agentDetailData?.sample;

  return {
    ...sample,
    id: row?.id,
    name: row?.name,
    fullName: row?.name,
    phone: row?.extension,
    email: row?.email,
    lastActive: row?.lastActive,
    clientCount: row?.assignedClients,
    availability: row?.callState,
    accountStatus: row?.platform,
  };
}

/**
 * The agents directory — its dummy content plus the search, availability
 * filter and paging the table runs on (shared with every other list screen
 * through `createTableStore`), and the state of its two side panels: adding an
 * agent, and one agent's detail.
 *
 * `setAddOpen` / `setDetailOpen` take the panel's own open flag, so they plug
 * straight into `SidePanel`'s `onOpenChange`. Closing the detail panel keeps
 * `selectedAgent`, so the content stays put while the panel slides away.
 */
export const useAgentsStore = createTableStore({
  content: agentsData,
  rows: agentsData?.rows,
  searchFields: ["name", "extension", "email"],
  filterField: "availability",
  allValue: agentsData?.filter?.allValue,
  summaryTemplate: agentsData?.pagination?.summary,
  extend: (set) => ({
    detailContent: agentDetailData,

    isAddOpen: false,
    openAdd: () => set({ isAddOpen: true }),
    setAddOpen: (open) => set({ isAddOpen: Boolean(open) }),

    isDetailOpen: false,
    selectedAgent: null,
    detailTab: agentDetailData?.tabs?.[0]?.id,
    openAgent: (row) =>
      set({
        selectedAgent: buildAgentDetail(row),
        isDetailOpen: true,
        detailTab: agentDetailData?.tabs?.[0]?.id,
      }),
    setDetailOpen: (open) => set({ isDetailOpen: Boolean(open) }),
    setDetailTab: (detailTab) => set({ detailTab }),
  }),
});
