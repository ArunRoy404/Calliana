import AssetIcon from "@/components/atoms/AssetIcon";
import ElapsedTimer from "@/components/atoms/ElapsedTimer";
import StatusBadge from "@/components/atoms/StatusBadge";
import StatusDot from "@/components/atoms/StatusDot";
import Waveform from "@/components/charts/Waveform";

/**
 * The primary band across the top of the live call: a white dot and "LIVE
 * INBOUND CALL" beside the Zoiper connection tag, then the running call
 * timer and a small white waveform at the right (the waveform drops away on
 * a phone, where the band is narrow).
 */
export default function LiveCallHeader({ call, waveform }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-action-primary px-5 py-3 text-text-on-primary">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <p className="text-label-md flex items-center gap-2 uppercase">
          <StatusDot className="size-2 bg-text-on-primary" />
          {call?.label}
        </p>
        <StatusBadge
          variant="tag"
          label={call?.connection?.label}
          tone={call?.connection?.tone}
        />
      </div>

      <div className="flex items-center gap-3">
        <AssetIcon icon={call?.timerIcon} />
        <ElapsedTimer
          startSeconds={call?.elapsedSeconds}
          label={call?.timerLabel}
          className="text-h3"
        />
        <Waveform
          bars={waveform}
          size="sm"
          tone="inverse"
          className="max-sm:hidden"
        />
      </div>
    </div>
  );
}
