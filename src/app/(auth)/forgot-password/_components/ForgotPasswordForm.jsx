"use client";

import Button from "@/components/atoms/Button";
import AuthCard from "@/components/auth/AuthCard";
import FormField from "@/components/forms/FormField";
import { useFlowSubmit } from "@/hooks/useFlowSubmit";
import { useAuthContentStore } from "@/store/auth/useAuthContentStore";
import { useForgotPasswordFormStore } from "@/store/auth/useForgotPasswordFormStore";

/** Forgot Password card — Figma 43:8790. */
export default function ForgotPasswordForm() {
  const content = useAuthContentStore((state) => state.forgotPassword);

  const values = useForgotPasswordFormStore((state) => state.values);
  const visibleErrors = useForgotPasswordFormStore((s) => s.visibleErrors);
  const setField = useForgotPasswordFormStore((state) => state.setField);
  const touchField = useForgotPasswordFormStore((state) => state.touchField);
  const submit = useForgotPasswordFormStore((state) => state.submit);

  const handleSubmit = useFlowSubmit({ submit, nextHref: content?.nextHref });

  const email = content?.fields?.email;

  return (
    <AuthCard
      heading={content?.heading}
      backLink={content?.backLink}
      onSubmit={handleSubmit}
    >
      <FormField
        field={email}
        value={values?.[email?.name]}
        error={visibleErrors?.[email?.name]}
        onChange={setField}
        onBlur={touchField}
      />

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
