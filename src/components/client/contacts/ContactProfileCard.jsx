import MetaLine from "@/components/atoms/MetaLine";
import UserAvatar from "@/components/atoms/UserAvatar";
import Reveal from "@/components/motion/Reveal";

/**
 * The top of a contact's details drawer: their initials avatar, name, the
 * "Patient • Related to Dr. Rodríguez" line, and their phone and email, on
 * a hairline card. Reveals after `revealDelay`.
 */
export default function ContactProfileCard({ contact, revealDelay = 0 }) {
  return (
    <Reveal
      delay={revealDelay}
      className="flex min-w-0 items-center gap-4 rounded-8 border border-solid border-border-default bg-surface-base p-4"
    >
      <UserAvatar name={contact?.name} size="lg" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-body-lg truncate font-semibold text-brand-ink-black">
          {contact?.name}
        </h3>
        <p className="text-body-md text-text-secondary">{contact?.role}</p>
        <MetaLine size="sm" items={[contact?.phone, contact?.email]} />
      </div>
    </Reveal>
  );
}
