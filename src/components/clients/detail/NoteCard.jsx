import UserAvatar from "@/components/atoms/UserAvatar";
import RowCard from "@/components/cards/RowCard";

/**
 * One support note — Figma 202:30954: the author's initials chip, name and
 * when, then the note.
 */
export default function NoteCard({ note, revealDelay = 0 }) {
  return (
    <RowCard variant="compact" revealDelay={revealDelay}>
      <div className="flex min-w-0 items-center gap-2">
        <UserAvatar name={note?.author} size="chip" tone={note?.tone} />
        <p className="text-label-md truncate font-semibold text-text-primary">
          {note?.author}
        </p>
        <p className="text-body-sm shrink-0 text-text-disabled">{note?.time}</p>
      </div>
      <p className="text-body-md text-text-secondary">{note?.text}</p>
    </RowCard>
  );
}
