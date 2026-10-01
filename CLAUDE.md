@AGENTS.md

**Never commit or push unless the user says so in that message** — see rule 12
in AGENTS.md. Permission covers that one request only.

Also binding, in full in AGENTS.md:

- **Rule 14** — every card, panel and row reveals itself; parents hand out
  stepped `revealDelay`s.
- **Rule 15** — controls use a `size` prop, never a raw height: `md`
  (`h-control`, 44px) for forms and the top bar, `sm` (`h-control-sm`, 36px)
  for filter bars; search has no `⌘K` hint.
- **Rule 16** — every list is `tables/TableDirectory` over a `createTableStore`
  store; filters and row actions are data; 10 rows per page by default.
- **Rule 17** — below `xl` a table becomes `TableCardList` / `TableRowCard`,
  built from the table's own cell renderers; a reveal never flashes a scrollbar.
- **Rule 18** — the sidebar is 232px with inset rows; keep that language.
- **Rule 19** — search the project for an existing component first; when none
  fits, start from a shadcn primitive, wrapped once in a project component.
- **Rule 20** — every add/edit/detail drawer is `overlays/SidePanel` (shadcn
  `sheet`); an add drawer is `overlays/FormPanel`; open state lives in the URL.
- **Rule 21** — every person picture is `atoms/UserAvatar` (shadcn `avatar`),
  falling back to initials derived from the name.
- **Rule 22** — when a request carries a lasting preference, add it to
  AGENTS.md as a rule (plus a pointer here) in the same change.
- **Rule 23** — forms: fields sit in `FieldShell`, bound with `StoreField` /
  `StoreSelect`; state is `createFormStore` + a Zod schema; submit/cancel are
  store actions.
- **Rule 24** — light theme only, enforced by `@custom-variant dark` in
  `globals.css`; never write a `dark:` class.
- **Rule 25** — icons are data (`{ src }` asset or `{ lucide }`) rendered by
  `AssetIcon`; broken Figma exports fall back to lucide.
- **Rule 26** — view state (search, filters, page, size, open panel, tab)
  lives in the URL via the `src/lib/url/` service, `useUrlParams` /
  `useTableView` and a Zod params schema; URL-driven pages render per request.
- **Rule 27** — a record with its own design page is a route
  (`/<role>/<list>/[id]`) that 404s unknown ids, keeps its tab in the URL and
  is built from the shared detail pieces.
- **Rule 28** — assets are stored once (`public/icons/shared/` for shared
  icons); textures go through `TextureLayer`; missing tints become tokens.
- **Rule 29** — reuse the pieces the calls/tasks/roles/routing/audit/profile/
  settings build added: `forms/SegmentedFilter` (pill filters),
  `content.secondaryAction` (a non-add toolbar action), `forms/MultiSelectList`
  / `MultiSelectChips`, the `"user"` cell type, `IconTextCell`'s
  `column.iconField`, `atoms/Switch`, `cards/SettingRow`, `InfoTile`'s
  `action` prop. A read-only "edit" drawer is only correct when Figma's
  values genuinely have no field chrome around them — a bordered,
  select-height box means build a real editable `FormSelect`, not
  `CardField` text.
- **Rule 30** — pixel fidelity is mandatory: pull `get_design_context` on the
  specific node and match size/weight/colour exactly, not the nearest
  type-scale class. `TextCell` takes `column.tone` / `column.weight` for
  per-column colour and weight overrides. A centred dialog is
  `overlays/Modal` (shadcn `dialog`), not `SidePanel`. Verify against a real
  screenshot, not just the codegen dump — it can resolve an instance to its
  master default instead of that instance's real override.
- **Rule 31** — an icon redrawn by eye from a screenshot (because Figma's
  codegen wouldn't resolve it) gets a comment saying so, so it reads as
  "close match, not a verified export."
- **Rule 32** — a due date or scheduled time is a real `type="date"` /
  `type="time"` field, never free text with a date-shaped placeholder.

<!--
  The project rules live in AGENTS.md and are imported above, so there is exactly
  one copy of them — duplicating the list here would break the project's own
  "never write the same thing twice" rule and let the two files drift apart.
  The commit rule is restated above on purpose, as a pointer: it is the one rule
  that cannot be undone once broken. Edit the rules themselves in AGENTS.md.
-->
