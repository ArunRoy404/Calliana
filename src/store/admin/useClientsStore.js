import { clientDetailData } from "@/data/admin/client-detail.data";
import { CLIENT_DETAIL_HREF, clientsData } from "@/data/admin/clients.data";
import { clientsParamsSchema } from "@/schemas/clients/clients-params.schema";
import { createClientsStore } from "@/store/clients/createClientsStore";

/**
 * The admin's clients directory — the shared clients store over the admin's
 * data: the list, its add drawer (`?panel=add`) and each client's page at
 * `/admin/clients/<id>`.
 */
export const useClientsStore = createClientsStore({
  content: clientsData,
  detailContent: clientDetailData,
  detailHrefTemplate: CLIENT_DETAIL_HREF,
  paramsSchema: clientsParamsSchema,
});
