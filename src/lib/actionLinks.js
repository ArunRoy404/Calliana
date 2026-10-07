import { fillTemplate } from "@/lib/fillTemplate";

/**
 * Per-portal links over shared content. A client page, the call drawer and
 * the inbox are one set of copy every portal reuses, so that copy carries no
 * links: each portal's store layers its own on top (`withContentLinks`), and
 * one portal's link can never leak into another's. An action a portal has no
 * link for is left as it is — not-wired-up.
 */

/** `actions` with each one's link merged in, by action id. */
export function withActionLinks(actions, links) {
  return actions?.map((action) =>
    links?.[action?.id] ? { ...action, ...links?.[action?.id] } : action,
  );
}

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

/**
 * `content` with `links` layered on, following the same shape: a list of
 * actions takes links by action id (`{ footerActions: { task: { href } } }`),
 * an object is merged key by key (`{ tasks: { actionHref } }`).
 */
export function withContentLinks(content, links) {
  if (!links) return content;
  if (Array.isArray(content)) return withActionLinks(content, links);

  return {
    ...content,
    ...Object.fromEntries(
      Object.entries(links).map(([key, value]) => {
        const current = content?.[key];
        if (Array.isArray(current))
          return [key, withActionLinks(current, value)];
        if (isPlainObject(current))
          return [key, withContentLinks(current, value)];
        return [key, value];
      }),
    ),
  };
}

/**
 * An action whose link names its record (`hrefTemplate`, e.g.
 * `/admin/messages?conversation={conversation}`), filled from `values`. A
 * placeholder with no value falls back to `fallbackHref`.
 */
export function resolveActionHref(action, values) {
  if (!action?.hrefTemplate) return action;

  const { hrefTemplate, fallbackHref, ...rest } = action;
  const href = fillTemplate(hrefTemplate, values);

  return { ...rest, href: /\{\w+\}/.test(href) ? fallbackHref : href };
}
