/**
 * The control-height utilities generated from `--spacing-control` in
 * `src/app/globals.css`.
 *
 * `cn()` needs to know about them: tailwind-merge does not recognise the named
 * `control` step, so `cn("h-9", "h-control")` would keep both. Registering them
 * in the height, width, min-height and size groups makes a later one win.
 *
 * Every control in a row (input, search, select, filter, button, top-bar tile)
 * uses `h-control` or `h-control-sm` — never its own fixed height.
 */
export const CONTROL_HEIGHT_CLASSES = ["h-control", "h-control-sm"];
export const CONTROL_WIDTH_CLASSES = ["w-control", "w-control-sm"];
export const CONTROL_SIZE_CLASSES = ["size-control", "size-control-sm"];
export const CONTROL_MIN_HEIGHT_CLASSES = ["min-h-control", "min-h-control-sm"];

/**
 * The height each control `size` maps to. Search, select and button all
 * read this, so `size="sm"` means the same 36px on every one of them:
 * `md` for forms and the top bar, `sm` for filter bars.
 */
export const CONTROL_SIZE_HEIGHT = {
  sm: "h-control-sm",
  md: "h-control",
};

/**
 * The same heights as a floor rather than a cap, for a control whose rows may
 * wrap — a `SegmentedFilter` with more options than fit on a phone. A single
 * row is unchanged (the floor is met exactly); a wrapping one grows instead of
 * clipping.
 */
export const CONTROL_MIN_SIZE_HEIGHT = {
  sm: "min-h-control-sm",
  md: "min-h-control",
};

/**
 * The inner segment of a `SegmentedFilter`: the row control's height less the
 * 2px inset the strip's `p-0.5` leaves inside it, so a segment keeps the
 * control's height whether its row is alone or wrapped. Derived from the token,
 * so changing the control height moves it too.
 */
export const CONTROL_SEGMENT_HEIGHT = {
  sm: "h-[calc(var(--control-height-sm)_-_0.25rem)]",
  md: "h-[calc(var(--control-height)_-_0.25rem)]",
};

/**
 * How long a controlled search box waits after the last keystroke before it
 * commits its query (to the URL, for a table) — one write per pause, not per
 * key, while the box itself updates instantly.
 */
export const SEARCH_COMMIT_DELAY_MS = 250;
