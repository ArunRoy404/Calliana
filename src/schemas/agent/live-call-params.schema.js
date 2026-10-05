import { z } from "zod";

import { liveCallData } from "@/data/agent/live-call.data";
import {
  enumParam,
  optionalEnumParam,
  optionalIdParam,
} from "@/schemas/url/list-params.schema";

/** The Live Call Workspace's own URL keys. */
export const LIVE_CALL_PARAM_KEYS = {
  tab: "tab",
  view: "view",
  call: "call",
  intent: "intent",
};

const { tab, view, call, intent } = LIVE_CALL_PARAM_KEYS;

/**
 * Everything the Live Call Workspace keeps in its URL —
 * `/agent/calls/live?tab=calendar&view=week` for the side panel and its
 * calendar, `&call=sep-02` for the previous call shown open, and
 * `&intent=book` for the script's chosen caller response. The tab and view
 * default to their first option, left out of the URL; nothing is open or
 * chosen unless the URL names it.
 */
export const liveCallParamsSchema = z.object({
  [tab]: enumParam(liveCallData?.tabs?.map((item) => item?.id)),
  [view]: enumParam(liveCallData?.calendar?.views?.map((item) => item?.value)),
  [call]: optionalIdParam,
  [intent]: optionalEnumParam(
    liveCallData?.script?.responses?.map((item) => item?.id),
  ),
});
