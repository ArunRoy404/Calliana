"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { cn } from "@/lib/cn";

/**
 * The one centred dialog every screen-middle box is built on — Figma
 * 319:34461 (Change Password): a scrim behind a box centred both axes, not a
 * right-edge drawer (that is `overlays/SidePanel` — rule 30 on when to use
 * which). Same shape as `SidePanel`: a `title` (+ optional `subtitle`) or a
 * custom `header`, a body and an optional `footer`, so a feature supplies
 * only its content.
 *
 * `variant`:
 * - `inset` (default) — one padded box, its header and footer rules inset
 *   (Change Password).
 * - `sectioned` — header, body and footer as full-width bands: rules run
 *   edge to edge, the close button sits in the header, the body scrolls on
 *   its own and the footer is canvas-tinted (the outbound dialer).
 *
 * `title` is always required: with a custom `header` it is still announced to
 * screen readers as the dialog's name.
 */
const CLOSE_ICON = { lucide: "X", size: 20 };

const VARIANT_CLASSES = {
  inset: {
    content: "gap-0 p-6",
    header: "border-border-strong pb-4",
    body: "py-4",
    footer: "border-brand-track pt-4",
  },
  sectioned: {
    content:
      "flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0",
    header: "items-center border-border-default px-6 pt-6 pb-4",
    body: "min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-6",
    footer: "border-border-default bg-surface-canvas px-6 py-4",
  },
};

export default function Modal({
  open,
  onOpenChange,
  title,
  subtitle,
  header,
  closeLabel = "Close dialog",
  variant = "inset",
  footer,
  children,
  className,
}) {
  const classes = VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.inset;
  const isSectioned = variant === "sectioned";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={!isSectioned}
        className={cn(
          "w-175 max-w-[calc(100%-2rem)]",
          classes?.content,
          className,
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-start justify-between gap-4 border-b border-solid",
            classes?.header,
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col">
            {header ?? (
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-h4 text-brand-text-black">
                  {title}
                </DialogTitle>
                {subtitle && (
                  <DialogDescription className="text-body-sm text-text-muted">
                    {subtitle}
                  </DialogDescription>
                )}
              </div>
            )}

            {/* A custom header still names the dialog for screen readers. */}
            {header && <DialogTitle className="sr-only">{title}</DialogTitle>}
            {(header || !subtitle) && (
              <DialogDescription className="sr-only">{title}</DialogDescription>
            )}
          </div>

          {isSectioned && (
            <DialogClose
              aria-label={closeLabel}
              className="shrink-0 cursor-pointer rounded-999 text-text-secondary transition-[color,transform] duration-200 ease-reveal hover:rotate-90 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:outline-none"
            >
              <AssetIcon icon={CLOSE_ICON} />
            </DialogClose>
          )}
        </div>

        <div className={cn("flex flex-col gap-4", classes?.body)}>
          {children}
        </div>

        {footer && (
          <div
            className={cn(
              "flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-solid",
              classes?.footer,
            )}
          >
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
