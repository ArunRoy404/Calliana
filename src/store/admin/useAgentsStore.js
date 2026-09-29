import { agentsData } from "@/data/admin/agents.data";
import { createTableStore } from "@/store/createTableStore";

/**
 * The agents directory — its dummy content plus the search, availability
 * filter and paging the table runs on. The machinery is shared with every
 * other list screen through `createTableStore`.
 */
export const useAgentsStore = createTableStore({
  content: agentsData,
  rows: agentsData?.rows,
  searchFields: ["name", "extension", "email"],
  filterField: "availability",
  allValue: agentsData?.filter?.allValue,
  summaryTemplate: agentsData?.pagination?.summary,
});
