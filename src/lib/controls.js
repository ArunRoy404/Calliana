/**
 * The control-height utilities generated from `--spacing-control` in
 * `src/app/globals.css`.
 *
 * `cn()` needs to know about them: tailwind-merge does not recognise the named
 * `control` step, so `cn("h-9", "h-control")` would keep both. Registering them
 * in the height, width and size groups makes a later one win.
 *
 * Every control in a row (input, search, select, filter, button, top-bar tile)
 * uses `h-control` or `h-control-sm` — never its own fixed height.
 */
export const CONTROL_HEIGHT_CLASSES = ["h-control", "h-control-sm"];
export const CONTROL_WIDTH_CLASSES = ["w-control", "w-control-sm"];
export const CONTROL_SIZE_CLASSES = ["size-control", "size-control-sm"];

/**
 * The height each control `size` maps to. Search, select and button all
 * read this, so `size="sm"` means the same 36px on every one of them:
 * `md` for forms and the top bar, `sm` for filter bars.
 */
export const CONTROL_SIZE_HEIGHT = {
  sm: "h-control-sm",
  md: "h-control",
};
