"use client";

import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import NoteWell from "@/components/cards/NoteWell";
import RowCard from "@/components/cards/RowCard";
import SegmentedFilter from "@/components/forms/SegmentedFilter";
import Reveal from "@/components/motion/Reveal";
import StaggerList from "@/components/lists/StaggerList";
import { useStoreParams } from "@/hooks/useUrlParams";
import { useLiveCallStore } from "@/store/agent/useLiveCallStore";

/**
 * The "Calendar" tab — the caller's current appointment, the Day / Week /
 * Month switch (the URL's `?view=`) over that view's open and booked slots,
 * then "Full Calendar" and "Create Appointment" (links to the calendar
 * page) and a reminder to put the booking back into the call note.
 */
export default function CallCalendarPanel({ calendar }) {
  const params = useStoreParams(useLiveCallStore);
  const view = useLiveCallStore((state) => state.view(params));
  const slots = useLiveCallStore((state) => state.slots(params));
  const setView = useLiveCallStore((state) => state.setView);
  const current = calendar?.current;

  return (
    <div className="flex flex-col gap-4">
      <Reveal className="flex flex-col gap-1">
        <h3 className="text-h4 text-brand-black">{calendar?.title}</h3>
        <p className="text-body-md text-text-secondary">{calendar?.subtitle}</p>
      </Reveal>

      <RowCard
        as="div"
        variant="rounded"
        className="flex-col items-stretch gap-2"
      >
        <span className="flex items-start justify-between gap-2">
          <span className="text-label-lg text-brand-black">
            {current?.label}
          </span>
          <StatusBadge
            showDot={false}
            label={current?.status?.label}
            tone={current?.status?.tone}
            className="rounded-6"
          />
        </span>
        <span className="text-h4 text-brand-black">{current?.when}</span>
        <span className="text-body-md text-text-secondary">
          {current?.detail}
        </span>
      </RowCard>

      <SegmentedFilter
        variant="boxed"
        options={calendar?.views}
        value={view}
        onValueChange={setView}
      />

      <RowCard as="div" variant="rounded" className="flex-col items-stretch">
        <span className="text-label-lg text-brand-black">{slots?.heading}</span>
        <StaggerList items={slots?.rows} className="gap-2">
          {(slot, delay) => (
            <RowCard
              key={slot?.id}
              variant="bare"
              revealDelay={delay}
              className="flex-row items-center justify-between gap-3"
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className="text-label-lg w-24 shrink-0 text-brand-black">
                  {slot?.time}
                </span>
                <span className="text-body-md truncate text-text-secondary">
                  {slot?.who}
                </span>
              </span>
              <StatusBadge
                showDot={false}
                label={slot?.badge?.label}
                tone={slot?.badge?.tone}
                className="rounded-6"
              />
            </RowCard>
          )}
        </StaggerList>
      </RowCard>

      <Reveal className="flex gap-2">
        <Button variant="neutral" size="md" href={calendar?.fullCalendar?.href}>
          {calendar?.fullCalendar?.label}
        </Button>
        <Button size="md" href={calendar?.create?.href} className="flex-1">
          {calendar?.create?.label}
        </Button>
      </Reveal>

      <Reveal>
        <NoteWell tone="info">{calendar?.note}</NoteWell>
      </Reveal>
    </div>
  );
}
