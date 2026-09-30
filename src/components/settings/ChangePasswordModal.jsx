"use client";

import FormPanelFooter from "@/components/overlays/FormPanelFooter";
import Modal from "@/components/overlays/Modal";
import StoreField from "@/components/forms/StoreField";
import Reveal from "@/components/motion/Reveal";
import { useUrlParams } from "@/hooks/useUrlParams";
import { revealDelayAt } from "@/lib/motion";
import { useChangePasswordFormStore } from "@/store/admin/useChangePasswordFormStore";
import { useSettingsStore } from "@/store/admin/useSettingsStore";

/**
 * "Change Password" — Figma 319:34461: a centred `Modal` (not a side panel —
 * the design shows this one backdrop-centred, rule 30), three password
 * fields, the required-note / Cancel / submit footer `FormPanelFooter`
 * already draws for every other form.
 */
export default function ChangePasswordModal() {
  const params = useUrlParams(useSettingsStore((state) => state.paramsSchema));
  const isOpen = useSettingsStore((state) => state.isChangePasswordOpen(params));
  const setOpen = useSettingsStore((state) => state.setChangePasswordOpen);
  const content = useChangePasswordFormStore((state) => state.content);
  const cancel = useChangePasswordFormStore((state) => state.cancel);
  const submitAndClose = useChangePasswordFormStore((state) => state.submitAndClose);
  const store = useChangePasswordFormStore;

  return (
    <Modal
      open={isOpen}
      onOpenChange={setOpen}
      title={content?.title}
      footer={
        <FormPanelFooter footer={content?.footer} onCancel={cancel} onSubmit={submitAndClose} />
      }
    >
      <Reveal delay={revealDelayAt(0, 0)}>
        <StoreField useStore={store} field={content?.fields?.currentPassword} />
      </Reveal>
      <Reveal delay={revealDelayAt(0, 1)}>
        <StoreField useStore={store} field={content?.fields?.newPassword} />
      </Reveal>
      <Reveal delay={revealDelayAt(0, 2)}>
        <StoreField useStore={store} field={content?.fields?.confirmPassword} />
      </Reveal>
    </Modal>
  );
}
