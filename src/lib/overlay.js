/**
 * The scrim behind every drawer (`shadcn/sheet`) and centred dialog
 * (`shadcn/dialog`) — one string, so both overlays always match.
 *
 * The design's ink rather than flat black, blurred enough that the page
 * behind reads as background, not content (the appointment drawers, whose
 * mock-ups blur the calendar past legibility). It fades on the project's
 * reveal curve, and the exit is quicker than the entrance (rule 10).
 */
export const SCRIM_CLASSES =
  "fixed inset-0 z-50 bg-brand-ink-black/40 backdrop-blur-[6px] ease-reveal data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-[260ms] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-[420ms]";
