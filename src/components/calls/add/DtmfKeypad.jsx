"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import FieldShell from "@/components/forms/FieldShell";
import Reveal from "@/components/motion/Reveal";

/**
 * The dialer's DTMF Keypad tab — a canvas-tinted card holding a white number
 * display (wide-tracked digits, backspace at the right), the 3×4 pad of
 * white, lightly lifted keys, then the resolved recipient/caller name.
 *
 * Reveals after `revealDelay`.
 */
export default function DtmfKeypad({
  content,
  phone,
  recipientName,
  onDigit,
  onBackspace,
  revealDelay = 0,
}) {
  const keypad = content?.keypad;

  return (
    <Reveal
      delay={revealDelay}
      className="flex flex-col gap-4 rounded-12 border border-solid border-border-default bg-surface-canvas p-4"
    >
      <div className="flex h-14 items-center gap-2 rounded-8 border border-solid border-border-default bg-surface-base px-4">
        <span className="text-h4 min-w-0 flex-1 truncate text-center tracking-[2px] text-brand-black tabular-nums">
          {phone}
        </span>
        {Boolean(phone) && (
          <Button
            variant="ghost"
            size="none"
            aria-label={keypad?.clearLabel}
            onClick={onBackspace}
            className="rounded-999 p-1.5 text-text-tertiary hover:text-status-error"
          >
            <AssetIcon icon={keypad?.clearIcon} />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {keypad?.digits?.map((digit) => (
          <Button
            key={digit?.value}
            variant="neutral"
            size="none"
            onClick={() => onDigit?.(digit?.value)}
            className="flex-col gap-0.5 rounded-8 py-3 shadow-xs"
          >
            <span className="text-h4 text-brand-black">{digit?.value}</span>
            {digit?.letters && (
              <span className="text-label-sm text-text-tertiary">
                {digit?.letters}
              </span>
            )}
          </Button>
        ))}
      </div>

      <FieldShell label={keypad?.recipientField?.label}>
        <div className="flex h-control items-center gap-2 rounded-8 border border-solid border-border-default bg-surface-base px-3 text-text-tertiary">
          <AssetIcon icon={keypad?.recipientField?.icon} />
          <span className="text-body-md truncate text-text-primary">
            {recipientName || keypad?.recipientField?.emptyValue}
          </span>
        </div>
      </FieldShell>
    </Reveal>
  );
}
