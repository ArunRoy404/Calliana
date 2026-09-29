"use client";

import AddAgentFields from "@/components/agents/add/AddAgentFields";
import FormPanel from "@/components/overlays/FormPanel";
import { useAddAgentFormStore } from "@/store/admin/useAddAgentFormStore";
import { useAgentsStore } from "@/store/admin/useAgentsStore";

/** "Add new agent account" — Figma 198:32312, on the shared `FormPanel`. */
export default function AddAgentPanel() {
  return (
    <FormPanel useListStore={useAgentsStore} useFormStore={useAddAgentFormStore}>
      <AddAgentFields />
    </FormPanel>
  );
}
