"use client";

import Button from "@/components/atoms/Button";
import AuthCard from "@/components/auth/AuthCard";
import FormField from "@/components/forms/FormField";
import { useFlowSubmit } from "@/hooks/useFlowSubmit";
import { useAuthContentStore } from "@/store/auth/useAuthContentStore";
import { useResetPasswordFormStore } from "@/store/auth/useResetPasswordFormStore";

/** Reset Password card — Figma 43:9138. */
export default function ResetPasswordForm() {
  const content = useAuthContentStore((state) => state.resetPassword);

  const values = useResetPasswordFormStore((state) => state.values);
  const visibleErrors = useResetPasswordFormStore((s) => s.visibleErrors);
  const setField = useResetPasswordFormStore((state) => state.setField);
  const touchField = useResetPasswordFormStore((state) => state.touchField);
  const submit = useResetPasswordFormStore((state) => state.submit);

  const handleSubmit = useFlowSubmit({ submit, nextHref: content?.nextHref });

  const { password, confirmPassword } = content?.fields ?? {};

  return (
    <AuthCard
      heading={content?.heading}
      backLink={content?.backLink}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4">
        {[password, confirmPassword]?.map((field) => (
          <FormField
            key={field?.name}
            field={field}
            value={values?.[field?.name]}
            error={visibleErrors?.[field?.name]}
            onChange={setField}
            onBlur={touchField}
          />
        ))}
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
