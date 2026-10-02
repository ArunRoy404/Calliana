"use client";

import ScheduleAppointmentFields from "@/components/appointments/ScheduleAppointmentFields";
import FormPanel from "@/components/overlays/FormPanel";
import { useAppointmentsStore } from "@/store/admin/useAppointmentsStore";
import { useScheduleAppointmentFormStore } from "@/store/admin/useScheduleAppointmentFormStore";

/**
 * "Schedule New Appointment" — the calendar toolbar's "New Appointment"
 * action, on the shared `FormPanel` (a right-edge drawer, `?panel=add`).
 */
export default function ScheduleAppointmentPanel() {
  return (
    <FormPanel
      useListStore={useAppointmentsStore}
      useFormStore={useScheduleAppointmentFormStore}
    >
      <ScheduleAppointmentFields />
    </FormPanel>
  );
}
