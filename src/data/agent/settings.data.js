import { settingsData } from "@/data/admin/settings.data";

/**
 * The agent workspace's Settings — built from the design screenshot (the
 * Figma node was not reachable). The same settings page as the admin's and
 * the client's (`SettingsView` over `createSettingsStore`), in the client's
 * `large` look; the sections are the agent's own: general preferences as
 * three tiles, notifications, call and calendar preferences, and password
 * & security, whose "Change Password" opens the shared modal.
 */
export const agentSettingsData = {
  ...settingsData,
  look: "large",

  sections: [
    {
      id: "general",
      title: "GENERAL PREFERENCES",
      type: "tiles",
      columns: 3,
      rows: [
        { id: "language", label: "Language", value: "English (US)" },
        { id: "timezone", label: "Timezone", value: "Europe/Madrid (CET)" },
        { id: "dateFormat", label: "Date format", value: "DD/MM/YYYY" },
      ],
    },
    {
      id: "notification",
      title: "NOTIFICATION",
      rows: [
        {
          id: "missedCallAlerts",
          type: "toggle",
          label: "Missed call alerts",
          defaultValue: true,
        },
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
        {
          id: "taskDueReminders",
          type: "toggle",
          label: "Task due reminders",
          defaultValue: false,
        },
      ],
    },
    {
      id: "call",
      title: "CALL PREFERENCES",
      rows: [
        {
          id: "autoAnswerDelay",
          type: "value",
          label: "Auto-answer delay",
          value: "2 seconds",
        },
        {
          id: "voicemailTranscription",
          type: "toggle",
          label: "Voicemail transcription",
          defaultValue: true,
        },
        {
          id: "callRecording",
          type: "toggle",
          label: "Call recording",
          defaultValue: false,
        },
      ],
    },
    {
      id: "calendar",
      title: "Calendar Preferences",
      rows: [
        /**
         * The design repeats "2 seconds" here — a copy slip from the row
         * above; a calendar's default view is a view.
         */
        {
          id: "defaultView",
          type: "value",
          label: "Default view",
          value: "Week",
        },
        {
          id: "calendarSync",
          type: "toggle",
          label: "Calendar sync (Google)",
          defaultValue: true,
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
