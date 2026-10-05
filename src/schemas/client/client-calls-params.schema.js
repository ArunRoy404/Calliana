import { clientCallsData } from "@/data/client/calls.data";
import {
  createListParamsSchema,
  filterParamsFrom,
  optionalIdParam,
} from "@/schemas/url/list-params.schema";

/** The client Calls & Notes page's own URL keys, beyond the list ones. */
export const CLIENT_CALLS_PARAM_KEYS = { call: "call", note: "note" };

/**
 * Everything Calls & Notes keeps in its URL —
 * `/client/calls?q=carmen&status=missed&page=2` for the list, plus
 * `&call=<id>` for an open call's details and `&note=<id>` for the row whose
 * agent note is open.
 */
export const clientCallsParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(clientCallsData?.filters),
  extra: {
    [CLIENT_CALLS_PARAM_KEYS.call]: optionalIdParam,
    [CLIENT_CALLS_PARAM_KEYS.note]: optionalIdParam,
  },
});
