"use client";

import FormPanelFooter from "@/components/overlays/FormPanelFooter";
import Modal from "@/components/overlays/Modal";
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
 *
 * `header` overrides the default title/subtitle block for a drawer whose
 * header is its own composition (the dialer's status pill and operator
 * line, 202:38997) rather than plain text — same escape hatch `SidePanel`
 * itself offers. `className` is for a genuine per-instance width need (the
 * dialer's keypad-beside-fields layout needs more than the default 700px).
 *
 * `overlay` picks the frame: `panel` (default, a right-edge `SidePanel`) or
 * `modal` (a centred `Modal`, when the design draws the form backdrop-
 * centred — the outbound dialer, rule 30). `variant` is passed to that frame
 * (a modal's `sectioned` look). The open state, copy and actions are the
 * same either way.
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
      variant={variant}
      open={isOpen}
      onOpenChange={setOpen}
      title={content?.title}
      subtitle={content?.subtitle}
      header={header}
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
