import * as LucideIcons from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * Renders a lucide icon by name, so data files can name an icon as a string
 * instead of importing a component.
 *
 * lucide is shadcn's icon set and already a dependency. Figma's export
 * collapses every sidebar row to one generic glyph, so the file cannot supply
 * the distinct icons the design shows.
 */
export default function Icon({ name, size = 20, className, ...props }) {
  const LucideIcon = LucideIcons?.[name];
  if (!LucideIcon) return null;

  return (
    <LucideIcon
      size={size}
      strokeWidth={1.75}
      aria-hidden
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
