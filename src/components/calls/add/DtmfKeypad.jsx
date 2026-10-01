"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import FieldShell from "@/components/forms/FieldShell";

const BACKSPACE_ICON = { lucide: "Delete", size: 18 };

/**
 * The dialer's DTMF Keypad tab: a live number display with clear, the 3×4
 * digit pad, then the resolved recipient/caller name.
 */
export default function DtmfKeypad({ content, phone, recipientName, onDigit, onBackspace }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-14 items-center gap-2 rounded-8 border border-solid border-border-default bg-surface-canvas px-4">
        <span className="text-h4 min-w-0 flex-1 truncate text-brand-black">{phone || " "}</span>
        {Boolean(phone) && (
          <Button
            variant="ghost"
            size="none"
            aria-label={content?.keypad?.clearLabel}
            onClick={onBackspace}
            className="shrink-0 rounded-999 p-1.5 text-text-tertiary hover:text-status-error"
          >
            <AssetIcon icon={BACKSPACE_ICON} />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {content?.keypad?.digits?.map((digit) => (
          <Button
            key={digit?.value}
            variant="neutral"
            size="none"
            onClick={() => onDigit?.(digit?.value)}
            className="flex-col gap-0.5 rounded-8 py-3"
          >
            <span className="text-h4 text-brand-black">{digit?.value}</span>
            {digit?.letters && (
              <span className="text-label-sm text-text-tertiary">{digit?.letters}</span>
            )}
          </Button>
        ))}
      </div>

      <FieldShell label={content?.keypad?.recipientField?.label}>
        <div className="h-control flex items-center gap-2 rounded-4 border border-solid border-border-default bg-surface-subtle px-3 text-text-secondary">
          <AssetIcon icon={content?.keypad?.recipientField?.icon} />
          <span className="text-body-md truncate">{recipientName || "—"}</span>
        </div>
      </FieldShell>
    </div>
  );
}
