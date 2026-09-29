/**
 * Agent detail side panel — Figma 198:32695 (Profile), 199:35382
 * (Performance), 199:37019 (Assigned Clients), 199:37719 (Calls), 199:38414
 * (Tasks), 199:39109 (Schedule), 199:39804 (Activities).
 *
 * `labels` is the panel's copy. `sample` is the dummy record every agent opens
 * with until a backend exists; the store overlays each agent's own name,
 * contact and status from the table row on top of it.
 */
const ICON = (src) => ({ src, width: 16, height: 16 });

export const agentDetailData = {
  closeLabel: "Close",

  tabs: [
    { id: "profile", label: "Profile" },
    { id: "performance", label: "Performance" },
    { id: "clients", label: "Assigned Clients" },
    { id: "calls", label: "Calls" },
    { id: "tasks", label: "Tasks" },
    { id: "schedule", label: "Schedule" },
    { id: "activities", label: "Activities" },
  ],

  actions: [
    {
      id: "assign",
      label: "Assign Client",
      variant: "primary",
      icon: ICON("/icons/agent/user-white.svg"),
    },
    {
      id: "edit",
      label: "Edit Agent",
      variant: "neutral",
      icon: ICON("/icons/agent/edit.svg"),
    },
    {
      id: "reset",
      label: "Reset Access",
      variant: "neutral",
      // Figma's export of this glyph is missing most of its paths.
      icon: { lucide: "Repeat", size: 16 },
    },
    {
      id: "deactivate",
      label: "Deactivate",
      variant: "danger",
      icon: ICON("/icons/agent/user-remove-white.svg"),
    },
  ],

  notFunctionalMessage: "This action isn’t wired up yet",
  notFunctionalDescription: "It will work once the backend is connected.",

  labels: {
    clients: "Client:",
    lastActive: "Last active:",
    separator: "●",

    personalTitle: "PERSONAL INFORMATION",
    hoursTitle: "WORKING HOURS",
    accountTitle: "ACCOUNT",

    breakdownTitle: "CALL BREAKDOWN — THIS WEEK",
    outcomesTitle: "RECENT OUTCOMES",

    clientsCount: "{count} clients assigned",
    lastCall: "Last call",
    openTasks: "Open tasks",
    removeClient: "Remove client",

    scheduleToday: "Today — Thursday, 28 Aug 2026",
    fullCalendar: "Full Calendar",
    upcomingTitle: "Upcoming — This Week",
  },

  /** Which facts the Profile tab shows, and with which icon. */
  personalFields: [
    { id: "fullName", label: "Full Name", icon: ICON("/icons/agent/user.svg") },
    { id: "phone", label: "Phone", icon: ICON("/icons/agent/call.svg") },
    { id: "email", label: "Work Email", icon: ICON("/icons/agent/sms.svg") },
    {
      id: "address",
      label: "Address",
      icon: ICON("/icons/agent/location.svg"),
    },
    {
      id: "department",
      label: "Role",
      icon: ICON("/icons/agent/buildings.svg"),
    },
    { id: "timezone", label: "Timezone", icon: ICON("/icons/agent/clock.svg") },
  ],

  accountFields: [
    { id: "accountStatus", label: "Account Status", type: "status" },
    { id: "callQueue", label: "Call Queue" },
    { id: "memberSince", label: "Member Since" },
    { id: "lastLogin", label: "Last Login" },
  ],

  calendarIcon: ICON("/icons/agent/calendar.svg"),

  sample: {
    role: "Support Agent",
    address: "Calle Mayor 24, 28001 Madrid",
    department: "Healthcare",
    timezone: "Europe/Madrid (CET)",
    callQueue: "Primary Support Queue",
    memberSince: "01 Mar 2025",
    lastLogin: "Now",

    workingHours: [
      {
        id: "mon",
        day: "Monday",
        hours: "09:00 – 18:00",
        status: { label: "ACTIVE", tone: "success" },
      },
      {
        id: "tue",
        day: "Tuesday",
        hours: "09:00 – 18:00",
        status: { label: "ACTIVE", tone: "success" },
      },
      {
        id: "wed",
        day: "Wednesday",
        hours: "09:00 – 18:00",
        status: { label: "ACTIVE", tone: "success" },
      },
      {
        id: "thu",
        day: "Thursday",
        hours: "09:00 – 18:00",
        status: { label: "ACTIVE", tone: "success" },
      },
      {
        id: "fri",
        day: "Friday",
        hours: "09:00 – 18:00",
        status: { label: "ACTIVE", tone: "success" },
      },
      {
        id: "sat",
        day: "Saturday",
        hours: "—",
        status: { label: "INACTIVE", tone: "neutral" },
      },
      {
        id: "sun",
        day: "Sunday",
        hours: "—",
        status: { label: "INACTIVE", tone: "neutral" },
      },
    ],

    /** Shaped for `StatCard`, so the panel reuses the dashboard's stat tile. */
    stats: [
      {
        id: "calls-today",
        value: "12",
        label: "Calls Today",
        delta: "8 inbound · 4 outbound",
        tone: "success",
        icon: { src: "/icons/agent/stat-call.svg", width: 20, height: 20 },
      },
      {
        id: "active-clients",
        value: "58",
        label: "Active Clients",
        delta: "+12% vs last week",
        tone: "info",
        deltaTone: "success",
        icon: { lucide: "TrendingUp" },
      },
      {
        id: "handle-time",
        value: "3m 42s",
        label: "Avg. Handle Time",
        delta: "–18s vs team avg",
        tone: "info",
        deltaTone: "success",
        icon: { src: "/icons/agent/stat-clock.svg", width: 20, height: 20 },
      },
      {
        id: "open-tasks",
        value: "4",
        label: "Open Tasks",
        delta: "Needs attention",
        tone: "error",
        icon: { src: "/icons/agent/stat-task.svg", width: 20, height: 20 },
      },
      {
        id: "missed-calls",
        value: "2",
        label: "Missed Calls",
        delta: "3.4% miss rate",
        tone: "error",
        icon: {
          src: "/icons/agent/stat-call-remove.svg",
          width: 20,
          height: 20,
        },
      },
      {
        id: "satisfaction",
        value: "4.8 / 5",
        label: "Client Satisfaction",
        delta: "Based on 24 ratings",
        tone: "info",
        deltaTone: "primary",
        icon: { src: "/icons/agent/stat-calendar.svg", width: 20, height: 20 },
      },
    ],

    breakdown: [
      {
        id: "inbound",
        label: "Inbound calls",
        value: "38",
        percent: 65,
        tone: "primary",
      },
      {
        id: "outbound",
        label: "Outbound calls",
        value: "20",
        percent: 34,
        tone: "accent",
      },
      {
        id: "missed",
        label: "Missed calls",
        value: "2",
        percent: 3,
        tone: "error",
      },
      {
        id: "voicemail",
        label: "Voicemail",
        value: "4",
        percent: 7,
        tone: "warning",
      },
    ],

    outcomes: [
      { id: "appointments", label: "Appointments booked", value: "12" },
      { id: "resolved", label: "Issues resolved", value: "28" },
      { id: "tasks", label: "Tasks created", value: "7" },
      { id: "follow-ups", label: "Follow-ups scheduled", value: "8" },
    ],

    clients: [
      {
        id: "laura-alegre-clinic",
        name: "Laura Alegre Clinic",
        contact: "Laura Alegre · +34 655 452 419",
        status: { label: "Active", tone: "success" },
        lastCall: "Today 10:42",
        openTasks: { value: "2", tone: "warning" },
      },
      {
        id: "centro-medico-sur",
        name: "Centro Médico Sur",
        contact: "Ricardo Gómez · +34 678 334 120",
        status: { label: "Active", tone: "success" },
        lastCall: "Yesterday",
        openTasks: { value: "1", tone: "warning" },
      },
      {
        id: "fisio-activa",
        name: "Fisio Activa",
        contact: "Carmen López · +34 655 890 334",
        status: { label: "Inactive", tone: "neutral" },
        lastCall: "2 weeks ago",
        openTasks: { value: "0", tone: "muted" },
      },
    ],

    calls: [
      {
        id: "call-1",
        icon: "PhoneIncoming",
        tone: "success",
        caller: "Ramón Torres",
        phone: "+34 655 112 843",
        meta: "Dental Care Center · 10:42 AM · 4m 18s",
        status: { label: "Completed", tone: "success" },
        outcome: "Appointment booked",
      },
      {
        id: "call-2",
        icon: "PhoneMissed",
        tone: "error",
        caller: "Isabel Moreno",
        phone: "+34 612 334 901",
        meta: "Laura Alegre Clinic · 10:15 AM · 2m 05s",
        status: { label: "Missed", tone: "error" },
        outcome: "Missed",
      },
      {
        id: "call-3",
        icon: "PhoneOutgoing",
        tone: "primary",
        caller: "Jorge Pérez",
        phone: "+34 699 557 220",
        meta: "Clínica Bienestar · 09:55 AM · 6m 42s",
        status: { label: "Completed", tone: "success" },
        outcome: "Follow-up scheduled",
      },
      {
        id: "call-4",
        icon: "PhoneIncoming",
        tone: "success",
        caller: "Ana Fuentes",
        phone: "+34 674 889 002",
        meta: "Centro Médico Sur · 09:30 AM · 1m 12s",
        status: { label: "Voicemail", tone: "warning" },
        outcome: "Voicemail left",
      },
      {
        id: "call-5",
        icon: "PhoneIncoming",
        tone: "success",
        caller: "Manuel Díaz",
        phone: "+34 655 443 117",
        meta: "Fisio Activa · 09:10 AM · 8m 55s",
        status: { label: "Completed", tone: "success" },
        outcome: "Query resolved",
      },
      {
        id: "call-6",
        icon: "PhoneOutgoing",
        tone: "primary",
        caller: "Patricia Leal",
        phone: "+34 622 778 563",
        meta: "Dental Care Center · 08:45 AM · 3m 30s",
        status: { label: "Completed", tone: "success" },
        outcome: "Confirmation sent",
      },
    ],

    tasks: [
      {
        id: "task-1",
        title: "Callback for appointment query",
        tone: "neutral",
        priority: { label: "High", tone: "warning" },
        status: { label: "Pending", tone: "warning" },
        client: "Laura Alegre Clinic",
        due: "Today 12:00",
      },
      {
        id: "task-2",
        title: "Send updated service agreement",
        tone: "neutral",
        priority: { label: "Normal", tone: "primary" },
        status: { label: "In Progress", tone: "primary" },
        client: "Dental Care Center",
        due: "Today 17:00",
      },
      {
        id: "task-3",
        title: "Follow-up on missed call",
        tone: "error",
        priority: { label: "Urgent", tone: "error" },
        status: { label: "Overdue", tone: "error" },
        client: "Clínica Bienestar",
        due: "Overdue 09:00",
      },
      {
        id: "task-4",
        title: "Schedule physiotherapy consultation",
        tone: "neutral",
        priority: { label: "Low", tone: "neutral" },
        status: { label: "Pending", tone: "warning" },
        client: "Fisio Activa",
        due: "Tomorrow 11:00",
      },
      {
        id: "task-5",
        title: "Reply to billing inquiry",
        tone: "neutral",
        priority: { label: "Normal", tone: "primary" },
        status: { label: "Pending", tone: "warning" },
        client: "Centro Médico Sur",
        due: "Thu 14:00",
      },
    ],

    scheduleToday: [
      {
        id: "slot-1",
        time: "09:30 AM",
        tone: "warning",
        title: "Follow-up call",
        subtitle: "Laura Alegre Clinic",
        status: { label: "upcoming", tone: "neutral" },
      },
      {
        id: "slot-2",
        time: "10:30 AM",
        tone: "accent",
        title: "Appointment",
        subtitle: "Dr. Martínez — Dental Care",
        status: { label: "upcoming", tone: "neutral" },
      },
      {
        id: "slot-3",
        time: "12:00 PM",
        tone: "primary",
        title: "Client callback",
        subtitle: "Clínica Bienestar",
        status: { label: "upcoming", tone: "neutral" },
      },
      {
        id: "slot-4",
        time: "14:00 PM",
        tone: "primary",
        title: "Onboarding call",
        subtitle: "Centro Médico Sur",
        status: { label: "upcoming", tone: "neutral" },
      },
      {
        id: "slot-5",
        time: "16:30 PM",
        tone: "primary",
        title: "Follow-up",
        subtitle: "Fisio Activa",
        status: { label: "upcoming", tone: "neutral" },
      },
    ],

    upcoming: [
      {
        id: "up-1",
        weekday: "Fri",
        date: "29 Aug",
        time: "10:00",
        title: "Callback",
        subtitle: "Dental Care Center",
      },
      {
        id: "up-2",
        weekday: "Mon",
        date: "01 Sep",
        time: "14:00",
        title: "Appointment",
        subtitle: "Clínica Bienestar",
      },
    ],

    activities: [
      {
        id: "act-1",
        label: "Call handled — Ramón Torres, Dental Care Center, 4m 18s",
        timestamp: "Today 10:42",
        tone: "success",
      },
      {
        id: "act-2",
        label: "Note added on Laura Alegre Clinic",
        timestamp: "Today 10:08",
        tone: "success",
      },
      {
        id: "act-3",
        label: "Outbound call — Jorge Pérez, Clínica Bienestar, 6m 42s",
        timestamp: "Yesterday 17:30",
        tone: "primary",
      },
      {
        id: "act-4",
        label: "Appointment scheduled — Dr. Rodríguez, 29 Aug 10:30",
        timestamp: "28 Aug 09:30",
        tone: "success",
      },
      {
        id: "act-5",
        label: "Task completed — Send service agreement to Dental Care",
        timestamp: "Yesterday 17:30",
        tone: "warning",
      },
    ],
  },
};
