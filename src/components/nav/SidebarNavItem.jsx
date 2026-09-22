"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Icon from "@/components/atoms/Icon";
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn/sidebar";
import { cn } from "@/lib/cn";

/**
 * One sidebar row — Figma 42:2396 (active) / 42:3119 (rest).
 *
 * Built on shadcn's SidebarMenuButton so collapse-to-icon, tooltips and the
 * mobile sheet all come for free, but restyled to the design: full-bleed rows
 * with square corners and a top/bottom rule on the active one, rather than
 * shadcn's inset pill.
 */
export default function SidebarNavItem({ item }) {
  const pathname = usePathname();
  const isActive = pathname === item?.href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item?.label}
        className={cn(
          // shadcn forces 16px icons; the design uses 20px.
          "text-body-md h-auto gap-2 rounded-none px-4 py-2 [&>svg]:size-5",
          // Collapsed, shadcn shrinks the row to a 32px square wedged against
          // the rail's left edge, which clips a 20px icon. Centre a 44px square
          // in the 72px rail instead.
          "group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!",
          isActive
            ? "border-y border-solid border-border-focus bg-surface-selected text-text-primary"
            : "text-text-secondary hover:bg-surface-subtle hover:text-text-primary",
        )}
      >
        <Link href={item?.href ?? "#"}>
          <Icon name={item?.icon} />
          <span className="min-w-0 flex-1 truncate group-data-[collapsible=icon]:hidden">
            {item?.label}
          </span>
        </Link>
      </SidebarMenuButton>

      {item?.badge && (
        <SidebarMenuBadge className="text-label-sm size-4 min-w-4 justify-center rounded-999 bg-surface-base p-0 text-text-secondary">
          {item?.badge}
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}
