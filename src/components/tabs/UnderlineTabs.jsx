"use client";

import { cn } from "@/lib/cn";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";

/**
 * The app's one tab strip, in two looks — shadcn's Tabs supply the keyboard
 * handling and ARIA either way; only the strip's chrome changes.
 *
 * `variant="underline"` (default) — Figma 198:33697 (the agent panel's
 * Profile / Performance / … tabs): plain labels, the active one in primary
 * blue with a rule beneath, over a faint hairline. `spacing` sets the gap
 * between tabs: `tight` in a side panel, `wide` across a page (198:31249).
 *
 * `variant="pill"` — Figma 202:38997's dialer (DTMF Keypad / Quick Contacts
 * & Speed Dial): a grey rounded strip with the active tab a white pill.
 *
 * `tabs` is `[{ id, label, count }]`; `panels` maps each id to its content. A
 * `count` shows in a small ringed chip after the label that takes the tab's
 * colour. The underline strip scrolls sideways on a narrow screen rather
 * than wrapping, with the bar hidden — a scrollbar under a tab row reads as
 * a second rule.
 */
const SPACING = { tight: "gap-2", wide: "gap-6" };

const LIST_VARIANT_CLASSES = {
  underline:
    "w-full justify-start overflow-x-auto overflow-y-hidden rounded-none border-b border-solid border-brand-track p-0 [scrollbar-width:none] group-data-[orientation=horizontal]/tabs:h-auto [&::-webkit-scrollbar]:hidden",
  pill: "w-fit items-center gap-1 rounded-6 border border-solid border-border-default bg-surface-canvas p-1",
};

const TRIGGER_VARIANT_CLASSES = {
  underline:
    "text-body-lg h-auto flex-none cursor-pointer gap-1 rounded-none border-0 border-b border-solid border-transparent px-2 pb-2 font-normal text-text-tertiary transition-colors duration-200 ease-out after:hidden hover:text-text-secondary data-[state=active]:border-border-focus data-[state=active]:text-action-primary",
  pill: "text-label-md h-full flex-1 cursor-pointer gap-1 rounded-4 border-0 px-4 py-2 font-medium text-text-secondary shadow-none transition-colors duration-200 ease-out after:hidden hover:text-text-primary data-[state=active]:bg-surface-base data-[state=active]:text-action-primary data-[state=active]:shadow-xs",
};

export default function UnderlineTabs({
  tabs = [],
  panels = {},
  value,
  onValueChange,
  spacing = "tight",
  variant = "underline",
}) {
  return (
    <Tabs
      value={value}
      onValueChange={onValueChange}
      className={cn("gap-4", variant === "pill" && "items-center")}
    >
      <TabsList
        variant="line"
        className={cn(
          LIST_VARIANT_CLASSES?.[variant] ?? LIST_VARIANT_CLASSES?.underline,
          variant === "underline" && (SPACING?.[spacing] ?? SPACING?.tight),
        )}
      >
        {tabs?.map((tab) => (
          <TabsTrigger
            key={tab?.id}
            value={tab?.id}
            className={TRIGGER_VARIANT_CLASSES?.[variant] ?? TRIGGER_VARIANT_CLASSES?.underline}
          >
            {tab?.label}
            {tab?.count != null && (
              <span className="text-label-sm flex size-[18px] shrink-0 items-center justify-center rounded-999 border border-solid border-current bg-brand-track">
                {tab?.count}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs?.map((tab) => (
        <TabsContent
          key={tab?.id}
          value={tab?.id}
          className="flex flex-col gap-4"
        >
          {panels?.[tab?.id]}
        </TabsContent>
      ))}
    </Tabs>
  );
}
