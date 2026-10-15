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

/**
 * The admin's drawers over a conversation, by drawer id → URL key; each
 * key's value is the conversation's id.
 */
export const MESSAGES_RECORD_PANEL_KEYS = {
  callback: "callback",
  lead: "lead",
  task: "task",
};

/** The inbox's one drawer besides a conversation: the client's details. */
export const CLIENT_INFO_PANEL = "info";

/**
 * Everything the inbox keeps in its URL —
 * `/admin/messages?q=laura&filter=unread&conversation=laura-alegre`: the
 * list's search and filter, and the open conversation — plus the phone-only
 * client-details drawer (`&panel=info`), the way the third column is reached
 * below `xl` — or one of the admin's drawers over the conversation
 * (`&callback=<id>`, `&lead=<id>`, `&task=<id>`). Every field `.catch()`es
 * its default, so a stale link falls back to the full list with no
 * conversation open.
 */
export const messagesParamsSchema = z.object({
  [MESSAGES_PARAM_KEYS.query]: z.string().max(200).catch(""),
  [MESSAGES_PARAM_KEYS.filter]: enumParam(
    messagesData?.filterOptions?.map((option) => option?.value),
  ),
  [MESSAGES_PARAM_KEYS.conversation]: optionalIdParam,
  [MESSAGES_PARAM_KEYS.panel]: optionalEnumParam([CLIENT_INFO_PANEL]),
  ...Object.fromEntries(
    Object.values(MESSAGES_RECORD_PANEL_KEYS).map((key) => [
      key,
      optionalIdParam,
    ]),
  ),
});
