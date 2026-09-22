import { Children } from "react";

import AuthCardHeader from "@/components/auth/AuthCardHeader";
import CardHeading from "@/components/cards/CardHeading";
import CardNote from "@/components/cards/CardNote";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Shell shared by every auth card — Figma 43:8217.
 *
 * Header, heading and footnote are identical across sign-in, forgot-password,
 * verify-email and reset-password; only the body between them changes.
 * Pass `backLink` on any step after sign-in.
 *
 * The card reveals on mount and cascades its own slots, including each direct
 * child of the body — so a page gets the stagger without wrapping anything.
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
    <Reveal
      as="form"
      stagger
      onSubmit={onSubmit}
      className={cn(
        "relative flex w-[424px] max-w-full flex-col gap-6 rounded-16 border border-solid border-border-default bg-surface-base p-8 shadow-card",
        className,
      )}
    >
      <Reveal item>
        <AuthCardHeader backLink={backLink} />
      </Reveal>

      <Reveal item>
        <CardHeading
          title={heading?.title}
          subtitle={heading?.subtitle}
          subtitlePrefix={heading?.subtitlePrefix}
          subtitleEmphasis={heading?.subtitleEmphasis}
        />
      </Reveal>

      {Children.map(children, (child) => (
        <Reveal item>{child}</Reveal>
      ))}

      {note && (
        <Reveal item>
          <CardNote icon={note?.icon} text={note?.text} />
        </Reveal>
      )}
    </Reveal>
  );
}
