"use client";

import { useMemo } from "react";

import ClientInfoDrawer from "@/components/messages/ClientInfoDrawer";
import ClientInfoPanel from "@/components/messages/ClientInfoPanel";
import ConversationList from "@/components/messages/ConversationList";
import ConversationThread from "@/components/messages/ConversationThread";
import ThreadPlaceholder from "@/components/messages/ThreadPlaceholder";
import { useStoreParams } from "@/hooks/useUrlParams";
import { cn } from "@/lib/cn";
import { MAIN_FILL_HEIGHT } from "@/lib/layout";
import { revealDelayAt } from "@/lib/motion";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useMessagesStore } from "@/store/admin/useMessagesStore";

/**
 * Client Messages & Inbox — Figma 167:51527: the conversation list, the open
 * thread and the client's info in one bordered box that fills the height
 * under the top bar, each column scrolling on its own. The list and the
 * thread sit side by side from `md` up; the client-info column joins them
 * from `xl`, where there is room for three. On a phone all three stack.
 *
 * Search, filter and the open conversation are the URL's (rule 26), read
 * once here through the store and handed down. Nothing is open on arrival:
 * until a conversation is chosen (writing `?conversation=<id>`), a
 * placeholder spans the thread and client-info columns. The columns reveal
 * left to right. Between `md` and `xl` the client info opens as a drawer
 * instead of a column (`?panel=client`).
 */
export default function MessagesInbox() {
  const params = useStoreParams(useMessagesStore);
  const content = useMessagesStore((state) => state.content);
  const deriveConversations = useMessagesStore(
    (state) => state.visibleConversations,
  );
  const conversation = useMessagesStore((state) =>
    state.selectedConversation(params),
  );
  const query = useMessagesStore((state) => state.query(params));
  const filter = useMessagesStore((state) => state.filter(params));
  const setQuery = useMessagesStore((state) => state.setQuery);
  const setFilter = useMessagesStore((state) => state.setFilter);
  const openConversation = useMessagesStore((state) => state.openConversation);
  const isClientInfoOpen = useMessagesStore((state) =>
    state.isClientInfoOpen(params),
  );
  const setClientInfoOpen = useMessagesStore(
    (state) => state.setClientInfoOpen,
  );

  const conversations = useMemo(
    () => deriveConversations?.(params) ?? [],
    [deriveConversations, params],
  );
  const notFunctional = notFunctionalProps(content);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-8 border border-solid border-border-default bg-surface-base md:grid md:grid-cols-[280px_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_300px]",
        MAIN_FILL_HEIGHT,
      )}
    >
      <ConversationList
        content={content}
        conversations={conversations}
        activeId={conversation?.id}
        query={query}
        filter={filter}
        onQueryChange={setQuery}
        onFilterChange={setFilter}
        onOpen={openConversation}
        revealDelay={revealDelayAt(0, 0)}
      />
      {conversation ? (
        <>
          <ConversationThread
            conversation={conversation}
            content={content}
            notFunctional={notFunctional}
            onOpenClientInfo={() => setClientInfoOpen?.(true)}
            revealDelay={revealDelayAt(0, 1)}
          />
          <ClientInfoPanel
            client={conversation?.client}
            content={content}
            notFunctional={notFunctional}
            revealDelay={revealDelayAt(0, 2)}
          />
        </>
      ) : (
        <ThreadPlaceholder
          placeholder={content?.noConversation}
          revealDelay={revealDelayAt(0, 1)}
        />
      )}

      <ClientInfoDrawer
        open={isClientInfoOpen && Boolean(conversation)}
        onOpenChange={setClientInfoOpen}
        client={conversation?.client}
        content={content}
        notFunctional={notFunctional}
      />
    </div>
  );
}
