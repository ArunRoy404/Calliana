"use client";

import StoreField from "@/components/forms/StoreField";
import StoreSelect from "@/components/forms/StoreSelect";
import Reveal from "@/components/motion/Reveal";
import { revealDelayAt } from "@/lib/motion";
import { useNewRequestFormStore } from "@/store/client/useNewRequestFormStore";

/**
 * The new-request form body: the request title; category and urgency side
 * by side (stacked on a phone); then the detailed instruction. Each row
 * reveals a step after the one above it.
 */
export default function NewRequestFields() {
  const content = useNewRequestFormStore((state) => state.content);
  const store = useNewRequestFormStore;

  return (
    <>
      <Reveal delay={revealDelayAt(0, 0)}>
        <StoreField useStore={store} field={content?.fields?.title} />
      </Reveal>

      <Reveal
        delay={revealDelayAt(0, 1)}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <StoreSelect useStore={store} select={content?.selects?.category} />
        <StoreSelect useStore={store} select={content?.selects?.urgency} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 2)}>
        <StoreField useStore={store} field={content?.fields?.instructions} />
      </Reveal>
    </>
  );
}
