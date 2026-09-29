/**
 * "Add new agent account" side panel — Figma 198:32312. The select options are
 * the design's open states (Role, Initial Availability, Call Queue).
 *
 * Field `name`s match the keys in `src/schemas/agents/add-agent.schema.js`.
 */
export const addAgentData = {
  title: "ADD NEW AGENT ACCOUNT",
  subtitle: "Create an agent account and set up their workspace.",

  fields: {
    phone: {
      name: "phone",
      label: "PHONE NUMBER",
      type: "tel",
      autoComplete: "tel",
      placeholder: "+34 600 000 000",
    },
    email: {
      name: "email",
      label: "EMAIL",
      type: "email",
      autoComplete: "email",
      placeholder: "contact@gmail.com",
    },
  },

  sections: {
    access: "ROLE & ACCESS*",
    assignment: "CLIENT ASSIGNMENT*",
  },

  selects: {
    role: {
      name: "role",
      label: "ROLE",
      options: [
        { value: "support-agent", label: "Support Agent" },
        { value: "senior-agent", label: "Senior Agent" },
        { value: "team-lead", label: "Team Lead" },
      ],
    },
    availability: {
      name: "availability",
      label: "INITIAL AVAILABILITY",
      options: [
        { value: "available", label: "Available" },
        { value: "busy", label: "Busy" },
        { value: "away", label: "Away" },
        { value: "offline", label: "Offline" },
      ],
    },
    client: {
      name: "client",
      label: "ASSIGN CLIENTS",
      placeholder: "Select CLIENT…",
      options: [
        { value: "laura-alegre-clinic", label: "Laura Alegre Clinic" },
        { value: "centro-medico-sur", label: "Centro Médico Sur" },
        { value: "fisio-activa", label: "Fisio Activa" },
        { value: "dental-care-center", label: "Dental Care Center" },
        { value: "clinica-bienestar", label: "Clínica Bienestar" },
      ],
    },
    queue: {
      name: "queue",
      label: "CALL QUEUE",
      options: [
        { value: "primary", label: "Primary Support Queue" },
        { value: "vip", label: "VIP Client Queue" },
        { value: "after-hours", label: "After-Hours Voicemail" },
      ],
    },
  },

  workingHours: {
    name: "hours",
    label: "WORKING HOURS",
    separator: "TO",
    fromLabel: "Start time",
    toLabel: "End time",
    days: [
      { id: "monday", label: "MONDAY" },
      { id: "tuesday", label: "TUESDAY" },
      { id: "wednesday", label: "WEDNESDAY" },
      { id: "thursday", label: "THURSDAY" },
      { id: "friday", label: "FRIDAY" },
      { id: "saturday", label: "SATURDAY" },
    ],
  },

  notice: {
    icon: { src: "/icons/sms-primary.svg", width: 24, height: 24 },
    title: "Invitation email will be sent",
    description:
      "The agent will receive a setup link to create their password and activate their account.",
  },

  footer: {
    requiredMark: "*",
    requiredNote: "Required fields",
    cancelLabel: "Cancel",
    submitLabel: "Create Agent & Send Invite",
  },

  notFunctionalMessage: "Agent creation isn’t wired up yet",
  notFunctionalDescription:
    "The details are valid — they will be saved and the invite sent once the backend is connected.",
};
