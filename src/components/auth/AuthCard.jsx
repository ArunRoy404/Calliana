import AuthCardHeader from "@/components/auth/AuthCardHeader";
import CardHeading from "@/components/cards/CardHeading";
import CardNote from "@/components/cards/CardNote";
import { cn } from "@/lib/cn";

/**
 * Shell shared by every auth card — Figma 43:8217.
 *
 * Header, heading and footnote are identical across sign-in, forgot-password,
 * verify-email and reset-password; only the body between them changes.
 * Pass `backLink` on any step after sign-in.
 */
export default function AuthCard({
  heading,
  backLink,
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
      <AuthCardHeader backLink={backLink} />

      <CardHeading
        title={heading?.title}
        subtitle={heading?.subtitle}
        subtitlePrefix={heading?.subtitlePrefix}
        subtitleEmphasis={heading?.subtitleEmphasis}
      />

      {children}

      {note && <CardNote icon={note?.icon} text={note?.text} />}
    </form>
  );
}
