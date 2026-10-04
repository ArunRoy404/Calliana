import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/lib/cn";

/**
 * The footer of every form drawer — Figma 198:32343 / 202:31096: the
 * required-fields note on the left, Cancel and the submit action on the right.
 * `footer` is the data config: `{ requiredMark, requiredNote, cancelLabel,
 * submitLabel, submitIcon, split }`.
 *
 * - With no `requiredNote`, no note is drawn.
 * - `split` pushes Cancel to the left edge and the submit to the right (the
 *   outbound dialer).
 * - `submitIcon` (an `AssetIcon` descriptor) leads the submit label.
 */
export default function FormPanelFooter({ footer, onCancel, onSubmit }) {
  return (
    <>
      {footer?.requiredNote && (
        <p className="text-body-sm mr-auto text-text-secondary">
          <span className="text-status-error">{footer?.requiredMark}</span>{" "}
          {footer?.requiredNote}
        </p>
      )}
      <div
        className={cn(
          "flex flex-wrap items-center gap-4",
          footer?.split && "w-full justify-between",
        )}
      >
        <Button variant="neutral" onClick={onCancel}>
          {footer?.cancelLabel}
        </Button>
        <Button onClick={onSubmit}>
          {footer?.submitIcon && <AssetIcon icon={footer?.submitIcon} />}
          {footer?.submitLabel}
        </Button>
      </div>
    </>
  );
}
