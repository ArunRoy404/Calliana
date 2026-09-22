import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Whether the viewport is phone-sized. Consumed by shadcn's Sidebar to decide
 * between the rail and the sheet.
 *
 * Written with `useSyncExternalStore` rather than the block's original
 * effect-plus-setState: that pattern trips `react-hooks/set-state-in-effect`
 * and renders once with the wrong value before correcting itself.
 */
const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(onChange) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

/** The server has no viewport, so assume desktop and let hydration correct it. */
function getServerSnapshot() {
  return false;
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
