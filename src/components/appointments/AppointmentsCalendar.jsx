"use client";

import { useMemo } from "react";

import AppointmentDetailPanel from "@/components/appointments/AppointmentDetailPanel";
import CalendarDayCard from "@/components/appointments/CalendarDayCard";
import CalendarMonthView from "@/components/appointments/CalendarMonthView";
import CalendarToolbar from "@/components/appointments/CalendarToolbar";
import CalendarWeekView from "@/components/appointments/CalendarWeekView";
import ScheduleAppointmentPanel from "@/components/appointments/ScheduleAppointmentPanel";
import StaggerList from "@/components/lists/StaggerList";
import TableCard from "@/components/tables/TableCard";
import { useStoreParams } from "@/hooks/useUrlParams";
import { revealDelayAt } from "@/lib/motion";
import { useAppointmentsStore } from "@/store/admin/useAppointmentsStore";

/**
 * Appointments & Calendar — the toolbar over the current view, on the
 * shared textured `TableCard`: Today's day card, This Week's time grid or
 * This Month's grid. The view, the event type and the anchor day are the
 * URL's (rule 26), read once here through the store and handed down; the
 * card reveals first and the view follows it in. Choosing an event opens its
 * details drawer; "New Appointment" opens the booking drawer — both are
 * URL keys too.
 */
const GRID_VIEWS = { week: CalendarWeekView, month: CalendarMonthView };

export default function AppointmentsCalendar() {
  const params = useStoreParams(useAppointmentsStore);
  const content = useAppointmentsStore((state) => state.content);
  const view = useAppointmentsStore((state) => state.view(params));
  const eventType = useAppointmentsStore((state) => state.eventType(params));
  const dateLabel = useAppointmentsStore((state) => state.dateLabel(params));
  const viewContent = useAppointmentsStore((state) =>
    state.viewContent(params),
  );
  const deriveCalendar = useAppointmentsStore((state) => state.deriveCalendar);
  const setView = useAppointmentsStore((state) => state.setView);
  const setEventType = useAppointmentsStore((state) => state.setEventType);
  const step = useAppointmentsStore((state) => state.step);
  const openAppointment = useAppointmentsStore(
    (state) => state.openAppointment,
  );
  const openAdd = useAppointmentsStore((state) => state.openAdd);

  const calendar = useMemo(
    () => deriveCalendar?.(params),
    [deriveCalendar, params],
  );
  const GridView = GRID_VIEWS?.[calendar?.view];

  return (
    <>
      <TableCard
        texture={content?.texture}
        toolbar={
          <CalendarToolbar
            content={content}
            viewContent={viewContent}
            dateLabel={dateLabel}
            view={view}
            eventType={eventType}
            onStep={(direction) => step?.(params, direction)}
            onViewChange={setView}
            onEventTypeChange={setEventType}
            onNewAppointment={openAdd}
          />
        }
      >
        <div className="px-4 pb-4">
          {GridView ? (
            <GridView
              calendar={calendar}
              onOpen={openAppointment}
              revealDelay={revealDelayAt(0, 1)}
            />
          ) : (
            <StaggerList items={calendar?.days} className="gap-4">
              {(day, delay) => (
                <CalendarDayCard
                  key={day?.id}
                  day={day}
                  emptyLabel={content?.emptyDay}
                  onOpen={openAppointment}
                  revealDelay={delay}
                />
              )}
            </StaggerList>
          )}
        </div>
      </TableCard>

      <AppointmentDetailPanel />
      <ScheduleAppointmentPanel />
    </>
  );
}
