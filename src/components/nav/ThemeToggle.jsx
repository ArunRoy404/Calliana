"use client";

import Icon from "@/components/atoms/Icon";
import TopBarTile from "@/components/nav/TopBarTile";
import { toggleTheme } from "@/lib/theme";

/**
 * The top bar's light / dark switch: a sun in light mode, a moon in dark.
 * Which glyph shows is pure CSS (`dark:`), so the server and the browser
 * render the same markup whatever the saved theme — no hydration mismatch
 * and no flash. `className` places the tile in the bar.
 */
export default function ThemeToggle({ label, className }) {
  return (
    <TopBarTile
      as="button"
      type="button"
      label={label}
      onClick={toggleTheme}
      className={className}
    >
      <Icon name="Sun" size={24} className="text-action-primary dark:hidden" />
      <Icon
        name="Moon"
        size={24}
        className="hidden text-text-primary dark:block"
      />
    </TopBarTile>
  );
}
