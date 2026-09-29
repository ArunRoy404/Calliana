/**
 * Defaults every data table starts from. A table's own data file can override
 * any of them, but a new list gets 10 rows per page and the same rows-per-page
 * choices without saying anything.
 */
export const TABLE_DEFAULTS = {
  pageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
  pageSizeLabel: "Rows per page",
  /** `{count}` is filled in per option by the store. */
  pageSizeOptionLabel: "{count} per page",
};
