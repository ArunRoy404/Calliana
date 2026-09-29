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
- **Exception — view state belongs in the URL** (rule 26). Search, filters,
  page, page size, the open panel and its tab are search params, not store
  fields. The store still owns the logic: it derives the view from the params
  and its actions write them.

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
| `components/atoms/`          | Indivisible pieces — Button, Checkbox, Spinner, AppImage, AssetIcon, ToneIcon, UserAvatar, StatusBadge, MetaLine, TextLink, IconTile, StatusPill |
| `components/forms/`          | Inputs and form compositions — FieldShell, InputField, TextAreaField, FormField, StoreField, FormSelect, StoreSelect, FilterSelect, FormSection, TimeRangeField, SearchField, FormOptionsRow |
| `components/overlays/`       | SidePanel — the one drawer every add/edit/detail panel is built on; FormPanel (an add drawer) and its FormPanelFooter |
| `components/actions/`        | ActionBar — a record's row of action buttons                   |
| `components/lists/`          | StaggerList — a list whose rows reveal one after another       |
| `components/tabs/`           | UnderlineTabs                                                  |
| `components/timeline/`       | Timeline and TimelineEvent (audit trail, agent and client activities) |
| `components/charts/`         | MeterRow and other small data graphics                         |
| `components/tables/`         | The reusable list screen — TableDirectory (the whole screen), TableCard, TableToolbar, DataTable, TablePagination, TableCardList / TableRowCard (the card view), EmptyMessage, and `cells/` (one renderer per column `type`) |
| `components/cards/`          | Card shells — CardHeading, CardNote, PanelCard, CardField, DetailSection, InfoTile, InstructionCard, MetricRow, NoticeCard, RowCard, StatFigure, StatTile |
| `components/agents/`         | Agent compositions — `add/` (AddAgentPanel, AddAgentFields) and `detail/` (AgentDetailPanel, its tabs and rows) |
| `components/clients/`        | Client compositions — `add/` (AddClientPanel, AddClientFields) and `detail/` (ClientDetailView, its header, tabs and rows) |
| `components/dashboard/`      | Dashboard sections, one folder per feature — `stats/`, `live-calls/`, `attention/`, `agents/`, `audit/` |
| `components/nav/`            | Sidebar, top bar, account menu and Breadcrumbs                |
| `components/notifications/`  | Notification popover and its rows                             |
| `components/motion/`         | Reveal, MotionTableRow and other shared transitions           |
| `components/layout/`         | Page shells — DashboardShell, ViewportShell, ScrollableCenter |
| `components/shadcn/`         | shadcn primitives. Edit only to fix a defect or bind it to our tokens, and say why in a comment |
| `components/features/`       | Feature/marketing list rows — FeatureItem, FeatureList         |
| `components/auth/`           | Auth-specific compositions — AuthCard, AuthHeroPanel, AuthHeroCopy |
| `components/decor/`          | Purely decorative, `aria-hidden` pieces — TextureLayer and the auth backdrops |
| `components/brand/`          | Logo and brand marks                                          |
| `components/providers/`      | Client providers mounted at the root — ToasterProvider, UrlRouterBridge |

Add a folder when a new concern appears (`tables/`, `modals/`, `charts/`…)
rather than widening an existing one. A folder that grows past a handful of
files splits by feature, the way `dashboard/` does.

Shared hooks live in `src/hooks/` (`useUrlParams`, `useTableView`,
`useDebouncedDraft`, `useRetainedValue`…); shared non-React services in
`src/lib/` (`src/lib/url/` for the URL state service).

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

- Variants: `primary`, `secondary`, `danger`, `ghost`, `link`, `outline`,
  `neutral`, `info`, `toolbar`. Sizes: `none`, `xs`, `compact`, `square`,
  `sm`, `md`, `lg`.
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
  table `<Reveal as={MotionTableRow}>`. A vertical list of rows is
  `lists/StaggerList`, which hands each row its delay — never map
  `nestedRevealDelayAt` by hand. `as` takes a tag name or a motion
  component made once at module level — never `motion.create()` in render.
- Timing lives in `src/lib/motion.js` (`REVEAL_STEP`, `REVEAL_NESTED_OFFSET`,
  `REVEAL_DURATION`, `REVEAL_EASE`). Change the feel there, once, for the
  whole app. `Reveal` already drops movement and delay under
  `prefers-reduced-motion`.
