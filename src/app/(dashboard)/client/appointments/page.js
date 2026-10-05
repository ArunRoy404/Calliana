import { connection } from "next/server";

import AppointmentsCalendar from "@/components/appointments/AppointmentsCalendar";

export const metadata = {
  title: "Appointments · Calliana",
  description:
    "Your callbacks, doctor consultations and client meetings, booked by your secretary.",
};

/**
 * The client portal's Appointments & Calendar — the same calendar the admin
 * works in (Today, This Week and This Month, the event-type filter, each
 * booking's details drawer and "Schedule New Appointment"). One component for
 * both portals (rule 0); the shell lives in the layout.
 *
 * The calendar's state lives in its URL, so it renders per request: a shared
 * link (`?view=week&appointment=<id>`) arrives on that view with that booking
 * open — the client home's "Open" buttons rely on it.
 */
export default async function ClientAppointmentsPage() {
  await connection();
  return <AppointmentsCalendar />;
}
