/**
 * Settings — Figma 167:52969. Each section is a `DetailSection` of
 * `SettingRow`s; a row is either a read value with a "Change" link, a toggle
 * (`Switch`), or a bare action ("Change Password").
 */
export const settingsData = {
  saveLabel: "Save Changes",
  changeLabel: "Change",

  notFunctionalMessage: "Settings aren’t wired up yet",
  notFunctionalDescription: "Changes will save once the backend is connected.",

  sections: [
    {
      id: "general",
      title: "GENERAL PREFERENCES",
      rows: [
        { id: "language", type: "value", label: "Language", value: "English (US)" },
        { id: "timezone", type: "value", label: "Timezone", value: "Europe/Madrid (CET)" },
        { id: "dateFormat", type: "value", label: "Date format", value: "DD/MM/YYYY" },
      ],
    },
    {
      id: "call",
      title: "CALL CONFIGURATION",
      rows: [
        { id: "ringTimeout", type: "value", label: "Default ring timeout", value: "30 seconds" },
        { id: "voicemailEnabled", type: "toggle", label: "Voicemail enabled", defaultValue: true },
        {
          id: "callRecording",
          type: "toggle",
          label: "Call recording (platform-wide)",
          defaultValue: true,
        },
      ],
    },
    {
      id: "notification",
      title: "NOTIFICATION",
      rows: [
        { id: "missedCallAlerts", type: "toggle", label: "Missed call alerts", defaultValue: true },
        {
          id: "newMessageNotifications",
          type: "toggle",
          label: "New message notifications",
          defaultValue: true,
        },
        {
          id: "appointmentReminders",
          type: "toggle",
          label: "Appointment reminders",
          defaultValue: true,
        },
        { id: "taskDueReminders", type: "toggle", label: "Task due reminders", defaultValue: false },
      ],
    },
    {
      id: "security",
      title: "PASSWORD & SECURITY",
      rows: [
        {
          id: "twoFactor",
          type: "toggle",
          label: "Two-factor authentication",
          defaultValue: false,
        },
        { id: "sessionTimeout", type: "value", label: "Session timeout", value: "60 minutes" },
        { id: "changePassword", type: "action", label: "Change Password" },
      ],
    },
    {
      id: "data",
      title: "DATA PREFERENCES",
      rows: [
        { id: "dataRetention", type: "value", label: "Data retention period", value: "12 months" },
        {
          id: "anonymizeInactive",
          type: "toggle",
          label: "Anonymize inactive client data",
          defaultValue: false,
        },
      ],
    },
  ],
};
