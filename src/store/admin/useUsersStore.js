import { usersData } from "@/data/admin/users.data";
import { usersParamsSchema } from "@/schemas/users/users-params.schema";
import { createTableStore } from "@/store/createTableStore";

/**
 * The users directory — its content plus the search, role and status filters
 * the table runs on, and the add-user drawer (`?panel=add`, from
 * `createTableStore`).
 */
export const useUsersStore = createTableStore({
  content: usersData,
  rows: usersData?.rows,
  searchFields: ["name", "email"],
  filters: usersData?.filters,
  paramsSchema: usersParamsSchema,
  summaryTemplate: usersData?.pagination?.summary,
});
