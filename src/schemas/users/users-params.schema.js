import { usersData } from "@/data/admin/users.data";
import { createListParamsSchema, filterParamsFrom } from "@/schemas/url/list-params.schema";

/**
 * Everything the users page keeps in its URL:
 * `/admin/roles?q=sofia&role=agent&status=active&page=2` for the list, plus
 * `&panel=add` for the add-user drawer.
 */
export const usersParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(usersData?.filters),
  addPanel: true,
});
