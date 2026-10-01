/**
 * "Change Password" modal — Figma 319:34461. Field `name`s match the keys in
 * `src/schemas/settings/change-password.schema.js`.
 */
export const changePasswordData = {
  title: "Change Password",

  fields: {
    currentPassword: {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
      autoComplete: "current-password",
    },
    newPassword: {
      name: "newPassword",
      label: "New Password",
      type: "password",
      autoComplete: "new-password",
    },
    confirmPassword: {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      autoComplete: "new-password",
    },
  },

  footer: {
    requiredMark: "*",
    requiredNote: "Required fields",
    cancelLabel: "Cancel",
    submitLabel: "Update Password",
  },

  notFunctionalMessage: "Password changes aren’t wired up yet",
  notFunctionalDescription:
    "The details are valid — your password will update once the backend is connected.",
};
