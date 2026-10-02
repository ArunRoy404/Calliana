import AppImage from "@/components/atoms/AppImage";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import { cn } from "@/lib/cn";
import { initialsFrom } from "@/lib/initials";
import { AVATAR_TONE, DEFAULT_TONE, TONE_DOT } from "@/lib/tones";

/**
 * A person's picture — shadcn's Avatar, so a missing or broken `src` falls
 * back to the person's initials (derived from `name`) automatically.
 *
 * The image goes through `AppImage` (next/image) rather than the primitive's
 * bare `<img>`: `AvatarImage` still tracks loading, and hands its slot to our
 * image with `asChild`.
 *
 * `status` adds a presence dot in the corner (a tone name — "success" for an
 * available agent), as on the agent panel header, Figma 198:34782.
 *
 * `tone` tints the initials fallback (`AVATAR_TONE` — a note author's chip,
 * Figma 202:30956); without it the fallback is the primary blue.
 *
 * `maxInitials` caps the fallback's letters — `1` for the dialer's
 * single-letter contacts (Figma 202:38997).
 */
const SIZE_CLASSES = {
  xs: "size-6",
  /** A note author's chip — Figma 202:30956. */
  chip: "size-7",
  sm: "size-8",
  md: "size-9",
  /** A message row — Figma 202:30626. */
  row: "size-10",
  lg: "size-12",
  xl: "size-14",
};

/**
 * The initials' type for each size. It goes on the fallback itself: shadcn's
 * fallback sets its own `text-sm`, which would beat a size on the root.
 */
const INITIALS_CLASSES = {
  xs: "text-label-sm",
  chip: "text-[11px] leading-[16.5px] font-semibold",
  sm: "text-label-md",
  md: "text-label-md",
  row: "text-label-md",
  lg: "text-label-lg",
  xl: "text-[18px] font-bold",
};

/** The `sizes` hint for each avatar size, so next/image fetches a fitting file. */
const IMAGE_SIZES = {
  xs: "24px",
  chip: "28px",
  sm: "32px",
  md: "36px",
  row: "40px",
  lg: "48px",
  xl: "56px",
};

/** The presence dot grows with the avatar; `xl` matches the design's 16px. */
const STATUS_SIZE = {
  xs: "size-2",
  chip: "size-2",
  sm: "size-2.5",
  md: "size-2.5",
  row: "size-2.5",
  lg: "size-3",
  xl: "size-4",
};

export default function UserAvatar({
  name,
  src,
  size = "md",
  status,
  tone,
  maxInitials = 2,
  className,
}) {
  return (
    // No `overflow-hidden` on the root here: the presence dot overhangs the
    // circle's edge, and the image and fallback already clip themselves.
    <Avatar
      className={cn(
        "overflow-visible",
        SIZE_CLASSES?.[size] ?? SIZE_CLASSES?.md,
        className,
      )}
    >
      {src && (
        <AvatarImage asChild src={src}>
          <AppImage
            src={src}
            alt={name ?? ""}
            fill
            sizes={IMAGE_SIZES?.[size] ?? IMAGE_SIZES?.md}
            className="rounded-999 object-cover"
          />
        </AvatarImage>
      )}
      <AvatarFallback
        className={cn(
          INITIALS_CLASSES?.[size] ?? INITIALS_CLASSES?.md,
          AVATAR_TONE?.[tone] ?? AVATAR_TONE?.primary,
        )}
      >
        {initialsFrom(name, maxInitials)}
      </AvatarFallback>

      {status && (
        <AvatarBadge
          className={cn(
            "ring-2 ring-surface-base",
            STATUS_SIZE?.[size] ?? STATUS_SIZE?.md,
            TONE_DOT?.[status] ?? TONE_DOT?.[DEFAULT_TONE],
          )}
        />
      )}
    </Avatar>
  );
}
