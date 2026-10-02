"use client";

import StoreField from "@/components/forms/StoreField";
import StoreSelect from "@/components/forms/StoreSelect";
import Reveal from "@/components/motion/Reveal";
import { revealDelayAt } from "@/lib/motion";
import { useScheduleAppointmentFormStore } from "@/store/admin/useScheduleAppointmentFormStore";

/**
 * The "Schedule New Appointment" form body: the client account; contact
 * person and phone side by side; date, start and end time in a row of three
 * (real date and time pickers, rule 32); the appointment type; then the
 * clinical / operation notes. Each row reveals a step after the one above.
 */
export default function ScheduleAppointmentFields() {
  const content = useScheduleAppointmentFormStore((state) => state.content);
  const store = useScheduleAppointmentFormStore;
  const fields = content?.fields;

  return (
    <>
      <Reveal delay={revealDelayAt(0, 0)}>
        <StoreSelect useStore={store} select={content?.selects?.client} />
      </Reveal>

      <Reveal
        delay={revealDelayAt(0, 1)}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <StoreField useStore={store} field={fields?.contactPerson} />
        <StoreField useStore={store} field={fields?.contactPhone} />
      </Reveal>

      <Reveal
        delay={revealDelayAt(0, 2)}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <StoreField useStore={store} field={fields?.date} />
        <StoreField useStore={store} field={fields?.startTime} />
        <StoreField useStore={store} field={fields?.endTime} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 3)}>
        <StoreSelect useStore={store} select={content?.selects?.type} />
      </Reveal>

      <Reveal delay={revealDelayAt(0, 4)}>
        <StoreField useStore={store} field={fields?.notes} />
      </Reveal>
    </>
  );
}
