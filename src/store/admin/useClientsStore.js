import {
  ADMIN_CLIENT_DETAIL_LINKS,
  clientDetailData,
} from "@/data/admin/client-detail.data";
import { CLIENT_DETAIL_HREF, clientsData } from "@/data/admin/clients.data";
import { withContentLinks } from "@/lib/actionLinks";
import { clientsParamsSchema } from "@/schemas/clients/clients-params.schema";
import { conversationLinkValues } from "@/store/admin/useMessagesStore";
import { createClientsStore } from "@/store/clients/createClientsStore";

/**
 * The admin's clients directory — the shared clients store over the admin's
 * data: the list, its add drawer (`?panel=add`) and each client's page at
 * `/admin/clients/<id>`, with the admin's own links on that page
 * (`ADMIN_CLIENT_DETAIL_LINKS`): Message, Create Task and Schedule
 * Appointment.
 */
export const useClientsStore = createClientsStore({
  content: clientsData,
  detailContent: withContentLinks(clientDetailData, ADMIN_CLIENT_DETAIL_LINKS),
  linkValues: conversationLinkValues,
  detailHrefTemplate: CLIENT_DETAIL_HREF,
  paramsSchema: clientsParamsSchema,
});
