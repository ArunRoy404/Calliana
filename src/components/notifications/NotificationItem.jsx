"use client";

import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

/**
 * One notification row — Figma 196:19891.
 *
 * The tone bar is flat charcoal in the design, not per-tone: unread is carried
 * by the white card and hairline, read rows sit flat on the canvas tint.
 */
export default function NotificationItem({ item, dismissLabel, onDismiss }) {
  return (
    <li
      className={cn(
        "flex w-full items-start gap-3 overflow-hidden rounded-8 py-1.5 pr-3 transition-colors duration-200 ease-out",
        item?.isRead
          ? "bg-surface-canvas"
          : "border border-solid border-brand-gray bg-surface-base",
      )}
    >
      <span
        aria-hidden
        className="h-6 w-1 shrink-0 rounded-r-999 bg-brand-black"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <p className="text-body-lg min-w-0 flex-1 text-text-primary">
            {item?.label}
          </p>

          <Button
            variant="link"
            size="none"
            aria-label={dismissLabel}
            onClick={() => onDismiss?.(item?.id)}
            className="shrink-0 text-status-error"
          >
            <Icon name="Trash2" />
          </Button>
        </div>

        <p className="text-body-sm w-full text-text-secondary">
          {item?.timestamp}
        </p>
      </div>
    </li>
  );
}
