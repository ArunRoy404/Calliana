/**
 * System Activity & Security Audit Log — Figma 266:31298. Same shape as the
 * other lists; there is no row action column, since an audit entry is a
 * record, not something to act on.
 */
const TIMESTAMP = {
  id: "timestamp",
  label: "TIMESTAMP",
  type: "text",
  field: "timestamp",
  size: "lg",
  weight: "semibold",
  wrap: true,
};
const USER = {
  id: "user",
  label: "USER",
  type: "user",
  field: "actorName",
};
const ROLE = {
  id: "role",
  label: "ROLE",
  type: "badge",
  field: "actorRole",
  showDot: false,
};
const ACTOR_IDENTITY = {
  id: "actorIdentity",
  label: "ACTOR & IDENTITY",
  type: "text",
  field: "targetIdentity",
  wrap: true,
};
const ACTION_TAKEN = {
  id: "actionTaken",
  label: "ACTION TAKEN",
  type: "text",
  field: "actionLabel",
  wrap: true,
};
const AFFECTED_RESOURCE = {
  id: "affectedResource",
  label: "AFFECTED RESOURCE",
  type: "text",
  field: "resource",
  tone: "info",
  weight: "medium",
  wrap: true,
};
const DESCRIPTION = {
  id: "description",
  label: "DESCRIPTION",
  type: "text",
  field: "description",
  tone: "neutral",
  weight: "regular",
  wrap: true,
};
const IP_ORIGIN = {
  id: "ipOrigin",
  label: "IP ORIGIN",
  type: "text",
  field: "ip",
  tone: "info",
  weight: "medium",
  align: "center",
};
const OUTCOME = {
  id: "outcome",
  label: "OUTCOME",
  type: "badge",
  field: "outcome",
  align: "center",
  headerAlign: "center",
};

export const AUDIT_ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "agent", label: "Agent" },
];

export const AUDIT_ACTION_OPTIONS = [
  { value: "call", label: "Call Disposition" },
  { value: "queue", label: "Queue Configuration" },
  { value: "session", label: "Session & Sign-in" },
  { value: "script", label: "Support Script" },
  { value: "account", label: "Account Changes" },
];

export const AUDIT_DATE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "this-week", label: "This Week" },
];

const ROLES = {
  admin: { label: "Admin", tone: "success" },
  agent: { label: "Agent", tone: "primary" },
};

const OUTCOMES = {
  success: { label: "Success", tone: "success" },
  failed: { label: "Failed", tone: "error" },
};

