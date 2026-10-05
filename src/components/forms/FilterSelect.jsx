"use client";

import AppImage from "@/components/atoms/AppImage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { cn } from "@/lib/cn";

/**
 * Compact filter dropdown — trigger Figma 198:22847, list per the design's
 * open state.
 *
 * `size` picks the shared control height: `sm` (default — filter bars) or
 * `md` (a select inside a form).
 *
 * `variant` picks the trigger's look; the dropdown list is the same for both:
 * - `filter` — the grey chip of a table toolbar, Figma 198:22847.
 * - `field` — an input-shaped trigger for forms, Figma 198:32325. `FormSelect`
 *   wraps it with a label and error.
 *
 * `prefix` leads the chosen value inside the trigger in a quieter colour
 * ("Professional / Dept: Dr. Laura Alegre") — the list shows the values
 * alone.
 *
 * shadcn's Select supplies the behaviour (keyboard, typeahead, focus return,
 * portal); the look is the design's: a grey chip that opens a flat list whose
 * current and hovered option fill with the primary blue.
 */
const VARIANTS = {
  filter: {
    trigger:
      "text-label-md gap-4 rounded-4 border-brand-gray bg-brand-track text-brand-black hover:border-border-strong",
    icon: { src: "/icons/arrow-down-bold.svg", width: 16, height: 16 },
  },
  field: {
    trigger:
      "text-body-md w-full gap-2 rounded-4 border-border-default bg-surface-base text-text-primary hover:border-border-strong data-[placeholder]:text-text-primary",
    icon: { src: "/icons/arrow-down.svg", width: 16, height: 16 },
  },
};

/**
 * The control heights, written against shadcn's own `data-[size=default]:h-9`
 * so they replace it — a plain `h-control-sm` loses to that attribute selector.
 */
const TRIGGER_HEIGHT = {
  sm: "data-[size=default]:h-control-sm",
  md: "data-[size=default]:h-control",
};

export default function FilterSelect({
  label,
  options = [],
  value,
  onValueChange,
  variant = "filter",
  size = "sm",
  placeholder,
  prefix,
  id,
  invalid = false,
  onBlur,
  className,
}) {
  const look = VARIANTS?.[variant] ?? VARIANTS?.filter;

  return (
    <Select
      value={value || undefined}
      onValueChange={onValueChange}
      onOpenChange={(open) => !open && onBlur?.()}
    >
      <SelectTrigger
        id={id}
        aria-label={label}
        aria-invalid={invalid || undefined}
        icon={
          <AppImage
            src={look?.icon?.src}
            width={look?.icon?.width}
            height={look?.icon?.height}
            className="transition-transform duration-200 ease-reveal group-data-[state=open]:rotate-180"
          />
        }
        className={cn(
          "group cursor-pointer px-3 py-0 shadow-none transition-colors duration-200 ease-out focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30",
          look?.trigger,
          TRIGGER_HEIGHT?.[size] ?? TRIGGER_HEIGHT?.sm,
          className,
        )}
      >
        {prefix && (
          <span className="shrink-0 text-text-secondary">{prefix}</span>
        )}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        position="popper"
        align="start"
        sideOffset={6}
        // The list runs edge to edge: no inset around the options.
        className="rounded-6 border-border-default bg-surface-base p-0 shadow-elevation-sm [&_[data-radix-select-viewport]]:p-0"
      >
        {options?.map((option) => (
          <SelectItem
            key={option?.value}
            value={option?.value}
            // The design shows no check mark — the fill marks the choice.
            className="text-body-md cursor-pointer rounded-0 px-4 py-2 text-text-primary transition-colors duration-150 ease-out focus:bg-action-primary focus:text-text-on-primary data-[state=checked]:bg-action-primary data-[state=checked]:text-text-on-primary [&_[data-slot=select-item-indicator]]:hidden"
          >
            {option?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
