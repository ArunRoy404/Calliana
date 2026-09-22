import { create } from "zustand";

import { adminDashboardData } from "@/data/admin/admin-dashboard.data";

/**
 * The admin dashboard page's dummy content. The shell around it (sidebar, top
 * bar) is role-agnostic and lives in `useDashboardStore`.
 */
export const useAdminContentStore = create((set) => ({
  dashboard: adminDashboardData,

  setDashboard: (dashboard) => set({ dashboard }),
}));
