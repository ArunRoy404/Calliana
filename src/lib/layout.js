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
