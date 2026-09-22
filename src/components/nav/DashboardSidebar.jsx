"use client";

import AppImage from "@/components/atoms/AppImage";
import CallianaLogo from "@/components/brand/CallianaLogo";
import SidebarSection from "@/components/nav/SidebarSection";
import SidebarUser from "@/components/nav/SidebarUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/shadcn/sidebar";
import { useDashboardStore } from "@/store/dashboard/useDashboardStore";

/**
 * Dashboard navigation — Figma 179:69427.
 *
 * One sidebar for all three roles: the rows, user and role badge come from the
 * role's nav bundle, so admin, agent and client share this component rather
 * than each owning a copy.
 *
 * shadcn's sidebar-07 block supplies the shell: a fixed rail that collapses to
 * icons, a rail handle, and the mobile sheet. The contents and styling are the
 * design's — one set of nav markup serving both presentations.
 */
export default function DashboardSidebar({ role }) {
  const nav = useDashboardStore((state) => state.nav?.[role]);

  return (
    <Sidebar collapsible="icon" className="border-border-default">
      {nav?.textures?.panel && (
        <AppImage
          src={nav?.textures?.panel}
          fill
          sizes="260px"
          className="pointer-events-none object-cover opacity-10"
        />
      )}

      <SidebarHeader className="relative items-center border-b border-solid border-border-strong p-0 pt-4 pb-4 group-data-[collapsible=icon]:hidden">
        <CallianaLogo />
      </SidebarHeader>

      <SidebarContent className="relative gap-2 pt-4">
        {nav?.sections?.map((section) => (
          <SidebarSection key={section?.id} section={section} />
        ))}
      </SidebarContent>

      <SidebarFooter className="relative p-0 pb-4 group-data-[collapsible=icon]:hidden">
        <SidebarUser nav={nav} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
