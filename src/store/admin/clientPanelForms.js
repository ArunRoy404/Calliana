import { useAddContactFormStore } from "@/store/admin/useAddContactFormStore";
import { useCallClientFormStore } from "@/store/admin/useCallClientFormStore";
import { useEditClientFormStore } from "@/store/admin/useEditClientFormStore";
import { useScheduleClientAppointmentFormStore } from "@/store/admin/useScheduleClientAppointmentFormStore";

/**
 * The drawers the admin's client page opens over itself, by their
 * `?panel=` id — each a record form store `RecordFormPanels` draws. The ids
 * match the `panel` / `addPanel` in `ADMIN_CLIENT_DETAIL_LINKS`.
 */
export const ADMIN_CLIENT_PANEL_FORMS = {
  call: useCallClientFormStore,
  schedule: useScheduleClientAppointmentFormStore,
  edit: useEditClientFormStore,
  contact: useAddContactFormStore,
};
