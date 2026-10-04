import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import FilterSelect from "@/components/forms/FilterSelect";
import SegmentedFilter from "@/components/forms/SegmentedFilter";

/**
 * The calendar's toolbar — the day navigator (previous, the anchor date,
 * next) on the left; the event-type dropdown, the Today / This Week / This
 * Month switch and "New Appointment" on the right. Every control is the
 * filter-bar height (rule 15). "New Appointment" opens the booking drawer.
 *
 * On a phone the two groups stack: the navigator fills the row with the date
 * centred between its arrows, and the controls wrap underneath. From `sm` up
 * they sit on one line as the design draws them.
 */
export default function CalendarToolbar({
  content,
  viewContent,
  dateLabel,
  view,
  eventType,
  onStep,
  onViewChange,
  onEventTypeChange,
  onNewAppointment,
}) {
  return (
    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          aria-label={viewContent?.previousLabel}
          onClick={() => onStep?.(-1)}
        >
          <AssetIcon icon={content?.previousIcon} />
        </Button>
        <p className="text-body-md flex-1 text-center font-medium whitespace-nowrap text-brand-black sm:flex-none sm:text-left">
          {dateLabel}
        </p>
        <Button
          variant="outline"
          size="icon"
          aria-label={viewContent?.nextLabel}
          onClick={() => onStep?.(1)}
        >
          <AssetIcon icon={content?.nextIcon} />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
        <FilterSelect
          variant="field"
          label={content?.eventTypes?.label}
          options={content?.eventTypes?.options}
          value={eventType}
          onValueChange={onEventTypeChange}
          className="w-auto"
        />
        <SegmentedFilter
          options={content?.views}
          value={view}
          onValueChange={onViewChange}
        />
        <Button size="sm" onClick={onNewAppointment}>
          <AssetIcon icon={content?.newAppointment?.icon} />
          {content?.newAppointment?.label}
        </Button>
      </div>
    </div>
  );
}
