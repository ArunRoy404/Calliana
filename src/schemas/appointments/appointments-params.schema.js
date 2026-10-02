import { z } from "zod";

import { appointmentsData } from "@/data/admin/appointments.data";
import {
  ADD_PANEL,
  enumParam,
  optionalEnumParam,
  optionalIdParam,
  optionalIsoDateParam,
  PANEL_PARAM,
} from "@/schemas/url/list-params.schema";

/** The calendar's URL keys. */
export const APPOINTMENTS_PARAM_KEYS = {
  view: "view",
  type: "type",
  date: "date",
  appointment: "appointment",
  panel: PANEL_PARAM,
};

/**
 * Everything the calendar keeps in its URL —
 * `/admin/appointments?view=week&type=clinical&date=2026-08-13`: the range
 * (Today / This Week / This Month), the event-type filter and the day the
 * range is anchored on — plus the open drawer: `&appointment=<id>` for an
 * event's details, `&panel=add` for "Schedule New Appointment". Every field `.catch()`es its default, so a stale or
 * hand-edited link falls back to today's full schedule; the resting state
 * (today, all types) is the bare path.
 */
export const appointmentsParamsSchema = z.object({
  [APPOINTMENTS_PARAM_KEYS.view]: enumParam(
    appointmentsData?.views?.map((view) => view?.value),
  ),
  [APPOINTMENTS_PARAM_KEYS.type]: enumParam(
    appointmentsData?.eventTypes?.options?.map((option) => option?.value),
  ),
  [APPOINTMENTS_PARAM_KEYS.date]: optionalIsoDateParam,
  [APPOINTMENTS_PARAM_KEYS.appointment]: optionalIdParam,
  [APPOINTMENTS_PARAM_KEYS.panel]: optionalEnumParam([ADD_PANEL]),
});
