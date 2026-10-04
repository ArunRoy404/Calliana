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
 * The height left in `main` under the top bar — the viewport less the bar and
 * `MAIN_PADDING`'s own vertical padding, so a page whose columns scroll on
 * their own (the inbox) can fill it and scroll inside itself like an app
 * rather than growing the page. The padding is `p-4` (2rem) on a phone and
 * `sm:pt-8 sm:pb-6` (3.5rem) from `sm` up, so the height follows. Change it
 * together with `MAIN_PADDING`.
 */
export const MAIN_FILL_HEIGHT =
  "h-[calc(100dvh-var(--dashboard-bar-height)-2rem)] sm:h-[calc(100dvh-var(--dashboard-bar-height)-3.5rem)]";
