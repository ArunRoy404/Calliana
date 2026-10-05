import { connection } from "next/server";

import ClientContactsDirectory from "@/components/client/contacts/ClientContactsDirectory";

export const metadata = {
  title: "Contacts · Calliana",
  description: "Your customers and patients who contact your business.",
};

/**
 * The client portal's Contacts. The shell lives in the layout. The list's
 * state lives in its URL, so it renders per request: a shared link
 * (`?outcome=missed&contact=isabel-moreno`) arrives filtered, with that
 * contact's details open.
 */
export default async function ClientContactsPage() {
  await connection();
  return <ClientContactsDirectory />;
}
