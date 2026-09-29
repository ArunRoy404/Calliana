"use client";

import AppImage from "@/components/atoms/AppImage";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/shadcn/sheet";
import { cn } from "@/lib/cn";

/**
 * The one side panel every add, edit and detail drawer is built on — Figma
 * 198:32312 (add agent) / 198:33370 (agent detail).
 *
 * shadcn's Sheet supplies the behaviour: focus trap, Escape and scrim to close,
 * scroll lock, the portal and the slide. This owns the look, so every drawer
 * in the app matches:
 *
 * - a 700px panel (full width on a phone),
 * - a header — `title` + `subtitle`, or a custom `header` — with the close
 *   button, ruled off underneath,
 * - a body that scrolls on its own,
 * - an optional `footer` pinned to the bottom.
 *
 * `title` is always required: with a custom `header` it is still announced to
 * screen readers as the dialog's name.
 */
const CLOSE_ICON = { src: "/icons/close-circle.svg", width: 24, height: 24 };

export default function SidePanel({
  open,
  onOpenChange,
  title,
  subtitle,
  header,
  closeLabel = "Close panel",
  footer,
  children,
  className,
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          "w-full gap-0 border-l-0 bg-surface-base p-0 shadow-card sm:max-w-175",
          className,
        )}
      >
        <div className="mx-4 flex shrink-0 items-start justify-between gap-4 border-b border-solid border-border-strong pt-6 pb-4 sm:mx-6">
          <div className="flex min-w-0 flex-1 flex-col">
            {header ?? (
              <div className="flex flex-col gap-2">
                <SheetTitle className="text-h4 text-brand-text-black">
                  {title}
                </SheetTitle>
                {subtitle && (
                  <SheetDescription className="text-body-sm text-text-muted">
                    {subtitle}
                  </SheetDescription>
                )}
              </div>
            )}

            {/* A custom header still names the dialog for screen readers. */}
            {header && <SheetTitle className="sr-only">{title}</SheetTitle>}
            {header && !subtitle && (
              <SheetDescription className="sr-only">{title}</SheetDescription>
            )}
          </div>

          <SheetClose
            aria-label={closeLabel}
            className="shrink-0 cursor-pointer rounded-999 transition-transform duration-200 ease-reveal hover:rotate-90 focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:outline-none"
          >
            <AppImage
              src={CLOSE_ICON.src}
              width={CLOSE_ICON.width}
              height={CLOSE_ICON.height}
            />
          </SheetClose>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto px-4 py-4 sm:px-6">
          {children}
        </div>

        {footer && (
          <div className="mx-4 flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-solid border-brand-track pt-4 pb-6 sm:mx-6">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
