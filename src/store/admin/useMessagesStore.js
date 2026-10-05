import { create } from "zustand";

import { messagesData } from "@/data/admin/messages.data";
import { fillTemplate } from "@/lib/fillTemplate";
import { searchParamDefaults } from "@/lib/url/searchParams";
import { writeUrlParams } from "@/lib/url/urlState";
import {
  CLIENT_INFO_PANEL,
  MESSAGES_PARAM_KEYS,
  messagesParamsSchema,
} from "@/schemas/messages/messages-params.schema";

const {
  query: QUERY,
  filter: FILTER,
  conversation: CONVERSATION,
  panel: PANEL,
} = MESSAGES_PARAM_KEYS;
const defaults = searchParamDefaults(messagesParamsSchema);
const ALL = messagesData?.filterOptions?.[0]?.value;

/** The fields a search looks through. */
const SEARCH_FIELDS = ["name", "contactName", "account", "preview"];

/**
 * Filters that are not a plain status match. Every other filter value
 * ("needs-reply", "resolved") is compared with the conversation's `status`.
 */
const FILTER_MATCHERS = {
  unread: (conversation) => (conversation?.unread ?? 0) > 0,
};

/**
 * A conversation with its list preview, its "started" line and its inbound
 * sender (`contact` — the name and picture an incoming bubble shows) filled
 * in.
 */
function buildConversation(conversation) {
  return {
    ...conversation,
    contact: { name: conversation?.contactName, avatar: conversation?.avatar },
    preview: conversation?.preview ?? conversation?.messages?.at?.(-1)?.text,
    startedLabel: fillTemplate(messagesData?.thread?.startedTemplate, {
      day: conversation?.startedDay,
    }),
  };
}

/** Built once, so a selector returns the same object every time. */
const conversations = messagesData?.conversations?.map(buildConversation) ?? [];
/**
 * Each conversation as a one-line summary — who, which channel, when, and the
 * latest message — in the shape `clients/detail/MessageRow` draws. The client
 * home's "Recent Conversations" lists these rather than a copy of the inbox.
 */
const summaries = conversations.map((conversation) => ({
  id: conversation?.id,
  sender: conversation?.name,
  avatar: conversation?.avatar,
  channel: conversation?.channel,
  time: conversation?.time,
  text: conversation?.preview,
}));

const conversationsById = new Map(
  conversations?.map((conversation) => [conversation?.id, conversation]),
);

function matchesFilter(conversation, filter) {
  if (!filter || filter === ALL) return true;
  return (
    FILTER_MATCHERS?.[filter]?.(conversation) ?? conversation?.status === filter
  );
}

function matchesQuery(conversation, needle) {
  if (!needle) return true;
  return SEARCH_FIELDS.some((field) =>
    conversation?.[field]?.toLowerCase?.()?.includes(needle),
  );
}

/**
 * The inbox — Figma 167:51527. Its view state (search, filter and the open
 * conversation) lives in the URL (rule 26): readers derive the view from the
 * params, actions write them. Nothing is open until a conversation is
 * chosen, and choosing one writes its id to the URL (`?conversation=<id>`),
 * so what is on screen is always what the link reopens.
 *
 * The client-details drawer (rule 20) is there too (`?panel=info`): the
 * phone's way to the third column, which only fits beside the thread from
 * `xl` up. Choosing a conversation closes it, so the two never disagree.
 */
export const useMessagesStore = create(() => ({
  content: messagesData,
  paramsSchema: messagesParamsSchema,
  summaries,

  query: (params) => params?.[QUERY] ?? "",
  filter: (params) => params?.[FILTER] ?? ALL,

  /** A new array per call — select the function, then memoise on params. */
  visibleConversations: (params) => {
    const needle = params?.[QUERY]?.trim?.()?.toLowerCase?.() ?? "";
    return conversations.filter(
      (conversation) =>
        matchesFilter(conversation, params?.[FILTER]) &&
        matchesQuery(conversation, needle),
    );
  },

  /** The conversation the URL names, or `null` — there is no default. */
  selectedConversation: (params) =>
    conversationsById.get(params?.[CONVERSATION]) ?? null,

  setQuery: (query) => writeUrlParams({ [QUERY]: query }, { defaults }),
  setFilter: (filter) => writeUrlParams({ [FILTER]: filter }, { defaults }),

  /** Choosing a conversation also closes the details drawer. */
  openConversation: (id) =>
    writeUrlParams({ [CONVERSATION]: id, [PANEL]: null }, { defaults }),
  /** The phone's back button: back to the list, drawer closed. */
  closeConversation: () =>
    writeUrlParams({ [CONVERSATION]: null, [PANEL]: null }, { defaults }),

  /** The client-details drawer — the phone's way to the third column. */
  isClientInfoOpen: (params) => params?.[PANEL] === CLIENT_INFO_PANEL,
  openClientInfo: () =>
    writeUrlParams({ [PANEL]: CLIENT_INFO_PANEL }, { defaults }),
  setClientInfoOpen: (open) =>
    writeUrlParams({ [PANEL]: open ? CLIENT_INFO_PANEL : null }, { defaults }),
}));
