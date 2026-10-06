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
| `components/atoms/`          | Indivisible pieces — Button, Checkbox, Spinner, AppImage, AssetIcon, ToneIcon, UserAvatar, StatusBadge, MetaLine, TextLink, IconTile, StatusPill, CountBadge |
| `components/forms/`          | Inputs and form compositions — FieldShell, InputField, TextAreaField, FormField, StoreField, FormSelect, StoreSelect, FilterSelect, FormSection, TimeRangeField, SearchField, FormOptionsRow |
| `components/overlays/`       | SidePanel — the one drawer every add/edit/detail panel is built on; FormPanel (an add drawer) and its FormPanelFooter |
| `components/actions/`        | ActionBar — a record's row of action buttons; PanelLink — a panel header's "Inbox ›" link |
| `components/lists/`          | StaggerList — a list whose rows reveal one after another       |
| `components/tabs/`           | UnderlineTabs                                                  |
| `components/timeline/`       | Timeline and TimelineEvent (audit trail, agent and client activities) |
| `components/charts/`         | MeterRow, DotMatrixChart / DotMatrixColumn, DonutChart, ChartLegend, ChartTooltip, ChartDataTable |
| `components/tables/`         | The reusable list screen — TableDirectory (the whole screen), TableCard, TableToolbar, DataTable, TablePagination, TableViews (the table-or-cards switch), TableCardList / TableRowCard (the card view), EmptyMessage, and `cells/` (one renderer per column `type`) |
| `components/cards/`          | Card shells — CardHeading, CardNote, PanelCard, CardField, DetailSection, InfoTile, InstructionCard, MetricRow, NoticeCard, RowCard, StatFigure, StatTile |
| `components/agents/`         | Agent compositions — `add/` (AddAgentPanel, AddAgentFields) and `detail/` (AgentDetailPanel, its tabs and rows) |
| `components/clients/`        | Client compositions — `add/` (AddClientPanel, AddClientFields) and `detail/` (ClientDetailView, its header, tabs and rows) |
| `components/messages/`       | The inbox — MessagesInbox (the three columns), ConversationList / ConversationRow, ConversationThread with ThreadHeader, MessageBubble and MessageComposer, ClientInfoPanel |
| `components/appointments/`   | The calendar — AppointmentsCalendar (on `TableCard`), CalendarToolbar, CalendarDayCard (Today), CalendarWeekView (time grid), CalendarMonthView / CalendarMonthCell (month grid), CalendarEventRow, AppointmentDetailPanel, ScheduleAppointmentPanel / ScheduleAppointmentFields |
| `components/client/`         | The client portal's own compositions, one folder per page — `dashboard/` (ClientDashboard, ClientWelcomeHeader, SecretaryStatusCard — its call, booking and conversation panels are the shared `tables/TablePanel`, `dashboard/bookings/BookingsPanel` and `dashboard/conversations/RecentConversationsPanel`). Not `clients/`, which is the admin's client management |
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
- Both overlays' scrims are one string, `SCRIM_CLASSES` in
  `src/lib/overlay.js` (the ink at 40% under a 6px blur, so the page behind
  a drawer reads as background). Change the backdrop there, never in one
  primitive.
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
project has a light and a dark theme over the same tokens (rule 24) —
never a `dark:` colour class.

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
- A control whose rows may wrap (`SegmentedFilter` when its options outrun a
  phone's width) takes the `min-h` form of its size (`CONTROL_MIN_SIZE_HEIGHT`)
  and its inner segments the control height less the strip's own inset
  (`CONTROL_SEGMENT_HEIGHT`) — so a single row is pixel-identical and a wrapped
  one grows instead of clipping. Both live in `src/lib/controls.js`.
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
- **A row that opens beneath itself** (the client call log's agent note) is
  data plus one store option, never a hand-built row: the list's
  `content.expand` (`{ field, title, hint, separator }`) and
  `createTableStore({ expandKey })` — the open row is a URL key (`?note=<id>`),
  `toggleRow(id)` opens or closes it, one row at a time. `DataTable` and
  `TableRowCard` both draw `tables/RowExpansion` and take their click/Enter/
  Space handling from `src/lib/rowToggle.js`, which leaves a row's own links
  and buttons alone. A row without that field is simply not expandable.

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

## 24. Two themes, one set of tokens

The app has a light and a dark theme. Dark mode is the `.dark` class on
<html>, toggled by the top bar's sun / moon tile (`nav/ThemeToggle`, through
`src/lib/theme.js`) and remembered per browser; an inline script in the root
layout (`THEME_INIT_SCRIPT`) restores it before the first paint, so there is
no light flash, and with no saved choice it follows the operating system.

- **Theme through tokens, never per component.** `globals.css` redefines the
  same token names under `.dark { … }`; every component already reads tokens,
  so it switches with no change. Never write a `dark:` colour class — a colour
  that looks wrong in dark mode is a token to fix (or add) in that block.
- `dark:` stays bound to the `.dark` class (`@custom-variant dark`), never to
  the OS setting. shadcn's own `dark:` classes are stripped from
  `components/shadcn/` when a primitive is added — they target shadcn's
  palette and would fight ours.
- The one structural use of `dark:` is a markup swap the server cannot know
  in advance (the toggle's sun vs. moon), so server and browser render the
  same markup.
- A flat light image (a texture) carries `texture-image`; dark mode inverts it
  in one rule. Exported artwork with baked colours (the spark lines) uses a
  translucent tint of its own stroke, which reads on both themes.

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
- **Dates in the URL** are ISO days (`?date=2026-08-10`) through
  `optionalIsoDateParam`; all date maths goes through `src/lib/calendarDates.js`
  (UTC, so server and browser agree on the day). The default day is left out
  of the URL, so the resting state stays a bare path.
- **No silent default selection.** A screen never shows a record as open
  (a conversation, a row's detail) unless the URL names it. With no id in
  the URL, nothing is selected and the screen says so with a prompt to pick
  one (the inbox's `ThreadPlaceholder`); choosing one writes its id
  (`?conversation=<id>`). Defaulting to "the first one" puts a view on
  screen that its link cannot reopen.
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

## 29. Pieces the calls/tasks/roles/routing/audit/profile/settings build added

Building those seven modules needed a few genuinely new, generic pieces.
Reach for these before adding anything similar:

- A pill-button filter (not a dropdown) is `forms/SegmentedFilter`, wired in
  by giving that filter `variant: "segmented"` in its data file —
  `TableDirectory` picks it over `FilterSelect` automatically. Used by the
  tasks due-date filter and the users role filter. Its solid strip wraps when
  its options outrun a phone's width, so a long set (tasks' five due filters)
  never pushes the page sideways.
- A toolbar action that is not the add drawer (an export, a compliance
  download) is `content.secondaryAction` (`{ label, icon,
  notFunctionalMessage, notFunctionalDescription }`) next to `addAction` in a
  list's data file — `TableDirectory` renders both, `secondaryAction` first.
- Selecting several people or accounts at once is `forms/MultiSelectList`
  (checkbox rows, an avatar and an optional `meta` line — assigning
  operators) or `forms/MultiSelectChips` (toggle pills — linking client
  accounts). Both take plain `value`/`onChange`; bind them to a form store by
  hand in the fields component, the way `AddAgentFields` binds
  `TimeRangeField` — they are not `StoreField`/`StoreSelect` configs.
- A table column showing a person is `type: "user"` (`tables/cells/UserCell`,
  rule 21's `UserAvatar` plus the name) rather than plain text.
- An `icon-text` column whose icon differs per row (calls' Direction:
  incoming vs. outgoing) sets `column.iconField` to the row field holding
  that row's icon, instead of one fixed `column.icon` for the whole column.
- An on/off setting is `atoms/Switch` (shadcn `switch`, wrapped per rule 10);
  a settings/profile row of label (+ description) and a value, a "Change"
  link or a `Switch` is `cards/SettingRow`. `InfoTile` takes an optional
  trailing `action` node for the same "EDIT" pattern outside a settings list
  (the profile page's personal-information tiles).
- A side-panel block drawn as its own bordered card (the call detail
  panel's recording, summary and notes) is `cards/DetailSection` with
  `variant="outlined"`, plus `icon` (an `AssetIcon` descriptor), `iconTone`
  for a coloured glyph beside a plain title, and `tone`, which on an
  outlined section tints the whole card (the amber triage note) — never a
  bordered `div` wrapped around a plain `DetailSection`. A round icon-only
  button (a recording's play button) is `Button size="round"`. Copy with
  per-record values in it ("Call Details: {caller}") is a data template
  filled by the store with `src/lib/fillTemplate.js`.
- A form the design draws backdrop-centred (the outbound dialer) is still
  `overlays/FormPanel`, with `overlay="modal"` — the same store wiring and
  `?panel=add` state on a centred `Modal` instead of a `SidePanel`. A tall
  or multi-band dialog is `Modal variant="sectioned"`: edge-to-edge header
  and footer rules, close in the header, a scrolling body and a
  canvas-tinted footer. `FormPanelFooter` drops its note when the data has
  no `requiredNote`, splits Cancel left / submit right with `footer.split`,
  and leads the submit with `footer.submitIcon`.
- A checkbox drawn as its own tinted row (label and icon left, box right) is
  `atoms/Checkbox variant="row"` with `icon` / `iconTone`. One ruled list in
  a single bordered box is `RowCard variant="listed"` inside a
  `StaggerList` that draws the box. A single-letter avatar is `UserAvatar
  maxInitials={1}` — still derived from the name (rule 21).
- The inbox (Figma 167:51527) added: `Button` `variant="success"` (a
  green-ruled confirm, "Mark Resolved"), `variant="row"` + `size="row"` (a
  whole list row as one button, `aria-current` tinting the open one) and
  `size="icon"` (a filter-bar-height icon square); `SegmentedFilter
  variant="soft"` (bare text pills on a light tint); `ActionBar` `size` and
  `layout="stack"`; `InfoTile size="sm"` and `as`; `MetaLine size="sm"`;
  `TextAreaField bareSize`; `RowCard variant="flush"`; `atoms/CountBadge`
  (an unread count); and `MAIN_FILL_HEIGHT` in `src/lib/layout.js` for a
  page whose columns scroll on their own instead of growing the page (the
  inbox fills it at every size, not only from `xl`, so a phone scrolls its
  panes too — rule 33).
- The calendar added: `RowCard variant="accent"` (a tinted strip with a 3px
  left rule — the caller adds `TONE_SURFACE` / `TONE_OUTLINE` for the event
  type's tone) and `variant="accent-compact"` (the same, sized to content,
  for a grid cell), `RowCard`'s `style` (data geometry only — a week event's
  `top` / `height`), `src/lib/calendarDates.js` and `optionalIsoDateParam`.
  The store's `deriveCalendar(params)` returns each view's own shape (day
  cards, the week's hour rows and columns, the month's whole weeks); a grid
  wider than a phone scrolls sideways under `lg`, clipped vertically.
  Calendar dates are computed, never copied from a mock-up — a design's
  sample weekday or date that disagrees with the real calendar is a mock-up
  slip, not a spec. A
  non-table screen on the same white-under-texture paper as a table reuses
  `tables/TableCard` with its own `toolbar`, rather than redrawing the
  texture.
- The appointment drawers added: `InfoTile` `tone` (tiles tinted in a
  record's tone — an appointment's details in its event type's green);
  `Button` `variant="plain"` + `size="stack"` (content that keeps its own
  colours, stacked top-left — a clickable calendar event, so every event
  opens its drawer as a real button); `InputField`'s `trailingIcon` is any
  `AssetIcon` descriptor and a `date` field opens its picker like a `time`
  one; `FormField` passes `trailingIcon` only to inputs. A list two forms
  share (client accounts) lives once in `src/data/admin/client-accounts.data.js`.
  An exported icon drawn for a dark tile (`/icons/calendar.svg`, near-white)
  is not reused on a white field — use the lucide glyph and say why beside
  the data entry.
- **The client portal is the same shell, not a second app.** Its sidebar,
  user card and top-bar heading are data: rows join the catalogue in
  `nav-items.data.js` (a client-only label is its own entry —
  `activityReports`, `businessProfile` — never a role check in a
  component), sections and user in `nav.data.js`, the heading in
  `top-bar.data.js`. Its pages live under `src/app/(dashboard)/client/`,
  their compositions in `components/client/<page>/`, their data in
  `src/data/client/` and stores in `src/store/client/`. A piece the admin
  already has (stat cards, the calls table, the inbox's conversations) is
  reused, never redrawn: shared call columns live in
  `src/data/tables/call-columns.data.js`; the inbox store's `summaries`
  feed any "recent conversations" list. A client page the design draws the
  same as an admin one (Messages) is a route rendering the same component
  (`MessagesInbox`), never a copy; only what differs becomes a prop or data.
- Replacing a person's photo replaces the one file every page points at
  (`public/client/avatars/<person>.png`), so the same person never shows two
  faces. In dev, Next keeps optimised images in `.next/dev/cache/images`;
  clear it after swapping an image at the same path.
- **One record set, one source.** A list the client sees in two places (its
  call log on Calls & Notes and the home's recent calls) comes from one store
  export (`clientCallRows`) — the home takes the first `recentCount` rows.
  The home's upcoming bookings are calendar events too, read by id from
  `appointmentDetailsById` (`useAppointmentsStore`), so each "Open" lands on
  that booking's drawer; an event type's `tag` is its short list name.
  A drawer two lists open is shared: `CallDetailPanel` takes the list's
  `useStore`, and every call list's store spreads `callDetailSlice`
  (`src/store/calls/callDetailSlice.js`) for `?call=<id>`. A role that words
  an inner page differently adds it to `ROLE_PAGES` in `top-bar.data.js`,
  which layers over the shared titles for that role only.
- The client requests page added: `Button variant="outline-primary"` (white
  with a primary rule — a row's "…" button) and `TextCell`'s
  `column.truncate` (one line, ellipsis). A list and its add drawer share
  their choice lists (`REQUEST_CATEGORIES`, `REQUEST_URGENCIES`,
  `REQUEST_STATUSES` in `src/data/client/requests.data.js`): the table's
  badges and filters and the form's selects read the same entries — a
  category the client cannot raise themselves is marked, not dropped
  (`requestable`). A button elsewhere that starts the same task links to the
  list with its drawer open (`/client/requests?panel=add`).
- The client contacts page added: `SidePanel` `closeIcon="text"` (a
  bordered "Close" button — `OverlayClose icon="text"`) and `ruled={false}`
  (no header/footer rules); `DetailSection` `variant="card"` (an outlined
  card with no rule under its title) and `variant="callout"` (the same with a
  small-caps eyebrow title — tint it with `tone`, the amber "IMPORTANT
  INSTRUCTION FOR AGENTS"); `CardField`'s `meta` line; `RowCard
  variant="bare"`; and a badge status naming its own `variant` (a bare
  "Inactive" beside tinted "Active" tags). A row's "…" that opens a details
  drawer is an `onRowAction` calling the store's `open<Record>(row)`, which
  writes `?<record>=<id>` — the list's own params stay. A toolbar button
  with no design for its form yet ("Add Contact") is `secondaryAction`, not
  an empty drawer.
- The client Business Profile is the admin's profile page, not a copy:
  `profile/ProfileView` takes a `useStore` made by
  `store/profile/createProfileStore(data)`, and what differs is data —
  `user.avatar` / `avatarSize` (`UserAvatar size="2xl"`, 80px) /
  `subtitle` / `meta`, a field's `editable: false`, `editLinkVariant`
  (`Button variant="underline"`), `instructions` (which sets working hours
  beside "Support Instructions for Agents"), `dayToggles` (a `Switch` per
  day, flipped by `toggleDay`, the day's badge and hours following it) and
  `elevatedSections`. `WorkingDayRow` takes `hoursIcon` and `action`; a
  text block on a grey well is `cards/NoteWell` (also inside
  `InstructionCard`); `InfoTile wrap` lets a long value (an address) wrap
  on a phone instead of being cut off.
- Settings are one `settings/SettingsView` over
  `store/settings/createSettingsStore(data)` (admin and client), with its
  `ChangePasswordModal` taking the same `useStore`; the shared
  `setChangePasswordOpen` writes `?modal=` on whichever page is showing.
  `content.look` picks the density (`standard` — the admin's ruled 16px
  rows; `large` — the client's 28px `DetailSection titleSize="lg"` titles,
  unruled `SettingRow size="lg"` rows on the new 18px `text-h5`, 20px
  underlined "Change"), and a `type: "tiles"` section draws its rows as
  `InfoTile size="lg"` (the client's display name and email; `columns: 3`
  sets three across from `lg` — the agent's general preferences). The
  agent's Profile and Settings are the same views over
  `createProfileStore` / `createSettingsStore`, their data spreading the
  admin's and changing only the look (`editLinkVariant`, `avatarSize`,
  `look: "large"`) and the agent's own sections. A
  `SettingRow`'s label wraps and its control stays at the right. Every
  `Modal` is 700px and closes with `OverlayClose` (the circled ⓧ inset,
  the bare X sectioned) — never shadcn's own close or 512px cap.
- A few rows of a list inside a panel (the client home's recent calls) are
  `tables/TableViews` — the same table-or-cards switch `TableDirectory`
  renders, without its toolbar and pager — on `TableCard` paper. A panel
  header's "see all" link is `actions/PanelLink`. A timeline row with a
  tag and an action is `Timeline`'s `renderAside(event)`, and an event's
  `meta` list replaces its timestamp with a `MetaLine`.
- **The agent workspace is the same shell too.** Its pages live under
  `src/app/(dashboard)/agent/`, compositions in `components/agent/<page>/`
  (not `agents/`, the admin's agent management), data in `src/data/agent/`,
  stores in `src/store/agent/`. A screen the admin already has (Calls) is
  the same component over the agent's own store: `calls/CallsDirectory`,
  `DialOutboundCallPanel` and `CallDetailPanel` all take the list's
  `useStore` / `useListStore`, and the agent's calls data spreads the
  admin's `callsData`, changing only its filters (`CALL_CLIENT_FILTER` /
  `CALL_STATUS_FILTER` are shared). A one-line client wrapper hands the
  store to the shared view, since a server page cannot pass a hook.
- The agent's Task & Follow-ups reuses the admin's task rows, columns
  (`TASK_COLUMNS`) and "Create Operational Task" drawer (`AddTaskPanel
  useListStore`); its one pill filter reads a list-valued `views` (the due
  bucket, plus `"mine"` for `MY_AGENT_KEY`'s tasks). `IconTextCell` takes
  `column.wrap` like `TextCell`. A list shown both as a page and as a
  dashboard panel (the agent's call history) keeps its table look
  (`CALL_HISTORY_TABLE`) and rows in one data file; the dashboard store
  slices the first `recentCount` rows.
- A record that is a call with more to it (a voicemail) is a row of the
  call log joined with its own fields by the store, never a second copy of
  the caller: the agent's voicemail list maps `callsData.rows` through
  `voicemail.data.js`'s `voicemails` (keyed by call id). Its drawer is
  `CallDetailPanel` with other content: the drawer's blocks are data
  (`detail.sections` — `kind` `recording` / `timeline` / text over a record
  `field`, `editable`, `icon`, `tone`), its recording header reads
  `recordingAsideTemplate` ("0:52 / 03:42") with an optional
  `downloadIcon`, and footer actions take an `icon`. `CallsDirectory`
  draws the dialer only when the list has an `addAction`. A badge status
  may carry its own `showDot`.
- Clients are one list and one record page for both portals:
  `store/clients/createClientsStore({ content, detailContent,
  detailHrefTemplate, paramsSchema })` builds the list, each row's "View
  Account" link and every client's detail record; `clients/ClientsDirectory`
  and `ClientDetailView` take its `useStore` (the add drawer shows only when
  the list has an `addAction`). The agent's data spreads the admin's
  (`clientsData`, `clientDetailData`) and changes only its links
  (`/agent/clients/{id}`), category labels and actions; filters shared
  between the two lists are named constants (`CLIENT_STATUS_FILTER`).
- The agent's Live Call Workspace (`/agent/calls/live`, an inner page of
  Calls) keeps its side-panel tab, calendar view, open previous call and
  chosen script response in the URL (`useLiveCallStore`), and the note,
  categories, professional and outcome in one wrap-up form
  (`useLiveCallNoteStore` + `live-call-note.schema.js`; `insertText` adds
  a canned response or a past call's message). Canned texts are one list
  that both the "Quick insert" chips and the response cards read. It
  added: `UnderlineTabs variant="boxed"`, `SegmentedFilter
  variant="boxed"`, `MultiSelectChips variant="tag"` + `showCount`,
  `Button variant="choice"` + `size="card"` (one-of-a-set cards marked by
  `aria-pressed`), `NoteWell tone` (`info` / `warning`), `cards/FactList`,
  `FilterSelect prefix`, `ActionBar` actions with an `href`, and top-bar
  titles for nested pages keyed by their path (`"calls/live"`). Below
  `xl` its three columns stack with the critical instruction and the note
  first (CSS `order`).
- One pill filter across two facets (All / Incoming / Outgoing / Missed /
  Voicemail) reads a list-valued row field: `createTableStore` matches a
  filter when the row's field equals the value or, for an array, includes
  it — the store sets `views: [direction, statusKey]`.
- The agent dashboard added: `tables/TablePanel` (a few rows of a list in a
  titled dashboard panel — no toolbar or pager; also the client home's
  recent calls), `dashboard/bookings/BookingsPanel` over
  `bookingRows(ids, { metaFields, openHrefTemplate })` from the calendar
  store (each dashboard picks its meta line), `dashboard/conversations/
  RecentConversationsPanel` (rows show a `status` when the store passes the
  inbox's `statusBadge`), `charts/Waveform` (decorative bars from a store-
  built loudness envelope; it clips, never squeezes), `atoms/ElapsedTimer`
  (a ticking mm:ss — local visual state), `atoms/IconLabel` (icon + one
  line of text) and `directionOf(direction, INBOUND_LABELS)` for
  "Inbound / Outbound". `Button size="compact"` never wraps its label.
- A design that shows the dashboard chrome around a new screen is built as
  the content only: the shell already draws the sidebar and top bar, and the
  top bar's title is a `pages.<segment>` entry in `top-bar.data.js` — never
  a heading re-drawn inside the page.
- A read-only "here is the current configuration" drawer only applies when
  the design itself shows plain values — check first (rule 30). When Figma
  draws the value inside a bordered field-height box (Edit Routing Rules,
  376:28372, `h-[38px]` boxes matching the create form's own selects), it
  means the field is editable: build it as a real `FormSelect`/`StoreSelect`,
  not `CardField` text. "Read-only for now" is only correct when the source
  itself has no field chrome around the value.

- The reports screens (admin Call Activity & Service Reports, client
  Reports & Activity) added: `store/reports/createReportsStore(data)` — one
  store factory both portals use (period in `?period=`, stats, outcomes and
  every chart's shape built once; a `peak` block in the data adds Peak Call
  Hours) — rendered by the one `reports/ReportsView`, which takes the store
  hook as `useStore` behind a one-line client wrapper per portal. Charts
  are `charts/DotMatrixChart` (`fill` `primary` / `accent`, scrolls inside
  its own box on a phone), `charts/DonutChart`, `charts/ChartLegend`
  (`marker` `square` / `ring`, `toneLabels`), every mark wrapped in
  `charts/ChartTooltip` (hover *and* keyboard focus) and backed by an
  `sr-only` `charts/ChartDataTable`. A report panel with a solid primary
  header band is `PanelCard variant="banded"`. shadcn `TooltipContent`
  takes `showArrow={false}` for a card-style tooltip.

## 30. Pixel fidelity is mandatory, not "close enough"

"Adapt to the project's conventions" (rule 19's shadcn guidance) is about
*implementation* — components, state, structure. It is never licence to
approximate spacing, type size, weight, or colour. Before building a screen
that has a Figma link, call `get_design_context` on the specific node (not a
parent) and match what it returns — font size, weight, line-height, colour,
padding — not the nearest existing type-scale class that seems close.

- **Every text style has three numbers that must all match: size, weight,
  colour.** A component's default (`DetailSection`'s `text-h4`, `TextCell`'s
  `text-label-md`) is a starting point, not the answer — check it against the
  node's actual `font-size`/`font-weight`/`text-[...]` before shipping. When
  it doesn't match, override on that call site (`cn("text-body-lg",
  "font-semibold")` reliably wins on weight — `font-*` utilities live in
  Tailwind's utilities layer, the type scale's own weight in `@layer
  components`, so utilities always win regardless of class order) rather
  than accepting the mismatch.
- **A row of section-header/value pairs in a side panel is often much
  smaller than a page's `DetailSection`** (Figma routinely runs these at
  10–12px, not the 20px `text-h4` default) — check the actual size per
  screen; do not assume every `DetailSection` title is the same size as the
  agent panel's.
- **Read every column's actual colour**, not just its weight — a table
  column can carry a tint (`AFFECTED RESOURCE` and `IP ORIGIN` in the audit
  log are `text-status-info` blue; `DESCRIPTION` is `text-text-tertiary`
  gray) that a bare `TextCell` default (plain `text-brand-black`) misses
  entirely. `TextCell` takes optional `column.tone` (a `src/lib/tones.js`
  key) and `column.weight` (`"regular"|"medium"|"semibold"`) for exactly
  this — set them from the node's real colour/weight rather than leaving
  every column looking the same.
- **A centred dialog is not a `SidePanel`.** Figma sometimes shows a
  screen-centre modal (backdrop blur, box centred both axes — Change
  Password, 319:34461) rather than a right-edge drawer. That is
  `overlays/Modal` (shadcn `dialog`, not `sheet`) — check whether a "Dialog"
  frame is centred or right-aligned before picking which one to build on.
- **Verify against a real render, not just the codegen dump.** Figma's
  dev-mode code panel can resolve a component instance to its *master*
  default rather than that instance's actual override — the sidebar's nav
  icons all codegen to the same placeholder glyph even though the rendered
  screenshot shows fourteen distinct ones. When codegen output looks
  suspiciously uniform across supposedly-different instances, pull
  `get_screenshot` (or `download_assets`) and check the pixels before
  concluding the source has no more detail to give.
- Before calling a screen done, take a real screenshot of the running page
  (rule from the `run` skill) and diff it against the Figma screenshot side
  by side. "It compiles and looks roughly right" is not the bar.

## 31. Icons redrawn, not resolved, get a comment saying so

When `get_design_context`/`download_assets` cannot resolve a specific icon
(rule 30's placeholder-glyph problem) but the rendered screenshot shows it
clearly enough to redraw by hand by eye, the resulting icon component's
header comment must say so explicitly — `// redrawn to match the rendered
screenshot; not an exact Figma export` — so a future pass knows which icons
in `components/icons/` are verified exports and which are close visual
matches still owed a real export once one becomes available.

## 32. A due date or scheduled time is a real date/time control

`InputField`'s `type="time"` already opens the native picker from anywhere
in the box (rule 23). Any field holding a date or a time — a task's due
date, a schedule slot — uses `type="date"` / `type="time"` (or both, as a
pair) on `StoreField`'s `field` config, never a bare `type="text"` with a
placeholder like `"e.g. Tomorrow 11:00 AM"`. Free text that looks like a
date is not a date field.

## 33. A list-and-detail screen collapses to two panes on a phone

A screen the design draws as columns side by side — the inbox: conversation
list, thread and client info (Figma 167:51527) — cannot show them all across
a phone. Below the width at which they fit (`xl` for the inbox) it becomes
the master–detail every list has: the list fills the pane until a record is
chosen, then the record takes its place, with a back button in its header and
the side columns reached from a header button in an `overlays/SidePanel`.

- Which pane shows is the URL's record key, never a `useState` flag (rule
  26): no record means the list, a record means its detail, so a link reopens
  exactly one pane. The back button clears the key (`closeConversation`); the
  drawer is `?panel=…` (`isClientInfoOpen` / `openClientInfo`), and opening a
  record clears it.
- The back and drawer buttons live in the detail header and drop away at the
  breakpoint (`xl:hidden`). The drawer's body is the same component the wide
  layout renders as a column, through its `variant` prop
  (`ClientInfoPanel` `column` / `panel`) — a second copy is a rule 0 defect.
- The container fills the height under the top bar at every size
  (`MAIN_FILL_HEIGHT`, `src/lib/layout.js`), so each pane scrolls inside it
  rather than growing the page; a pane is hidden with `max-xl:hidden`, not
  unmounted, so the list keeps its scroll position and its reveal.
