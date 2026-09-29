import { clientDetailData } from "@/data/admin/client-detail.data";
import {
  CLIENT_CATEGORIES,
  CLIENT_DETAIL_HREF,
  clientsData,
} from "@/data/admin/clients.data";
import { searchParamDefaults } from "@/lib/url/searchParams";
import { writeUrlParams } from "@/lib/url/urlState";
import {
  CLIENT_TAB_PARAM,
  clientDetailParamsSchema,
  clientsParamsSchema,
} from "@/schemas/clients/clients-params.schema";
import { createTableStore } from "@/store/createTableStore";

const CATEGORY_LABELS = Object.fromEntries(
  CLIENT_CATEGORIES?.map((category) => [category?.value, category?.label]) ??
    [],
);

const DETAIL_DEFAULTS = searchParamDefaults(clientDetailParamsSchema);

/** Each row with the link its "View Account" action follows. */
const rows =
  clientsData?.rows?.map((row) => ({
    ...row,
    href: CLIENT_DETAIL_HREF.replace("{id}", row?.id),
  })) ?? [];

/**
 * Overlay one client's own row (name, contact, status, figures) on the sample
 * detail record, so each client's page reads as theirs until real per-client
 * data exists. Each tab's badge counts the list that tab shows.
 */
function buildClientDetail(row) {
  const detail = {
    ...clientDetailData?.sample,
    ...row,
    summary: [row?.specialty, row?.address],
    primaryContact: row?.contact,
    businessType: CATEGORY_LABELS?.[row?.category],
    stats: {
      openTasks: Number(row?.openTasks) || 0,
      nextAppointment: row?.nextAppointment,
      lastInteraction: row?.lastInteraction,
    },
  };

  return {
    ...detail,
    tabs: clientDetailData?.tabs?.map((tab) => ({
      ...tab,
      count: tab?.countOf ? detail?.[tab?.countOf]?.length : undefined,
    })),
  };
}

/** Built once per client, so a selector returns the same object every time. */
const clientDetails = new Map(rows.map((row) => [row?.id, buildClientDetail(row)]));

/**
 * The clients directory — its dummy content plus the search, two filters and
 * paging the table runs on (shared with every list through
 * `createTableStore`), the add drawer (`?panel=add`), and each client's detail
 * page.
 *
 * The detail page is its own route (`/admin/clients/<id>`) with its tab in
 * the URL (`?tab=calls`); `clientById` also answers the server page, which
 * 404s an unknown id.
 */
export const useClientsStore = createTableStore({
  content: clientsData,
  rows,
  searchFields: ["name", "specialty", "contact", "phone", "email"],
  filters: clientsData?.filters,
  paramsSchema: clientsParamsSchema,
  summaryTemplate: clientsData?.pagination?.summary,
  extend: () => ({
    detailContent: clientDetailData,
    detailParamsSchema: clientDetailParamsSchema,

    /** The client's full record, or `null` for an unknown id. */
    clientById: (id) => clientDetails.get(id) ?? null,

    /** The open tab, from the detail page's params (`useUrlParams`). */
    detailTab: (params) => params?.[CLIENT_TAB_PARAM],
    setDetailTab: (tab) =>
      writeUrlParams({ [CLIENT_TAB_PARAM]: tab }, { defaults: DETAIL_DEFAULTS }),
  }),
});
