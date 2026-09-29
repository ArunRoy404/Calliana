"use client";

import NoticeCard from "@/components/cards/NoticeCard";
import FieldShell from "@/components/forms/FieldShell";
import FormSection from "@/components/forms/FormSection";
import StoreField from "@/components/forms/StoreField";
import StoreSelect from "@/components/forms/StoreSelect";
import TimeRangeField from "@/components/forms/TimeRangeField";
import Reveal from "@/components/motion/Reveal";
import { revealDelayAt } from "@/lib/motion";
import { useAddAgentFormStore } from "@/store/admin/useAddAgentFormStore";

/**
 * The add-agent form body — Figma 198:32313: contact fields, role & access,
 * client assignment with working hours, then the invite notice. Each block
 * reveals a step after the one above it.
 */
export default function AddAgentFields() {
  const content = useAddAgentFormStore((state) => state.content);
  const hours = useAddAgentFormStore((state) => state.values?.hours);
  const hoursError = useAddAgentFormStore(
    (state) => state.visibleErrors?.hours,
  );
  const setHour = useAddAgentFormStore((state) => state.setHour);

  const hoursConfig = content?.workingHours;
  const store = useAddAgentFormStore;

  return (
    <>
      <Reveal delay={revealDelayAt(0, 0)}>
        <StoreField useStore={store} field={content?.fields?.phone} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 1)}>
        <StoreField useStore={store} field={content?.fields?.email} />
      </Reveal>

      <FormSection
        title={content?.sections?.access}
        revealDelay={revealDelayAt(0, 2)}
      >
        <StoreSelect useStore={store} select={content?.selects?.role} />
        <StoreSelect useStore={store} select={content?.selects?.availability} />
      </FormSection>

      <FormSection
        title={content?.sections?.assignment}
        revealDelay={revealDelayAt(0, 3)}
      >
        <StoreSelect useStore={store} select={content?.selects?.client} />
        <StoreSelect useStore={store} select={content?.selects?.queue} />

        <FieldShell label={hoursConfig?.label} error={hoursError}>
          <div className="mt-2.5 flex flex-col gap-4">
            {hoursConfig?.days?.map((day) => (
              <TimeRangeField
                key={day?.id}
                label={day?.label}
                separator={hoursConfig?.separator}
                fromLabel={hoursConfig?.fromLabel}
                toLabel={hoursConfig?.toLabel}
                from={hours?.[day?.id]?.from}
                to={hours?.[day?.id]?.to}
                onChange={(edge, value) => setHour?.(day?.id, edge, value)}
              />
            ))}
          </div>
        </FieldShell>
      </FormSection>

      <NoticeCard
        icon={content?.notice?.icon}
        title={content?.notice?.title}
        description={content?.notice?.description}
        revealDelay={revealDelayAt(0, 4)}
      />
    </>
  );
}
