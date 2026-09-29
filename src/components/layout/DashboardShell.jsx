import DashboardSidebar from "@/components/nav/DashboardSidebar";
import DashboardTopBar from "@/components/nav/DashboardTopBar";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/sidebar";
import { cn } from "@/lib/cn";
import { MAIN_PADDING } from "@/lib/layout";
import { SIDEBAR_STYLE } from "@/lib/sidebar";

/**
 * The chrome every role dashboard sits in — Figma 167:49827.
 *
 * Admin, agent and client all render this; the `role` picks which nav and
 * heading the shell loads. A role's `layout.js` is one line as a result.
 *
 * shadcn's sidebar provider owns the rail's open/collapsed state and the mobile
 * sheet; the widths come from `src/lib/sidebar.js`.
 */
export default function DashboardShell({ role, children }) {
  return (
    <SidebarProvider style={SIDEBAR_STYLE}>
      <DashboardSidebar role={role} />

      <SidebarInset className="min-w-0 bg-surface-canvas">
        <DashboardTopBar role={role} />
        <main className={cn("min-w-0 flex-1", MAIN_PADDING)}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
