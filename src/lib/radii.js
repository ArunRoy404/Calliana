/**
 * The project's radius utility classes, generated from the `--radius-*` tokens
 * in `src/app/globals.css`.
 *
 * `cn()` needs to know about them: tailwind-merge only recognises Tailwind's own
 * `rounded-{sm,md,lg,…}` names, so `cn("rounded-md", "rounded-8")` would keep
 * *both* and let stylesheet order decide the winner. Registering ours in the
 * same class group makes a later radius correctly replace an earlier one —
 * which is how a shadcn primitive's default gets overridden by the design's.
 *
 * Add a radius to the `@theme` block in globals.css → add its class name here.
 */
export const RADIUS_CLASSES = [
  "rounded-0",
  "rounded-4",
  "rounded-6",
  "rounded-8",
  "rounded-10",
  "rounded-12",
  "rounded-16",
  "rounded-24",
  "rounded-999",
];