- `<Reveal stagger>` / `<Reveal item>` stay for small self-contained groups
  (the auth card's own slots). Do not use them to sequence a page.

## 15. Two control heights: forms and filter bars

Controls that sit in a row share one of two heights, set by tokens in
`globals.css` and chosen through a `size` prop — never a raw height:

| `size` | Token / class                         | Used for                                          |
| ------ | ------------------------------------- | ------------------------------------------------- |
| `md`   | `--control-height` · `h-control` (44px)   | Forms and the top bar — inputs, form buttons, top-bar tiles and search |
| `sm`   | `--control-height-sm` · `h-control-sm` (36px) | Filter bars — a table toolbar's search, selects and action button |

- `SearchField` (default `md`), `FilterSelect` (default `sm`) and `Button`
  (`sm` / `md`) all take the same `size`, so everything in one bar matches.
  The class for each size is `CONTROL_SIZE_HEIGHT` in `src/lib/controls.js`.
- Never give a control its own height (`h-9`, `h-11`, `py-3` for height).
  The `h-control*` classes are registered with `cn()`, so they override cleanly.
- Change a height once, in its token, for the whole app.
- Search fields carry no keyboard-shortcut hint (no `⌘K` chip) — anywhere.

## 16. Every list is a reusable table

- A list screen is `tables/TableDirectory` over a store made by
  `createTableStore` (`src/store/createTableStore.js`). The directory draws the
  toolbar (search, one select per filter, rows-per-page, add action), the
  table, the card view and the pager from the store's `content`; a page adds
  only its drawers. Never hand-build a table or its search/filter/paging
  logic. The agents and clients pages are the reference.
- Filters are data: `filters: [{ param, field, allValue, label, options }]` —
  the URL key, the row field it compares to, the "all" value and the select.
  A list can have any number; `filterParamsFrom(filters)` gives the URL
  schema the same set.
- Row actions are data too: an `action` column's `actions: [{ id, label,
  icon, iconOnly, variant, hrefField, props }]`. `hrefField` makes it a real
  link (a record's own page); `props` carry `notFunctional` and its copy.
- The table is data-driven: columns (label, `type`, row field, alignment) and
  rows live in the data file. A new kind of cell is one file in
  `components/tables/cells/` plus one entry in `TableCellContent`.
- **10 rows per page by default** (`TABLE_DEFAULTS` in
  `src/data/tables/table-defaults.data.js`). Every table's toolbar has a
  **rows-per-page select beside its filter**, fed by the store's
  `pageSizeOptions` / `setPageSize`.
- Its query, filter, page and size live in the URL (rule 26): components read
  them with `useTableView(useStore)`, never from store fields.
- Declare each column once as a named constant and reference it from both
  `columns` and `card`, so the table and card views can never drift.

## 17. Tables become cards on smaller screens

Wide tables do not scroll sideways on phones and tablets. Below `xl` a list
renders as cards; from `xl` up, as the table.

- The card view is `tables/TableCardList` of `tables/TableRowCard`, for every
  list. The card draws every value with the table's own cell renderers
  (`TableCellContent`) and labels fields with `CardField`, following the
  `card` layout in the data file — title, status, subtitle, fields, action.
  A list gets its own card component only if its layout genuinely cannot be
  expressed by `card`.
- Both views render the store's same `visibleRows`, so search, filter,
  rows-per-page and paging are shared; the toolbar and pager serve both.
- The container is one column on a phone, two from `sm`; cards reveal one by
  one (rule 14). An empty result uses `EmptyMessage` in both views.
- A reveal must never flash a scrollbar. Anything that animates inside a
  scroll container clips the axis it moves on — `DataTable` passes
  `containerClassName="overflow-y-hidden"` to the table's scroll wrapper, and
  `TableCard` clips its own overflow.

## 18. Sidebar

The dashboard sidebar is deliberately slimmer than Figma: 232px, with a 64px
icon rail — both in `src/lib/sidebar.js` (and `--sidebar-width-mobile` in
`globals.css` must match). Rows sit inset with soft corners and letter-spaced
labels; the active row gets a tint and a primary accent bar on the sidebar
edge. Keep new nav work within that language rather than returning to
full-bleed rows.

## 19. Reuse before you build — and prefer shadcn

Before writing any component, **search the project for one that already does
the job** (`components/atoms`, `forms`, `cards`, `tables`, `overlays`,
`motion`, the stores and `src/lib`). Extend an existing component with a prop or
variant before creating a new one; a near-duplicate is a rule 0 defect.

When nothing fits, **start from a shadcn primitive** rather than hand-rolling
behaviour. If the primitive is not in `components/shadcn/` yet, add it with
`npx shadcn@latest add <name>` and clean it up (rule 10). Wrap it once in a
project component that owns the look, and use that wrapper everywhere —
never the raw primitive at a call site.

| Need                         | shadcn primitive | Project wrapper                         |
| ---------------------------- | ---------------- | --------------------------------------- |
| Side panel / drawer          | `sheet`          | `overlays/SidePanel`                    |
| Avatar with initials fallback| `avatar`         | `atoms/UserAvatar`                      |
| Dropdown select              | `select`         | `forms/FilterSelect` (`filter` / `field` variants), `forms/FormSelect` (labelled) |
| Tabs                         | `tabs`           | `tabs/UnderlineTabs`, `NotificationsPanel` pills |
| Table                        | `table`          | `tables/DataTable`                      |

## 20. Every side panel is `SidePanel`

Add, edit and detail drawers — for any entity — are all built on
`components/overlays/SidePanel` (shadcn `sheet` underneath). It owns the width,
the header (title, subtitle, close), the scrolling body, the sticky footer and
the motion; a feature supplies only its content.

- An add drawer is `overlays/FormPanel`: give it the list store and the form
  store, and the fields as children. The list's schema declares `addPanel:
  true` and `createTableStore` supplies `isAddOpen` / `openAdd` /
  `setAddOpen`.
- Which panel is open (and its tab) lives in the URL (`?agent=<id>&tab=…`,
  `?panel=add` — rule 26), read through the feature's store and written by its
  actions; never in `useState`. Keep the closing panel's content with
  `useRetainedValue` so it does not blank while sliding away.
- The body scrolls on its own; header and footer stay put.
- Never style a raw `SheetContent` at a call site.

## 21. Avatars are `UserAvatar`

Every person picture is `components/atoms/UserAvatar` (shadcn `avatar`). With
no `src` it shows the person's initials, derived from their name — data files
never store initials. Sizes come from its `size` prop, not a call-site class.

## 22. Capture what each request teaches

Whenever a request carries a lasting preference or decision — a design
language, a component pattern, a workflow habit — write it into this file as a
rule in the same change, and add a one-line pointer in `CLAUDE.md`. Rules are
how later work stays consistent with earlier work; a preference that lives only
in a past conversation is lost.

## 23. Forms: one frame, one store factory, one schema

- Every field sits in `forms/FieldShell` (label, control, helper/error line).
  `InputField` and `FormSelect` both render through it, so a text box and a
  dropdown in one form share label style, spacing and error treatment.
  `InputField` takes a `trailingIcon`, and `type="time"` opens the native
  picker from anywhere in the box.
- A form's state is a `createFormStore` store; its rules are a Zod schema in
  `src/schemas/<domain>/` (shared field rules — email, phone, password — in
  `src/schemas/auth/shared.schema.js`). Submit, cancel and reset are store
  actions — the component only binds fields and calls them.
- Bind fields with `forms/StoreField` and `forms/StoreSelect` (they take the
  store and a data config, and read their own value and error); group them
  with `forms/FormSection`. `type: "textarea"` is a multi-line field.
- A drawer's form store passes `closePanel` and `notFunctional`; it then has
  `cancel` and `submitAndClose`. With no backend, a valid submit shows the
  not-wired-up toast and closes; it never pretends the action happened.

## 24. Light theme is enforced, not assumed

`globals.css` binds `dark:` to a `.dark` class the app never sets
(`@custom-variant dark`). Without it, Tailwind's `dark:` follows the OS, and
every `dark:` class shadcn ships switches on for visitors in dark mode — the
agent panel's active tab lost its colour that way. Never remove that line, and
never write a `dark:` class.

## 25. Icons come from data, as assets or lucide

- A data file describes an icon as `{ src, width, height }` (an exported Figma
  asset in `public/icons/`) or `{ lucide, size }`. `atoms/AssetIcon` renders
  either; components never branch on it themselves.
- Download Figma assets once into `public/icons/<feature>/`. When an export is
  broken (missing paths, a masked group), use the closest lucide glyph and say
  so in a comment beside the data entry.
- Actions without a backend spread `notFunctionalProps(content)` from
  `src/lib/notFunctional.js` rather than rebuilding the props object.

## 26. View state lives in the URL, through one service

Anything a user would expect a link, a refresh or the Back button to keep —
search, filters, sort, page, page size, the open panel, the active tab — is a
**search param**, on every page and module. Never hold it in `useState` or a
store field. Pasting the link must reopen the page exactly as it was, rendered
that way on the server.

The pieces, all reusable — never hand-roll `URLSearchParams` or
`history.pushState` in a feature:

| Piece | Where | Does |
| ----- | ----- | ---- |
| URL schema | `src/schemas/url/list-params.schema.js` → `src/schemas/<domain>/<page>-params.schema.js` | `createListParamsSchema` gives the shared list keys (`q`, the filter, `page`, `size`); `extra` adds page keys with `optionalIdParam`, `enumParam`, `optionalEnumParam`. Every field `.catch()`es its default, so a bad link falls back instead of breaking. |
| Parse / merge | `src/lib/url/searchParams.js` | Isomorphic: `parseSearchParams(schema, source)` (server `searchParams`, a query string or `URLSearchParams`), `mergeSearchParams`, `searchParamDefaults`. Defaults and empty values are dropped from the URL. |
| Write | `src/lib/url/urlState.js` | `writeUrlParams(patch, { defaults, history, shallow })`, called from store actions. Shallow (history API, no server trip) by default; `shallow: false` navigates through the router `UrlRouterBridge` registers, so server components re-fetch. |
| Read | `src/hooks/useUrlParams.js` | `useUrlParams(schema)` / `useStoreParams(useStore)` — typed params from `useSearchParams`, memoised on the query string. |
| Tables | `createTableStore({ paramsSchema, filterParam, … })` + `src/hooks/useTableView.js` | The store holds content and a pure `deriveView(params, serverPage?)`; its actions write the URL (a new query, filter or size resets the page). `useTableView(useStore)` returns the current view. |
| Search box | `forms/SearchField` + `useDebouncedDraft` | Types into a draft, commits after `SEARCH_COMMIT_DELAY_MS`; follows the URL when it changes from outside. |

- **SSR.** A page whose client components read the URL renders per request:
  its `page.js` calls `await connection()` (or reads `searchParams`). Never let
  it prerender and flash the default view. Module-level Zustand stores are
  shared by every request on the server, so request-specific state must never
  be written into them — derive it from the URL instead.
- **API-ready.** When a list comes from an API, `page.js` does
  `parseSearchParams(schema, await searchParams)`, fetches with those params,
  and passes `{ rows, totalCount }` down as `useTableView`'s `serverPage`; the
  store is made with `shallow: false`. Components do not change.
- **URL hygiene.** Short, readable keys; values are ids or enum slugs, never
  labels; the resting state is a bare path. `history: "replace"` by default,
  so typing and paging do not flood Back. Opening one panel clears another's
  keys.
- Components never know key names: a store exposes readers over params
  (`isAddOpen(params)`, `selectedAgent(params)`) and actions that write them.

## 27. A record with its own design page gets its own route

When the design gives a record a full page (a client — Figma 198:30338)
rather than a drawer, it is a route: `/<role>/<list>/[id]`, e.g.
`/admin/clients/laura-alegre-clinic`. The client module is the reference.

- `page.js` is a server component: `await connection()`, read the id from
  `await params`, look the record up through the store's `…ById` reader and
  call `notFound()` for an unknown id — a real 404, not an empty page. Its
  `generateMetadata` names the record. It renders one client view with the id.
- The list links to it through an action with `hrefField` (a real `<a>`).
- The page's tab is `?tab=` (rule 26): a small Zod schema beside the list's
  (`clientDetailParamsSchema`), read with `useUrlParams`, written by a store
  action. Tab badges count the list each tab shows, so they cannot drift.
- An edge-to-edge page cancels the dashboard padding with `MAIN_BLEED`
  (`src/lib/layout.js`) — never with hand-written negative margins.
- Build it from the shared pieces: `nav/Breadcrumbs`, `actions/ActionBar`,
  `tabs/UnderlineTabs` (`spacing="wide"`, counts), `cards/DetailSection`
  (`size="lg"`, `subtitle`, `action`), `StatTile`, `InfoTile`,
  `InstructionCard`, `lists/StaggerList`, `timeline/Timeline`, and a
  `RowCard` variant (`boxed`, `emphasis`, `ruled`, `divider`, `rounded`,
  `outlined`, `compact`) for each row. A new row look is a new `RowCard`
  variant, not a new bordered `li`.
- A nav section stays lit on its inner pages (`isNavActive`).

## 28. Assets are stored once

- Before adding a downloaded asset, compare it with what `public/` already has
  (same bytes → reuse the existing file). An icon two features use lives in
  `public/icons/shared/`; one feature's own icons in `public/icons/<feature>/`.
- A faint background image is `decor/TextureLayer` (`scrim` for the page
  wash). Check whether an export already has its opacity baked into its alpha
  (the stat-card texture does) before applying the design's opacity again.
- A tint the tokens lack (avatar chips) becomes a token in `globals.css` and
  a tone map entry in `src/lib/tones.js` — never a hex in a component.
