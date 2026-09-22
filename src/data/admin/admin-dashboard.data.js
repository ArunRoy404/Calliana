/**
 * Admin dashboard — Figma 167:49827.
 *
 * `tone` selects a colour from the design system rather than naming a colour
 * directly, so every consumer resolves it the same way.
 */
export const adminDashboardData = {
  stats: {
    /** Figma splits these 4 + 3 across two rows. */
    primary: [
      {
        id: "active-agents",
        value: "4",
        label: "Active Agents",
        delta: "1 offline",
        tone: "info",
        deltaTone: "success",
        icon: { src: "/admin/icons/user-add.svg", width: 20, height: 20 },
        spark: { src: "/admin/spark/active-agents.svg" },
      },
      {
        id: "active-clients",
        value: "12",
        label: "Active Clients",
        delta: "All covered",
        tone: "info",
        deltaTone: "success",
        icon: { lucide: "Users", width: 20, height: 20 },
        spark: { src: "/admin/spark/active-clients.svg" },
      },
      {
        id: "calls-today",
        value: "87",
        label: "Calls Today",
        tone: "success",
        icon: { src: "/admin/icons/call.svg", width: 20, height: 20 },
        spark: { src: "/admin/spark/calls-today.svg" },
      },
      {
        id: "live-calls",
        value: "2",
        label: "Live Calls",
        delta: "2",
        tone: "success",
        deltaTone: "success",
        icon: { src: "/admin/icons/call.svg", width: 20, height: 20 },
        spark: { src: "/admin/spark/live-calls.svg" },
      },
    ],

    secondary: [
      {
        id: "missed-calls",
        value: "8",
        label: "Missed Calls",
        delta: "3 unassigned",
        tone: "error",
        deltaTone: "error",
        icon: { src: "/admin/icons/call-remove.svg", width: 20, height: 20 },
        spark: { src: "/admin/spark/missed-calls.svg" },
      },
      {
        id: "appointments-today",
        value: "9",
        label: "Appointments Today",
        delta: "Next at 10:30",
        tone: "info",
        deltaTone: "info",
        icon: { src: "/admin/icons/calendar.svg", width: 20, height: 20 },
        spark: { src: "/admin/spark/appointments-today.svg" },
      },
      {
        id: "pending-tasks",
        value: "14",
        label: "Pending Tasks",
        delta: "3 overdue",
        tone: "error",
        deltaTone: "error",
        icon: { src: "/admin/icons/task.svg", width: 20, height: 20 },
        spark: { src: "/admin/spark/pending-tasks.svg" },
      },
    ],
  },

  liveCalls: {
    title: "LIVE CALLS",
    countLabel: "2 Active",
    tone: "error",
    items: [
      {
        id: "call-1",
        caller: "Ramón Torres",
        channel: "SMS",
        client: "Dental Care Center",
        agent: "Sofia Martínez",
        duration: "04:23",
        status: { label: "Live", tone: "error" },
        avatar: { src: "/admin/avatar-admin.png", width: 40, height: 40 },
      },
      {
        id: "call-2",
        caller: "Isabel Moreno",
        channel: "SMS",
        client: "Laura Alegre Clinic",
        agent: "Carlos Ruiz",
        duration: "01:47",
        status: { label: "Live", tone: "error" },
        avatar: { src: "/admin/avatar-admin.png", width: 40, height: 40 },
      },
    ],
  },

  attention: {
    title: "ATTENTION REQUIRED",
    countLabel: "2 Active",
    items: [
      { id: "a1", label: "3 missed calls unassigned", tone: "error" },
      { id: "a2", label: "3 overdue tasks not completed", tone: "warning" },
      { id: "a3", label: "2 unanswered messages — Clínica Bienestar", tone: "warning" },
      { id: "a4", label: "Client request pending 48h — REQ-0039", tone: "error" },
    ],
  },

  agentAvailability: {
    title: "AGENT OPERATIONAL AVAILABILITY",
    subtitle: "Real-time operator presence across shifts",
    columns: [
      { id: "agent", label: "AGENT" },
      { id: "status", label: "STATUS" },
      { id: "zoiper", label: "ZOIPER" },
      { id: "callsToday", label: "CALL TODAY", align: "right" },
      { id: "openTasks", label: "OPEN TASKS", align: "right" },
      { id: "lastActive", label: "LAST ACTIVE" },
    ],
    rows: [
      {
        id: "sofia",
        agent: "Sofia Martínez",
        clients: "3 clients",
        status: { label: "Available", tone: "success" },
        zoiper: { label: "Connected", tone: "success" },
        callsToday: "12",
        openTasks: "4",
        lastActive: "NOW",
      },
      {
        id: "carlos",
        agent: "Carlos Ruiz",
        clients: "2 clients",
        status: { label: "On Call", tone: "info" },
        zoiper: { label: "Connected", tone: "info" },
        callsToday: "8",
        openTasks: "2",
        lastActive: "NOW",
      },
      {
        id: "elena",
        agent: "Elena Vidal",
        clients: "4 clients",
        status: { label: "Busy", tone: "warning" },
        zoiper: { label: "Disconnected", tone: "warning" },
        callsToday: "15",
        openTasks: "6",
        lastActive: "5M AGO",
      },
      {
        id: "marco",
        agent: "Marco Fernández",
        clients: "1 clients",
        status: { label: "Away", tone: "neutral" },
        zoiper: { label: "Connected", tone: "neutral" },
        callsToday: "3",
        openTasks: "1",
        lastActive: "22M AGO",
      },
      {
        id: "alicia",
        agent: "Alicia Torres",
        clients: "2 clients",
        status: { label: "Offline", tone: "neutral" },
        zoiper: { label: "Disconnected", tone: "neutral" },
        callsToday: "0",
        openTasks: "3",
        lastActive: "3H AGO",
      },
    ],
  },

  auditTrail: {
    title: "SYSTEM AUDIT & ROUTING TRAIL",
    subtitle: "Latest PBX dispatches and security events",
    action: { label: "FULL AUDIT LOG", href: "/admin/audit" },
    events: [
      {
        id: "e1",
        label: "David Chen — Account deactivated — extended leave",
        timestamp: "Today 10:45 AM",
        tone: "success",
      },
      {
        id: "e2",
        label: "Sofia Martínez — Added note: Appointment confirmed for Thu 10:30",
        timestamp: "Today 09:30 AM",
        tone: "success",
      },
      {
        id: "e3",
        label: "David Chen — Added Marco Fernández to agent pool",
        timestamp: "Today 08:55 AM",
        tone: "info",
      },
      {
        id: "e4",
        label: "Carlos Ruiz — Task marked as completed",
        timestamp: "Yesterday 17:30",
        tone: "success",
      },
      {
        id: "e5",
        label: "Note added by Carlos Ruiz",
        timestamp: "27 Aug 15:00",
        tone: "warning",
      },
    ],
  },

  notFunctionalMessage: "This isn’t wired up yet",
  notFunctionalDescription:
    "The backend isn’t connected — this screen is frontend only for now.",
};
