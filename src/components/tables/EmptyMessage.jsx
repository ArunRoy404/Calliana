/**
 * The "nothing matches" line a list shows when a search or filter empties it.
 * One look for the table view and the card view alike.
 */
export default function EmptyMessage({ children }) {
  return (
    <p className="text-body-sm px-4 py-10 text-center text-text-tertiary">
      {children}
    </p>
  );
}
