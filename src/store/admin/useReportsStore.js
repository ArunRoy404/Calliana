import { reportsData } from "@/data/admin/reports.data";
import { createReportsStore } from "@/store/reports/createReportsStore";

/**
 * The admin's Call Activity & Service Reports — the shared reports
 * machinery (`createReportsStore`) over the admin's own data.
 */
export const useReportsStore = createReportsStore(reportsData);
