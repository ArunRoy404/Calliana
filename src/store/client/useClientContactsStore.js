import {
  CONTACT_STATUSES,
  clientContactsData,
} from "@/data/client/contacts.data";
import { fillTemplate } from "@/lib/fillTemplate";
import {
  CLIENT_CONTACTS_PARAM_KEYS,
  clientContactsParamsSchema,
} from "@/schemas/client/client-contacts-params.schema";
import { createTableStore } from "@/store/createTableStore";

const { contact: CONTACT } = CLIENT_CONTACTS_PARAM_KEYS;
const detail = clientContactsData?.detail;
const STATUSES = new Map(
  CONTACT_STATUSES.map((status) => [status?.value, status]),
);

/**
 * Each contact with its status resolved to a badge (`statusKey` keeps the
 * raw key). Built once, so the table receives the same rows on every render.
 */
const contactRows =
  clientContactsData?.rows?.map((row) => ({
    ...row,
    statusKey: row?.status,
    status: STATUSES.get(row?.status),
  })) ?? [];

/**
 * Each contact as its details drawer reads it: the "Patient • Related to
 * Dr. Rodríguez" line and the "View all" link filled from the row. Built
 * once per contact, so `selectedContact` returns the same object.
 */
const contactDetails = new Map(
  contactRows.map((row) => [
    row?.id,
    {
      ...row,
      role: fillTemplate(detail?.roleTemplate, row),
      historyHref: fillTemplate(detail?.history?.viewAllHrefTemplate, row),
    },
  ]),
);

/**
 * Contacts — the client portal's customers and patients: search, the
 * call-outcome filter, rows per page and paging in the URL (rule 26), and
 * each contact's details drawer at `?contact=<id>`, opened by the row's
 * "…" button. Nothing is open unless the URL names it.
 */
export const useClientContactsStore = createTableStore({
  content: clientContactsData,
  rows: contactRows,
  searchFields: ["name", "professional", "phone", "email"],
  filters: clientContactsData?.filters,
  paramsSchema: clientContactsParamsSchema,
  summaryTemplate: clientContactsData?.pagination?.summary,
  extend: (set, get) => ({
    detailContent: detail,

    selectedContact: (params) => contactDetails.get(params?.[CONTACT]) ?? null,

    openContact: (row) => get()?.setParams?.({ [CONTACT]: row?.id }),
    setDetailOpen: (open) => {
      if (!open) get()?.setParams?.({ [CONTACT]: null });
    },
  }),
});
