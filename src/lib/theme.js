/**
 * Light / dark theme. The theme is the `.dark` class on <html> (bound to
 * Tailwind's `dark:` variant in `globals.css`), remembered per browser in
 * localStorage — a viewer's own preference, not app state, so it lives here
 * rather than in a store or the URL.
 *
 * `THEME_INIT_SCRIPT` runs in the root layout's <head> before the first
 * paint, so a dark-mode visitor never sees a flash of the light page. With
 * no saved choice it follows the operating system.
 */
export const THEME_STORAGE_KEY = "calliana-theme";
const DARK = "dark";
const LIGHT = "light";

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="${DARK}"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("${DARK}")}}catch(e){}})();`;

/** Flip the theme and remember the choice; storage failures are ignored. */
export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle(DARK);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? DARK : LIGHT);
  } catch {
    // Private windows or blocked storage: the theme still flips for now.
  }
}