export const auditData = {
  texture: "/admin/table/table-texture.png",
  tableBreakpoint: "lg",
  searchClassName: "sm:w-[285px]",
  toolbarClassName: "flex-nowrap gap-3 overflow-x-auto bg-action-primary",

  search: {
    label: "Search the audit log",
    placeholder: "Search...",
  },

  filters: [
    {
      param: "role",
      field: "actorRoleKey",
      label: "Filter by user role",
      allValue: "all",
      options: [{ value: "all", label: "User" }, ...AUDIT_ROLE_OPTIONS],
    },
    {
      param: "action",
      field: "actionCategory",
      label: "Filter by action",
      allValue: "all",
      options: [{ value: "all", label: "Action" }, ...AUDIT_ACTION_OPTIONS],
    },
    {
      param: "date",
      field: "dateBucket",
      label: "Filter by date",
      allValue: "all",
      options: [{ value: "all", label: "Date" }, ...AUDIT_DATE_OPTIONS],
    },
  ],

  secondaryAction: {
    label: "Export Compliance Audit",
    icon: { lucide: "RotateCw", size: 16 },
    notFunctionalMessage: "Exporting isn’t wired up yet",
    notFunctionalDescription: "This action will work once the backend is connected.",
  },

  emptyLabel: "No audit entries match your search or filters.",

  tableClassName: "min-w-[1600px]",

  columns: [
    TIMESTAMP,
    USER,
    ROLE,
    ACTOR_IDENTITY,
    ACTION_TAKEN,
    AFFECTED_RESOURCE,
    DESCRIPTION,
    IP_ORIGIN,
    OUTCOME,
  ],

  card: {
    title: USER,
    status: OUTCOME,
    subtitle: ACTION_TAKEN,
    fields: [TIMESTAMP, ROLE, ACTOR_IDENTITY, AFFECTED_RESOURCE, IP_ORIGIN],
  },

  rows: [
    {
      id: "audit-01",
      timestamp: "2026-08-28 09:42:15 CET",
      actorName: "David Chen",
      actorRoleKey: "admin",
      actorRole: ROLES.admin,
      targetIdentity: "Elena Rostova (Agent)",
      actionCategory: "account",
      actionLabel: "Call Disposition Saved",
      resource: "Call #call_01 (Isabel Gomez)",
      description: "Account deactivated — extended leave",
      ip: "192.168.1.42",
      dateBucket: "today",
      outcome: OUTCOMES.success,
    },
    {
      id: "audit-02",
      timestamp: "2026-08-28 09:30:00 CET",
      actorName: "Sofia Martínez",
      actorRoleKey: "agent",
      actorRole: ROLES.agent,
      targetIdentity: "Marcus Sterling (Admin)",
      actionCategory: "queue",
      actionLabel: "Queue Priority Modified",
      resource: "PBX Queue: Medical Tier 1",
      description: "Added note: Appointment confirmed for Thu 10:30",
      ip: "10.0.4.12",
      dateBucket: "today",
      outcome: OUTCOMES.success,
    },
    {
      id: "audit-03",
      timestamp: "2026-08-28 08:00:10 CET",
      actorName: "David Chen",
      actorRoleKey: "admin",
      actorRole: ROLES.admin,
      targetIdentity: "Elena Rostova (Agent)",
      actionCategory: "session",
      actionLabel: "Operator Shift Sign-in",
      resource: "Medical & Healthcare Clinics (Tier 1)",
      description: "Added Marco Fernández to agent pool",
      ip: "192.168.1.42",
      dateBucket: "today",
      outcome: OUTCOMES.success,
    },
    {
      id: "audit-04",
      timestamp: "2026-08-27 18:15:02 CET",
      actorName: "Carlos Ruiz",
      actorRoleKey: "agent",
      actorRole: ROLES.agent,
      targetIdentity: "Dr. Laura Alegre (Client)",
      actionCategory: "script",
      actionLabel: "Support Script Updated",
      resource: "Laura Alegre Clinic",
      description: "Updated the after-hours triage script",
      ip: "88.24.110.5",
      dateBucket: "yesterday",
      outcome: OUTCOMES.success,
    },
    {
      id: "audit-05",
      timestamp: "2026-08-27 15:48:31 CET",
      actorName: "Marcus Sterling",
      actorRoleKey: "admin",
      actorRole: ROLES.admin,
      targetIdentity: "David Chen (Admin)",
      actionCategory: "account",
      actionLabel: "Role Permissions Changed",
      resource: "User: David Chen",
      description: "Granted billing access",
      ip: "10.0.4.12",
      dateBucket: "yesterday",
      outcome: OUTCOMES.success,
    },
    {
      id: "audit-06",
      timestamp: "2026-08-27 11:05:44 CET",
      actorName: "Elena Vidal",
      actorRoleKey: "agent",
      actorRole: ROLES.agent,
      targetIdentity: "Vanguard Wealth Partners (Client)",
      actionCategory: "call",
      actionLabel: "Call Marked Missed",
      resource: "Call #call_09 (Gonzalo Ramos)",
      description: "Follow-up task created automatically",
      ip: "192.168.1.55",
      dateBucket: "yesterday",
      outcome: OUTCOMES.success,
    },
    {
      id: "audit-07",
      timestamp: "2026-08-25 14:22:09 CET",
      actorName: "Sofia Martínez",
      actorRoleKey: "agent",
      actorRole: ROLES.agent,
      targetIdentity: "Catalunya Tech Legal (Client)",
      actionCategory: "call",
      actionLabel: "Failed Login Attempt",
      resource: "Agent Console",
      description: "Password entered incorrectly 3 times",
      ip: "88.24.110.5",
      dateBucket: "this-week",
      outcome: OUTCOMES.failed,
    },
    {
      id: "audit-08",
      timestamp: "2026-08-25 09:10:00 CET",
      actorName: "David Chen",
      actorRoleKey: "admin",
      actorRole: ROLES.admin,
      targetIdentity: "Dental Practices Overflow (Queue)",
      actionCategory: "queue",
      actionLabel: "Routing Rules Updated",
      resource: "PBX Queue: Dental Overflow",
      description: "Changed distribution strategy to Round-Robin",
      ip: "192.168.1.42",
      dateBucket: "this-week",
      outcome: OUTCOMES.success,
    },
    {
      id: "audit-09",
      timestamp: "2026-08-24 17:52:18 CET",
      actorName: "Carlos Ruiz",
      actorRoleKey: "agent",
      actorRole: ROLES.agent,
      targetIdentity: "Martinez Dental Care (Client)",
      actionCategory: "session",
      actionLabel: "Session Signed Out",
      resource: "Agent Console",
      description: "Manual sign-out at end of shift",
      ip: "10.0.4.19",
      dateBucket: "this-week",
      outcome: OUTCOMES.success,
    },
    {
      id: "audit-10",
      timestamp: "2026-08-24 10:03:47 CET",
      actorName: "Marcus Sterling",
      actorRoleKey: "admin",
      actorRole: ROLES.admin,
      targetIdentity: "Sofia Martínez (Agent)",
      actionCategory: "account",
      actionLabel: "Working Hours Updated",
      resource: "User: Sofia Martínez",
      description: "Extended Friday hours to 20:00",
      ip: "192.168.1.42",
      dateBucket: "this-week",
      outcome: OUTCOMES.success,
    },
  ],

  pagination: {
    summary: "{total} entries · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },
};
