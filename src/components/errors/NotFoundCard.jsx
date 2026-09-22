"use client";

import { gooeyToast } from "goey-toast";
import { useRouter } from "next/navigation";

import Button from "@/components/atoms/Button";
import CallianaLogo from "@/components/brand/CallianaLogo";
import { useErrorContentStore } from "@/store/errors/useErrorContentStore";

/**
 * 404 card.
 *
 * Built from the same tokens as the auth cards so it reads as part of the
 * product rather than a framework default. The numeral carries the wordmark's
 * own gradient, which is why those stops are tokens.
 */
export default function NotFoundCard() {
  const router = useRouter();
  const content = useErrorContentStore((state) => state.notFound);

  return (
    <div className="relative flex w-[500px] max-w-full flex-col items-center gap-6 rounded-16 border border-solid border-border-default bg-surface-base px-8 py-12 text-center shadow-card sm:px-10">
      <CallianaLogo />

      <p
        aria-hidden
        className="bg-linear-to-r from-brand-gradient-start via-brand-gradient-mid to-brand-gradient-end bg-clip-text text-[104px] leading-none font-bold tracking-tight text-transparent select-none"
      >
        {content?.code}
      </p>

      <div className="flex flex-col gap-3">
        <h1 className="text-h3 text-text-primary">{content?.heading?.title}</h1>
        <p className="text-body-md text-text-secondary">
          {content?.heading?.subtitle}
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <Button href={content?.primaryAction?.href} fullWidth>
          {content?.primaryAction?.label}
        </Button>

        <Button variant="secondary" fullWidth onClick={() => router?.back?.()}>
          {content?.secondaryAction?.label}
        </Button>
      </div>

      <div className="flex w-full flex-col items-center gap-2 border-t border-solid border-border-default pt-6 sm:flex-row sm:justify-center">
        <span className="text-body-sm text-text-tertiary">
          {content?.support?.prompt}
        </span>
        <Button
          variant="ghost"
          size="sm"
          notFunctional
          notFunctionalMessage={content?.supportMessage}
          notFunctionalDescription={content?.supportDescription}
          className="text-body-sm text-action-primary"
        >
          {content?.support?.actionLabel}
        </Button>
      </div>
    </div>
  );
}
