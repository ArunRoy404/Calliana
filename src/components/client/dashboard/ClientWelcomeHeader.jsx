import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import Reveal from "@/components/motion/Reveal";

/**
 * The top of the client home: the business's name and status, a welcome
 * line, and "Submit Instruction/Request" at the right (below it on a narrow
 * screen), ruled off underneath. The button links to the requests page
 * with its new-request drawer open. Reveals after `revealDelay`.
 */
export default function ClientWelcomeHeader({ header, revealDelay = 0 }) {
  return (
    <Reveal
      as="header"
      delay={revealDelay}
      className="flex flex-wrap items-center justify-between gap-4 border-b border-solid border-border-strong pb-4"
    >
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <h2 className="text-h3 min-w-0 text-brand-ink-black">
            {header?.name}
          </h2>
          <StatusBadge
            variant="tag"
            label={header?.status?.label}
            tone={header?.status?.tone}
          />
        </div>
        <p className="text-body-sm text-text-secondary">{header?.subtitle}</p>
      </div>

      <Button href={header?.action?.href}>
        <AssetIcon icon={header?.action?.icon} />
        {header?.action?.label}
      </Button>
    </Reveal>
  );
}
