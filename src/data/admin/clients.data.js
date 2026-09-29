/**
 * Clients directory — Figma 198:21625.
 *
 * Same shape as the agents list (`agents.data.js`): `columns` say what each
 * column shows and how, `rows` carry only values, and `card` rearranges the
 * same columns for narrow screens. `TableDirectory` renders it all.
 *
 * `category` and `statusKey` on a row are the fields the two filters match
 * against; `specialty` is the finer label shown under the name.
 */
const CLOCK_ICON = { src: "/icons/clock.svg", width: 16, height: 16 };

/** Where "View Account" goes; the store fills `{id}` per row. */
export const CLIENT_DETAIL_HREF = "/admin/clients/{id}";

const CLIENT = {
  id: "client",
  label: "CLIENT / COMPANY",
  type: "stack",
  primary: "name",
  secondary: "specialty",
};
const CONTACT = {
  id: "contact",
  label: "PRIMARY CONTACT",
  type: "text",
  field: "contact",
};
const PHONE = {
  id: "phone",
  label: "PHONE",
  type: "text",
  field: "phone",
  align: "center",
};
// Figma spells these "LAST INTERECTION" and "UPCOMING APPOINMENTS".
const LAST_INTERACTION = {
  id: "lastInteraction",
  label: "LAST INTERACTION",
  type: "icon-text",
  field: "lastInteraction",
  icon: CLOCK_ICON,
};
const UPCOMING = {
  id: "nextAppointment",
  label: "UPCOMING APPOINTMENTS",
  type: "icon-text",
  field: "nextAppointment",
  icon: CLOCK_ICON,
};
const OPEN_TASKS = {
  id: "openTasks",
  label: "OPEN TASKS",
  type: "count",
  field: "openTasks",
  align: "center",
};
const STATUS = {
  id: "status",
  label: "STATUS",
  type: "badge",
  field: "status",
  showDot: false,
  align: "center",
};
const ACTION = {
  id: "action",
  label: "Action",
  type: "action",
  align: "center",
  actions: [
    { id: "view", label: "View Account", hrefField: "href" },
    {
      id: "call",
      label: "Call client",
      iconOnly: true,
      variant: "info",
      icon: { src: "/icons/client/call-primary.svg", width: 16, height: 16 },
      props: {
        notFunctional: true,
        notFunctionalMessage: "Calling isn’t wired up yet",
        notFunctionalDescription:
          "Click-to-call will work once Zoiper is connected.",
      },
    },
  ],
};

const STATUSES = {
  active: { label: "Active", tone: "success" },
  attention: { label: "Need Attention", tone: "warning" },
  inactive: { label: "Inactive", tone: "neutral" },
};

/** A client's statuses as select options — the status filter and the add form share them. */
export const CLIENT_STATUS_OPTIONS = Object.entries(STATUSES).map(
  ([value, status]) => ({ value, label: status?.label }),
);

/** The business types a client can have — the category filter and the add form share them. */
export const CLIENT_CATEGORIES = [
  { value: "medical", label: "Medical & Healthcare" },
  { value: "dental", label: "Dental" },
  { value: "finance", label: "Financial Services" },
  { value: "legal", label: "Legal Services" },
  { value: "real-estate", label: "Real Estate" },
  { value: "wellness", label: "Beauty & Wellness" },
];

