/**
 * Whether a nav row is the current section. A section stays active on its
 * inner pages — CLIENTS is lit on `/admin/clients/laura-alegre-clinic` — but
 * a role's home (`/admin`) matches only itself, or it would light up on every
 * page of that role.
 */
export function isNavActive(pathname, href) {
  if (!pathname || !href) return false;
  if (pathname === href) return true;

  const isRoleHome = href.split("/").filter(Boolean).length <= 1;
  return !isRoleHome && pathname.startsWith(`${href}/`);
}
