import { useFollowUpCallFormStore } from "@/store/admin/useFollowUpCallFormStore";
import { useRescheduleAppointmentFormStore } from "@/store/admin/useRescheduleAppointmentFormStore";

/**
 * The drawers the admin opens over one appointment, by id — each a record
 * form store `RecordFormPanels` draws. The ids match the details drawer's
 * footer `panel`s and `APPOINTMENT_RECORD_PANEL_KEYS`. Kept out of
 * `useAppointmentsStore`, which other portals' dashboard stores import.
 */
export const ADMIN_APPOINTMENT_PANEL_FORMS = {
  followUp: useFollowUpCallFormStore,
  reschedule: useRescheduleAppointmentFormStore,
};
