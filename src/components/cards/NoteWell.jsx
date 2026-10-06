import { cn } from "@/lib/cn";

/**
 * A block of guidance text on a well — inside `InstructionCard` (Figma
 * 198:31377), under the business profile's "Support Instructions for
 * Agents", and through the live call's support notes. Not a reveal of its
 * own: it arrives with the card around it.
 *
 * `tone`: `neutral` (default — the grey well), `info` (a primary-tinted,
 * ruled box: a greeting script, "How to use this panel") or `warning` (an
 * amber-ruled box in amber text: an emergency protocol).
 */
const TONE_CLASSES = {
  neutral: "bg-action-secondary text-text-secondary",
  info: "border border-solid border-border-focus/40 bg-surface-selected text-text-primary",
  warning:
    "border border-solid border-status-warning bg-status-warning-bg text-status-warning",
};

export default function NoteWell({ tone = "neutral", children, className }) {
  return (
    <p
      className={cn(
        "text-body-md rounded-8 p-4",
        TONE_CLASSES?.[tone] ?? TONE_CLASSES?.neutral,
        className,
      )}
    >
      {children}
    </p>
  );
}
