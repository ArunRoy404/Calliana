import Link from "next/link";

import { cn } from "@/lib/cn";

/** Inline navigation link in the action colour. */
export default function TextLink({ href, children, className, ...props }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-body-md whitespace-nowrap text-action-primary transition-opacity duration-200 ease-out hover:underline hover:opacity-80",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
