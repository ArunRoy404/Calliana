"use client";

import AddClientFields from "@/components/clients/add/AddClientFields";
import FormPanel from "@/components/overlays/FormPanel";
import { useAddClientFormStore } from "@/store/admin/useAddClientFormStore";
import { useClientsStore } from "@/store/admin/useClientsStore";

/** "Add new client account" — Figma 202:31067, on the shared `FormPanel`. */
export default function AddClientPanel() {
  return (
    <FormPanel
      useListStore={useClientsStore}
      useFormStore={useAddClientFormStore}
    >
      <AddClientFields />
    </FormPanel>
  );
}
