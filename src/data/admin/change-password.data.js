/**
 * "Change Password" modal — Figma 319:34461. Field `name`s match the keys in
 * `src/schemas/settings/change-password.schema.js`.
 */
/** The masked dots the design shows in each empty field. */
const PASSWORD_PLACEHOLDER = "••••••••";

export const changePasswordData = {
  title: "Change Password",

  fields: {
    currentPassword: {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
      autoComplete: "current-password",
      placeholder: PASSWORD_PLACEHOLDER,
    },
    newPassword: {
      name: "newPassword",
      label: "New Password",
      type: "password",
      autoComplete: "new-password",
      placeholder: PASSWORD_PLACEHOLDER,
    },
    confirmPassword: {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      autoComplete: "new-password",
      placeholder: PASSWORD_PLACEHOLDER,
    },
  },

  /** No required-fields note: Cancel and Update Password sit at the right. */
  footer: {
    cancelLabel: "Cancel",
    submitLabel: "Update Password",
  },

  notFunctionalMessage: "Password changes aren’t wired up yet",
  notFunctionalDescription:
    "The details are valid — your password will update once the backend is connected.",
};
