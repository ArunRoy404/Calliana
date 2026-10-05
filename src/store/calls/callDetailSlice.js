import { fillTemplate } from "@/lib/fillTemplate";
import { PANEL_PARAM } from "@/schemas/url/list-params.schema";

/**
 * One call's details drawer, for any call list — the admin calls directory
 * and the client portal's Calls & Notes both open `CallDetailPanel` from
 * `?call=<id>`. The pieces live here once (rule 0); each list's
 * `createTableStore` spreads `callDetailSlice(...)` into its `extend`.
 */

/**
 * Overlay one call's own row (caller, timing, status) on the detail data's
 * shared `sample`, so each call's panel reads as its own until real per-call
 * data exists. `clientHrefTemplate` links the call's client account
 * (`/admin/clients/{clientId}`); a list without one leaves it out.
 */
export function buildCallDetail(row, { detail, clientHrefTemplate } = {}) {
  const hasTiming = Boolean(row?.startTime && row?.duration);

  return {
    ...detail?.sample,
    panelTitle: fillTemplate(detail?.titleTemplate, row),
    panelSubtitle: hasTiming
      ? fillTemplate(detail?.subtitleTemplate, row)
      : undefined,
    id: row?.id,
    caller: row?.caller,
    phone: row?.phone,
    clientAccount: row?.clientAccount,
    clientHref:
      clientHrefTemplate && row?.clientId
        ? fillTemplate(clientHrefTemplate, row)
        : undefined,
    startTime: row?.startTime,
    duration: row?.duration,
    status: row?.callStatus,
    followUp: row?.followUp,
  };
}

/**
 * The store half of the drawer: its content, the call the URL names
 * (`selectedCall(params)` — built once per row, so a selector returns the
 * same object), and the actions that open it from a row (clearing any other
 * panel's key) and close it.
 */
export function callDetailSlice({
  rows = [],
  detail,
  callKey,
  clientHrefTemplate,
}) {
  const details = new Map(
    rows?.map((row) => [
      row?.id,
      buildCallDetail(row, { detail, clientHrefTemplate }),
    ]) ?? [],
  );

  return (set, get) => ({
    detailContent: detail,

    selectedCall: (params) => details.get(params?.[callKey]) ?? null,

    openCall: (row) =>
      get()?.setParams?.({ [callKey]: row?.id, [PANEL_PARAM]: null }),
    setDetailOpen: (open) => {
      if (!open) get()?.setParams?.({ [callKey]: null });
    },
  });
}
