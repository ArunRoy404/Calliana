import DetailSection from "@/components/cards/DetailSection";
import FactList from "@/components/cards/FactList";
import NoteWell from "@/components/cards/NoteWell";

/**
 * "Client Support Instructions" — the client's working hours and address,
 * then the greeting script to read on a primary-tinted well and the
 * emergency protocol on an amber-ruled one. Reveals after `revealDelay`.
 */
export default function SupportInstructionsCard({ support, revealDelay = 0 }) {
  return (
    <DetailSection size="lg" title={support?.title} revealDelay={revealDelay}>
      <FactList facts={support?.facts} layout="start" />
      <div className="flex flex-col gap-2">
        <p className="text-body-sm text-text-primary">
          {support?.greetingLabel}
        </p>
        <NoteWell tone="info" className="text-body-sm p-2">
          {support?.greeting}
        </NoteWell>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-body-sm text-status-warning">
          {support?.emergencyLabel}
        </p>
        <NoteWell tone="warning" className="text-body-sm p-2">
          {support?.emergency}
        </NoteWell>
      </div>
    </DetailSection>
  );
}
