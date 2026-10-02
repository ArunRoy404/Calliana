import { connection } from "next/server";

import AppointmentsCalendar from "@/components/appointments/AppointmentsCalendar";

export const metadata = {
  title: "Appointments · Calliana",
  description: "Book, review and reschedule client appointments.",
};

/**
 * Appointments & Calendar. The shell lives in the layout.
 *
 * The page's state lives in its URL, so it renders per request: a shared link
 * (`?view=week&date=2026-08-13&appointment=…`) arrives on that week with the
 * event's details open.
 */
export default async function AppointmentsPage() {
  await connection();
  return <AppointmentsCalendar />;
}
