"use client";

import Button from "@/components/atoms/Button";
import InfoTile from "@/components/cards/InfoTile";
import StaggerList from "@/components/lists/StaggerList";
import SidePanel from "@/components/overlays/SidePanel";
import { useRetainedValue } from "@/hooks/useRetainedValue";
import { useStoreParams } from "@/hooks/useUrlParams";
import { notFunctionalProps } from "@/lib/notFunctional";
import { useAppointmentsStore } from "@/store/admin/useAppointmentsStore";

/**
 * One appointment's details, on the shared `SidePanel` — opened by choosing
 * an event in any calendar view (`?appointment=<id>`, rule 20). The title
 * and "Scheduled for …" line head a column of compact `InfoTile`s tinted in
 * the event type's tone; Cancel Booking sits apart on the left, Close and
 * Reschedule on the right. Cancelling and rescheduling have no backend yet,
 * so they carry `notFunctional`. The last appointment stays on screen while
 * the panel slides away.
 */
export default function AppointmentDetailPanel() {
  const params = useStoreParams(useAppointmentsStore);
  const selected = useAppointmentsStore((state) =>
    state.selectedAppointment(params),
  );
  const setOpen = useAppointmentsStore((state) => state.setDetailOpen);
  const content = useAppointmentsStore((state) => state.content);
  const detail = useAppointmentsStore((state) => state.detailContent);

  const appointment = useRetainedValue(selected);
  const notFunctional = notFunctionalProps(content);

  return (
    <SidePanel
      open={Boolean(selected)}
      onOpenChange={setOpen}
      title={appointment?.panelTitle}
      subtitle={appointment?.panelSubtitle}
      footer={
        <>
          <Button variant="danger" className="mr-auto" {...notFunctional}>
            {detail?.cancelLabel}
          </Button>
          <Button variant="neutral" onClick={() => setOpen?.(false)}>
            {detail?.closeLabel}
          </Button>
          <Button {...notFunctional}>{detail?.rescheduleLabel}</Button>
        </>
      }
    >
      <StaggerList items={detail?.fields} className="gap-2">
        {(field, delay) => (
          <InfoTile
            key={field?.id}
            as="li"
            size="sm"
            tone={appointment?.tone}
            label={field?.label}
            revealDelay={delay}
          >
            {appointment?.[field?.id]}
          </InfoTile>
        )}
      </StaggerList>
    </SidePanel>
  );
}
