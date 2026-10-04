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
  secondary: "bg-action-secondary text-text-primary hover:bg-border-default",
  danger: "bg-status-error text-text-on-primary hover:bg-status-error/90",
  ghost: "bg-transparent text-text-secondary hover:bg-action-secondary",
  /** An inline action that reads as a link but behaves as a button. */
  link: "bg-transparent text-action-primary hover:opacity-70",
  /** Hairline-bordered, for row actions and pagers — Figma 198:22899. */
  outline:
    "border border-solid border-border-default bg-surface-canvas text-text-secondary hover:border-border-strong hover:bg-surface-subtle hover:text-text-primary",
  /** Tinted, blue-ruled icon action — Figma 198:26137 (a row's call button). */
  info: "border border-solid border-border-focus bg-status-info-bg text-action-primary hover:bg-surface-selected",
  /** White, hairline-bordered secondary action — Figma 198:32344 (Cancel). */
  neutral:
    "border border-solid border-border-default bg-surface-base text-text-primary hover:border-border-strong hover:bg-surface-subtle",
  /** Green-ruled confirming action — the inbox's "Mark Resolved". */
  success:
    "border border-solid border-status-success bg-status-success-bg text-status-success hover:bg-status-success/10",
  /**
   * A whole list row as one button — an inbox conversation. Transparent until
   * hovered; `aria-current` marks the open one with the same tint.
   */
  row: "bg-transparent text-left hover:bg-surface-subtle aria-[current=true]:bg-surface-subtle",
  /**
   * No chrome of its own — the content keeps its own colours (a calendar
   * event, tinted by the strip it sits in). It dims a touch on hover.
   */
  plain: "bg-transparent text-left hover:opacity-80",
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
  compact:
    "text-body-md gap-1.5 rounded-8 px-3 py-1.5 font-medium leading-[19.5px]",
  /** A 28px icon-only square — Figma 198:31047 (a page's back button). */
  square: "size-7 shrink-0 rounded-4 p-0",
  /** A filter-bar-height icon-only square — the inbox's send button. */
  icon: "size-control-sm shrink-0 rounded-6 p-0",
  /** Fills its row, content top-left — pairs with the `row` variant. */
  row: "w-full items-start justify-start gap-3 rounded-none p-4",
  /** Lines stacked top-left, filling the width — a calendar event's title
   * over its client, with `plain`. */
  stack: "w-full flex-col items-start justify-start gap-1 rounded-none p-0",
  /** A 36px icon-only circle — a recording's play button. */
  round: "size-9 shrink-0 rounded-999 p-0",
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
