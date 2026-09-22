/**
 * Motion configuration.
 *
 * These are design decisions, not content, so they sit beside the other
 * cross-cutting helpers rather than in `src/data` — nothing renders them and
 * no store needs to swap them out.
 *
 * Animation uses framer-motion, which is already a dependency (goey-toast
 * requires it), so nothing new is pulled in for this.
 */

/**
 * An ease-out curve that moves fast then settles, rather than drifting to a
 * halt. It is what makes a reveal feel deliberate instead of sluggish.
 */
export const REVEAL_EASE = [0.16, 1, 0.3, 1];

/** Long enough to read as intentional, short enough not to delay input. */
export const REVEAL_DURATION = 0.55;

/** How far an element rises into place, in pixels. */
export const REVEAL_DISTANCE = 16;

/** Gap between a group's children, in seconds. */
export const REVEAL_STAGGER = 0.07;

/** Pause before a group's first child begins. */
export const REVEAL_DELAY_CHILDREN = 0.05;
