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

/**
 * The same curve for CSS transitions, exposed in `globals.css` as `--ease-reveal`
 * and used through the `ease-reveal` utility. Keep the two in step.
 */
export const REVEAL_EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Long enough to read as intentional, short enough not to delay input. */
export const REVEAL_DURATION = 0.55;

/** How far an element rises into place, in pixels. */
export const REVEAL_DISTANCE = 16;

/** Gap between a group's children, in seconds. */
export const REVEAL_STAGGER = 0.07;

/** Pause before a group's first child begins. */
export const REVEAL_DELAY_CHILDREN = 0.05;

/**
 * Gap between siblings in a reveal sequence, in seconds — the step that makes
 * cards and rows arrive one after another instead of landing as a block.
 */
export const REVEAL_STEP = 0.08;

/**
 * How long a container is on screen before its own rows start to follow it
 * in, in seconds. Lets the panel settle first, then fill.
 */
export const REVEAL_NESTED_OFFSET = 0.15;

/** Delay of the `index`th sibling in a sequence that starts at `start`. */
export function revealDelayAt(start = 0, index = 0) {
  return (start ?? 0) + (index ?? 0) * REVEAL_STEP;
}

/**
 * Delay of the `index`th row inside a container that itself reveals at
 * `parentDelay` — the rows begin once the container has had a moment.
 */
export function nestedRevealDelayAt(parentDelay = 0, index = 0) {
  return revealDelayAt((parentDelay ?? 0) + REVEAL_NESTED_OFFSET, index);
}
