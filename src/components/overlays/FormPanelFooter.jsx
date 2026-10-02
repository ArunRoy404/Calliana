import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";

/**
 * The footer of every form drawer — Figma 198:32343 / 202:31096: the
 * required-fields note on the left, Cancel and the submit action on the right.
 * `footer` is the data config: `{ requiredMark, requiredNote, cancelLabel,
 * submitLabel, submitIcon }`. Without a `requiredNote` the buttons sit alone at
 * the right (Schedule New Appointment); `submitIcon` leads the submit label
 * (the dialer's "Start Outbound Call").
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
      <div className="flex flex-wrap items-center gap-4">
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
