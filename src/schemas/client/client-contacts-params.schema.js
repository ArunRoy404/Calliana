import { clientContactsData } from "@/data/client/contacts.data";
import {
  createListParamsSchema,
  filterParamsFrom,
  optionalIdParam,
} from "@/schemas/url/list-params.schema";

/** The client Contacts page's own URL key, beyond the list ones. */
export const CLIENT_CONTACTS_PARAM_KEYS = { contact: "contact" };

/**
 * Everything Contacts keeps in its URL —
 * `/client/contacts?q=torres&outcome=missed&page=2` for the list, plus
 * `&contact=<id>` for an open contact's details.
 */
export const clientContactsParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(clientContactsData?.filters),
  extra: { [CLIENT_CONTACTS_PARAM_KEYS.contact]: optionalIdParam },
});
