"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { cn } from "@/lib/cn";

/**
 * The one centred dialog every screen-middle confirmation is built on — Figma
 * 319:34461 (Change Password): a scrim behind a box centred both axes, not a
 * right-edge drawer (that is `overlays/SidePanel` — rule 30 on when to use
 * which). Same shape as `SidePanel`: a `title` (+ optional `subtitle`), a
 * body and an optional sticky-feeling `footer`, so a feature supplies only
 * its content.
 */
export default function Modal({
  open,
  onOpenChange,
  title,
  subtitle,
  footer,
  children,
  className,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("w-175 max-w-[calc(100%-2rem)] gap-0 p-6", className)}>
        <div className="flex flex-col gap-2 border-b border-solid border-border-strong pb-4">
          <DialogTitle className="text-h4 text-brand-text-black">{title}</DialogTitle>
          {subtitle && (
            <DialogDescription className="text-body-sm text-text-muted">
              {subtitle}
            </DialogDescription>
          )}
          {!subtitle && <DialogDescription className="sr-only">{title}</DialogDescription>}
        </div>

        <div className="flex flex-col gap-4 py-4">{children}</div>

        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-solid border-brand-track pt-4">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
