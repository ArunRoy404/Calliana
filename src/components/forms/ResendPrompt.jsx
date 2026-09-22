"use client";

import { cn } from "@/lib/cn";

/** "Didn't receive it? Resend code" row — Figma 43:8998. */
export default function ResendPrompt({
  prompt,
  actionLabel,
  onResend,
  className,
}) {
  return (
    <div className={cn("flex items-center justify-end gap-3", className)}>
      <span className="text-body-sm text-text-muted">{prompt}</span>

      <button
        type="button"
        onClick={() => onResend?.()}
        className="text-body-lg cursor-pointer text-text-primary transition-opacity duration-200 ease-out hover:opacity-70"
      >
        {actionLabel}
      </button>
    </div>
  );
}
