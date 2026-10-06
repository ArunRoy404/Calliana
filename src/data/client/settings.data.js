/**
 * The client portal's Settings — built from the design screenshot (the
 * Figma node was not reachable). The same settings page as the admin's
 * (`settings.data.js`), in its `large` look: the account's profile as two
 * tiles, notification toggles, communication preferences and password &
 * security. "Change Password" opens the shared change-password modal.
 */
export const clientSettingsData = {
  look: "large",
  saveLabel: "Save Changes",
  changeLabel: "Change",

  notFunctionalMessage: "Settings aren’t wired up yet",
  notFunctionalDescription: "Changes will save once the backend is connected.",

  sections: [
    {
      id: "profile",
      title: "PROFILE",
      type: "tiles",
      rows: [
        { id: "displayName", label: "Display name", value: "Laura Alegre" },
        {
          id: "email",
          label: "Email",
          value: "l.alegre@lauralegreclinic.es",
        },
      ],
    },
    {
      id: "notification",
      title: "NOTIFICATION",
      rows: [
        {
          id: "emailNewCalls",
          type: "toggle",
          label: "Email notification for new calls",
          defaultValue: true,
        },
        {
          id: "smsMissedCalls",
          type: "toggle",
          label: "SMS notification for missed calls",
          defaultValue: true,
        },
        {
          id: "appointmentReminders",
          type: "toggle",
          label: "Appointment reminders",
          defaultValue: true,
        },
        {
          id: "requestStatusUpdates",
          type: "toggle",
          label: "Request status updates",
          defaultValue: false,
        },
      ],
    },
    {
      id: "communication",
      title: "COMMUNICATION PREFERENCES",
      rows: [
        {
          id: "contactMethod",
          type: "value",
          label: "Preferred contact method",
          value: "Phone",
        },
        {
          id: "responseLanguage",
          type: "value",
          label: "Response language",
          value: "Spanish",
        },
      ],
    },
    {
      id: "security",
      title: "Password & Security",
      rows: [
        {
          id: "twoFactor",
          type: "toggle",
          label: "Two-factor authentication",
          defaultValue: true,
        },
        {
          id: "sessionTimeout",
          type: "value",
          label: "Session timeout",
          value: "30 minutes",
        },
        { id: "changePassword", type: "action", label: "Change Password" },
      ],
    },
  ],
};
