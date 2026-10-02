"use client";

import SegmentedFilter from "@/components/forms/SegmentedFilter";
import SearchField from "@/components/forms/SearchField";
import StaggerList from "@/components/lists/StaggerList";
import ConversationRow from "@/components/messages/ConversationRow";
import Reveal from "@/components/motion/Reveal";
import EmptyMessage from "@/components/tables/EmptyMessage";

/**
 * The inbox's left column — Figma 167:51527: the conversation search, the
 * All / Unread / Needs Reply / Resolved filter, then the conversations,
 * scrolling on their own. Search and filter are the URL's (rule 26); the
 * search box commits after a pause, like a table's. Reveals after
 * `revealDelay`, its rows following it in.
 */
export default function ConversationList({
  content,
  conversations = [],
  activeId,
  query,
  filter,
  onQueryChange,
  onFilterChange,
  onOpen,
  revealDelay = 0,
}) {
  return (
    <Reveal
      as="aside"
      delay={revealDelay}
      className="flex max-h-96 min-h-0 flex-col border-b border-solid border-border-default md:max-h-none md:border-r md:border-b-0"
    >
      <div className="flex flex-col gap-3 border-b border-solid border-border-default p-3">
        <SearchField
          size="sm"
          search={content?.search}
          value={query}
          onValueChange={onQueryChange}
        />
        <SegmentedFilter
          variant="soft"
          options={content?.filterOptions}
          value={filter}
          onValueChange={onFilterChange}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        {conversations?.length > 0 ? (
          <StaggerList
            items={conversations}
            revealDelay={revealDelay}
            className="gap-0"
          >
            {(conversation, delay) => (
              <ConversationRow
                key={conversation?.id}
                conversation={conversation}
                isActive={conversation?.id === activeId}
                onOpen={onOpen}
                revealDelay={delay}
              />
            )}
          </StaggerList>
        ) : (
          <EmptyMessage>{content?.emptyConversations}</EmptyMessage>
        )}
      </div>
    </Reveal>
  );
}
