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
 * which). Same shape as `SidePanel`: a `title` (+ optional `subtitle`) or a
 * custom `header`, a body and an optional `footer`, so a feature supplies
 * only its content.
 *
 * `variant`:
 * - `plain` (default) — one padded box, header and footer ruled off inside
 *   it (Change Password);
 * - `sectioned` — full-width header and footer bands with the body scrolling
 *   between them, capped to the viewport (the outbound dialer, 202:38997).
 *
 * With a custom `header`, `title` still names the dialog for screen readers.
 */
const VARIANT_CLASSES = {
  plain: {
    content: "p-6",
    header: "border-border-strong pb-4",
    body: "py-4",
    footer: "border-brand-track pt-4",
  },
  sectioned: {
    content: "flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden p-0",
    header: "shrink-0 border-border-default px-6 py-4",
    body: "min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-6 py-5",
    footer: "shrink-0 border-border-default bg-surface-canvas px-6 py-4",
  },
};

export default function Modal({
  open,
  onOpenChange,
  title,
  subtitle,
  header,
  footer,
  variant = "plain",
  children,
  className,
}) {
  const look = VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.plain;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-175 max-w-[calc(100%-2rem)] gap-0",
          look?.content,
          className,
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-2 border-b border-solid pr-8",
            look?.header,
          )}
        >
          {header ?? (
            <DialogTitle className="text-h4 text-brand-text-black">
              {title}
            </DialogTitle>
          )}
          {header && <DialogTitle className="sr-only">{title}</DialogTitle>}
          {subtitle && !header && (
            <DialogDescription className="text-body-sm text-text-muted">
              {subtitle}
            </DialogDescription>
          )}
          {(header || !subtitle) && (
            <DialogDescription className="sr-only">
              {subtitle ?? title}
            </DialogDescription>
          )}
        </div>

        <div className={cn("flex flex-col gap-4", look?.body)}>{children}</div>

        {footer && (
          <div
            className={cn(
              "flex flex-wrap items-center justify-end gap-2 border-t border-solid",
              look?.footer,
            )}
          >
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
