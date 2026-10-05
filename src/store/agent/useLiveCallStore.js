import { create } from "zustand";

import { liveCallData } from "@/data/agent/live-call.data";
import { searchParamDefaults } from "@/lib/url/searchParams";
import { writeUrlParams } from "@/lib/url/urlState";
import {
  LIVE_CALL_PARAM_KEYS,
  liveCallParamsSchema,
} from "@/schemas/agent/live-call-params.schema";

const {
  tab: TAB,
  view: VIEW,
  call: CALL,
  intent: INTENT,
} = LIVE_CALL_PARAM_KEYS;
const defaults = searchParamDefaults(liveCallParamsSchema);
const CALENDAR = liveCallData?.calendar;

/** Each calendar view's slots with their badges resolved, built once. */
const slotsByView = Object.fromEntries(
  Object.entries(CALENDAR?.slots ?? {}).map(([view, day]) => [
    view,
    {
      ...day,
      rows: day?.rows?.map((row) => ({
        ...row,
        badge: CALENDAR?.statuses?.[row?.status],
      })),
    },
  ]),
);

/**
 * The Live Call Workspace — its content and the view state it keeps in the
 * URL (rule 26): the side panel's tab, the calendar's view, the previous
 * call shown open (one at a time, none by default) and the script's chosen
 * caller response. Readers take the URL's params; actions write them. The
 * note being written is its own form store (`useLiveCallNoteStore`).
 */
export const useLiveCallStore = create(() => ({
  content: liveCallData,
  paramsSchema: liveCallParamsSchema,

  tab: (params) => params?.[TAB] ?? defaults?.[TAB],
  view: (params) => params?.[VIEW] ?? defaults?.[VIEW],
  slots: (params) => slotsByView?.[params?.[VIEW] ?? defaults?.[VIEW]],
  openCallId: (params) => params?.[CALL],
  intent: (params) => params?.[INTENT],

  setTab: (tab) => writeUrlParams({ [TAB]: tab }, { defaults }),
  setView: (view) => writeUrlParams({ [VIEW]: view }, { defaults }),
  /** Opens a previous call, or closes it if it is the one open. */
  toggleCall: (id, openId) =>
    writeUrlParams({ [CALL]: id === openId ? null : id }, { defaults }),
  chooseIntent: (id) => writeUrlParams({ [INTENT]: id }, { defaults }),
}));
