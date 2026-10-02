import { z } from "zod";

import { messagesData } from "@/data/admin/messages.data";
import {
  enumParam,
  optionalEnumParam,
  optionalIdParam,
  PANEL_PARAM,
} from "@/schemas/url/list-params.schema";

/** The inbox's URL keys. */
export const MESSAGES_PARAM_KEYS = {
  query: "q",
  filter: "filter",
  conversation: "conversation",
  panel: PANEL_PARAM,
};

/** `?panel=client` — the client-info drawer, opened where the column has no room. */
export const CLIENT_INFO_PANEL = "client";

/**
 * Everything the inbox keeps in its URL —
 * `/admin/messages?q=laura&filter=unread&conversation=laura-alegre`: the
 * list's search and filter, the open conversation and — between `md` and
 * `xl` — the client-info drawer (`&panel=client`). Every field
 * `.catch()`es its default, so a stale link falls back to the full list
 * with no conversation open.
 */
export const messagesParamsSchema = z.object({
  [MESSAGES_PARAM_KEYS.query]: z.string().max(200).catch(""),
  [MESSAGES_PARAM_KEYS.filter]: enumParam(
    messagesData?.filterOptions?.map((option) => option?.value),
  ),
  [MESSAGES_PARAM_KEYS.conversation]: optionalIdParam,
  [MESSAGES_PARAM_KEYS.panel]: optionalEnumParam([CLIENT_INFO_PANEL]),
});
