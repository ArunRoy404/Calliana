import { cn } from "@/lib/cn";

/**
 * Title + subtitle block at the top of an auth card — Figma 43:8224.
 * Every auth screen repeats this pair, so it takes them as props.
 */
export default function CardHeading({ title, subtitle, as: Tag = "h1", className }) {
  return (
    <div className={cn("flex flex-col justify-center gap-4", className)}>
      <Tag className="text-h3 text-text-primary">{title}</Tag>
      {subtitle && <p className="text-body-md text-text-secondary">{subtitle}</p>}
    </div>
  );
}
