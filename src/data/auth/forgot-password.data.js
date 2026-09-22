/** Copy for the forgot-password card — Figma 43:8790. */
export const forgotPasswordData = {
  backLink: { label: "Back", href: "/sign-in" },

  heading: {
    title: "Forgot Password?",
    subtitle:
      "If you need help resetting your password, we can help by sending you a link to reset it.",
  },

  fields: {
    email: {
      name: "email",
      label: "Email",
      type: "email",
      autoComplete: "email",
      placeholder: "you@company.com",
    },
  },

  submitLabel: "Continue",

  /** No backend yet, so a valid form just walks on to the next step — and the
      button still says so via `notFunctional`. */
  nextHref: "/verify-email",

  notFunctionalMessage: "Password reset isn’t wired up yet",
  notFunctionalDescription:
    "The backend isn’t connected — this screen is frontend only for now.",
};
