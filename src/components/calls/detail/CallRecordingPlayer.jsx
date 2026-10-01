import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * A static waveform with a play button and the call's duration — Figma
 * 202:39243 ("Call Recording Audio"). There is no audio backend yet, so the
 * waveform is decorative and Play is `notFunctional`.
 */
const BAR_HEIGHTS = [
  40, 60, 30, 70, 45, 80, 35, 55, 65, 40, 30, 50, 70, 45, 60, 35, 55, 40, 65,
  50, 30, 60, 45, 70, 40, 55, 35, 65, 50, 30, 45, 60,
];

export default function CallRecordingPlayer({ call, content, notFunctional, revealDelay = 0 }) {
  return (
    <Reveal
      delay={revealDelay}
      className="flex items-center gap-4 rounded-8 border border-solid border-border-default bg-surface-canvas p-4"
    >
      <Button
        variant="info"
        size="square"
        aria-label={content?.labels?.playLabel}
        {...notFunctional}
      >
        <AssetIcon icon={content?.playIcon} />
      </Button>

      <div aria-hidden className="flex h-10 min-w-0 flex-1 items-end gap-0.5">
        {BAR_HEIGHTS?.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
            className={cn(
              "min-w-[2px] flex-1 rounded-999",
              index < 10 ? "bg-action-primary" : "bg-action-primary/25",
            )}
          />
        ))}
      </div>

      <span className="text-label-md shrink-0 text-text-secondary">{call?.duration}</span>
    </Reveal>
  );
}
