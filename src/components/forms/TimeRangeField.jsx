import InputField from "@/components/forms/InputField";

/**
 * One day of working hours — Figma 198:32512: the day, a start time, "TO",
 * an end time. Both times are native time inputs through `InputField`, so they
 * share its height, border and focus with every other field.
 */
const CLOCK_ICON = { src: "/icons/clock.svg", width: 16, height: 16 };

export default function TimeRangeField({
  label,
  separator,
  from,
  to,
  fromLabel,
  toLabel,
  onChange,
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <p className="text-label-md min-w-0 flex-1 text-text-secondary">
        {label}
      </p>

      <InputField
        type="time"
        aria-label={fromLabel}
        value={from ?? ""}
        onChange={(event) => onChange?.("from", event?.target?.value ?? "")}
        trailingIcon={CLOCK_ICON}
        className="flex-1"
      />

      <span className="text-label-md shrink-0 text-text-secondary">
        {separator}
      </span>

      <InputField
        type="time"
        aria-label={toLabel}
        value={to ?? ""}
        onChange={(event) => onChange?.("to", event?.target?.value ?? "")}
        trailingIcon={CLOCK_ICON}
        className="flex-1"
      />
    </div>
  );
}
