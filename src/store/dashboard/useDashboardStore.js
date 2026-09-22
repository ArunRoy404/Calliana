import { create } from "zustand";

import { dashboardNavByRole } from "@/data/dashboard/nav.data";
import { dashboardTopBarByRole } from "@/data/dashboard/top-bar.data";

/**
 * The dashboard shell's content for every role.
 *
 * Keyed by role rather than one store per role: the shell is the same chrome
 * for admin, agent and client, so a component selects `nav[role]` and gets a
 * stable reference — the bundles are built once at module load.
 */
export const useDashboardStore = create(() => ({
  nav: dashboardNavByRole,
  topBar: dashboardTopBarByRole,
}));
