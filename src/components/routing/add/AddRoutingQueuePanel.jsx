"use client";

import AddRoutingQueueFields from "@/components/routing/add/AddRoutingQueueFields";
import FormPanel from "@/components/overlays/FormPanel";
import { useAddRoutingQueueFormStore } from "@/store/admin/useAddRoutingQueueFormStore";
import { useRoutingStore } from "@/store/admin/useRoutingStore";

/** "Create Telephony PBX Routing Queue" — Figma 381:38131, on the shared `FormPanel`. */
export default function AddRoutingQueuePanel() {
  return (
    <FormPanel useListStore={useRoutingStore} useFormStore={useAddRoutingQueueFormStore}>
      <AddRoutingQueueFields />
    </FormPanel>
  );
}
