/**
 * The client portal's Business Profile — built from the design screenshot
 * (the Figma node was not reachable). The same profile page as the admin's
 * (`profile.data.js`), over the clinic's own account: its photo, business
 * information, working hours (each day switched on or off) and the standing
 * instructions agents see.
 */
const CALL_ICON = { src: "/icons/shared/call.svg", width: 16, height: 16 };
const SMS_ICON = { src: "/icons/shared/sms.svg", width: 16, height: 16 };
const LOCATION_ICON = {
  src: "/icons/shared/location.svg",
  width: 16,
  height: 16,
};
/**
 * The design repeats the envelope glyph on "Business Hours" — a mock-up
 * slip; the clock reads as what the tile holds.
 */
const CLOCK_ICON = { src: "/icons/clock.svg", width: 16, height: 16 };

export const businessProfileData = {
  editLabel: "EDIT",
  editLinkVariant: "underline",
  editProfileLabel: "Edit Profile",
  editProfileVariant: "primary",
  changeAvatarLabel: "Change photo",
  changeAvatarIcon: { lucide: "Camera", size: 12 },

  user: {
    name: "Laura Alegre Clinic",
    avatar: "/client/avatars/laura-alegre-clinic.png",
    avatarSize: "2xl",
    nameSize: "lg",
    subtitle: "Healthcare · Private Clinic",
    status: { label: "Active Client", tone: "success" },
    meta: ["Account since March 2025"],
    metaSize: "sm",
  },

  sections: {
    personalTitle: "BUSINESS INFORMATION",
    hoursTitle: "WORKING HOURS",
  },

  /** Phone and email belong to the account itself, so they have no "EDIT". */
  personalFields: [
    { id: "phone", label: "Phone", icon: CALL_ICON, editable: false },
    { id: "email", label: "Email Address", icon: SMS_ICON, editable: false },
    { id: "address", label: "Address", icon: LOCATION_ICON },
    { id: "businessHours", label: "Business Hours", icon: CLOCK_ICON },
  ],

  values: {
    phone: "+34 655 452 419",
    email: "sofia.martinez@virtualsecretary.io",
    address: "Calle Mayor 24, 28001 Madrid, Spain",
    businessHours: "Mon–Fri 09:00–18:00 | Sat 10:00–14:00",
  },

  /**
   * Each day's hours; `open` days are worked. A closed day keeps the hours
   * it opens with, so switching Saturday on shows 10:00 – 14:00.
   */
  workingHours: [
    { id: "monday", day: "Monday", hours: "09:00 – 18:00", open: true },
    { id: "tuesday", day: "Tuesday", hours: "09:00 – 18:00", open: true },
    { id: "wednesday", day: "Wednesday", hours: "09:00 – 18:00", open: true },
    { id: "thursday", day: "Thursday", hours: "09:00 – 18:00", open: true },
    { id: "friday", day: "Friday", hours: "09:00 – 18:00", open: true },
    { id: "saturday", day: "Saturday", hours: "10:00 – 14:00", open: false },
    { id: "sunday", day: "Sunday", hours: "10:00 – 14:00", open: false },
  ],
  offHours: "—",
  hoursIcon: { lucide: "Clock", size: 24 },
  dayToggles: true,
  dayToggleLabel: "{day} open",
  dayStatuses: {
    on: { label: "ACTIVE", tone: "success" },
    off: { label: "INACTIVE", tone: "neutral" },
  },

  instructions: {
    title: "SUPPORT INSTRUCTIONS FOR AGENTS",
    text: "Always greet callers professionally. Appointment inquiries should be forwarded to Dr. Rodriguez's schedule. For urgent medical matters, transfer directly to the clinic's on-call phone (+34 655 452 420). Do not disclose patient names or records.",
    editLabel: "Edit Instructions",
  },

  notFunctionalMessage: "Profile editing isn’t wired up yet",
  notFunctionalDescription:
    "This action will work once the backend is connected.",
};
