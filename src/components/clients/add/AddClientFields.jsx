"use client";

import FormSection from "@/components/forms/FormSection";
import StoreField from "@/components/forms/StoreField";
import StoreSelect from "@/components/forms/StoreSelect";
import Reveal from "@/components/motion/Reveal";
import { revealDelayAt } from "@/lib/motion";
import { useAddClientFormStore } from "@/store/admin/useAddClientFormStore";

/**
 * The add-client form body — Figma 202:31069: business information, the
 * primary contact (name and phone side by side from `sm`), the assignment,
 * then the support notes. Each block reveals a step after the one above.
 */
export default function AddClientFields() {
  const content = useAddClientFormStore((state) => state.content);
  const store = useAddClientFormStore;
  const fields = content?.fields;
  const selects = content?.selects;

  return (
    <>
      <FormSection
        title={content?.sections?.business}
        revealDelay={revealDelayAt(0, 0)}
      >
        <StoreField useStore={store} field={fields?.businessName} />
        <StoreSelect useStore={store} select={selects?.businessType} />
        <StoreField useStore={store} field={fields?.address} />
      </FormSection>

      <FormSection
        title={content?.sections?.contact}
        revealDelay={revealDelayAt(0, 1)}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StoreField useStore={store} field={fields?.contactName} />
          <StoreField useStore={store} field={fields?.phone} />
        </div>
        <StoreField useStore={store} field={fields?.email} />
      </FormSection>

      <FormSection
        title={content?.sections?.assignment}
        revealDelay={revealDelayAt(0, 2)}
      >
        <StoreSelect useStore={store} select={selects?.assignedAgent} />
        <StoreSelect useStore={store} select={selects?.status} />
      </FormSection>

      <Reveal delay={revealDelayAt(0, 3)}>
        <StoreField useStore={store} field={fields?.notes} />
      </Reveal>
    </>
  );
}
