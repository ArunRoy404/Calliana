"use client";

import Checkbox from "@/components/atoms/Checkbox";
import TextLink from "@/components/atoms/TextLink";
import { cn } from "@/lib/cn";

/**
 * Checkbox on the left, helper link on the right — Figma 43:8230.
 * Shared by the sign-in and reset-password forms.
 */
export default function FormOptionsRow({
  checkbox,
  link,
  checked,
  onCheckedChange,
  className,
}) {
  return (
    <div className={cn("flex items-start", className)}>
      <Checkbox
        name={checkbox?.name}
        label={checkbox?.label}
        checked={checked}
        onChange={(event) => onCheckedChange?.(event?.target?.checked)}
        className="flex-1 self-stretch"
      />

      {link && <TextLink href={link?.href}>{link?.label}</TextLink>}
    </div>
  );
}
