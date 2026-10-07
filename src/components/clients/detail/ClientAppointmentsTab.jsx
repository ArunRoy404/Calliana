import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import DetailSection from "@/components/cards/DetailSection";
import AppointmentRow from "@/components/clients/detail/AppointmentRow";
import StaggerList from "@/components/lists/StaggerList";
import { notFunctionalProps } from "@/lib/notFunctional";

/**
 * Appointments tab — Figma 202:30713: a full-width "Schedule Appointment",
 * then the account's appointments. With the portal's `actionHref` (the
 * admin's calendar, new-appointment drawer open) the button is a link;
 * without one it toasts not-wired-up.
 */
export default function ClientAppointmentsTab({ client, content }) {
  const labels = content?.appointments;

  return (
    <DetailSection
      size="lg"
      action={
        <Button
          fullWidth
          {...(labels?.actionHref
            ? { href: labels?.actionHref }
            : notFunctionalProps(content))}
        >
          <AssetIcon icon={labels?.actionIcon} />
          {labels?.actionLabel}
        </Button>
      }
    >
      <StaggerList items={client?.appointments}>
        {(appointment, revealDelay) => (
          <AppointmentRow
            key={appointment?.id}
            appointment={appointment}
            revealDelay={revealDelay}
          />
        )}
      </StaggerList>
    </DetailSection>
  );
}
