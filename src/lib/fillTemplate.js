/**
 * Fill `{name}` placeholders in a copy template from `values` — "Scheduled
 * for {date} at {start}". A placeholder with no value is left as written, so
 * a missing field shows up rather than vanishing.
 *
 * Copy lives in data files with its placeholders; the values are derived, so
 * stores fill them here rather than a component splicing strings.
 */
export function fillTemplate(template, values) {
  return (template ?? "").replace(
    /\{(\w+)\}/g,
    (match, key) => `${values?.[key] ?? match}`,
  );
}
