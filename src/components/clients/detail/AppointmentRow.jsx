import StatusBadge from "@/components/atoms/StatusBadge";
import RowCard from "@/components/cards/RowCard";

/**
 * One appointment — Figma 202:30717: a date chip, the kind of appointment,
 * time · with whom, and whether it is upcoming or done.
 */
export default function AppointmentRow({ appointment, revealDelay = 0 }) {
  return (
    <RowCard variant="rounded" revealDelay={revealDelay}>
      <span className="text-label-sm flex size-10 shrink-0 flex-col items-center justify-center rounded-8 bg-surface-selected">
        <span className="text-action-primary">{appointment?.day}</span>
        <span className="text-text-tertiary">{appointment?.month}</span>
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-label-lg text-text-primary">{appointment?.title}</p>
        <p className="text-body-sm text-text-tertiary">{appointment?.meta}</p>
      </div>

      <StatusBadge
        variant="tag"
        label={appointment?.status?.label}
        tone={appointment?.status?.tone}
      />
    </RowCard>
  );
}
