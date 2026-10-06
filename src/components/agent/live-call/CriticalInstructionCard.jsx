import AssetIcon from "@/components/atoms/AssetIcon";
import IconLabel from "@/components/atoms/IconLabel";
import Reveal from "@/components/motion/Reveal";

/**
 * The caller's standing instruction, impossible to miss: a large amber
 * warning sign beside "CRITICAL CONTACT INSTRUCTION", the rule itself and
 * an amber-ruled "STRICT COMPLIANCE REQUIRED" tag, on an amber card.
 * Reveals after `revealDelay`.
 */
export default function CriticalInstructionCard({ critical, revealDelay = 0 }) {
  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className="flex min-w-0 gap-4 rounded-8 bg-status-warning-bg p-5"
    >
      <AssetIcon
        icon={critical?.icon}
        className="shrink-0 text-status-warning"
      />
      <div className="flex min-w-0 flex-col gap-3">
        <h3 className="text-label-lg tracking-wide text-status-warning">
          {critical?.title}
        </h3>
        <p className="text-body-sm text-text-primary">{critical?.text}</p>
        <IconLabel
          icon={critical?.tag?.icon}
          className="text-label-md w-full border border-solid border-status-warning px-3 py-1.5 text-status-warning"
        >
          {critical?.tag?.label}
        </IconLabel>
      </div>
    </Reveal>
  );
}
