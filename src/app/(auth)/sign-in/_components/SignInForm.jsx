"use client";

import Button from "@/components/atoms/Button";
import AuthCard from "@/components/auth/AuthCard";
import FormOptionsRow from "@/components/forms/FormOptionsRow";
import InputField from "@/components/forms/InputField";
import { useAuthContentStore } from "@/store/auth/useAuthContentStore";
import { useSignInFormStore } from "@/store/auth/useSignInFormStore";

/** Auth / Login Card — Figma 43:8217. */
export default function SignInForm() {
  const content = useAuthContentStore((state) => state.signIn);

  const values = useSignInFormStore((state) => state.values);
  const visibleErrors = useSignInFormStore((state) => state.visibleErrors);
  const setField = useSignInFormStore((state) => state.setField);
  const touchField = useSignInFormStore((state) => state.touchField);
  const submit = useSignInFormStore((state) => state.submit);

  const { email, password } = content?.fields ?? {};

  function renderField(field) {
    return (
      <InputField
        label={field?.label}
        name={field?.name}
        type={field?.type}
        autoComplete={field?.autoComplete}
        placeholder={field?.placeholder}
        value={values?.[field?.name] ?? ""}
        error={visibleErrors?.[field?.name]}
        onChange={(event) => setField?.(field?.name, event?.target?.value)}
        onBlur={() => touchField?.(field?.name)}
      />
    );
  }

  return (
    <AuthCard heading={content?.heading} note={content?.note}>
      <div className="flex flex-col gap-4">
        {renderField(email)}
        {renderField(password)}

        <FormOptionsRow
          checkbox={content?.rememberMe}
          link={content?.forgotPassword}
          checked={values?.rememberMe ?? false}
          onCheckedChange={(checked) =>
            setField?.(content?.rememberMe?.name, checked)
          }
        />
      </div>

      <Button
        type="submit"
        fullWidth
        notFunctional
        onClick={() => submit?.()}
        notFunctionalMessage={content?.notFunctionalMessage}
        notFunctionalDescription={content?.notFunctionalDescription}
      >
        {content?.submitLabel}
      </Button>
    </AuthCard>
  );
}
