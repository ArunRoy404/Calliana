import AuthHeroPanel from "@/components/auth/AuthHeroPanel";
import GlowLayer from "@/components/decor/GlowLayer";

/**
 * Split-screen shell shared by every auth screen — Figma 43:5040.
 * Pages render only their card; the chrome lives here.
 *
 * The shell is exactly one viewport tall (`h-dvh`, so mobile browser chrome is
 * accounted for) and never scrolls the page. If a card is taller than the space
 * available — a short window, or a landscape phone — only the login column
 * scrolls, and the card stays centred via `m-auto` rather than `items-center`,
 * which would otherwise clip its top once it overflows.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="flex h-dvh justify-center bg-linear-to-b from-action-secondary to-status-info-bg p-4 sm:p-6">
      <AuthHeroPanel />

      {/* Login Area — Figma 43:8214 */}
      <div className="relative flex-1 overflow-hidden rounded-24 bg-surface-canvas lg:rounded-l-none">
        <GlowLayer />

        <div className="relative flex h-full overflow-y-auto px-4 py-6 sm:px-6">
          <div className="m-auto w-full max-w-[424px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
