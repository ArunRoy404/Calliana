import { connection } from "next/server";

import AppointmentsCalendar from "@/components/appointments/AppointmentsCalendar";

export const metadata = {
  title: "Appointments · Calliana",
  description:
    "Coordinate callbacks, doctor consultations and client meetings with live CTI synchronization.",
};

/**
 * Appointments & Calendar. The shell (sidebar, top bar and its heading)
 * lives in the layout.
 *
 * The calendar's state lives in its URL, so it renders per request: a shared
 * link (`?view=week&type=clinical&date=2026-08-13`) arrives already on that
 * range, filter and day.
 */
export default async function AppointmentsPage() {
  await connection();
  return <AppointmentsCalendar />;
}
