/**
 * One client's detail page — Figma 198:30338 (Overview) and the tab frames
 * 202:28319 (Contacts), 202:27804 (Calls), 202:27289 (Messages), 202:28834
 * (Appointments), 202:26774 (Tasks), 202:29349 (Support Instructions) and
 * 202:26259 (Activities).
 *
 * Copy, icons and layout config live here; `sample` is the dummy record every
 * client's page reads until real per-client data exists (the store overlays
 * each client's own name, contact and status on it).
 */
const ICON = (src, size = 16) => ({ src, width: size, height: size });

const TASK_ICON = ICON("/icons/client/task-primary.svg", 24);
const TASK_ICON_URGENT = ICON("/icons/client/task-error.svg", 24);

export const clientDetailData = {
  breadcrumb: [
    { id: "clients", label: "CLIENTS", href: "/admin/clients" },
    { id: "detail", label: "CLIENT DETAILS" },
  ],
  breadcrumbIcon: ICON("/icons/client/chevron-right.svg", 12),
  back: { label: "Back to clients", href: "/admin/clients" },
  businessIcon: ICON("/icons/shared/buildings.svg"),
  labels: {
    contact: "Contact:",
    separator: "•",
  },

  actions: [
    {
      id: "call",
      label: "Call Client",
      variant: "primary",
      icon: ICON("/icons/client/call-white.svg"),
    },
    {
      id: "schedule",
      label: "Schedule",
      variant: "neutral",
      icon: ICON("/icons/shared/calendar.svg"),
    },
    {
      id: "message",
      label: "Message",
      variant: "neutral",
      icon: ICON("/icons/client/message.svg"),
    },
    {
      id: "edit",
      label: "Edit Client",
      variant: "neutral",
      icon: ICON("/icons/shared/edit.svg"),
    },
    {
      id: "task",
      label: "Create Task",
      variant: "neutral",
      icon: ICON("/icons/client/add.svg"),
    },
    {
      id: "deactivate",
      label: "Deactivate",
      variant: "danger",
      icon: ICON("/icons/shared/user-remove-white.svg"),
    },
  ],

  notFunctionalMessage: "Client actions aren’t wired up yet",
  notFunctionalDescription: "This will work once the backend is connected.",

  /**
   * `countOf` names the record list whose length the tab's badge shows, so
   * the counts always match what the tab lists.
   */
  tabs: [
    { id: "overview", label: "Overview" },
    { id: "contacts", label: "Contacts", countOf: "contacts" },
    { id: "calls", label: "Calls", countOf: "calls" },
    { id: "messages", label: "Messages", countOf: "messages" },
    { id: "appointments", label: "Appointments", countOf: "appointments" },
    { id: "tasks", label: "Tasks", countOf: "tasks" },
    { id: "instructions", label: "Support Instructions" },
    { id: "activities", label: "Activities" },
  ],

  texture: "/client/page-texture.png",
  statTexture: "/admin/card-texture.png",

  stats: [
    { id: "openTasks", label: "Open Tasks", tone: "warning" },
    { id: "nextAppointment", label: "Next Appointment" },
    { id: "lastInteraction", label: "Last Interaction" },
  ],

  // Figma titles this "CLIENT INFROMATION".
  infoTitle: "CLIENT INFORMATION",
  infoFields: [
    {
      id: "primaryContact",
      label: "Primary Contact",
      icon: ICON("/icons/shared/user.svg"),
    },
    { id: "phone", label: "Phone", icon: ICON("/icons/shared/call.svg") },
    { id: "email", label: "Email", icon: ICON("/icons/shared/sms.svg") },
    {
      id: "address",
      label: "Address",
      icon: ICON("/icons/shared/location.svg"),
    },
    {
      id: "businessType",
      label: "Business Type",
      icon: ICON("/icons/shared/buildings.svg"),
      wide: true,
    },
  ],

  recentCalls: {
    title: "RECENT CALLS FOR ACCOUNT",
    subtitle: "Latest logged interactions by assigned agents",
  },
  instructions: {
    title: "Agent Handling Protocol & Support Instructions",
    icon: ICON("/icons/client/shield-tick.svg", 24),
  },

  contacts: {
    title: "DIRECT CLIENT CONTACTS DIRECTORY",
    addLabel: "Add Contact",
    addIcon: ICON("/icons/client/add-white.svg"),
    dialLabel: "DIRECT DIAL",
    dialIcon: ICON("/icons/client/call-dark.svg"),
    primaryLabel: "PRIMARY",
  },
  calls: { title: "CALLS FOR ACCOUNT" },
  messages: { title: "MESSAGES" },
  appointments: {
    actionLabel: "Schedule Appointment",
    actionIcon: ICON("/icons/client/calendar-white.svg"),
  },
  tasks: {
    actionLabel: "Create Task",
    actionIcon: ICON("/icons/client/add.svg"),
    dueIcon: ICON("/icons/clock.svg"),
  },
  notes: {
    placeholder: "Add a note about this client…",
    label: "New note",
    submitLabel: "Add Note",
    submitIcon: ICON("/icons/client/add-white.svg"),
    notFunctionalMessage: "Notes aren’t saved yet",
    notFunctionalDescription: "Your note will be kept once the backend is connected.",
  },

  sample: {
    instructions:
      "Always confirm patient insurance type (Sanitas/Adeslas) before booking surgical consultations. For urgent prescription renewals, transfer immediately to duty triage.",

    recentCalls: [
      {
        id: "rc-1",
        caller: "Isabel Gomez",
        meta: "10:14 AM • Appointment Rescheduling",
        status: { label: "CONNECTED", tone: "success" },
        duration: "03:42",
      },
      {
        id: "rc-2",
        caller: "Isabel Moreno",
        meta: "10:15 AM · 2m 05s",
        status: { label: "Missed", tone: "error" },
      },
      {
        id: "rc-3",
        caller: "Carmen Vidal",
        meta: "08:45 AM • Pre-Op Confirmation",
        status: { label: "COMPLETED", tone: "success" },
        duration: "02:18",
      },
    ],

    contacts: [
      {
        id: "ct-1",
        name: "Dr. Laura Alegre",
        role: "Head of Clinic",
        phone: "+34 655 452 419",
        email: "laura@lauraalegre.com",
        isPrimary: true,
      },
      {
        id: "ct-2",
        name: "Marta Soler",
        role: "Practice Manager",
        phone: "+34 677 334 112",
        email: "msoler@lauraalegreclinic.com",
      },
      {
        id: "ct-3",
        name: "Dr. Xavier Font",
        role: "Associate Dermatologist",
        phone: "+34 611 990 443",
        email: "xfont@lauraalegreclinic.com",
      },
    ],

    calls: [
      {
        id: "cl-1",
        caller: "Ramón Torres",
        phone: "(+34 655 112 843)",
        meta: "10:42 AM • Sofia Martínez • Appointment booked",
        status: { label: "Completed", tone: "success" },
        duration: "03:42",
      },
      {
        id: "cl-2",
        caller: "Isabel Moreno",
        phone: "(+34 612 334 901)",
        meta: "10:15 AM • -- • Missed",
        status: { label: "Missed", tone: "error" },
      },
      {
        id: "cl-3",
        caller: "Jorge Pérez",
        phone: "(+34 612 334 901)",
        meta: "09:55 AM • Carlos Ruiz • Follow-up scheduled",
        status: { label: "Completed", tone: "success" },
        duration: "6m 42s",
      },
      {
        id: "cl-4",
        caller: "Ana Fuentes",
        phone: "(+34 674 889 002)",
        meta: "10:42 AM • Sofia Martínez • Voicemail left",
        status: { label: "Voicemail", tone: "warning" },
        duration: "1m 12s",
      },
      {
        id: "cl-5",
        caller: "Manuel Díaz",
        phone: "(+34 655 443 117)",
        meta: "09:10 AM • Elena Vidal • Query resolved",
        status: { label: "Completed", tone: "success" },
        duration: "1m 12s",
      },
      {
        id: "cl-6",
        caller: "Patricia Leal",
        phone: "(+34 622 778 563)",
        meta: "08:45 AM • Sofia Martínez • Confirmation sent",
        status: { label: "Completed", tone: "success" },
        duration: "3m 30s",
      },
    ],

    messages: [
      {
        id: "ms-1",
        sender: "Laura Alegre",
        avatar: "/client/avatars/laura-alegre.png",
        channel: "SMS",
        time: "10:52 AM",
        text: "Hi, is my appointment confirmed for tomorrow?",
        status: { label: "Needs Reply", tone: "warning" },
      },
      {
        id: "ms-2",
        sender: "Dr. Martínez",
        avatar: "/client/avatars/dr-martinez.png",
        channel: "SMS",
        time: "10:52 AM",
        text: "Thank you for getting back to us.",
        status: { label: "Resolved", tone: "success" },
      },
      {
        id: "ms-3",
        sender: "Marta Sánchez",
        avatar: "/client/avatars/marta-sanchez.png",
        channel: "Voicemail",
        time: "Yesterday",
        text: "Voicemail — 1m 42s",
        status: { label: "Needs Reply", tone: "warning" },
      },
      {
        id: "ms-4",
        sender: "Ricardo Gómez",
        avatar: "/client/avatars/ricardo-gomez.png",
        channel: "SMS",
        time: "Yesterday",
        text: "Could you send us the updated invoice?",
        status: { label: "Waiting", tone: "muted" },
      },
    ],

    appointments: [
      {
        id: "ap-1",
        day: "29",
        month: "Aug",
        title: "Appointment",
        meta: "10:30 AM · Dr. Rodríguez",
        status: { label: "upcoming", tone: "neutral" },
      },
      {
        id: "ap-2",
        day: "15",
        month: "Aug",
        title: "Follow-up",
        meta: "11:00 AM · Dr. Martínez",
        status: { label: "Completed", tone: "success" },
      },
      {
        id: "ap-3",
        day: "08",
        month: "Aug",
        title: "Callback",
        meta: "09:30 AM · Admin Team",
        status: { label: "Completed", tone: "success" },
      },
    ],

    tasks: [
      {
        id: "tk-1",
        title: "Callback for appointment query",
        icon: TASK_ICON,
        due: "Today 12:00",
        priority: { label: "High", tone: "warning" },
        status: { label: "Pending", tone: "warning" },
      },
      {
        id: "tk-2",
        title: "Send updated service agreement",
        icon: TASK_ICON,
        due: "Today 17:00",
        priority: { label: "Normal", tone: "info" },
        status: { label: "In Progress", tone: "info" },
      },
      {
        id: "tk-3",
        title: "Follow-up on missed call",
        icon: TASK_ICON_URGENT,
        due: "Overdue 09:00",
        priority: { label: "Urgent", tone: "error" },
        status: { label: "Overdue", tone: "error" },
      },
      {
        id: "tk-4",
        title: "Schedule physiotherapy consultation",
        icon: TASK_ICON,
        due: "Tomorrow 11:00",
        priority: { label: "Low", tone: "muted" },
        status: { label: "Pending", tone: "warning" },
      },
      {
        id: "tk-5",
        title: "Reply to billing inquiry",
        icon: TASK_ICON,
        due: "Thu 14:00",
        priority: { label: "Normal", tone: "info" },
        status: { label: "Pending", tone: "warning" },
      },
    ],

    notes: [
      {
        id: "nt-1",
        author: "Sofia Martínez",
        tone: "error",
        time: "Today 10:08 AM",
        text: "Appointment confirmed for 29 Aug at 10:30. Client confirmed they will bring their ID and test results.",
      },
      {
        id: "nt-2",
        author: "Carlos Ruiz",
        tone: "warning",
        time: "Yesterday 15:30",
        text: "Billing contact updated at client request. New contact: María José Serrano.",
      },
      {
        id: "nt-3",
        author: "Elena Vidal",
        tone: "violet",
        time: "22 Aug 2026",
        text: "Client requested a follow-up call after the August 15 consultation. Scheduled for 29 Aug.",
      },
    ],

    activities: [
      {
        id: "av-1",
        label: "Call handled — Ramón Torres, 4m 18s, appointment booked",
        timestamp: "Today 10:42",
        tone: "success",
      },
      {
        id: "av-2",
        label: "Message reply sent — appointment confirmation",
        timestamp: "10:14:06 AM • Elena Rostova",
        tone: "success",
      },
      {
        id: "av-3",
        label: "Task completed — Send service agreement",
        timestamp: "Yesterday 17:30",
        tone: "primary",
      },
      {
        id: "av-4",
        label: "Appointment scheduled — Dr. Rodríguez, 29 Aug 10:30",
        timestamp: "28 Aug 09:30",
        tone: "success",
      },
      {
        id: "av-5",
        label: "Note added by Carlos Ruiz",
        timestamp: "27 Aug 15:00",
        tone: "warning",
      },
    ],
  },
};
