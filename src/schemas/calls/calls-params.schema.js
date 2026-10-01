import { callsData } from "@/data/admin/calls.data";
import {
  createListParamsSchema,
  filterParamsFrom,
  optionalIdParam,
} from "@/schemas/url/list-params.schema";

/** The calls page's own URL keys, beyond the shared list ones. */
export const CALLS_PARAM_KEYS = {
  call: "call",
};

/**
 * Everything the calls page keeps in its URL:
 * `/admin/calls?q=isabel&status=missed&page=2` for the list, plus
 * `&call=isabel-gomez-01` for an open call's details or `&panel=add` for the
 * dial-outbound drawer.
 */
export const callsParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(callsData?.filters),
  addPanel: true,
  extra: {
    [CALLS_PARAM_KEYS.call]: optionalIdParam,
  },
});
