"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_ICONS } from "@/components/icons";
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn/sidebar";
import { cn } from "@/lib/cn";
import { isNavActive } from "@/lib/navActive";

/**
 * One sidebar row — Figma 42:2396 (active) / 42:3119 (rest), refined for the
 * slimmer rail: rows sit inset with soft corners, labels are a touch smaller
 * and letter-spaced, and the active row is marked by a tint plus a primary
 * accent bar on the sidebar's edge.
 *
 * Built on shadcn's SidebarMenuButton so collapse-to-icon, tooltips and the
 * mobile sheet all come for free.
 */
export default function SidebarNavItem({ item }) {
  const pathname = usePathname();
  const isActive = isNavActive(pathname, item?.href);
  const ItemIcon = SIDEBAR_ICONS?.[item?.icon];

  return (
    <SidebarMenuItem
      className={cn(
        "px-3",
        // The accent bar lives on the item, not the button, because the button
        // clips its overflow.
        "before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-[3px] before:rounded-r-999 before:bg-action-primary before:transition-opacity before:duration-200",
        isActive ? "before:opacity-100" : "before:opacity-0",
      )}
    >
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item?.label}
        className={cn(
          "text-body-sm h-9 gap-2.5 rounded-6 px-3 font-medium tracking-[0.04em] transition-colors duration-200 ease-out [&>svg]:size-[18px]",
          // Collapsed, centre a 40px square in the 64px rail.
          "group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!",
          isActive
            ? "bg-surface-selected text-action-primary hover:bg-surface-selected hover:text-action-primary data-[active=true]:text-action-primary"
            : "text-text-secondary hover:bg-surface-subtle hover:text-text-primary",
        )}
      >
        <Link href={item?.href ?? "#"}>
          {ItemIcon && <ItemIcon />}
          <span className="min-w-0 flex-1 truncate group-data-[collapsible=icon]:hidden">
            {item?.label}
          </span>
        </Link>
      </SidebarMenuButton>

      {item?.badge && (
        <SidebarMenuBadge className="text-label-sm top-1/2! right-5 size-5 min-w-5 -translate-y-1/2 justify-center rounded-999 border border-solid border-border-default bg-surface-base p-0 tracking-normal text-text-secondary">
          {item?.badge}
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}
