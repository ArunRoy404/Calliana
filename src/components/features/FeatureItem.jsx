import IconTile from "@/components/atoms/IconTile";
import Reveal from "@/components/motion/Reveal";

/**
 * One feature row on the hero panel — Figma 43:8138.
 * Reveals as an item of `FeatureList`, so the rows cascade one by one.
 */
export default function FeatureItem({ icon, title, body }) {
  return (
    <Reveal as="li" item className="flex items-center gap-2">
      <IconTile icon={icon} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-label-lg text-text-on-primary">{title}</p>
        <p className="text-body-sm text-auth-feature-muted">{body}</p>
      </div>
    </Reveal>
  );
}
