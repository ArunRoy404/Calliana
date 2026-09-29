import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import DetailSection from "@/components/cards/DetailSection";
import AppointmentRow from "@/components/clients/detail/AppointmentRow";
import StaggerList from "@/components/lists/StaggerList";
import { notFunctionalProps } from "@/lib/notFunctional";

/**
 * Appointments tab — Figma 202:30713: a full-width "Schedule Appointment",
 * then the account's appointments.
 */
export default function ClientAppointmentsTab({ client, content }) {
  const labels = content?.appointments;

  return (
    <DetailSection
      size="lg"
      action={
        <Button fullWidth {...notFunctionalProps(content)}>
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
