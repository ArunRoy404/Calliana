/**
 * The dashboard's content padding, and its exact inverse.
 *
 * Most pages sit inside `DashboardShell`'s padded `main`. A page whose design
 * runs edge to edge (a client's detail page: a white header band over a
 * textured body, Figma 198:30338) cancels that padding with `MAIN_BLEED`
 * instead of hardcoding negative margins — so the two always move together.
 */
export const MAIN_PADDING = "p-4 sm:px-6 sm:pt-8 sm:pb-6";
export const MAIN_BLEED = "-m-4 sm:-mx-6 sm:-mt-8 sm:-mb-6";

/**
 * Fills the viewport under the top bar, from `md` up — for a page that is one
 * box whose columns scroll on their own (the messages inbox, Figma
 * 167:51527). It subtracts the bar's height and `MAIN_PADDING`'s `sm`-and-up
 * top and bottom (`pt-8` + `pb-6` = 3.5rem), so change the two together.
 * Below `md` the page stacks and scrolls as a whole.
 */
export const MAIN_FILL_HEIGHT =
  "md:h-[calc(100dvh-var(--dashboard-bar-height)-3.5rem)]";
