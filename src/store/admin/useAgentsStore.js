import { agentDetailData } from "@/data/admin/agent-detail.data";
import { agentsData } from "@/data/admin/agents.data";
import {
  AGENTS_PANELS,
  AGENTS_PARAM_KEYS,
  agentsParamsSchema,
} from "@/schemas/agents/agents-params.schema";
import { createTableStore } from "@/store/createTableStore";

const { agent: AGENT, tab: TAB, panel: PANEL } = AGENTS_PARAM_KEYS;

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

/** Built once per agent, so a selector returns the same object every time. */
const agentDetails = new Map(
  agentsData?.rows?.map((row) => [row?.id, buildAgentDetail(row)]) ?? [],
);

/**
 * The agents directory — its dummy content plus the search, availability
 * filter and paging the table runs on (shared with every other list screen
 * through `createTableStore`), and the actions for its two side panels:
 * adding an agent, and one agent's detail.
 *
 * Like the list, the panels live in the URL (`agentsParamsSchema`):
 * `?agent=<id>&tab=<tab>` for an agent, `?panel=add` for the add drawer. So a
 * link opens the page with that agent on that tab, and Back / Forward move
 * through it. Opening one panel closes the other.
 *
 * `setAddOpen` / `setDetailOpen` take the panel's own open flag, so they plug
 * straight into `SidePanel`'s `onOpenChange`.
 */
export const useAgentsStore = createTableStore({
  content: agentsData,
  rows: agentsData?.rows,
  searchFields: ["name", "extension", "email"],
  filterField: "availability",
  filterParam: AGENTS_PARAM_KEYS.filter,
  allValue: agentsData?.filter?.allValue,
  paramsSchema: agentsParamsSchema,
  summaryTemplate: agentsData?.pagination?.summary,
  extend: (set, get) => ({
    detailContent: agentDetailData,

    /*
     * Readers over the URL's params (from `useStoreParams`), so components
     * never need to know the key names. An unknown `?agent=` id reads as no
     * agent, and the panel stays closed.
     */
    isAddOpen: (params) => params?.[PANEL] === AGENTS_PANELS.add,
    selectedAgent: (params) => agentDetails.get(params?.[AGENT]) ?? null,
    detailTab: (params) => params?.[TAB],

    openAdd: () =>
      get()?.setParams?.({
        [PANEL]: AGENTS_PANELS.add,
        [AGENT]: null,
        [TAB]: null,
      }),
    setAddOpen: (open) =>
      get()?.setParams?.({ [PANEL]: open ? AGENTS_PANELS.add : null }),

    /** A newly opened agent always starts on the first tab. */
    openAgent: (row) =>
      get()?.setParams?.({ [AGENT]: row?.id, [TAB]: null, [PANEL]: null }),
    setDetailOpen: (open) => {
      if (!open) get()?.setParams?.({ [AGENT]: null, [TAB]: null });
    },
    setDetailTab: (tab) => get()?.setParams?.({ [TAB]: tab }),
  }),
});
