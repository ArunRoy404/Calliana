import AppImage from "@/components/atoms/AppImage";
import Reveal from "@/components/motion/Reveal";

/**
 * A tinted heads-up box — Figma 198:32558 ("Invitation email will be sent"):
 * an icon, a bold line and a supporting sentence on the primary tint.
 */
export default function NoticeCard({
  icon,
  title,
  description,
  revealDelay = 0,
}) {
  return (
    <Reveal
      delay={revealDelay}
      className="flex items-start gap-4 rounded-12 border border-solid border-action-primary/20 bg-surface-selected p-4 text-action-primary"
    >
      {icon && (
        <AppImage
          src={icon?.src}
          width={icon?.width}
          height={icon?.height}
          className="shrink-0"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-label-lg">{title}</p>
        <p className="text-body-sm">{description}</p>
      </div>
    </Reveal>
  );
}
