import SignInForm from "@/app/(auth)/sign-in/_components/SignInForm";

export const metadata = {
  title: "Sign in · Calliana",
  description:
    "Sign in with your work email. We'll take you to the right workspace automatically.",
};

/** Log in page — Figma 43:5040. The split-screen shell lives in the layout. */
export default function SignInPage() {
  return <SignInForm />;
}
