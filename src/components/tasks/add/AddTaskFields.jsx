"use client";

import StoreField from "@/components/forms/StoreField";
import StoreSelect from "@/components/forms/StoreSelect";
import Reveal from "@/components/motion/Reveal";
import { revealDelayAt } from "@/lib/motion";
import { useAddTaskFormStore } from "@/store/admin/useAddTaskFormStore";

/**
 * The create-task form body — Figma 208:42777: title, client, task type and
 * priority side by side, date and due time side by side, then the detailed
 * description. Each block reveals a step after the one above it.
 */
export default function AddTaskFields() {
  const content = useAddTaskFormStore((state) => state.content);
  const store = useAddTaskFormStore;

  return (
    <>
      <Reveal delay={revealDelayAt(0, 0)}>
        <StoreField useStore={store} field={content?.fields?.title} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 1)}>
        <StoreSelect useStore={store} select={content?.selects?.client} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 2)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StoreSelect useStore={store} select={content?.selects?.taskType} />
        <StoreSelect useStore={store} select={content?.selects?.priority} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 3)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StoreField useStore={store} field={content?.dateField} />
        <StoreField useStore={store} field={content?.dueTimeField} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 4)}>
        <StoreField useStore={store} field={content?.descriptionField} />
      </Reveal>
    </>
  );
}
