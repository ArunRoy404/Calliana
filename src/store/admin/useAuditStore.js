import { auditData } from "@/data/admin/audit.data";
import { auditParamsSchema } from "@/schemas/audit/audit-params.schema";
import { createTableStore } from "@/store/createTableStore";

/**
 * The audit log — its content plus the search, role, action and date filters
 * the table runs on. No add drawer and no row detail: an audit entry is a
 * record, not something to create or act on.
 */
export const useAuditStore = createTableStore({
  content: auditData,
  rows: auditData?.rows,
  searchFields: ["actorName", "targetIdentity", "actionLabel", "resource", "description"],
  filters: auditData?.filters,
  paramsSchema: auditParamsSchema,
  summaryTemplate: auditData?.pagination?.summary,
});
