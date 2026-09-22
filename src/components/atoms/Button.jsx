"use client";

import { gooeyToast } from "goey-toast";
import Link from "next/link";

import Spinner from "@/components/atoms/Spinner";
import { cn } from "@/lib/cn";

/**
 * Button — Figma component 7:28.
 *
 * Every variant, size and state lives here; call sites never style a raw
 * `<button>` and never re-pass the classes this component already applies.
 */

const VARIANT_CLASSES = {
  primary:
    "bg-action-primary text-text-on-primary hover:bg-action-primary-hover",
  secondary:
    "bg-action-secondary text-text-primary hover:bg-border-default",
  danger: "bg-status-error text-text-on-primary hover:bg-status-error/90",
  ghost: "bg-transparent text-text-secondary hover:bg-action-secondary",
};

const SIZE_CLASSES = {
  sm: "text-body-sm px-4 py-2",
  md: "text-button px-6 py-3",
  lg: "text-body-lg px-8 py-3.5",
};

const DEFAULT_NOT_FUNCTIONAL_MESSAGE = "This feature isn’t available yet";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  href,
  fullWidth = false,
  isLoading = false,
  isDisabled = false,
  notFunctional = false,
  notFunctionalMessage = DEFAULT_NOT_FUNCTIONAL_MESSAGE,
  notFunctionalDescription,
  onClick,
  className,
  ...props
}) {
  const isInactive = isDisabled || isLoading;

  function handleClick(event) {
    // `notFunctional` still blocks the native submit — there is no endpoint to
    // post to, and letting it through would reload the page — but the handler
    // itself runs, so client-side work like validation still happens.
    if (notFunctional) event?.preventDefault?.();

    onClick?.(event);

    if (notFunctional) {
      gooeyToast.info(notFunctionalMessage, {
        description: notFunctionalDescription,
      });
    }
  }

  const classes = cn(
    "flex cursor-pointer items-center justify-center gap-2 rounded-6 outline-none",
    "transition-all duration-200 ease-out",
    "active:scale-[0.98]",
    "focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
    VARIANT_CLASSES?.[variant],
    SIZE_CLASSES?.[size],
    fullWidth && "w-full",
    className,
  );

  // A button that navigates is still a button visually, so the variants stay
  // here rather than growing a second component.
  if (href) {
    return (
      <Link href={href} onClick={handleClick} className={classes} {...props}>
        {isLoading && <Spinner />}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={isInactive}
      aria-busy={isLoading || undefined}
      onClick={handleClick}
      className={classes}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
}
