import AgentsIcon from "@/components/icons/AgentsIcon";
import AppointmentsIcon from "@/components/icons/AppointmentsIcon";
import AuditIcon from "@/components/icons/AuditIcon";
import BillingIcon from "@/components/icons/BillingIcon";
import CallsIcon from "@/components/icons/CallsIcon";
import ClientsIcon from "@/components/icons/ClientsIcon";
import DashboardIcon from "@/components/icons/DashboardIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";
import MessagesIcon from "@/components/icons/MessagesIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import ReportsIcon from "@/components/icons/ReportsIcon";
import RolesIcon from "@/components/icons/RolesIcon";
import RoutingIcon from "@/components/icons/RoutingIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import TasksIcon from "@/components/icons/TasksIcon";
import VoicemailIcon from "@/components/icons/VoicemailIcon";

/**
 * The sidebar's icon registry — Figma 202:41243. `NAV_ITEMS` (a data file, so
 * it holds string literals, not components — rule 1) names an icon by this
 * key; `SidebarNavItem` looks it up here. One entry per icon component in
 * this folder, so a new nav row is a data entry plus, at most, one new icon
 * file — never a raw `<svg>` at a call site.
 *
 * Shared by every role dashboard: the admin, agent and client sidebars all
 * resolve icons through this same map.
 */
export const SIDEBAR_ICONS = {
  dashboard: DashboardIcon,
  agents: AgentsIcon,
  billing: BillingIcon,
  clients: ClientsIcon,
  calls: CallsIcon,
  voicemail: VoicemailIcon,
  messages: MessagesIcon,
  appointments: AppointmentsIcon,
  tasks: TasksIcon,
  roles: RolesIcon,
  routing: RoutingIcon,
  reports: ReportsIcon,
  audit: AuditIcon,
  settings: SettingsIcon,
  profile: ProfileIcon,
  logout: LogoutIcon,
};
