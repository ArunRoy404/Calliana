"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import Reveal from "@/components/motion/Reveal";

/**
 * A call's recording — Figma 202:39212: a round primary play button beside a
 * primary-blue waveform, in a hairline box. The bars come from
 * `content.waveform`; each bar's height is a percentage, set inline because
 * it is data, not a class.
 *
 * Playback has no backend yet, so the button carries `notFunctional`.
 * Reveals after `revealDelay`.
 */
export default function CallRecordingPlayer({
  content,
  notFunctional,
  revealDelay = 0,
}) {
  const waveform = content?.waveform;

  return (
    <Reveal
      delay={revealDelay}
      className="flex items-center gap-3 rounded-8 border border-solid border-border-default bg-surface-base p-3"
    >
      <Button
        size="round"
        aria-label={content?.labels?.playLabel}
        {...notFunctional}
      >
        <AssetIcon icon={content?.playIcon} className="fill-current" />
      </Button>

      <div
        aria-hidden
        className="flex h-9 min-w-0 flex-1 items-center justify-between gap-px overflow-hidden"
      >
        {waveform?.bars?.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
            className="w-0.75 shrink-0 rounded-999 bg-action-primary"
          />
        ))}
      </div>
    </Reveal>
  );
}
