import { connection } from "next/server";

import ClientRequestsDirectory from "@/components/client/requests/ClientRequestsDirectory";

export const metadata = {
  title: "Service Requests · Calliana",
  description:
    "Submit calendar updates, VIP routing exceptions or special handling rules to your secretary team.",
};

/**
 * The client portal's Service Requests & Instructions. The shell lives in
 * the layout. The list's state lives in its URL, so it renders per request:
 * a shared link (`?status=completed&panel=add`) arrives filtered, with the
 * new-request drawer open.
 */
export default async function ClientRequestsPage() {
  await connection();
  return <ClientRequestsDirectory />;
}
