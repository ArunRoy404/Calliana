import CallianaLogo from "@/components/brand/CallianaLogo";
import CardHeading from "@/components/cards/CardHeading";
import CardNote from "@/components/cards/CardNote";
import { cn } from "@/lib/cn";

/**
 * Shell shared by every auth card — Figma 43:8217.
 *
 * Logo, heading and footnote are identical across sign-in, forgot-password,
 * verify-email and reset-password; only the body between them changes.
 */
export default function AuthCard({
  heading,
  note,
  onSubmit,
  children,
  className,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "relative flex w-[424px] max-w-full flex-col gap-6 rounded-16 border border-solid border-border-default bg-surface-base p-8 shadow-card",
        className,
      )}
    >
      <CallianaLogo />

      <CardHeading title={heading?.title} subtitle={heading?.subtitle} />

      {children}

      {note && <CardNote icon={note?.icon} text={note?.text} />}
    </form>
  );
}
