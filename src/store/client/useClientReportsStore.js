import { clientReportsData } from "@/data/client/reports.data";
import { createReportsStore } from "@/store/reports/createReportsStore";

/**
 * The client portal's Reports & Activity — the shared reports machinery
 * (`createReportsStore`) over the client's own data, Peak Call Hours
 * included.
 */
export const useClientReportsStore = createReportsStore(clientReportsData);
