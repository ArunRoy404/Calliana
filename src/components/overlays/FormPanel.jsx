"use client";

import FormPanelFooter from "@/components/overlays/FormPanelFooter";
import SidePanel from "@/components/overlays/SidePanel";
import { useStoreParams } from "@/hooks/useUrlParams";

/**
 * An add drawer for a list page — Figma 198:32312 (agent) and 202:31067
 * (client): the shared `SidePanel`, the form's fields as `children`, and the
 * required-note / Cancel / submit footer.
 *
 * Whether it is open is the list's `?panel=add`, read through `useListStore`
 * (a `createTableStore` store). The copy and the cancel / submit actions come
 * from `useFormStore` (a `createFormStore` store made with `closePanel`).
 */
export default function FormPanel({ useListStore, useFormStore, children }) {
  const params = useStoreParams(useListStore);
  const isOpen = useListStore((state) => state.isAddOpen(params));
  const setOpen = useListStore((state) => state.setAddOpen);
  const content = useFormStore((state) => state.content);
  const cancel = useFormStore((state) => state.cancel);
  const submitAndClose = useFormStore((state) => state.submitAndClose);

  return (
    <SidePanel
      open={isOpen}
      onOpenChange={setOpen}
      title={content?.title}
      subtitle={content?.subtitle}
      footer={
        <FormPanelFooter
          footer={content?.footer}
          onCancel={cancel}
          onSubmit={submitAndClose}
        />
      }
    >
      {children}
    </SidePanel>
  );
}
