"use client";

import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/cn";

/**
 * shadcn `switch`, restyled to the project's tokens (rule 10): the installer's
 * `import { cn } from "cn"` is wrong (fixed to the project alias), the
 * `dark:` variants are dropped (rule 24 — the tokens theme it) and the two sizes
 * are the design's 44×24 track / 20px thumb, not shadcn's defaults.
 */
function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-999 border border-solid border-transparent shadow-xs outline-none transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-action-primary data-[state=unchecked]:bg-border-strong",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-5 translate-x-0.5 rounded-999 bg-surface-base shadow-xs ring-0 transition-transform duration-200 ease-out data-[state=checked]:translate-x-5.5"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
