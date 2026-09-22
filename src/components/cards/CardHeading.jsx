import { cn } from "@/lib/cn";

/**
 * Title + subtitle block at the top of an auth card — Figma 43:8224.
 * Every auth screen repeats this pair, so it takes them as props.
 *
 * Verify-email emphasises the address inside its subtitle, so a subtitle can
 * also be given as a prefix plus an emphasised tail.
 */
export default function CardHeading({
  title,
  subtitle,
  subtitlePrefix,
  subtitleEmphasis,
  as: Tag = "h1",
  className,
}) {
  const hasSubtitle = subtitle || subtitlePrefix || subtitleEmphasis;

  return (
    <div className={cn("flex flex-col justify-center gap-4", className)}>
      <Tag className="text-h3 text-text-primary">{title}</Tag>

      {hasSubtitle && (
        <p className="text-body-md text-text-secondary">
          {subtitlePrefix}
          {subtitleEmphasis && (
            <span className="text-label-lg text-text-primary">
              {subtitleEmphasis}
            </span>
          )}
          {subtitle}
        </p>
      )}
    </div>
  );
}
