"use client";

import AddAgentSelect from "@/components/agents/add/AddAgentSelect";
import NoticeCard from "@/components/cards/NoticeCard";
import FormField from "@/components/forms/FormField";
import FieldShell from "@/components/forms/FieldShell";
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
  const phone = useAddAgentFormStore((state) => state.values?.phone);
  const email = useAddAgentFormStore((state) => state.values?.email);
  const hours = useAddAgentFormStore((state) => state.values?.hours);
  const phoneError = useAddAgentFormStore(
    (state) => state.visibleErrors?.phone,
  );
  const emailError = useAddAgentFormStore(
    (state) => state.visibleErrors?.email,
  );
  const hoursError = useAddAgentFormStore(
    (state) => state.visibleErrors?.hours,
  );
  const setField = useAddAgentFormStore((state) => state.setField);
  const touchField = useAddAgentFormStore((state) => state.touchField);
  const setHour = useAddAgentFormStore((state) => state.setHour);

  const hoursConfig = content?.workingHours;

  return (
    <>
      <Reveal delay={revealDelayAt(0, 0)}>
        <FormField
          field={content?.fields?.phone}
          value={phone}
          error={phoneError}
          onChange={setField}
          onBlur={touchField}
        />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 1)}>
        <FormField
          field={content?.fields?.email}
          value={email}
          error={emailError}
          onChange={setField}
          onBlur={touchField}
        />
      </Reveal>

      <Reveal
        as="section"
        delay={revealDelayAt(0, 2)}
        className="flex flex-col gap-6"
      >
        <h3 className="text-body-lg text-text-secondary">
          {content?.sections?.access}
        </h3>
        <AddAgentSelect select={content?.selects?.role} />
        <AddAgentSelect select={content?.selects?.availability} />
      </Reveal>

      <Reveal
        as="section"
        delay={revealDelayAt(0, 3)}
        className="flex flex-col gap-6"
      >
        <h3 className="text-body-lg text-text-secondary">
          {content?.sections?.assignment}
        </h3>
        <div className="flex flex-col gap-4">
          <AddAgentSelect select={content?.selects?.client} />
          <AddAgentSelect select={content?.selects?.queue} />

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
        </div>
      </Reveal>

      <NoticeCard
        icon={content?.notice?.icon}
        title={content?.notice?.title}
        description={content?.notice?.description}
        revealDelay={revealDelayAt(0, 4)}
      />
    </>
  );
}
