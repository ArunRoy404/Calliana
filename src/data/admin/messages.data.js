/**
 * Client Messages & Inbox — Figma 167:51527: the conversation list, the open
 * thread and the client's info beside it. Read through `useMessagesStore`;
 * the URL keys and filter values are in
 * `src/schemas/messages/messages-params.schema.js`.
 *
 * A conversation's `preview` defaults to its last message; it is set only
 * where the list shows something else (a voicemail's length).
 */
const AGENT = { name: "David Chen", avatar: "/admin/avatar-admin.png" };

export const messagesData = {
  search: {
    label: "Search conversations",
    placeholder: "Search conversations...",
  },

  /** `value`s are the URL's `?filter=`; the first is the default. */
  filterOptions: [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "needs-reply", label: "Needs Reply" },
    { value: "resolved", label: "Resolved" },
  ],

  emptyConversations: "No conversations match your search.",

  /** Shown in place of the thread and client info until one is opened. */
  noConversation: {
    icon: { lucide: "MessagesSquare", size: 32 },
    title: "No conversation selected",
    text: "Select a conversation from the list to see its messages.",
  },

  /** The sender of every outbound message. */
  agent: AGENT,

  thread: {
    startedTemplate: "Conversation Started {day}",
    resolveLabel: "Mark Resolved",
    /** Phone-only controls in the thread header. */
    backLabel: "Back to conversations",
    infoLabel: "Client details",
    separator: "•",
    deliveredIcon: { lucide: "CheckCheck", size: 12 },
    quickActions: [
      {
        id: "schedule",
        label: "Schedule",
        variant: "neutral",
        icon: { lucide: "CalendarDays", size: 16 },
      },
      {
        id: "task",
        label: "Create Task",
        variant: "neutral",
        icon: { lucide: "Plus", size: 16 },
      },
      {
        id: "callback",
        label: "Call back",
        variant: "neutral",
        icon: { lucide: "Phone", size: 16 },
      },
    ],
  },

  composer: {
    label: "Message",
    placeholder: "Type a message...",
    attachLabel: "Attach a file",
    attachIcon: { lucide: "Paperclip", size: 18 },
    sendLabel: "Send message",
    sendIcon: { lucide: "Send", size: 16 },
    notFunctionalMessage: "Messaging isn’t wired up yet",
    notFunctionalDescription:
      "Your message is valid — it will be sent once the SMS gateway is connected.",
  },

  clientInfo: {
    title: "CLIENT INFO",
    fields: [
      { id: "primaryContact", label: "Primary Contact" },
      { id: "phone", label: "Phone" },
      { id: "email", label: "Email" },
      { id: "address", label: "Address" },
      { id: "lastCall", label: "Last Call" },
      { id: "nextAppt", label: "Next Appt" },
      { id: "openTasks", label: "Open Tasks" },
    ],
    actionsTitle: "Contextual Actions",
    actions: [
      {
        id: "call",
        label: "Call Account Lead",
        variant: "neutral",
        icon: { lucide: "Phone", size: 16 },
      },
      {
        id: "meeting",
        label: "Schedule Meeting",
        variant: "neutral",
        icon: { lucide: "CalendarDays", size: 16 },
      },
      {
        id: "task",
        label: "Create Action Task",
        variant: "neutral",
        icon: { lucide: "Plus", size: 16 },
      },
    ],
  },

  notFunctionalMessage: "Inbox actions aren’t wired up yet",
  notFunctionalDescription:
    "This action will work once the backend is connected.",

  conversations: [
    {
      id: "laura-alegre",
      name: "Laura Alegre",
      avatar: "/client/avatars/laura-alegre.png",
      contactName: "Marta Soler (Practice Mgr)",
      account: "Laura Alegre Clinic",
      channel: "SMS",
      time: "10:52 AM",
      startedDay: "Today",
      unread: 2,
      status: "needs-reply",
      client: {
        name: "Laura Alegre Clinic",
        avatar: "/client/avatars/laura-alegre.png",
        status: { label: "Active", tone: "success" },
        primaryContact: "Laura Alegre",
        phone: "+34 655 452 419",
        email: "info@lauraalegreclinic.es",
        address: "Calle Mayor 24, 28001 Madrid",
        lastCall: "2h ago",
        nextAppt: "Tomorrow 10:30",
        openTasks: "2",
      },
      messages: [
        {
          id: "m1",
          direction: "in",
          text: "Hi, I wanted to confirm my appointment for tomorrow at 10:30.",
          time: "09:45 AM",
        },
        {
          id: "m2",
          direction: "out",
          text: "Hi Marta, Isabel Gomez called asking for Friday 11:30 AM. Can we fit her into Dr. Alegre’s schedule?",
          time: "09:52 AM",
        },
        {
          id: "m3",
          direction: "in",
          text: "Perfect, thank you! Should I bring any documents?",
          time: "10:01 AM",
        },
        {
          id: "m4",
          direction: "out",
          text: "Please bring your ID and any recent test results if applicable. Our team will take care of the rest.",
          time: "10:08 AM",
        },
        {
          id: "m5",
          direction: "in",
          text: "Great, will do. See you tomorrow!",
          time: "10:12 AM",
        },
        {
          id: "m6",
          direction: "in",
          text: "Hi, is my appointment confirmed for tomorrow?",
          time: "10:52 AM",
        },
      ],
    },
    {
      id: "dr-martinez",
      name: "Dr. Martínez",
      avatar: "/client/avatars/dr-martinez.png",
      contactName: "Dr. Martínez (Lead Dentist)",
      account: "Martinez Dental Care",
      channel: "SMS",
      time: "09:30 AM",
      startedDay: "Today",
      unread: 0,
      status: "resolved",
      client: {
        name: "Martinez Dental Care",
        avatar: "/client/avatars/dr-martinez.png",
        status: { label: "Active", tone: "success" },
        primaryContact: "Dr. Martínez",
        phone: "+34 913 445 220",
        email: "hola@martinezdental.es",
        address: "Gran Vía 41, 28013 Madrid",
        lastCall: "Yesterday",
        nextAppt: "Fri 09:00",
        openTasks: "0",
      },
      messages: [
        {
          id: "m1",
          direction: "out",
          text: "Good morning, the invoice for October has been sent to your billing email.",
          time: "09:12 AM",
        },
        {
          id: "m2",
          direction: "in",
          text: "Thank you for getting back to us.",
          time: "09:30 AM",
        },
      ],
    },
    {
      id: "marta-sanchez",
      name: "Marta Sánchez",
      avatar: "/client/avatars/marta-sanchez.png",
      contactName: "Marta Sánchez (Patient)",
      account: "Laura Alegre Clinic",
      channel: "Voicemail",
      time: "Yesterday",
      startedDay: "Yesterday",
      preview: "Voicemail — 1m 42s",
      unread: 1,
      status: "needs-reply",
      client: {
        name: "Laura Alegre Clinic",
        avatar: "/client/avatars/laura-alegre.png",
        status: { label: "Active", tone: "success" },
        primaryContact: "Laura Alegre",
        phone: "+34 655 452 419",
        email: "info@lauraalegreclinic.es",
        address: "Calle Mayor 24, 28001 Madrid",
        lastCall: "2h ago",
        nextAppt: "Tomorrow 10:30",
        openTasks: "2",
      },
      messages: [
        {
          id: "m1",
          direction: "in",
          text: "Voicemail (1m 42s): Hi, this is Marta, I’d like to move my laser session to next week if possible. Please call me back.",
          time: "Yesterday",
        },
      ],
    },
    {
      id: "ricardo-gomez",
      name: "Ricardo Gómez",
      avatar: "/client/avatars/ricardo-gomez.png",
      contactName: "Ricardo Gómez (Finance)",
      account: "Vanguard Wealth Partners",
      channel: "SMS",
      time: "Yesterday",
      startedDay: "Yesterday",
      unread: 0,
      status: "needs-reply",
      client: {
        name: "Vanguard Wealth Partners",
        avatar: "/client/avatars/ricardo-gomez.png",
        status: { label: "Active", tone: "success" },
        primaryContact: "Ricardo Gómez",
        phone: "+34 918 776 331",
        email: "finance@vanguardwealth.es",
        address: "Paseo de la Castellana 89, 28046 Madrid",
        lastCall: "3d ago",
        nextAppt: "—",
        openTasks: "1",
      },
      messages: [
        {
          id: "m1",
          direction: "in",
          text: "Could you send us the updated invoice?",
          time: "Yesterday",
        },
      ],
    },
  ],
};
