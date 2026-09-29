@AGENTS.md

**Never commit or push unless the user says so in that message** — see rule 12
in AGENTS.md. Permission covers that one request only.

Also binding, in full in AGENTS.md:

- **Rule 14** — every card, panel and row reveals itself; parents hand out
  stepped `revealDelay`s.
- **Rule 15** — controls use a `size` prop, never a raw height: `md`
  (`h-control`, 44px) for forms and the top bar, `sm` (`h-control-sm`, 36px)
  for filter bars; search has no `⌘K` hint.
- **Rule 16** — every list uses `components/tables/` + `createTableStore`, 10
  rows per page by default, with a rows-per-page select beside the filter.
- **Rule 17** — below `xl` a table becomes `<Name>Card` / `<Name>CardContainer`
  built from the table's own cell renderers; a reveal never flashes a scrollbar.
- **Rule 18** — the sidebar is 232px with inset rows; keep that language.
- **Rule 19** — search the project for an existing component first; when none
  fits, start from a shadcn primitive, wrapped once in a project component.
- **Rule 20** — every add/edit/detail drawer is `overlays/SidePanel` (shadcn
  `sheet`); open state lives in the store.
- **Rule 21** — every person picture is `atoms/UserAvatar` (shadcn `avatar`),
  falling back to initials derived from the name.
- **Rule 22** — when a request carries a lasting preference, add it to
  AGENTS.md as a rule (plus a pointer here) in the same change.
- **Rule 23** — forms: fields sit in `FieldShell`; state is `createFormStore`
  + a Zod schema; submit/cancel are store actions.
- **Rule 24** — light theme only, enforced by `@custom-variant dark` in
  `globals.css`; never write a `dark:` class.
- **Rule 25** — icons are data (`{ src }` asset or `{ lucide }`) rendered by
  `AssetIcon`; broken Figma exports fall back to lucide.
- **Rule 26** — view state (search, filters, page, size, open panel, tab)
  lives in the URL via the `src/lib/url/` service, `useUrlParams` /
  `useTableView` and a Zod params schema; URL-driven pages render per request.

<!--
  The project rules live in AGENTS.md and are imported above, so there is exactly
  one copy of them — duplicating the list here would break the project's own
  "never write the same thing twice" rule and let the two files drift apart.
  The commit rule is restated above on purpose, as a pointer: it is the one rule
  that cannot be undone once broken. Edit the rules themselves in AGENTS.md.
-->
