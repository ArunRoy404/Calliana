"use client";

import StoreField from "@/components/forms/StoreField";
import StoreSelect from "@/components/forms/StoreSelect";
import MultiSelectChips from "@/components/forms/MultiSelectChips";
import MultiSelectList from "@/components/forms/MultiSelectList";
import Reveal from "@/components/motion/Reveal";
import { revealDelayAt } from "@/lib/motion";
import { useAddRoutingQueueFormStore } from "@/store/admin/useAddRoutingQueueFormStore";

/**
 * The create-queue form body — Figma 381:38131: name & extension, the
 * description, strategy and fallback rows, then who and which accounts this
 * queue serves. Each block reveals a step after the one above it.
 */
export default function AddRoutingQueueFields() {
  const content = useAddRoutingQueueFormStore((state) => state.content);
  const operators = useAddRoutingQueueFormStore((state) => state.values?.operators);
  const clients = useAddRoutingQueueFormStore((state) => state.values?.clients);
  const setField = useAddRoutingQueueFormStore((state) => state.setField);
  const store = useAddRoutingQueueFormStore;

  return (
    <>
      <Reveal delay={revealDelayAt(0, 0)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StoreField useStore={store} field={content?.fields?.name} />
        <StoreField useStore={store} field={content?.fields?.extension} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 1)}>
        <StoreField useStore={store} field={content?.fields?.description} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 2)} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StoreSelect useStore={store} select={content?.selects?.distributionStrategy} />
        <StoreSelect useStore={store} select={content?.selects?.queuePriority} />
        <StoreSelect useStore={store} select={content?.selects?.maxSla} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 3)} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StoreSelect useStore={store} select={content?.selects?.ringTimeout} />
        <StoreSelect useStore={store} select={content?.selects?.primaryFallback} />
        <StoreSelect useStore={store} select={content?.selects?.secondFallback} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 4)}>
        <MultiSelectList
          label={content?.operators?.label}
          helperText={content?.operators?.helperText}
          options={content?.operators?.options}
          value={operators}
          onChange={(next) => setField?.("operators", next)}
        />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 5)}>
        <MultiSelectChips
          label={content?.clients?.label}
          helperText={content?.clients?.helperText}
          options={content?.clients?.options}
          value={clients}
          onChange={(next) => setField?.("clients", next)}
        />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 6)}>
        <StoreField useStore={store} field={content?.fields?.ivrGreeting} />
      </Reveal>
    </>
  );
}
