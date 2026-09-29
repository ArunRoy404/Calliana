import AssetIcon from "@/components/atoms/AssetIcon";
import Reveal from "@/components/motion/Reveal";

/**
 * A titled block of guidance for agents — Figma 198:31377 ("Agent Handling
 * Protocol & Support Instructions"): an icon and title, then the text on a
 * grey well. Reveals after `revealDelay`.
 */
export default function InstructionCard({
  icon,
  title,
  children,
  revealDelay = 0,
}) {
  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className="flex min-w-0 flex-col gap-2 self-start rounded-4 border border-solid border-border-default bg-surface-base p-4"
    >
      <h3 className="text-label-lg flex min-w-0 items-center gap-2 text-brand-black">
        <AssetIcon icon={icon} className="shrink-0" />
        <span className="truncate">{title}</span>
      </h3>
      <p className="text-body-md rounded-8 bg-action-secondary p-4 text-text-secondary">
        {children}
      </p>
    </Reveal>
  );
}
