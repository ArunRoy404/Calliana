import { clientRequestsData } from "@/data/client/requests.data";
import {
  createListParamsSchema,
  filterParamsFrom,
} from "@/schemas/url/list-params.schema";

/**
 * Everything the client requests page keeps in its URL —
 * `/client/requests?q=billing&category=callback&status=completed&page=2`
 * for the list, plus `&panel=add` for the new-request drawer.
 */
export const clientRequestsParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(clientRequestsData?.filters),
  addPanel: true,
});
