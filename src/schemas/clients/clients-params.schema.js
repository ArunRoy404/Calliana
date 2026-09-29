import { z } from "zod";

import { clientDetailData } from "@/data/admin/client-detail.data";
import { clientsData } from "@/data/admin/clients.data";
import {
  createListParamsSchema,
  enumParam,
  filterParamsFrom,
} from "@/schemas/url/list-params.schema";

/**
 * The clients list's URL: `/admin/clients?q=…&category=dental&status=active
 * &page=2&size=20`, plus `&panel=add` for the add drawer.
 */
export const clientsParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(clientsData?.filters),
  addPanel: true,
});

/** A client's detail page keeps its tab in the URL: `?tab=calls`. */
export const CLIENT_TAB_PARAM = "tab";

export const clientDetailParamsSchema = z.object({
  [CLIENT_TAB_PARAM]: enumParam(clientDetailData?.tabs?.map((tab) => tab?.id)),
});
