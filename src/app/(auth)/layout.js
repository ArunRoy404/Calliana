import AuthHeroPanel from "@/components/auth/AuthHeroPanel";
import GlowLayer from "@/components/decor/GlowLayer";
import ScrollableCenter from "@/components/layout/ScrollableCenter";
import ViewportShell from "@/components/layout/ViewportShell";

/**
 * Split-screen shell shared by every auth screen — Figma 43:5040.
 * Pages render only their card; the chrome lives here.
 */
export default function AuthLayout({ children }) {
  return (
    <ViewportShell>
      <AuthHeroPanel />

      {/* Login Area — Figma 43:8214 */}
      <div className="relative flex-1 overflow-hidden rounded-24 bg-surface-canvas lg:rounded-l-none">
        <GlowLayer />
        <ScrollableCenter>{children}</ScrollableCenter>
      </div>
    </ViewportShell>
  );
}
