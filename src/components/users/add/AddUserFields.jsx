"use client";

import NoticeCard from "@/components/cards/NoticeCard";
import FormSection from "@/components/forms/FormSection";
import StoreField from "@/components/forms/StoreField";
import StoreSelect from "@/components/forms/StoreSelect";
import Reveal from "@/components/motion/Reveal";
import { revealDelayAt } from "@/lib/motion";
import { useAddUserFormStore } from "@/store/admin/useAddUserFormStore";

/** The add-user form body: contact fields, then role & access, then the invite notice. */
export default function AddUserFields() {
  const content = useAddUserFormStore((state) => state.content);
  const store = useAddUserFormStore;

  return (
    <>
      <Reveal delay={revealDelayAt(0, 0)}>
        <StoreField useStore={store} field={content?.fields?.name} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 1)}>
        <StoreField useStore={store} field={content?.fields?.email} />
      </Reveal>

      <FormSection title={content?.sections?.access} revealDelay={revealDelayAt(0, 2)}>
        <StoreSelect useStore={store} select={content?.selects?.role} />
        <StoreSelect useStore={store} select={content?.selects?.status} />
      </FormSection>

      <NoticeCard
        icon={content?.notice?.icon}
        title={content?.notice?.title}
        description={content?.notice?.description}
        revealDelay={revealDelayAt(0, 3)}
      />
    </>
  );
}
