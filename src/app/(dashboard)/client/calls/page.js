import { connection } from "next/server";

import ClientCallsDirectory from "@/components/client/calls/ClientCallsDirectory";

export const metadata = {
  title: "Calls & Notes · Calliana",
  description: "Review calls recorded by your Virtual Secretary team.",
};

/**
 * The client portal's Calls & Notes. The shell lives in the layout. The
 * list's state lives in its URL, so it renders per request: a shared link
 * (`?status=missed&call=<id>`) arrives filtered with that call open.
 */
export default async function ClientCallsPage() {
  await connection();
  return <ClientCallsDirectory />;
}
