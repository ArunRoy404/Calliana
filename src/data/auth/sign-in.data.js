/**
 * Copy for the sign-in card — Figma 43:8217.
 * Consumed through `useAuthContentStore`, never imported by a component.
 */
export const signInData = {
  heading: {
    title: "Welcome back",
    subtitle:
      "Sign in with your work email. We’ll take you to the right workspace automatically.",
  },

  fields: {
    email: {
      name: "email",
      label: "Email",
      type: "email",
      autoComplete: "email",
      placeholder: "you@company.com",
    },
    password: {
      name: "password",
      label: "Password",
      type: "password",
      autoComplete: "current-password",
      placeholder: "••••••••",
    },
  },

  rememberMe: { name: "rememberMe", label: "Remember me" },

  forgotPassword: { label: "Forgot password?", href: "/forgot-password" },

  submitLabel: "Sign in",

  note: {
    icon: { src: "/icons/checked-green.svg", width: 14.0308, height: 12.6166 },
    text: "Your workspace is selected automatically based on your account.",
  },

  /** Shown by `notFunctional` controls until the backend exists. */
  notFunctionalMessage: "Sign-in isn’t wired up yet",
  notFunctionalDescription:
    "The backend isn’t connected — this screen is frontend only for now.",
};
