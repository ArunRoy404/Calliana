"use client";

import NewRequestFields from "@/components/client/requests/NewRequestFields";
import FormPanel from "@/components/overlays/FormPanel";
import { useClientRequestsStore } from "@/store/client/useClientRequestsStore";
import { useNewRequestFormStore } from "@/store/client/useNewRequestFormStore";

/**
 * "Submit New Request to Secretary Desk" — the requests list's add drawer,
 * on the shared `FormPanel` (`?panel=add`).
 */
export default function NewRequestPanel() {
  return (
    <FormPanel
      useListStore={useClientRequestsStore}
      useFormStore={useNewRequestFormStore}
    >
      <NewRequestFields />
    </FormPanel>
  );
}
