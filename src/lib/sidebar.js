/**
 * Dashboard sidebar geometry, in one place.
 *
 * Deliberately slimmer than Figma's 260px: at 232px the rail reads lighter
 * and gives the content area back 28px on every screen. The collapsed icon
 * rail is 64px — a 40px icon button with 12px either side.
 *
 * `--sidebar-width-mobile` in `globals.css` must match `SIDEBAR_WIDTH`: the
 * mobile sheet renders in a portal and cannot inherit it from the shell.
 */
export const SIDEBAR_WIDTH = 232;
export const SIDEBAR_RAIL_WIDTH = 64;

/** The `sizes` hint for images that span the sidebar. */
export const SIDEBAR_IMAGE_SIZES = `${SIDEBAR_WIDTH}px`;

/** The custom properties shadcn's sidebar provider reads. */
export const SIDEBAR_STYLE = {
  "--sidebar-width": `${SIDEBAR_WIDTH}px`,
  "--sidebar-width-icon": `${SIDEBAR_RAIL_WIDTH}px`,
  "--sidebar-width-mobile": `${SIDEBAR_WIDTH}px`,
};
