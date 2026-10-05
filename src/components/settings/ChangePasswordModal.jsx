"use client";

import FormPanelFooter from "@/components/overlays/FormPanelFooter";
import Modal from "@/components/overlays/Modal";
import StoreField from "@/components/forms/StoreField";
import Reveal from "@/components/motion/Reveal";
import { useStoreParams } from "@/hooks/useUrlParams";
import { revealDelayAt } from "@/lib/motion";
import { useChangePasswordFormStore } from "@/store/admin/useChangePasswordFormStore";
import { useSettingsStore } from "@/store/admin/useSettingsStore";

/**
 * "Change Password" — Figma 319:34461: a centred `Modal` (not a side panel —
 * the design shows this one backdrop-centred, rule 30): the title beside
 * the circled close button, three password fields with their reveal
 * toggles, then Cancel / Update Password from the `FormPanelFooter` every
 * form shares (no required-fields note in this design). Opened from
 * Settings → Change Password, at `?modal=change-password`.
 *
 * `useStore` is the settings page it opens from — any `createSettingsStore`
 * store (the admin's by default, the client portal's too); the form itself
 * is the one shared password form.
 */
export default function ChangePasswordModal({ useStore = useSettingsStore }) {
  const params = useStoreParams(useStore);
  const isOpen = useStore((state) => state.isChangePasswordOpen(params));
  const setOpen = useStore((state) => state.setChangePasswordOpen);
  const content = useChangePasswordFormStore((state) => state.content);
  const cancel = useChangePasswordFormStore((state) => state.cancel);
  const submitAndClose = useChangePasswordFormStore(
    (state) => state.submitAndClose,
  );
  const store = useChangePasswordFormStore;

  return (
    <Modal
      open={isOpen}
      onOpenChange={setOpen}
      title={content?.title}
      footer={
        <FormPanelFooter
          footer={content?.footer}
          onCancel={cancel}
          onSubmit={submitAndClose}
        />
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
