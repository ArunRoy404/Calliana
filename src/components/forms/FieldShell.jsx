import { cn } from "@/lib/cn";

/**
 * The frame every form control sits in — Figma "Input Field" 8:34: a label
 * above, the control, and a helper or error line below.
 *
 * `InputField` and `FormSelect` both render through this, so a text box and a
 * dropdown in the same form share one label style, spacing and error line.
 */
export default function FieldShell({
  label,
  htmlFor,
  error,
  helperText,
  children,
  className,
}) {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-label-md text-text-secondary">
          {label}
        </label>
      )}

      {children}

      {(error || helperText) && (
        <p
          className={cn(
            "text-body-sm",
            error ? "text-status-error" : "text-text-tertiary",
          )}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
