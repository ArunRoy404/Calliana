import BackLink from "@/components/atoms/BackLink";
import CallianaLogo from "@/components/brand/CallianaLogo";

/**
 * Top row of an auth card.
 *
 * Sign-in shows the logo alone on the left (Figma 43:8217). Every later step
 * adds a back control, which pushes the logo to the right (Figma 43:8791).
 */
export default function AuthCardHeader({ backLink }) {
  if (!backLink) return <CallianaLogo />;

  return (
    <div className="flex w-full items-center justify-between">
      <BackLink href={backLink?.href} label={backLink?.label} />
      <CallianaLogo />
    </div>
  );
}
