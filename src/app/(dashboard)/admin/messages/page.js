import { connection } from "next/server";

import MessagesInbox from "@/components/messages/MessagesInbox";

export const metadata = {
  title: "Messages · Calliana",
  description:
    "Unified multi-channel communications across SMS, voicemails and internal dispatch.",
};

/**
 * Client Messages & Inbox — Figma 167:51527. The shell (sidebar, top bar and
 * its "Client Messages & Inbox" heading) lives in the layout.
 *
 * The inbox's state lives in its URL, so it renders per request: a shared
 * link (`?filter=unread&conversation=marta-sanchez`) arrives already
 * filtered and with that conversation open.
 */
export default async function MessagesPage() {
  await connection();
  return <MessagesInbox />;
}
