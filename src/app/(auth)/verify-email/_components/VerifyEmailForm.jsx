"use client";

import { gooeyToast } from "goey-toast";

import Button from "@/components/atoms/Button";
import AuthCard from "@/components/auth/AuthCard";
import OtpInput from "@/components/forms/OtpInput";
import ResendPrompt from "@/components/forms/ResendPrompt";
import { useFlowSubmit } from "@/hooks/useFlowSubmit";
import { useAuthContentStore } from "@/store/auth/useAuthContentStore";
import { useVerifyEmailFormStore } from "@/store/auth/useVerifyEmailFormStore";

/** Verify email card — Figma 43:8957. */
export default function VerifyEmailForm() {
  const content = useAuthContentStore((state) => state.verifyEmail);

  const values = useVerifyEmailFormStore((state) => state.values);
  const visibleErrors = useVerifyEmailFormStore((s) => s.visibleErrors);
  const setCode = useVerifyEmailFormStore((state) => state.setCode);
  const submit = useVerifyEmailFormStore((state) => state.submit);
  const resendCode = useVerifyEmailFormStore((state) => state.resendCode);

  const handleSubmit = useFlowSubmit({ submit, nextHref: content?.nextHref });

  const otp = content?.otp;

  function handleResend() {
    resendCode?.();
    gooeyToast.info(content?.resendMessage, {
      description: content?.resendDescription,
    });
  }

  return (
    <AuthCard
      heading={content?.heading}
      backLink={content?.backLink}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4">
        <OtpInput
          name={otp?.name}
          length={otp?.length}
          value={values?.[otp?.name] ?? ""}
          error={visibleErrors?.[otp?.name]}
          onChange={setCode}
        />

        <ResendPrompt
          prompt={content?.resend?.prompt}
          actionLabel={content?.resend?.actionLabel}
          onResend={handleResend}
        />
      </div>

      <Button
        type="submit"
        fullWidth
        notFunctional
        notFunctionalMessage={content?.notFunctionalMessage}
        notFunctionalDescription={content?.notFunctionalDescription}
        onClick={handleSubmit}
      >
        {content?.submitLabel}
      </Button>
    </AuthCard>
  );
}
