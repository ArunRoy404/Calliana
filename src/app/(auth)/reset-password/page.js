import ResetPasswordForm from "@/app/(auth)/reset-password/_components/ResetPasswordForm";

export const metadata = {
  title: "Reset password · Calliana",
  description: "Choose a new password for your Calliana account.",
};

/** Reset Password page — Figma 43:9002. */
export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
