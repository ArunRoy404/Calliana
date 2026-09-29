import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import Reveal from "@/components/motion/Reveal";

/**
 * One of a client's direct contacts — Figma 202:30415: name and role (and a
 * PRIMARY tag for the main one) over a rule, the number and email, then a
 * full-width direct-dial button. Reveals after `revealDelay`.
 */
export default function ContactCard({
  contact,
  labels,
  buttonProps,
  revealDelay = 0,
}) {
  return (
    <Reveal
      as="li"
      delay={revealDelay}
      className="flex min-w-0 flex-col gap-4 rounded-8 border border-solid border-border-strong bg-surface-base p-4 transition-shadow duration-200 ease-out hover:shadow-card"
    >
      <div className="flex items-start gap-2 border-b border-solid border-border-strong pb-2">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-body-lg truncate text-brand-black">
            {contact?.name}
          </p>
          <p className="text-body-md text-text-secondary">{contact?.role}</p>
        </div>
        {contact?.isPrimary && (
          <StatusBadge
            variant="tag"
            showDot={false}
            tone="info"
            label={labels?.primaryLabel}
          />
        )}
      </div>

      <div className="text-body-lg flex flex-col gap-2 text-text-secondary">
        <p>{contact?.phone}</p>
        <p className="break-all">{contact?.email}</p>
      </div>

      <Button variant="neutral" fullWidth {...buttonProps}>
        <AssetIcon icon={labels?.dialIcon} />
        {labels?.dialLabel}
      </Button>
    </Reveal>
  );
}
