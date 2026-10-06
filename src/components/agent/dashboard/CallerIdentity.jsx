import IconLabel from "@/components/atoms/IconLabel";
import MetaLine from "@/components/atoms/MetaLine";
import StatusDot from "@/components/atoms/StatusDot";

/**
 * Who is on the line: "CALLER IDENTITY • Matched Contact", the caller's
 * name, then their phone and location.
 */
export default function CallerIdentity({ caller }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className="flex flex-wrap items-center gap-2">
        <span className="text-label-sm uppercase text-text-tertiary">
          {caller?.label}
        </span>
        <StatusDot tone="success" />
        <IconLabel
          icon={caller?.match?.icon}
          className="text-label-md text-status-success"
        >
          {caller?.match?.label}
        </IconLabel>
      </p>
      <p className="text-body-lg truncate font-semibold text-brand-black">
        {caller?.name}
      </p>
      <MetaLine
        separator=""
        items={[
          <IconLabel key="phone" icon={caller?.phoneIcon}>
            {caller?.phone}
          </IconLabel>,
          <IconLabel key="location" icon={caller?.locationIcon}>
            {caller?.location}
          </IconLabel>,
        ]}
      />
    </div>
  );
}
