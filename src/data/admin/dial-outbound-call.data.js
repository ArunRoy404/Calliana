/**
 * Outbound CTI Softphone & Dialer — the calls toolbar's "Dial Outbound Call"
 * action, redesigned from the provided reference: a header with live PBX
 * status, a DTMF keypad tab and a Quick Contacts & Speed Dial tab. Field
 * `name`s match the keys in `src/schemas/calls/dial-outbound-call.schema.js`.
 */
export const dialOutboundCallData = {
  header: {
    icon: { lucide: "Phone", size: 20 },
    title: "Outbound CTI Softphone & Dialer",
    status: { label: "PBX SIP Online", tone: "success" },
    operatorLabel: "Operator: {operator}",
    operator: "Marcus Sterling (Ext. 101)",
  },

  tabs: [
    { id: "keypad", label: "DTMF Keypad" },
    { id: "contacts", label: "Quick Contacts & Speed Dial" },
  ],

  keypad: {
    clearLabel: "Clear number",
    digits: [
      { value: "1", letters: "" },
      { value: "2", letters: "ABC" },
      { value: "3", letters: "DEF" },
      { value: "4", letters: "GHI" },
      { value: "5", letters: "JKL" },
      { value: "6", letters: "MNO" },
      { value: "7", letters: "PQRS" },
      { value: "8", letters: "TUV" },
      { value: "9", letters: "WXYZ" },
      { value: "*", letters: "" },
      { value: "0", letters: "+" },
      { value: "#", letters: "" },
    ],
    recipientField: {
      name: "recipientName",
      label: "Recipient / Caller Name",
      icon: { lucide: "User", size: 16 },
    },
  },

  fields: {
    phone: {
      name: "phone",
      label: "Phone number",
      placeholder: "+34 600 000 000",
    },
  },

  selects: {
    client: {
      name: "client",
      label: "Client Practice Account",
      placeholder: "Select client…",
      options: [
        { value: "laura-alegre-clinic", label: "Laura Alegre Clinic (Medical & Dermatology)" },
        { value: "martinez-dental-care", label: "Martinez Dental Care (Dental Practice)" },
        { value: "vanguard-wealth-partners", label: "Vanguard Wealth Partners (Financial Advisory)" },
        { value: "catalunya-tech-legal", label: "Catalunya Tech Legal (Legal Consultancy)" },
      ],
    },
    callerId: {
      name: "callerId",
      label: "Outbound Caller ID (PBX Trunk)",
      options: [
        { value: "934112000", label: "+34 934 112 000 — Laura Alegre Clinic" },
        { value: "913445220", label: "+34 913 445 220 — Martinez Dental Care" },
        { value: "918776331", label: "+34 918 776 331 — Vanguard Wealth Partners" },
        { value: "932998100", label: "+34 932 998 100 — Catalunya Tech Legal" },
      ],
    },
    purpose: {
      name: "purpose",
      label: "Call Purpose / Campaign",
      options: [
        { value: "appointment-confirmation", label: "Appointment Confirmation" },
        { value: "appointment-rescheduling", label: "Appointment Rescheduling" },
        { value: "billing", label: "Billing Inquiry" },
        { value: "follow-up", label: "Follow-up" },
        { value: "general", label: "General Inquiry" },
      ],
    },
  },

  notesField: {
    name: "notes",
    label: "Pre-Call Brief / Agenda (Optional)",
    type: "textarea",
    placeholder: "e.g. Confirming tomorrow’s 10:30 AM appointment and laser preparation checklist…",
  },

  autoRecord: {
    name: "autoRecord",
    label: "Auto-Record Outbound Call",
  },

  contacts: {
    searchLabel: "Search directory",
    search: { placeholder: "Search directory contacts, clinic patients, or VIPs…" },
    selectAndDialLabel: "Select & Dial",
    options: [
      {
        id: "isabel-gomez",
        name: "Isabel Gomez",
        tag: "VIP Patient",
        phone: "+34 644 892 119",
        account: "Laura Alegre Clinic",
      },
      {
        id: "carlos-mendoza",
        name: "Carlos Mendoza",
        tag: "Orthodontics",
        phone: "+34 655 452 419",
        account: "Martinez Dental Care",
      },
      {
        id: "gonzalo-ramos",
        name: "Gonzalo Ramos",
        tag: "Portfolio Lead",
        phone: "+34 601 223 998",
        account: "Vanguard Wealth Partners",
      },
      {
        id: "simon-morales",
        name: "Dr. Simon Morales",
        tag: "Corporate Partner",
        phone: "+34 912 334 112",
        account: "Catalunya Tech Legal",
      },
    ],
  },

  footer: {
    requiredMark: "*",
    requiredNote: "Required fields",
    cancelLabel: "Cancel",
    submitLabel: "Start Outbound Call",
    submitIcon: { lucide: "Phone", size: 16 },
  },

  notFunctionalMessage: "Dialer isn’t wired up yet",
  notFunctionalDescription:
    "The details are valid — the call will be placed once Zoiper is connected.",
};
