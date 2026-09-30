import { auditData } from "@/data/admin/audit.data";
import { createListParamsSchema, filterParamsFrom } from "@/schemas/url/list-params.schema";

/** Everything the audit log page keeps in its URL: `/admin/audit?q=…&role=admin&action=queue&page=2`. */
export const auditParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(auditData?.filters),
});