export const clientsData = {
  texture: "/admin/table/table-texture.png",

  search: {
    label: "Search clients",
    placeholder: "Search...",
  },

  filters: [
    {
      param: "category",
      field: "category",
      label: "Filter by category",
      allValue: "all",
      options: [{ value: "all", label: "All Categories" }, ...CLIENT_CATEGORIES],
    },
    {
      param: "status",
      field: "statusKey",
      label: "Filter by status",
      allValue: "all",
      options: [
        { value: "all", label: "All Statuses" },
        ...CLIENT_STATUS_OPTIONS,
      ],
    },
  ],

  addAction: {
    label: "ADD CLIENT ACCOUNT",
    icon: { src: "/icons/client/add-dark.svg", width: 16, height: 16 },
  },

  emptyLabel: "No clients match your search or filters.",

  /** The table can scroll sideways below this width rather than crush eight columns. */
  tableClassName: "min-w-[1180px]",

  columns: [
    CLIENT,
    CONTACT,
    PHONE,
    LAST_INTERACTION,
    UPCOMING,
    OPEN_TASKS,
    STATUS,
    ACTION,
  ],

  card: {
    title: CLIENT,
    status: STATUS,
    subtitle: CONTACT,
    fields: [PHONE, OPEN_TASKS, LAST_INTERACTION, UPCOMING],
    action: ACTION,
  },

  rows: [
    {
      id: "laura-alegre-clinic",
      name: "Laura Alegre Clinic",
      specialty: "Medical & Dermatology",
      category: "medical",
      contact: "Dr. Laura Alegre",
      phone: "+34 934 112 900",
      email: "contact@lauraalegreclinic.com",
      address: "Passeig de Gràcia 48, Barcelona",
      lastInteraction: "10 Min Ago",
      nextAppointment: "Today, 10:30 AM",
      openTasks: "03",
      statusKey: "active",
      status: STATUSES.active,
    },
    {
      id: "martinez-dental-care",
      name: "Martinez Dental Care",
      specialty: "Dental Practice",
      category: "dental",
      contact: "Dr. Sergio Martinez",
      phone: "+34 913 445 220",
      email: "hola@martinezdental.es",
      address: "Calle de Serrano 61, Madrid",
      lastInteraction: "25 min ago",
      nextAppointment: "Today, 12:00 PM",
      openTasks: "02",
      statusKey: "active",
      status: STATUSES.active,
    },
    {
      id: "vanguard-wealth-partners",
      name: "Vanguard Wealth Partners",
      specialty: "Financial Advisory",
      category: "finance",
      contact: "Alejandro Cruz",
      phone: "+34 918 776 331",
      email: "office@vanguardwealth.es",
      address: "Paseo de la Castellana 95, Madrid",
      lastInteraction: "1 hour ago",
      nextAppointment: "Tomorrow, 03:00 PM",
      openTasks: "04",
      statusKey: "attention",
      status: STATUSES.attention,
    },
    {
      id: "catalunya-tech-legal",
      name: "Catalunya Tech Legal",
      specialty: "Legal Consultancy",
      category: "legal",
      contact: "Nuria Puig",
      phone: "+34 932 998 100",
      email: "info@catalunyatechlegal.com",
      address: "Avinguda Diagonal 640, Barcelona",
      lastInteraction: "3 hours ago",
      nextAppointment: "Friday, 11:00 AM",
      openTasks: "01",
      statusKey: "active",
      status: STATUSES.active,
    },
    {
      id: "clinica-bienestar",
      name: "Clínica Bienestar",
      specialty: "Physiotherapy",
      category: "medical",
      contact: "Dr. Irene Soto",
      phone: "+34 963 551 204",
      email: "citas@clinicabienestar.es",
      address: "Carrer de Colón 12, Valencia",
      lastInteraction: "5 hours ago",
      nextAppointment: "Monday, 09:30 AM",
      openTasks: "02",
      statusKey: "active",
      status: STATUSES.active,
    },
    {
      id: "centro-medico-sur",
      name: "Centro Médico Sur",
      specialty: "General Practice",
      category: "medical",
      contact: "Dr. Pablo Herrera",
      phone: "+34 954 220 718",
      email: "recepcion@centromedicosur.es",
      address: "Avenida de la Constitución 8, Sevilla",
      lastInteraction: "Yesterday",
      nextAppointment: "Tomorrow, 10:00 AM",
      openTasks: "05",
      statusKey: "attention",
      status: STATUSES.attention,
    },
    {
      id: "sonrisa-dental-studio",
      name: "Sonrisa Dental Studio",
      specialty: "Orthodontics",
      category: "dental",
      contact: "Dr. Lucía Ramos",
      phone: "+34 944 318 552",
      email: "hola@sonrisastudio.es",
      address: "Gran Vía 22, Bilbao",
      lastInteraction: "Yesterday",
      nextAppointment: "Thursday, 04:30 PM",
      openTasks: "00",
      statusKey: "active",
      status: STATUSES.active,
    },
    {
      id: "iberia-property-group",
      name: "Iberia Property Group",
      specialty: "Residential Sales",
      category: "real-estate",
      contact: "Marcos Vidal",
      phone: "+34 915 774 090",
      email: "ventas@iberiaproperty.es",
      address: "Calle de Alcalá 150, Madrid",
      lastInteraction: "2 days ago",
      nextAppointment: "Next week",
      openTasks: "02",
      statusKey: "inactive",
      status: STATUSES.inactive,
    },
    {
      id: "fisio-activa",
      name: "Fisio Activa",
      specialty: "Sports Rehabilitation",
      category: "wellness",
      contact: "Manuel Díaz",
      phone: "+34 952 660 431",
      email: "info@fisioactiva.es",
      address: "Calle Larios 5, Málaga",
      lastInteraction: "2 days ago",
      nextAppointment: "Wednesday, 06:00 PM",
      openTasks: "01",
      statusKey: "active",
      status: STATUSES.active,
    },
    {
      id: "dental-care-center",
      name: "Dental Care Center",
      specialty: "Family Dentistry",
      category: "dental",
      contact: "Dr. Ana Fuentes",
      phone: "+34 976 443 018",
      email: "citas@dentalcarecenter.es",
      address: "Paseo Independencia 30, Zaragoza",
      lastInteraction: "3 days ago",
      nextAppointment: "Friday, 09:00 AM",
      openTasks: "03",
      statusKey: "attention",
      status: STATUSES.attention,
    },
    {
      id: "mediterraneo-asesores",
      name: "Mediterráneo Asesores",
      specialty: "Tax & Accounting",
      category: "finance",
      contact: "Jorge Pérez",
      phone: "+34 965 210 887",
      email: "contacto@mediterraneoasesores.es",
      address: "Rambla Méndez Núñez 18, Alicante",
      lastInteraction: "4 days ago",
      nextAppointment: "No upcoming",
      openTasks: "00",
      statusKey: "inactive",
      status: STATUSES.inactive,
    },
    {
      id: "bufete-navarro",
      name: "Bufete Navarro",
      specialty: "Family Law",
      category: "legal",
      contact: "Patricia Leal",
      phone: "+34 948 332 614",
      email: "despacho@bufetenavarro.es",
      address: "Avenida de Carlos III 4, Pamplona",
      lastInteraction: "1 week ago",
      nextAppointment: "Monday, 12:30 PM",
      openTasks: "01",
      statusKey: "active",
      status: STATUSES.active,
    },
  ],

  pagination: {
    summary: "{total} clients · Page {page} of {pages}",
    previousLabel: "Prev",
    nextLabel: "Next",
  },
};
