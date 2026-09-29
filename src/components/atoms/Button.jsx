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
  /** An inline action that reads as a link but behaves as a button. */
  link: "bg-transparent text-action-primary hover:opacity-70",
  /** Hairline-bordered, for row actions and pagers — Figma 198:22899. */
  outline:
    "border border-solid border-border-default bg-surface-canvas text-text-secondary hover:border-border-strong hover:bg-surface-subtle hover:text-text-primary",
  /** Light action on a dark toolbar strip — Figma 198:22851. */
  toolbar:
    "rounded-4 bg-brand-track font-medium text-brand-black hover:bg-surface-base",
};

const SIZE_CLASSES = {
  /** No padding and no size of its own — for inline actions inside a row. */
  none: "",
  /** Pagers — Figma 198:23014. */
  xs: "text-label-md gap-1 rounded-4 px-2 py-1",
  /** In-row actions — Figma 198:22899. */
  compact: "text-body-md gap-1.5 rounded-8 px-3 py-1.5 font-medium leading-[19.5px]",
  /** `sm` and `md` are row controls: filter-bar and form heights. */
  sm: "text-body-sm h-control-sm px-4",
  md: "text-button h-control px-6",
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
