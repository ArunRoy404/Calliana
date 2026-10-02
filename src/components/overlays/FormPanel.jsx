"use client";

import FormPanelFooter from "@/components/overlays/FormPanelFooter";
import Modal from "@/components/overlays/Modal";
import SidePanel from "@/components/overlays/SidePanel";
import { useStoreParams } from "@/hooks/useUrlParams";

/**
 * An add form for a list page — Figma 198:32312 (agent) and 202:31067
 * (client): the form's fields as `children`, and the required-note / Cancel /
 * submit footer.
 *
 * Whether it is open is the list's `?panel=add`, read through `useListStore`
 * (a `createTableStore` store, or any store with `isAddOpen` / `setAddOpen`).
 * The copy and the cancel / submit actions come from `useFormStore` (a
 * `createFormStore` store made with `closePanel`).
 *
 * - `overlay` — `panel` (default), the shared right-edge `SidePanel`; or
 *   `modal`, the centred `Modal`, when the design draws the form
 *   backdrop-centred (the outbound dialer, 202:38997 — rule 30). `variant`
 *   is passed to the `Modal`.
 * - `header` overrides the default title/subtitle block for a form whose
 *   header is its own composition (the dialer's status pill and operator
 *   line) — the same escape hatch `SidePanel` and `Modal` offer.
 * - `className` is for a genuine per-instance width need.
 */
const OVERLAYS = { panel: SidePanel, modal: Modal };

export default function FormPanel({
  useListStore,
  useFormStore,
  overlay = "panel",
  variant,
  header,
  className,
  children,
}) {
  const params = useStoreParams(useListStore);
  const isOpen = useListStore((state) => state.isAddOpen(params));
  const setOpen = useListStore((state) => state.setAddOpen);
  const content = useFormStore((state) => state.content);
  const cancel = useFormStore((state) => state.cancel);
  const submitAndClose = useFormStore((state) => state.submitAndClose);

  const Overlay = OVERLAYS?.[overlay] ?? SidePanel;

  return (
    <Overlay
      open={isOpen}
      onOpenChange={setOpen}
      title={content?.title ?? content?.header?.title}
      subtitle={content?.subtitle}
      header={header}
      variant={variant}
      className={className}
      footer={
        <FormPanelFooter
          footer={content?.footer}
          onCancel={cancel}
          onSubmit={submitAndClose}
        />
      }
    >
      {children}
    </Overlay>
  );
}
