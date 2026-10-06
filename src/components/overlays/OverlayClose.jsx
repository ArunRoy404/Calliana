"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import { DialogClose } from "@/components/shadcn/dialog";
import { cn } from "@/lib/cn";

/**
 * The close button in every overlay's header — `SidePanel` and `Modal` both
 * draw it, so the look and the hover turn live once. shadcn's sheet and
 * dialog are the same Radix dialog underneath, so `DialogClose` closes
 * either.
 *
 * `icon`:
 * - `circle` (default) — the design's circled ⓧ in primary blue, on every
 *   drawer and on Change Password (Figma 319:34461).
 * - `plain` — a bare slate X, for the outbound dialer's sectioned header.
 * - `text` — no glyph: `label` itself on a white, hairline-bordered button
 *   (the contact details drawer's "Close").
 */
const CLOSE_ICONS = {
  circle: {
    icon: { src: "/icons/close-circle.svg", width: 24, height: 24 },
    className: "",
  },
  plain: {
    icon: { lucide: "X", size: 20 },
    className: "text-text-secondary hover:text-text-primary",
  },
};

export default function OverlayClose({ label, icon = "circle" }) {
  if (icon === "text") {
    return (
      <DialogClose asChild>
        <Button variant="neutral" size="sm" className="shrink-0 font-semibold">
          {label}
        </Button>
      </DialogClose>
    );
  }

  const look = CLOSE_ICONS?.[icon] ?? CLOSE_ICONS?.circle;

  return (
    <DialogClose
      aria-label={label}
      className={cn(
        "shrink-0 cursor-pointer rounded-999 transition-[color,transform] duration-200 ease-reveal hover:rotate-90 focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:outline-none",
        look?.className,
      )}
    >
      <AssetIcon icon={look?.icon} />
    </DialogClose>
  );
}
