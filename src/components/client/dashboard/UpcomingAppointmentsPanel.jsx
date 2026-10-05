import PanelLink from "@/components/actions/PanelLink";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import DetailSection from "@/components/cards/DetailSection";
import Timeline from "@/components/timeline/Timeline";

/**
 * "Upcoming Appointments" — the secretary's next bookings as a timeline:
 * each a toned marker, the booking and its "who • when" line, with its type
 * tag and an "Open" link at the right. "View Calendar" opens the full
 * calendar. Reveals after `revealDelay`; its bookings follow it in.
 */
export default function UpcomingAppointmentsPanel({
  appointments,
  events,
  separator,
  revealDelay = 0,
}) {
  return (
    <DetailSection
      size="lg"
      title={appointments?.title}
      subtitle={appointments?.subtitle}
      action={<PanelLink link={appointments?.link} />}
      revealDelay={revealDelay}
    >
      <Timeline
        events={events}
        separator={separator}
        revealDelay={revealDelay}
        renderAside={(event) => (
          <>
            <StatusBadge
              variant="plain"
              label={event?.tag?.label}
              tone={event?.tag?.tone}
            />
            <Button variant="neutral" size="compact" href={event?.openHref}>
              {appointments?.openLabel}
            </Button>
          </>
        )}
      />
    </DetailSection>
  );
}
