/**
 * Column alignment for `DataTable`. A column's `align` (and optional
 * `headerAlign`) in a data file names one of these; the classes are complete
 * literals so Tailwind can see them.
 */

/** Header text. */
export const HEADER_ALIGN = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/** Cell content, which sits in a flex row. */
export const CELL_ALIGN = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-right",
};

export const DEFAULT_ALIGN = "left";
