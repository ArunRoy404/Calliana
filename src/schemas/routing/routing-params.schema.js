import { routingData } from "@/data/admin/routing.data";
import {
  createListParamsSchema,
  filterParamsFrom,
  optionalIdParam,
} from "@/schemas/url/list-params.schema";

/** The routing page's own URL keys, beyond the shared list ones. */
export const ROUTING_PARAM_KEYS = {
  queue: "queue",
  rules: "rules",
};

/**
 * Everything the routing page keeps in its URL: `/admin/routing?q=medical`
 * for the list, `&queue=<id>` for a queue's read-only details (381:38657),
 * `&rules=<id>` for that same queue's editable routing rules (376:28372) —
 * two different panels, opened one at a time — or `&panel=add` for the
 * create-queue drawer.
 */
export const routingParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(routingData?.filters),
  addPanel: true,
  extra: {
    [ROUTING_PARAM_KEYS.queue]: optionalIdParam,
    [ROUTING_PARAM_KEYS.rules]: optionalIdParam,
  },
});
