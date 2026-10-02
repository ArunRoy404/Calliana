import AssetIcon from "@/components/atoms/AssetIcon";
import Reveal from "@/components/motion/Reveal";

/**
 * What the inbox shows beside the list until a conversation is opened — an
 * icon, a title and a prompt to pick one, centred across the thread and
 * client-info columns. Reveals after `revealDelay`.
 */
export default function ThreadPlaceholder({ placeholder, revealDelay = 0 }) {
  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className="flex min-h-80 flex-col items-center justify-center gap-3 p-6 text-center xl:col-span-2"
    >
      <span className="flex size-16 items-center justify-center rounded-999 bg-surface-selected text-action-primary">
        <AssetIcon icon={placeholder?.icon} />
      </span>
      <h2 className="text-h4 text-brand-text-black">{placeholder?.title}</h2>
      <p className="text-body-md max-w-80 text-text-tertiary">
        {placeholder?.text}
      </p>
    </Reveal>
  );
}
