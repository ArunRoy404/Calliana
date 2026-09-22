import AppImage from "@/components/atoms/AppImage";
import StatusBadge from "@/components/atoms/StatusBadge";

/** One live call — Figma 191:16825. */
export default function LiveCallRow({ call }) {
  return (
    <li className="flex items-center gap-3 border-b border-solid border-border-default py-3 last:border-b-0">
      <AppImage
        src={call?.avatar?.src}
        width={call?.avatar?.width}
        height={call?.avatar?.height}
        alt=""
        className="shrink-0 rounded-999 object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-body-md flex flex-wrap items-center gap-x-2 text-text-primary">
          <span className="truncate">{call?.caller}</span>
          <span aria-hidden className="text-text-tertiary">•</span>
          <span className="text-body-sm text-text-tertiary">{call?.channel}</span>
        </p>
        <p className="text-body-sm truncate text-text-secondary">
          {call?.client}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <p className="text-body-sm hidden text-text-tertiary sm:block">
          {call?.agent} • {call?.duration}
        </p>
        <StatusBadge label={call?.status?.label} tone={call?.status?.tone} />
      </div>
    </li>
  );
}
