import VerifyEmailForm from "@/app/(auth)/verify-email/_components/VerifyEmailForm";

export const metadata = {
  title: "Verify your email · Calliana",
  description: "Enter the 6-digit code we sent to your email address.",
};

/** Verify email page — Figma 43:8821. */
export default function VerifyEmailPage() {
  return <VerifyEmailForm />;
}
