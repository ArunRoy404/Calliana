import ForgotPasswordForm from "@/app/(auth)/forgot-password/_components/ForgotPasswordForm";

export const metadata = {
  title: "Forgot password · Calliana",
  description: "We can send you a link to reset your Calliana password.",
};

/** Forgot Password page — Figma 43:8654. */
export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
