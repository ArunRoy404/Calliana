<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Calliana — project rules

These rules are binding. They are not suggestions, and they are not overridden by
"it's quicker this way". If a rule genuinely cannot be followed for a given task,
say so explicitly instead of silently working around it.

## 0. The two rules that outrank everything

1. **Never write the same line of code twice.** If a block of markup, a class
   string, a handler, or a shape of data appears a second time anywhere, it
   becomes a reusable component, a shared constant, or a store selector —
   immediately, not "later". Duplication is a defect, not a style preference.
2. **Do not re-pass classes a component already applies.** A reusable component
   owns its default look. Call sites pass `className` only to add something
   genuinely per-instance (position, width in a specific layout). Never restate
   the defaults from outside, and never pass a class that fights one the
   component already sets — fix the component instead.

## 1. Data lives in `src/data`, never in components

- Every literal — copy, labels, list items, image paths, geometry — lives in
  `src/data/<domain>/<name>.data.js`.
- Components import **nothing** from `src/data` directly. They read it through a
  store (rule 2).
- Tailwind class strings that vary per instance (absolute positions, sizes) may
  live in data files as **complete literal strings**. Never build a class by
  concatenation — Tailwind cannot see `left-[${x}px]` and will not emit it.

## 2. State lives in `src/store` (Zustand), never in components

- One store per domain: `src/store/<domain>/use<Name>Store.js`.
- The store owns the dummy data, the state, every update action, and every
  derived operation (validation, reset, submit).
- Components **only** call hooks: `const x = useSomeStore((s) => s.x)`.
  No `useState` for domain state, no hardcoded data, no business logic in UI.
- Select atomically (`(s) => s.values.email`), never a freshly-built object —
  that re-renders on every store change.
- `useState` is allowed only for state that is genuinely local and visual, and
  that nothing else could ever need (e.g. a password reveal toggle).

## 3. Validation lives in `src/schemas` (Zod)

- `src/schemas/<domain>/<name>.schema.js` exports the schema and its inferred
  helpers. Nothing else defines validation rules.
- Stores consume schemas. Components never call a schema directly.

## 4. Images

- **Never use `<img>`.** Always `next/image`, via the `AppImage` atom.
- `next/image` auto-applies `unoptimized` for `.svg` sources, so SVGs need no
  config; raster images get the full optimization pipeline.
- Always give explicit dimensions (or `fill`) so nothing shifts on load.

## 5. Optional chaining is mandatory

Use `?.` and `??` on anything that could be absent — array items, props, nested
config, callback props (`onClick?.(event)`), parse results. No bare `a.b.c`
where `a` or `b` is not proven to exist.

## 6. Reusable components, down to the atom

**There is no `components/ui` catch-all.** Every component lives in a folder
named for what it *is*. When a folder starts collecting unrelated things, split
it rather than letting it grow.

| Folder                       | Holds                                                        |
| ---------------------------- | ------------------------------------------------------------ |
| `components/atoms/`          | Indivisible pieces — Button, Checkbox, Spinner, AppImage, TextLink, IconTile, StatusPill |
| `components/forms/`          | Inputs and form compositions — InputField, FormOptionsRow     |
| `components/cards/`          | Card shells — CardHeading, CardNote, PanelCard                 |
| `components/dashboard/`      | Dashboard sections, one folder per feature — `stats/`, `live-calls/`, `attention/`, `agents/`, `audit/` |
| `components/nav/`            | Sidebar, top bar and the account menu                         |
| `components/notifications/`  | Notification popover and its rows                             |
| `components/motion/`         | Reveal, MotionTableRow and other shared transitions           |
| `components/layout/`         | Page shells — ViewportShell, ScrollableCenter                 |
| `components/shadcn/`         | shadcn primitives. Edit only to fix a defect or bind it to our tokens, and say why in a comment |
| `components/features/`       | Feature/marketing list rows — FeatureItem, FeatureList         |
| `components/auth/`           | Auth-specific compositions — AuthCard, AuthHeroPanel, AuthHeroCopy |
| `components/decor/`          | Purely decorative, `aria-hidden` pieces                       |
| `components/brand/`          | Logo and brand marks                                          |
| `components/providers/`      | Client providers mounted at the root                          |

Add a folder when a new concern appears (`tables/`, `modals/`, `charts/`…)
rather than widening an existing one. A folder that grows past a handful of
files splits by feature, the way `dashboard/` does.

Shared hooks live in `src/hooks/`.

- Domain folders (`auth/`, later `agent/`, `client/`, `admin/`) hold
  compositions tied to that domain. Anything a second domain needs moves down
  into a generic folder (`forms/`, `cards/`, `atoms/`).
- `src/app/<route>/_components/` — only for a composition that is genuinely
  single-use on that route. If a second route needs it, it moves out.
- A helper component defined inside another file is a bug. One component, one
  file, with named props.

## 7. `cn()` for every conditional or merged class

- Always `import { cn } from "@/lib/cn"`. Never template literals, never array
  `.join(" ")`, never manual string concatenation for classes.
- `cn()` is `clsx` + `tailwind-merge`, so a later class correctly beats an
  earlier conflicting one.
- tailwind-merge only knows Tailwind's own class names, so every custom scale
  has to be registered with it or the override silently fails. The type scale
  lives in `src/lib/typography.js` and the radius scale in `src/lib/radii.js`.
  **Add a class to either scale in `globals.css` → add its name to that file**,
  or `cn("rounded-md", "rounded-8")` keeps both and the stylesheet decides.

## 8. Buttons

All button behaviour lives in `src/components/atoms/Button.jsx`. Never style a
raw `<button>` at a call site.

