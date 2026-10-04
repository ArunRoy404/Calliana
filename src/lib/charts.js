/**
 * Geometry for the small charts — pure, so stores can build a chart's shape
 * once and components only draw it.
 */

/**
 * A donut's segments as SVG stroke dashes on one circle of `radius`, in the
 * order given, clockwise from the top. Each is `gap` shorter than its share
 * so neighbours sit apart on the surface (the 2px spacer between fills).
 * Returns `{ ...segment, value, share, dashArray, dashOffset }`.
 */
export function donutSegments(segments = [], values = {}, { radius, gap = 0 }) {
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce(
    (sum, segment) => sum + (values?.[segment?.id] ?? 0),
    0,
  );
  let start = 0;

  return segments.map((segment) => {
    const value = values?.[segment?.id] ?? 0;
    const share = total ? value / total : 0;
    const length = Math.max(share * circumference - gap, 0);
    const item = {
      ...segment,
      value,
      share,
      dashArray: `${length} ${circumference - length}`,
      // SVG dashes start at 3 o'clock; a quarter turn back starts at 12.
      dashOffset: `${circumference / 4 - start}`,
    };
    start += share * circumference;
    return item;
  });
}

/**
 * How many cells of a dot-matrix column each series fills, from the bottom:
 * `value` counted in whole cells of `step`, never more than `rows`.
 */
export function cellCount(value, step, rows) {
  return Math.min(Math.round((value ?? 0) / step), rows);
}
