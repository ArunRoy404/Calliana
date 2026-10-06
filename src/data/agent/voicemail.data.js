import { callDetailData } from "@/data/admin/call-detail.data";
import {
  CALL_ACTIONS_COLUMN,
  CALL_CLIENT_ACCOUNT_COLUMN,
  CALL_CLIENT_OPTIONS,
  callsData,
} from "@/data/admin/calls.data";
import {
  CALLER_COLUMN,
  DURATION_COLUMN,
} from "@/data/tables/call-columns.data";

/**
 * The agent workspace's Voicemail — built from the design screenshots (the
 * Figma node was not reachable). Every voicemail is a call in the call log
 * (`callsData.rows`), not a copy: `voicemails` adds only what a voicemail
 * has of its own — whether it is handled, its transcription, whether the
 * caller still needs a callback, when it came in and what it says — keyed
 * by the call's id. The store joins the two.
 *
 * The details drawer is the call drawer (`CallDetailPanel`) with the
 * voicemail's own copy and sections: the info card, the audio and the
 * transcription.
 */

/** Whether a voicemail is handled — the list's badge and the drawer's tag. */
export const VOICEMAIL_STATUSES = {
  pending: {
    badge: { label: "Pending", tone: "warning" },
    tag: { label: "New Voicemail", tone: "success" },
  },
  resolved: {
    badge: { label: "Resolved", tone: "success", showDot: false },
    tag: { label: "Resolved", tone: "neutral" },
  },
};

/** Where its transcription stands. */
export const TRANSCRIPTIONS = {
  ready: { label: "Ready", tone: "success" },
  processing: { label: "Processing", tone: "warning" },
};

/** Whether the caller still needs calling back — badge and drawer tag. */
export const CALLBACKS = {
  pending: {
    badge: { label: "Pending", tone: "warning" },
    tag: { label: "Callback Needed", tone: "warning" },
  },
  none: { badge: { label: "-", tone: "warning" } },
  done: {
    badge: { label: "Done", tone: "success" },
    tag: { label: "Callback Done", tone: "success" },
  },
};

const STATUS = {
  id: "status",
  label: "CALL STATUS",
  type: "badge",
  field: "voicemailStatus",
  align: "center",
  headerAlign: "center",
};
const TRANSCRIPTION = {
  id: "transcription",
  label: "TRANSCRIPTION",
  type: "badge",
  field: "transcriptionStatus",
  showDot: false,
  align: "center",
  headerAlign: "center",
};
const CALLBACK = {
  id: "callback",
  label: "CALLBACK",
  type: "badge",
  field: "callbackStatus",
  showDot: false,
  align: "center",
  headerAlign: "center",
};

