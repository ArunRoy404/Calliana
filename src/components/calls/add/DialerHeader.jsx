import IconTile from "@/components/atoms/IconTile";
import StatusBadge from "@/components/atoms/StatusBadge";

/**
 * The dialer's own header — the reference image's icon tile, title, live PBX
 * status and operator line — passed as `FormPanel`'s `header` override
 * instead of the default plain title/subtitle block.
 */
export default function DialerHeader({ content }) {
  return (
    <div className="flex min-w-0 flex-1 items-start gap-3">
      <IconTile icon={content?.header?.icon} tone="primary" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-h4 text-brand-text-black">{content?.header?.title}</h2>
          <StatusBadge
            variant="pill"
            label={content?.header?.status?.label}
            tone={content?.header?.status?.tone}
          />
        </div>
        <p className="text-body-sm text-text-muted">
          {content?.header?.operatorLabel?.replace("{operator}", content?.header?.operator ?? "")}
        </p>
      </div>
    </div>
  );
}
