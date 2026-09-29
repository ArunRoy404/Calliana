import AppImage from "@/components/atoms/AppImage";
import Button from "@/components/atoms/Button";
import ScheduleSlotRow from "@/components/agents/detail/ScheduleSlotRow";
import UpcomingEventRow from "@/components/agents/detail/UpcomingEventRow";
import StaggerList from "@/components/lists/StaggerList";
import Reveal from "@/components/motion/Reveal";
import { nestedRevealDelayAt, revealDelayAt } from "@/lib/motion";

/**
 * Schedule tab — Figma 199:43789: today's date with a link to the full
 * calendar, today's slots in one ruled box, then the rest of the week.
 */
export default function AgentScheduleTab({ agent, content, notFunctional }) {
  const labels = content?.labels;
  const upcomingStart = revealDelayAt(0, 2);

  return (
    <>
      <Reveal className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-body-md text-text-primary">
          {labels?.scheduleToday}
        </p>
        <Button variant="neutral" {...notFunctional}>
          <AppImage
            src={content?.calendarIcon?.src}
            width={content?.calendarIcon?.width}
            height={content?.calendarIcon?.height}
          />
          {labels?.fullCalendar}
        </Button>
      </Reveal>

      <Reveal
        as="ul"
        delay={revealDelayAt(0, 1)}
        className="flex flex-col overflow-hidden rounded-4 border border-solid border-border-default bg-surface-base"
      >
        {agent?.scheduleToday?.map((slot, index) => (
          <ScheduleSlotRow
            key={slot?.id}
            slot={slot}
            revealDelay={nestedRevealDelayAt(revealDelayAt(0, 1), index)}
          />
        ))}
      </Reveal>

      <Reveal
        as="section"
        delay={upcomingStart}
        className="flex flex-col gap-4"
      >
        <h3 className="text-label-lg text-text-primary">
          {labels?.upcomingTitle}
        </h3>
        <StaggerList items={agent?.upcoming} revealDelay={upcomingStart}>
          {(event, revealDelay) => (
            <UpcomingEventRow
              key={event?.id}
              event={event}
              revealDelay={revealDelay}
            />
          )}
        </StaggerList>
      </Reveal>
    </>
  );
}