export const voicemailData = {
  texture: callsData?.texture,
  search: { label: "Search voicemail", placeholder: "Search..." },

  /** The design names each select by what it filters ("Status", "Client"). */
  filters: [
    {
      param: "status",
      field: "voicemailKey",
      label: "Filter by status",
      allValue: "all",
      options: [
        { value: "all", label: "Status" },
        { value: "pending", label: "Pending" },
        { value: "resolved", label: "Resolved" },
      ],
    },
    {
      param: "client",
      field: "clientId",
      label: "Filter by client account",
      allValue: "all",
      options: [{ value: "all", label: "Client" }, ...CALL_CLIENT_OPTIONS],
    },
    {
      param: "callback",
      field: "callbackKey",
      label: "Filter by callback",
      allValue: "all",
      options: [
        { value: "all", label: "Callback" },
        { value: "pending", label: "Pending" },
        { value: "done", label: "Done" },
        { value: "none", label: "No callback" },
      ],
    },
  ],

  emptyLabel: "No voicemail matches your search or filters.",
  tableClassName: "min-w-[1180px]",

  columns: [
    CALLER_COLUMN,
    CALL_CLIENT_ACCOUNT_COLUMN,
    DURATION_COLUMN,
    STATUS,
    TRANSCRIPTION,
    CALLBACK,
    CALL_ACTIONS_COLUMN,
  ],

  card: {
    title: CALLER_COLUMN,
    status: STATUS,
    subtitle: CALL_CLIENT_ACCOUNT_COLUMN,
    fields: [DURATION_COLUMN, TRANSCRIPTION, CALLBACK],
    action: CALL_ACTIONS_COLUMN,
  },

  pagination: {
    summary: "{total} voicemails · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },

  /** Where "Open Client Profile" goes. */
  clientHrefTemplate: "/agent/clients/{clientId}",

  /** The drawer — "Voicemail Details: Isabel Gomez". */
  detail: {
    ...callDetailData,
    titleTemplate: "Voicemail Details: {caller}",
    subtitleTemplate: undefined,
    /** The player's position over the voicemail's length. */
    recordingAsideTemplate: "{position} / {duration}",
    downloadIcon: { lucide: "Download", size: 18 },
    labels: {
      ...callDetailData?.labels,
      playLabel: "Play voicemail",
      downloadLabel: "Download voicemail",
    },
    infoFields: [
      ...(callDetailData?.infoFields ?? []),
      { id: "received", label: "RECIVED" },
      { id: "voicemailLength", label: "DURATION", tone: "primary" },
    ],
    sections: [
      {
        id: "recording",
        kind: "recording",
        title: "Voicemail Audio",
        icon: callDetailData?.sections?.[0]?.icon,
        iconTone: "primary",
      },
      { id: "transcription", field: "transcription", title: "Transcription" },
    ],
    footerActions: [
      {
        id: "resolve",
        label: "Mark as Resolved",
        variant: "neutral",
        icon: { lucide: "CircleCheck", size: 16 },
        className: "mr-auto",
      },
      {
        id: "client",
        label: "Open Client Profile",
        variant: "neutral",
        hrefField: "clientHref",
      },
      { id: "task", label: "Create Task", variant: "neutral" },
      {
        id: "callback",
        label: "Callback",
        variant: "primary",
        icon: { lucide: "Phone", size: 16 },
      },
    ],
    notFunctionalMessage: "Voicemail actions aren’t wired up yet",
    sample: {
      ...callDetailData?.sample,
      position: "0:52",
    },
  },

  /**
   * Each voicemail, by its call's id in the call log: handled or not, its
   * transcription, its callback, when it came in, its length and what the
   * caller said.
   */
  voicemails: {
    "isabel-gomez-01": {
      status: "pending",
      transcription: "ready",
      callback: "pending",
      received: "Yesterday 17:30",
      voicemailLength: "2m05s",
      transcript:
        "Quería confirmar la cita del jueves. Ya me han confirmado por WhatsApp así que no hace falta devolverme la llamada. Gracias.",
    },
    "mateo-fernandez-01": {
      status: "pending",
      transcription: "ready",
      callback: "none",
      received: "Today 09:50",
      voicemailLength: "1m12s",
      transcript:
        "Hola, llamo para cambiar mi revisión dental al lunes por la tarde si hay hueco.",
    },
    "gonzalo-ramos-01": {
      status: "resolved",
      transcription: "ready",
      callback: "done",
      received: "Today 09:15",
      voicemailLength: "0m48s",
      transcript:
        "Buenos días, necesito hablar con mi asesor sobre la cartera antes del viernes.",
    },
    "carmen-vidal-01": {
      status: "resolved",
      transcription: "processing",
      callback: "none",
      received: "Today 08:45",
      voicemailLength: "1m30s",
    },
    "raul-menendez-01": {
      status: "resolved",
      transcription: "ready",
      callback: "done",
      received: "Today 08:20",
      voicemailLength: "0m55s",
      transcript:
        "Les envío el contrato firmado por correo esta tarde. Avísenme si falta algo.",
    },
    "patricia-ortiz-01": {
      status: "resolved",
      transcription: "ready",
      callback: "done",
      received: "Yesterday 16:30",
      voicemailLength: "1m40s",
      transcript:
        "Gracias por la cita de ayer, todo perfecto. Les llamo para la próxima revisión.",
    },
    "isabel-gomez-02": {
      status: "pending",
      transcription: "ready",
      callback: "pending",
      received: "Yesterday 14:10",
      voicemailLength: "0m40s",
      transcript: "¿Pueden confirmarme la dirección de la clínica? Gracias.",
    },
    "mateo-fernandez-02": {
      status: "pending",
      transcription: "processing",
      callback: "pending",
      received: "Yesterday 11:05",
      voicemailLength: "1m05s",
    },
    "gonzalo-ramos-02": {
      status: "resolved",
      transcription: "ready",
      callback: "done",
      received: "Mon 15:40",
      voicemailLength: "2m20s",
      transcript:
        "He revisado el informe trimestral. Me gustaría comentarlo esta semana.",
    },
    "raul-menendez-02": {
      status: "resolved",
      transcription: "ready",
      callback: "none",
      received: "Mon 10:15",
      voicemailLength: "0m30s",
      transcript: "Solo para confirmar que he recibido la documentación.",
    },
    "carmen-vidal-02": {
      status: "pending",
      transcription: "ready",
      callback: "pending",
      received: "Fri 18:20",
      voicemailLength: "1m15s",
      transcript:
        "Tengo dudas sobre la medicación después de la intervención. Por favor llámenme.",
    },
    "patricia-ortiz-02": {
      status: "resolved",
      transcription: "ready",
      callback: "done",
      received: "Fri 12:00",
      voicemailLength: "0m58s",
      transcript: "Necesito una copia de la factura de agosto, gracias.",
    },
  },
};
