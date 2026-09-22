import GlowLayer from "@/components/decor/GlowLayer";
import NotFoundCard from "@/components/errors/NotFoundCard";
import ScrollableCenter from "@/components/layout/ScrollableCenter";
import ViewportShell from "@/components/layout/ViewportShell";

export const metadata = {
  title: "Page not found · Calliana",
  description: "The page you’re looking for doesn’t exist.",
};

/** 404 — shares the auth screens' shell so it feels like the same product. */
export default function NotFound() {
  return (
    <ViewportShell>
      <div className="relative flex-1 overflow-hidden rounded-24 bg-surface-canvas">
        <GlowLayer />
        <ScrollableCenter>
          <NotFoundCard />
        </ScrollableCenter>
      </div>
    </ViewportShell>
  );
}
