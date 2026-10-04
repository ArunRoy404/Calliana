/**
 * Fill `{name}` placeholders in a copy template from `values`. Copy lives in
 * data files (rule 1); the values it carries are derived, so stores fill them
 * in here. An unknown placeholder is left as written so a typo stays visible.
 */
export function fillTemplate(template, values) {
  return (template ?? "").replace(
    /\{(\w+)\}/g,
    (match, key) => `${values?.[key] ?? match}`,
  );
}
