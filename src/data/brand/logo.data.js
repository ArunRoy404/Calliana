/**
 * The Calliana wordmark ships out of Figma as five separate vector layers
 * rather than one flat SVG (Figma 451:29095), so each piece carries its design
 * offset inside a 200 x 42.532 box. Sizes match each file's intrinsic
 * width/height exactly.
 */
export const logoData = {
  box: { width: 200, height: 42.532 },
  layers: [
    {
      id: "c-outer",
      src: "/brand/logo-c-outer.svg",
      width: 31.1545,
      height: 32.3767,
      className: "top-[10.15px] left-0",
    },
    {
      id: "c-inner",
      src: "/brand/logo-c-inner.svg",
      width: 31.3662,
      height: 30.6744,
      className: "top-[11.37px] left-[32.33px]",
    },
    {
      id: "stroke-first",
      src: "/brand/logo-bar.svg",
      width: 8.38717,
      height: 41.3575,
      className: "top-0 left-[67.25px]",
    },
    {
      id: "stroke-second",
      src: "/brand/logo-bar.svg",
      width: 8.38717,
      height: 41.3575,
      className: "top-0 left-[79.2px]",
    },
    {
      id: "word-base",
      src: "/brand/logo-word-a.svg",
      width: 108.854,
      height: 41.8813,
      className: "top-[0.17px] left-[91.15px]",
    },
    {
      id: "word-gradient",
      src: "/brand/logo-word-b.svg",
      width: 108.854,
      height: 41.8813,
      className: "top-[0.17px] left-[91.15px]",
    },
  ],
};