- Variants: `primary`, `secondary`, `danger`, `ghost`. Sizes: `sm`, `md`, `lg`.
- `isDisabled` — disables and dims.
- `isLoading` — disables and shows a smoothly rotating spinner.
- `notFunctional` — for UI that has no backend yet. `onClick` still runs (so
  client-side work like validation happens), the native form submit is blocked
  (there is nothing to post to), and a toast says the feature isn't wired up.
- Every state change is a smooth transition; pressing scales the button down
  slightly.

## 9. Layouts absorb what repeats across a route group

Shared chrome goes in that segment's `layout.js`, not copy-pasted into each
`page.js`. A page should render only what is unique to it.

The three role dashboards (`admin`, `agent`, `client`) are one shell, not three.
`DashboardShell` renders the sidebar, top bar and content area for all of them
and takes a `role`; each role's `layout.js` is a single line. Nothing in the
shell may hardcode a role:

- Nav rows come from the catalogue in `src/data/dashboard/nav-items.data.js`,
  and a role lists which ones it shows in `nav.data.js`. Hrefs are built from
  the role, so one entry serves `/admin/calls`, `/agent/calls` and
  `/client/calls`.
- `useDashboardStore` holds the bundles keyed by role; components select
  `nav[role]` / `topBar[role]`.
- Adding a role is a data entry plus a one-line `layout.js`. If it needs a
  component change, the component was not reusable enough — fix that instead.

## 10. shadcn

shadcn components are primitives we adopt, not a second design system.

- They land in `components/shadcn/` and are generated as `.jsx`.
- `globals.css` maps shadcn's semantic names (`bg-primary`, `border-border`,
  `bg-sidebar`…) onto our Figma tokens, so a shadcn component inherits this
  design system. Add a component needing a name that is not mapped → map it.
- `npx shadcn@latest add` is not trusted output. It has shipped `import { cn }
  from "cn"`, demo files at the repo root, a dark-mode variant, and hooks that
  fail our lint. Check its diff and clean up before moving on.
- Its overlays (sheet, popover, tooltip, dialog) animate through
  **`tw-animate-css`**, which the installer does not add. Without the
  `@import "tw-animate-css"` in `globals.css`, `animate-in`, `slide-in-from-*`
  and `fade-in-0` are dead classes and every overlay pops into place with no
  motion — it looks like a missing animation, not a missing dependency.
- Overlay motion uses the project's own curve, not shadcn's defaults:
  `ease-reveal` (the `--ease-reveal` token, matching `REVEAL_EASE` in
  `src/lib/motion.js`), and the exit is always quicker than the entrance.
- Use them for behaviour — focus management, portals, keyboard handling — and
  restyle to the design rather than accepting their defaults.

## 11. Toasts

`goey-toast`. `<GooeyToaster />` is mounted exactly once in the root layout via
`ToasterProvider`, and `goey-toast/styles.css` is imported once at the root.
Call `gooeyToast.*` from stores or handlers.

## 12. Never commit or push unless asked

**Never commit and never push unless the user says so, in that message.** This
has no exceptions.

Do not run `git commit`, `git push`, or open a PR on your own initiative — not
after finishing a task, not to "save progress", not because the tree looks
finished, not because an earlier message allowed it. Leave the work in the
working tree and say what changed.

Commit only when explicitly told to in that message ("commit this", "commit and
push"). Permission is for that request only and does not carry over to the next
task. Pushing needs its own explicit instruction: "commit" never implies push.

When told to commit:

- Commit on the working branch (`roy`), never directly on `main` — `main` only
  moves through a merged PR.
- Split the work into batches, one commit per concern (e.g. shell chrome,
  shared motion helpers, the components that use them, docs), each one a state
  that builds.

## 13. Design tokens

Colors, radii, type scale and elevation come from `src/app/globals.css`, which
mirrors the Figma variables. Never hardcode a hex value in a component. The
project is **light theme only** — no dark mode, no `dark:` variants.

## 14. Reveal motion: every component reveals itself, parents set the order

A page never wraps its content in one big `Reveal`. Everything arriving at once
reads as a page load; things arriving one after another reads as premium.

- **Every card, panel and list row reveals itself.** Its root is
  `<Reveal as="…" delay={revealDelay}>`, and the component takes a
  `revealDelay` prop (seconds, default `0`). Layout wrappers — page columns,
  grids, rows of panels — are plain `div`s and never animate.
- **The parent hands out the delays**, always through the helpers in
  `src/lib/motion.js`. Never hand-write a delay number at a call site.
  - `revealDelayAt(start, index)` — siblings: the `index`th item starts one
    `REVEAL_STEP` after the previous. A grid of cards maps its items with it.
  - `nestedRevealDelayAt(parentDelay, index)` — a container's own rows: they
    start `REVEAL_NESTED_OFFSET` after the container, then step one by one.
    A panel passes its own `revealDelay` in, so its rows follow it.
- **The page sets the sequence** in reading order and derives offsets from the
  data, not from hardcoded counts. The admin overview is the reference:
  primary stat cards from `0`, secondary ones from `revealDelayAt(0,
  primary.length)`, then each panel a step after the last, and every panel's
  rows nested after their panel.
- A list or table row is a reveal too: `<Reveal as="li">`, and for shadcn's
  table `<Reveal as={MotionTableRow}>`. `as` takes a tag name or a motion
  component made once at module level — never `motion.create()` in render.
- Timing lives in `src/lib/motion.js` (`REVEAL_STEP`, `REVEAL_NESTED_OFFSET`,
  `REVEAL_DURATION`, `REVEAL_EASE`). Change the feel there, once, for the
  whole app. `Reveal` already drops movement and delay under
  `prefers-reduced-motion`.
- `<Reveal stagger>` / `<Reveal item>` stay for small self-contained groups
  (the auth card's own slots). Do not use them to sequence a page.
