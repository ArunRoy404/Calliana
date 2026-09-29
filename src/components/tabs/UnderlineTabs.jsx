"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";

/**
 * Underlined tab strip — Figma 198:33697 (the agent panel's Profile /
 * Performance / … tabs). shadcn's Tabs supply the keyboard handling and ARIA;
 * the look is the design's: plain labels, the active one in primary blue with
 * a rule beneath, over a faint hairline.
 *
 * `tabs` is `[{ id, label }]`; `panels` maps each id to its content. The strip
 * scrolls sideways on a narrow screen rather than wrapping, with the bar
 * hidden — a scrollbar under a tab row reads as a second rule.
 */
export default function UnderlineTabs({
  tabs = [],
  panels = {},
  value,
  onValueChange,
}) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="gap-4">
      <TabsList
        variant="line"
        className="w-full justify-start gap-2 overflow-x-auto overflow-y-hidden rounded-none border-b border-solid border-brand-track p-0 [scrollbar-width:none] group-data-[orientation=horizontal]/tabs:h-auto [&::-webkit-scrollbar]:hidden"
      >
        {tabs?.map((tab) => (
          <TabsTrigger
            key={tab?.id}
            value={tab?.id}
            className="text-body-lg h-auto flex-none cursor-pointer rounded-none border-0 border-b border-solid border-transparent px-2 pb-2 font-normal text-text-tertiary transition-colors duration-200 ease-out after:hidden hover:text-text-secondary data-[state=active]:border-border-focus data-[state=active]:text-action-primary"
          >
            {tab?.label}
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
