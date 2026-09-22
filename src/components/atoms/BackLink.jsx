import Link from "next/link";

import AppImage from "@/components/atoms/AppImage";
import { cn } from "@/lib/cn";

/** Arrow-and-label back control on the auth cards — Figma 43:8792. */
const ARROW_ICON = { src: "/icons/arrow-left.svg", width: 20, height: 20 };

export default function BackLink({ href, label = "Back", className }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-body-md group flex shrink-0 items-center gap-1 text-brand-ink-black transition-opacity duration-200 ease-out hover:opacity-70",
        className,
      )}
    >
      <AppImage
        src={ARROW_ICON?.src}
        width={ARROW_ICON?.width}
        height={ARROW_ICON?.height}
        className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
      />
      {label}
    </Link>
  );
}
