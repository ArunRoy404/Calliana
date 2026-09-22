import { OTP_LENGTH } from "@/schemas/auth/shared.schema";

/** Copy for the verify-email card — Figma 43:8957. */
export const verifyEmailData = {
  backLink: { label: "Back", href: "/forgot-password" },

  heading: {
    title: "Verify your email",
    // The address is emphasised in the design, so it is a separate part.
    subtitlePrefix: "we sent a 6-digit code to ",
    subtitleEmphasis: "you@gmail.com",
  },

  otp: { name: "code", length: OTP_LENGTH },

  resend: { prompt: "Didn't receive it ?", actionLabel: "Resend code" },

  submitLabel: "Verify email",

  /** No backend yet, so a valid code just walks on to the next step — and the
      button still says so via `notFunctional`. */
  nextHref: "/reset-password",

  notFunctionalMessage: "Verification isn’t wired up yet",
  notFunctionalDescription:
    "The backend isn’t connected — this screen is frontend only for now.",

  resendMessage: "Resending codes isn’t wired up yet",
  resendDescription:
    "The backend isn’t connected — this screen is frontend only for now.",
};
