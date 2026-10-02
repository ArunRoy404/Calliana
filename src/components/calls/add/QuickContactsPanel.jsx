"use client";

import { useState } from "react";

import ContactRow from "@/components/calls/add/ContactRow";
import SearchField from "@/components/forms/SearchField";
import StaggerList from "@/components/lists/StaggerList";

/**
 * Quick Contacts & Speed Dial tab: a directory search over the same static
 * contact list every dialer opens with, each row one tap from dialing. The
 * rows sit in one bordered box that scrolls on its own past about four
 * contacts; it clips sideways so a row's reveal never flashes a scrollbar.
 *
 * The search draft is genuinely local and visual — nothing outside this tab
 * could ever need it, and it never needs to survive a refresh (rule 2's
 * `useState` exception), unlike a table's query, which is real view state.
 */
export default function QuickContactsPanel({ content, onSelect }) {
  const [query, setQuery] = useState("");
  const needle = query?.trim?.()?.toLowerCase?.() ?? "";
  const contacts = content?.contacts?.options?.filter(
    (contact) =>
      !needle ||
      contact?.name?.toLowerCase?.()?.includes(needle) ||
      contact?.account?.toLowerCase?.()?.includes(needle) ||
      contact?.tag?.toLowerCase?.()?.includes(needle),
  );

  return (
    <div className="flex flex-col gap-4">
      <SearchField
        search={content?.contacts?.search}
        value={query}
        onValueChange={setQuery}
        size="md"
      />

      <StaggerList
        items={contacts}
        className="max-h-88 gap-0 overflow-x-hidden overflow-y-auto rounded-8 border border-solid border-border-default"
      >
        {(contact, revealDelay) => (
          <ContactRow
            key={contact?.id}
            contact={contact}
            dialLabel={content?.contacts?.selectAndDialLabel}
            dialIcon={content?.contacts?.dialIcon}
            onSelect={onSelect}
            revealDelay={revealDelay}
          />
        )}
      </StaggerList>
    </div>
  );
}
