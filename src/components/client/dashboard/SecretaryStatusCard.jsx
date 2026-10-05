import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import Reveal from "@/components/motion/Reveal";

/**
 * The client home's secretary banner: the team's picture, its tags ("Virtual
 * Secretary Team", "Line Active & Connected"), the headline, the standing
 * instruction they work to (one line, truncated), and "Message Secretary
 * Desk" — a link to the client's messages. Reveals after `revealDelay`.
 */
export default function SecretaryStatusCard({ secretary, revealDelay = 0 }) {
  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className="flex flex-wrap items-center gap-4 bg-surface-base p-4 sm:flex-nowrap"
    >
      <UserAvatar name={secretary?.name} src={secretary?.avatar} size="lg" />

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {secretary?.tags?.map((tag) => (
            <StatusBadge
              key={tag?.id}
              variant="tag"
              label={tag?.label}
              tone={tag?.tone}
              showDot={tag?.showDot}
            />
          ))}
        </div>
        <h2 className="text-h4 text-brand-ink-black">{secretary?.title}</h2>
        <p className="text-body-sm truncate text-text-tertiary">
          {secretary?.instruction}
        </p>
      </div>

      <Button variant="neutral" href={secretary?.action?.href}>
        <AssetIcon icon={secretary?.action?.icon} />
        {secretary?.action?.label}
      </Button>
    </Reveal>
  );
}
