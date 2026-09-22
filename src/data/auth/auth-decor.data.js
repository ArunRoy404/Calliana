/**
 * Geometry for the decorative layer of the auth screens — Figma 43:7777.
 *
 * The composition was authored against a 696 x 970 panel, so each piece keeps
 * its design coordinates and is anchored to whichever edge it sits nearest.
 * Anything overflowing is clipped, exactly as it is in Figma.
 *
 * Positions are COMPLETE Tailwind class strings on purpose: Tailwind scans
 * source files for literals, so a class built by concatenation would never be
 * emitted.
 */
export const authDecorData = {
  dot: { src: "/auth/dot.svg", width: 6, height: 6 },

  dotGrids: [
    { id: "top-left", rows: 5, columns: 7, className: "top-[35px] left-[30px]" },
    // Sits below the panel's 970px height — clipped, just as in the design.
    { id: "bottom-left", rows: 5, columns: 7, className: "top-[974px] left-[-9px]" },
  ],

  capsules: [
    { id: "capsule-short", variant: "filled", className: "top-0 left-[177px] h-[75px] w-[30px]" },
    { id: "capsule-tall", variant: "filled", className: "top-[18px] left-[237px] h-[120px] w-[40px]" },
    { id: "capsule-outline", variant: "outlined", className: "top-[-14px] left-[217px] h-[120px] w-[40px]" },
  ],

  shapes: [
    {
      id: "corner-disc",
      src: "/auth/ellipse-929.svg",
      width: 84,
      height: 84,
      boxClassName: "top-[-18px] left-[-18px] size-[84px]",
    },
    {
      id: "ring-large",
      src: "/auth/ellipse-931.svg",
      width: 50,
      height: 50.0001,
      boxClassName: "top-[14px] right-[-38.62px] size-[70.62px]",
      rotateClassName: "rotate-[132.1deg]",
    },
    {
      id: "ring-disc",
      src: "/auth/ellipse-930.svg",
      width: 30,
      height: 30,
      boxClassName: "top-[28.13px] right-[-24.49px] size-[42.372px]",
      rotateClassName: "rotate-[132.1deg]",
    },
    {
      id: "ring-dot",
      src: "/auth/ellipse-932.svg",
      width: 12.0873,
      height: 12.0873,
      boxClassName: "top-[31px] right-[-52.37px] size-[15.379px]",
      rotateClassName: "rotate-[-109.12deg]",
    },
    {
      id: "disc-lower-left",
      src: "/auth/ellipse-933.svg",
      width: 36,
      height: 36,
      boxClassName: "bottom-[18.2px] left-[16px] size-[45.804px]",
      rotateClassName: "rotate-[-109.12deg]",
    },
  ],

  sparkles: [
    { id: "sparkle-a", className: "top-[990.35px] left-[230px] h-[12.291px] w-[17px]", rotateClassName: "-rotate-60" },
    { id: "sparkle-b", className: "top-[988px] left-[232.35px] h-[17px] w-[12.291px]", rotateClassName: "rotate-30" },
  ],

  concentricRings: {
    className: "right-[-179.69px] bottom-[-116.21px] h-[321.21px] w-[313.383px]",
    shapes: [
      {
        id: "outer",
        src: "/auth/ellipse-935.svg",
        width: 280,
        height: 280,
        boxClassName: "top-[8.93px] left-[1.1px] size-[312.278px]",
        rotateClassName: "rotate-[-7.06deg]",
      },
      {
        id: "arc",
        src: "/auth/ellipse-936.svg",
        width: 188.729,
        height: 96.0002,
        boxClassName: "top-[60.75px] left-[51.81px] size-[208.885px]",
        rotateClassName: "rotate-[95.29deg]",
        // This arc sits in the lower half of its 192px box rather than centred.
        innerClassName: "size-48",
        imageClassName: "absolute bottom-0 left-[1.7%]",
      },
      {
        id: "mid",
        src: "/auth/ellipse-934.svg",
        width: 150,
        height: 150,
        boxClassName: "top-[64.38px] left-[56.71px] size-[200.782px]",
        rotateClassName: "rotate-[-116.17deg]",
      },
      {
        id: "small",
        src: "/auth/ellipse-937.svg",
        width: 48,
        height: 48,
        boxClassName: "top-[9.42px] left-[158.73px] size-[64.25px]",
        rotateClassName: "rotate-[-116.17deg]",
      },
    ],
  },

  /** Soft glows behind the auth card — Figma 43:8215 / 43:8216. */
  glows: [
    {
      id: "teal",
      src: "/auth/glow-teal.svg",
      width: 200,
      height: 200,
      boxClassName: "top-[637px] left-[21px] size-[200px]",
    },
    {
      id: "blue",
      src: "/auth/glow-blue.svg",
      width: 200,
      height: 200,
      boxClassName: "top-[135px] left-[402px] size-[200px]",
    },
  ],
};
