import { create } from "zustand";

import { appointmentsData } from "@/data/admin/appointments.data";
import {
  addDays,
  addMonths,
  daysBetween,
  endOfMonth,
  formatHour,
  formatIsoDate,
  formatTime,
  minutesOf,
  startOfMonth,
  startOfWeek,
} from "@/lib/calendarDates";
import { fillTemplate } from "@/lib/fillTemplate";
import { searchParamDefaults } from "@/lib/url/searchParams";
import { writeUrlParams } from "@/lib/url/urlState";
import {
  APPOINTMENTS_PARAM_KEYS,
  appointmentsParamsSchema,
} from "@/schemas/appointments/appointments-params.schema";
import { ADD_PANEL } from "@/schemas/url/list-params.schema";

const {
  view: VIEW,
  type: TYPE,
  date: DATE,
  appointment: APPOINTMENT,
  panel: PANEL,
} = APPOINTMENTS_PARAM_KEYS;
const defaults = searchParamDefaults(appointmentsParamsSchema);

const TODAY = appointmentsData?.today;
const LOCALE = appointmentsData?.locale;
const FORMATS = appointmentsData?.dateFormats;
const VIEWS = appointmentsData?.views ?? [];
const DAY_VIEW = VIEWS?.[0]?.value;
const ALL_TYPES = appointmentsData?.eventTypes?.options?.[0]?.value;
const HOURS = appointmentsData?.weekHours;
const WINDOW_START = (HOURS?.start ?? 0) * 60;
const WINDOW_MINUTES = ((HOURS?.end ?? 24) - (HOURS?.start ?? 0)) * 60;

/** Each event type's short tag ("Appointment", "Callback"…). */
const TYPE_TAGS = Object.fromEntries(
  appointmentsData?.eventTypes?.options?.map((option) => [
    option?.value,
    option?.tag,
  ]) ?? [],
);

/** Each event type's tone, so an event carries the colour of its type. */
const TYPE_TONES = Object.fromEntries(
  appointmentsData?.eventTypes?.options?.map((option) => [
    option?.value,
    option?.tone,
  ]) ?? [],
);

/**
 * Where an event sits in the week grid's hour window, as `top` / `height`
 * percentages of the column — geometry from data, so an inline style rather
 * than a class (rule 1). Clamped to the window.
 */
function positionOf(event) {
  const from = Math.max(minutesOf(event?.start) - WINDOW_START, 0);
  const to = Math.min(minutesOf(event?.end) - WINDOW_START, WINDOW_MINUTES);
  const span = Math.max(to - from, 0);

  return {
    top: `${(from / WINDOW_MINUTES) * 100}%`,
    height: `${(span / WINDOW_MINUTES) * 100}%`,
  };
}

/** Built once, so every view hands out the same event objects. */
const events =
  appointmentsData?.events?.map((event) => ({
    ...event,
    tone: TYPE_TONES?.[event?.type],
    position: positionOf(event),
  })) ?? [];

const DETAIL = appointmentsData?.detail;

/**
 * An event as its details panel shows it: the shared `sample` under the
 * event's own fields, its client account, its "12:00 PM – 12:30 PM" window,
 * its title (`name`, else `title`) and its "Scheduled for …" line.
 */
function buildDetail(event) {
  const start = formatTime(event?.start, FORMATS?.time, LOCALE);
  const end = formatTime(event?.end, FORMATS?.time, LOCALE);

  return {
    ...DETAIL?.sample,
    ...event,
    client: event?.subtitle,
    startLabel: start,
    typeTag: TYPE_TAGS?.[event?.type],
    timeWindow: fillTemplate(DETAIL?.timeWindowTemplate, { start, end }),
    panelTitle: event?.name ?? event?.title,
    panelSubtitle: fillTemplate(DETAIL?.subtitleTemplate, {
      date: event?.date,
      start,
    }),
  };
}

/**
 * Built once, so a selector returns the same object every time. Exported
 * so another page listing bookings (the client home's upcoming
 * appointments) reads these same events rather than a copy.
 */
export const appointmentDetailsById = new Map(
  events.map((event) => [event?.id, buildDetail(event)]),
);

/**
 * Calendar events as a booking list's timeline rows (the client home's
 * upcoming appointments, the agent dashboard's today's schedules): each
 * one's title, a meta line of `metaFields` read off the event, its type's
 * tone and tag, and the link its "Open" follows (`openHrefTemplate`, filled
 * from the event). Unknown ids are skipped.
 */
export function bookingRows(ids = [], { metaFields = [], openHrefTemplate }) {
  return (
    ids
      ?.map((id) => appointmentDetailsById.get(id))
      ?.filter(Boolean)
      ?.map((event) => ({
        id: event?.id,
        label: event?.panelTitle,
        meta: metaFields.map((field) => event?.[field]),
        tone: event?.tone,
        tag: { label: event?.typeTag, tone: event?.tone },
        openHref: fillTemplate(openHrefTemplate, event),
      })) ?? []
  );
}

/** The week grid's hour rows ("7 AM" … "5 PM"), built once. */
const hourRows = Array.from(
  { length: (HOURS?.end ?? 0) - (HOURS?.start ?? 0) },
  (_, index) => {
    const hour = (HOURS?.start ?? 0) + index;
    return { id: `${hour}`, label: formatHour(hour, FORMATS?.hour, LOCALE) };
  },
);

