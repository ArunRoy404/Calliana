import DetailSection from "@/components/cards/DetailSection";
import NoteCard from "@/components/clients/detail/NoteCard";
import NoteComposer from "@/components/clients/detail/NoteComposer";
import StaggerList from "@/components/lists/StaggerList";
import { revealDelayAt } from "@/lib/motion";

/**
 * Support Instructions tab — Figma 202:30950: a box for a new note, then the
 * notes agents have left on the account, newest first.
 */
export default function ClientNotesTab({ client }) {
  const notesStart = revealDelayAt(0, 1);

  return (
    <DetailSection size="lg">
      <NoteComposer />
      <StaggerList items={client?.notes} revealDelay={notesStart}>
        {(note, revealDelay) => (
          <NoteCard key={note?.id} note={note} revealDelay={revealDelay} />
        )}
      </StaggerList>
    </DetailSection>
  );
}
