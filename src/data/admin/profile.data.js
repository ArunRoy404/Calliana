/**
 * Profile — Figma 167:52857. Personal information rows follow the same
 * `InfoTile` (icon, label, value, an "EDIT" action) the agent detail panel's
 * profile tab uses; working hours reuse `WorkingDayRow` directly.
 */
const USER_ICON = { src: "/icons/shared/user.svg", width: 16, height: 16 };
const CALL_ICON = { src: "/icons/shared/call.svg", width: 16, height: 16 };
const SMS_ICON = { src: "/icons/shared/sms.svg", width: 16, height: 16 };

export const profileData = {
  editLabel: "EDIT",
  editProfileLabel: "Edit Profile",
  /** The admin's sections carry the soft lift; the client's sit flat. */
  elevatedSections: true,
  changeAvatarLabel: "Change photo",
  changeAvatarIcon: { lucide: "Camera", size: 12 },

  user: {
    name: "Sofia Martínez",
    status: { label: "Available", tone: "success" },
    meta: ["Agent"],
  },

  sections: {
    personalTitle: "PERSONAL INFORMATION",
    hoursTitle: "WORKING HOURS",
  },

  personalFields: [
    { id: "name", label: "Full Name", icon: USER_ICON },
    { id: "phone", label: "Phone", icon: CALL_ICON },
    { id: "email", label: "Email Address", icon: SMS_ICON },
    { id: "role", label: "Role", icon: USER_ICON },
  ],

  values: {
    name: "Sofia Martínez",
    phone: "+34 655 452 419",
    email: "sofia.martinez@virtualsecretary.io",
    role: "Support Agent",
  },

  /** Each day's hours; `open` days are worked. */
  workingHours: [
    { id: "monday", day: "Monday", hours: "09:00 – 18:00", open: true },
    { id: "tuesday", day: "Tuesday", hours: "09:00 – 18:00", open: true },
    { id: "wednesday", day: "Wednesday", hours: "09:00 – 18:00", open: true },
    { id: "thursday", day: "Thursday", hours: "09:00 – 18:00", open: true },
    { id: "friday", day: "Friday", hours: "09:00 – 18:00", open: true },
    { id: "saturday", day: "Saturday", hours: "—", open: false },
    { id: "sunday", day: "Sunday", hours: "—", open: false },
  ],
  offHours: "—",
  dayStatuses: {
    on: { label: "Active", tone: "success" },
    off: { label: "Inactive", tone: "neutral" },
  },

  notFunctionalMessage: "Profile editing isn’t wired up yet",
  notFunctionalDescription:
    "This action will work once the backend is connected.",
};
