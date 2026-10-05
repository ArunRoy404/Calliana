/**
 * A block of guidance text on a grey well — inside `InstructionCard` (Figma
 * 198:31377) and under the business profile's "Support Instructions for
 * Agents". Not a reveal of its own: it arrives with the card around it.
 */
export default function NoteWell({ children }) {
  return (
    <p className="text-body-md rounded-8 bg-action-secondary p-4 text-text-secondary">
      {children}
    </p>
  );
}
