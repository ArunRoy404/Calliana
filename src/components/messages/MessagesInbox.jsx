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
 * thread and the client's info, side by side in one bordered box from `xl`
 * up, each column scrolling on its own.
 *
 * Below `xl` the three cannot fit across a phone, so it becomes the two panes
 * every inbox has: the list fills the box until a conversation is chosen,
 * then the thread takes its place, with a back button in its header and the
 * client info a tap away in `ClientInfoDrawer`. Nothing is open on arrival:
 * until a conversation is chosen (writing `?conversation=<id>`), no thread is
 * shown, and a placeholder spans the thread and client-info columns from `xl`
 * up. The box fills the height under the top bar at every size, so the panes
 * scroll inside it rather than growing the page.
 *
 * Search, filter and the open conversation are the URL's (rule 26), read once
 * here through the store and handed down. The columns reveal left to right.
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
  const closeConversation = useMessagesStore(
    (state) => state.closeConversation,
  );
  const openClientInfo = useMessagesStore((state) => state.openClientInfo);

  const conversations = useMemo(
    () => deriveConversations?.(params) ?? [],
    [deriveConversations, params],
  );
  const notFunctional = notFunctionalProps(content);
  const hasConversation = Boolean(conversation);

  return (
    <>
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-8 border border-solid border-border-default bg-surface-base xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px]",
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
          className={cn(hasConversation && "max-xl:hidden")}
        />

        {conversation ? (
          <>
            <ConversationThread
              conversation={conversation}
              content={content}
              notFunctional={notFunctional}
              onBack={closeConversation}
              onOpenInfo={openClientInfo}
              revealDelay={revealDelayAt(0, 1)}
            />
            <ClientInfoPanel
              client={conversation?.client}
              content={content}
              notFunctional={notFunctional}
              revealDelay={revealDelayAt(0, 2)}
              className="max-xl:hidden"
            />
          </>
        ) : (
          <ThreadPlaceholder
            placeholder={content?.noConversation}
            revealDelay={revealDelayAt(0, 1)}
            className="max-xl:hidden"
          />
        )}
      </div>

      <ClientInfoDrawer />
    </>
  );
}