/**
 * The first and last day each view draws around its anchor day. The month
 * grid runs from the Sunday before the 1st to the Saturday after the last
 * day, so every row is a whole week.
 */
const RANGES = {
  today: (iso) => [iso, iso],
  week: (iso) => [startOfWeek(iso), addDays(startOfWeek(iso), 6)],
  month: (iso) => [
    startOfWeek(startOfMonth(iso)),
    addDays(startOfWeek(endOfMonth(iso)), 6),
  ],
};

/** How far the arrows move the anchor day in each view. */
const STEPS = {
  today: (iso, direction) => addDays(iso, direction),
  week: (iso, direction) => addDays(iso, 7 * direction),
  month: (iso, direction) => addMonths(iso, direction),
};

function viewOf(params) {
  return params?.[VIEW] ?? DAY_VIEW;
}

function anchorOf(params) {
  return params?.[DATE] ?? TODAY;
}

/**
 * One day: its weekday ("MON"), its date ("Aug 10"), its day of the month
 * ("10"), whether it is today, and its events.
 */
function buildDay(iso, dayEvents) {
  return {
    id: iso,
    weekday: formatIsoDate(iso, FORMATS?.weekday, LOCALE)?.toUpperCase?.(),
    label: formatIsoDate(iso, FORMATS?.day, LOCALE),
    dayNumber: formatIsoDate(iso, FORMATS?.dayNumber, LOCALE),
    isToday: iso === TODAY,
    events: dayEvents,
  };
}

/** Each day from `start` to `end`, holding its own events. */
function buildDays(start, end, inRange) {
  return daysBetween(start, end).map((day) =>
    buildDay(
      day,
      inRange.filter((event) => event?.date === day),
    ),
  );
}

/** The anchor day written to the URL — dropped when it is today. */
function dateParam(iso) {
  return iso === TODAY ? null : iso;
}

/**
 * Appointments & Calendar. Its view state — the range (`?view=`), the event
 * type (`?type=`) and the anchor day (`?date=`) — lives in the URL (rule
 * 26): readers derive the view from the params, actions write them. The
 * resting state, today's full schedule, is the bare path.
 *
 * Its two drawers live there too (rule 20): an event's details
 * (`?appointment=<id>`) and "Schedule New Appointment" (`?panel=add`, the
 * `isAddOpen` / `setAddOpen` pair `FormPanel` reads). Opening one clears
 * the other.
 */
export const useAppointmentsStore = create(() => ({
  content: appointmentsData,
  detailContent: DETAIL,
  paramsSchema: appointmentsParamsSchema,

  selectedAppointment: (params) =>
    appointmentDetailsById.get(params?.[APPOINTMENT]) ?? null,
  openAppointment: (id) =>
    writeUrlParams({ [APPOINTMENT]: id, [PANEL]: null }, { defaults }),
  setDetailOpen: (open) => {
    if (!open) writeUrlParams({ [APPOINTMENT]: null }, { defaults });
  },

  isAddOpen: (params) => params?.[PANEL] === ADD_PANEL,
  openAdd: () =>
    writeUrlParams({ [PANEL]: ADD_PANEL, [APPOINTMENT]: null }, { defaults }),
  setAddOpen: (open) =>
    writeUrlParams(
      {
        [PANEL]: open ? ADD_PANEL : null,
        ...(open && { [APPOINTMENT]: null }),
      },
      { defaults },
    ),

  view: (params) => viewOf(params),
  eventType: (params) => params?.[TYPE] ?? ALL_TYPES,
  dateLabel: (params) =>
    formatIsoDate(anchorOf(params), FORMATS?.toolbar, LOCALE),

  /** The current view's own copy (its arrows' labels). */
  viewContent: (params) =>
    VIEWS.find((view) => view?.value === viewOf(params)) ?? VIEWS?.[0],

  /**
   * What the current view draws — a new object per call, so select the
   * function and memoise on params:
   * - `today` — `{ view, days }`: the one day, as a day card;
   * - `week` — `{ view, hours, days }`: the hour rows and seven day columns,
   *   each event carrying its `position` in the hour window;
   * - `month` — `{ view, days }`: whole weeks around the month (the design
   *   draws the neighbouring months' days the same as the month's own).
   */
  deriveCalendar: (params) => {
    const view = viewOf(params);
    const anchor = anchorOf(params);
    const type = params?.[TYPE] ?? ALL_TYPES;
    const [start, end] = (RANGES?.[view] ?? RANGES.today)(anchor);
    const inRange = events.filter(
      (event) =>
        event?.date >= start &&
        event?.date <= end &&
        (type === ALL_TYPES || event?.type === type),
    );
    const days = buildDays(start, end, inRange);

    if (view === "week") return { view, hours: hourRows, days };
    return { view: RANGES?.[view] ? view : DAY_VIEW, days };
  },

  /** Choosing "Today" also jumps back to today; the others keep the day. */
  setView: (view) =>
    writeUrlParams(
      { [VIEW]: view, ...(view === DAY_VIEW && { [DATE]: null }) },
      { defaults },
    ),
  setEventType: (type) => writeUrlParams({ [TYPE]: type }, { defaults }),

  /** Move the anchor day one unit of the current view back (-1) or on (1). */
  step: (params, direction) => {
    const step = STEPS?.[viewOf(params)] ?? STEPS.today;
    writeUrlParams(
      { [DATE]: dateParam(step(anchorOf(params), direction)) },
      { defaults },
    );
  },
}));
