"use client";

import { Switch as SwitchPrimitive } from "@/components/shadcn/switch";
import { cn } from "@/lib/cn";

/**
 * An on/off control — settings rows (Voicemail enabled, Two-factor
 * authentication…) and routing-rule toggles (Queue Active). Wraps the shadcn
 * `switch` primitive once so no call site touches it directly (rule 19).
 */
export default function Switch({ checked, onCheckedChange, disabled, className, ...props }) {
  return (
    <SwitchPrimitive
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={cn(className)}
      {...props}
    />
  );
}
