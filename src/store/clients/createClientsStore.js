import { CLIENT_CATEGORIES } from "@/data/admin/clients.data";
import { resolveActionHref } from "@/lib/actionLinks";
import { fillTemplate } from "@/lib/fillTemplate";
import { searchParamDefaults } from "@/lib/url/searchParams";
import { writeUrlParams } from "@/lib/url/urlState";
import {
  CLIENT_TAB_PARAM,
  clientDetailParamsSchema,
} from "@/schemas/clients/clients-params.schema";
import { createTableStore } from "@/store/createTableStore";

const CATEGORY_LABELS = Object.fromEntries(
  CLIENT_CATEGORIES?.map((category) => [category?.value, category?.label]) ??
    [],
);

const DETAIL_DEFAULTS = searchParamDefaults(clientDetailParamsSchema);

/**
 * Overlay one client's own row (name, contact, status, figures) on the sample
 * detail record, so each client's page reads as theirs until real per-client
 * data exists. Each tab's badge counts the list that tab shows, and the
 * header's actions are the client's own: an action whose link names its
 * record (`hrefTemplate`) is filled from the row plus `linkValues(row)`.
 */
function buildClientDetail(row, detailContent, linkValues) {
  const values = { ...row, ...linkValues?.(row) };
  const detail = {
    ...detailContent?.sample,
    ...row,
    summary: [row?.specialty, row?.address],
    actions: detailContent?.actions?.map((action) =>
      resolveActionHref(action, values),
    ),
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
    tabs: detailContent?.tabs?.map((tab) => ({
      ...tab,
      count: tab?.countOf ? detail?.[tab?.countOf]?.length : undefined,
    })),
  };
}

/**
 * A clients directory's store — the admin's Clients and the agent
 * workspace's Client Accounts are the same list and the same detail page
 * over their own copy and links (rule 0).
 *
 * The list is the shared `createTableStore` (search, the category and
 * status filters, paging, and the add drawer when `content.addAction` asks
 * for one). Each row links "View Account" to its own page
 * (`detailHrefTemplate`, e.g. `/admin/clients/{id}`), a route with its tab
 * in the URL (`?tab=calls`); `clientById` also answers the server page,
 * which 404s an unknown id.
 *
 * `linkValues(row)` supplies the extra values a portal's per-client links
 * need (the admin's "Message" — that client's conversation id).
 */
export function createClientsStore({
  content,
  detailContent,
  detailHrefTemplate,
  paramsSchema,
  linkValues,
}) {
  /** Each row with the link its "View Account" action follows. */
  const rows =
    content?.rows?.map((row) => ({
      ...row,
      href: fillTemplate(detailHrefTemplate, row),
    })) ?? [];

  /** Built once per client, so a selector returns the same object every time. */
  const clientDetails = new Map(
    rows.map((row) => [
      row?.id,
      buildClientDetail(row, detailContent, linkValues),
    ]),
  );

  return createTableStore({
    content,
    rows,
    searchFields: ["name", "specialty", "contact", "phone", "email"],
    filters: content?.filters,
    paramsSchema,
    summaryTemplate: content?.pagination?.summary,
    extend: () => ({
      detailContent,
      detailParamsSchema: clientDetailParamsSchema,

      /** The client's full record, or `null` for an unknown id. */
      clientById: (id) => clientDetails.get(id) ?? null,

      /** The open tab, from the detail page's params (`useUrlParams`). */
      detailTab: (params) => params?.[CLIENT_TAB_PARAM],
      setDetailTab: (tab) =>
        writeUrlParams(
          { [CLIENT_TAB_PARAM]: tab },
          { defaults: DETAIL_DEFAULTS },
        ),
    }),
  });
}
