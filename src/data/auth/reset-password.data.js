/** Copy for the reset-password card — Figma 43:9138. */
export const resetPasswordData = {
  backLink: { label: "Back", href: "/verify-email" },

  heading: {
    title: "Reset Password?",
    subtitle:
      "Please enter a new password for your account. Use a strong password to keep your account secure.",
  },

  fields: {
    password: {
      name: "password",
      label: "NEW PASSWORD",
      type: "password",
      autoComplete: "new-password",
      placeholder: "••••••••",
    },
    confirmPassword: {
      name: "confirmPassword",
      label: "CONFIRM PASSWORD",
      type: "password",
      autoComplete: "new-password",
      placeholder: "••••••••",
    },
  },

  submitLabel: "Change Password",

  /** No backend yet, so a valid form just walks on to the confirmation — and
      the button still says so via `notFunctional`. */
  nextHref: "/all-set",

  notFunctionalMessage: "Changing your password isn’t wired up yet",
  notFunctionalDescription:
    "The backend isn’t connected — this screen is frontend only for now.",
};
