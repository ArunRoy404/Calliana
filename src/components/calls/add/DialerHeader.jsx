import IconTile from "@/components/atoms/IconTile";
import StatusBadge from "@/components/atoms/StatusBadge";

/**
 * The dialer's own header — the reference's primary icon tile, an 18px bold
 * title with the live PBX status pill, and the operator line ("Operator:
 * **Marcus Sterling** (Ext. 101)") — passed as `FormPanel`'s `header`
 * override instead of the default plain title/subtitle block.
 */
export default function DialerHeader({ content }) {
  const header = content?.header;

  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <IconTile icon={header?.icon} tone="primary" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-[18px] leading-[1.2] font-bold text-brand-text-black">
            {header?.title}
          </h2>
          <StatusBadge
            variant="pill"
            label={header?.status?.label}
            tone={header?.status?.tone}
          />
        </div>
        <p className="text-body-sm text-text-tertiary">
          {header?.operatorLabel}{" "}
          <span className="font-semibold text-brand-black">
            {header?.operator}
          </span>{" "}
          {header?.operatorExtension}
        </p>
      </div>
    </div>
  );
}
