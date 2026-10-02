import { connection } from "next/server";

import MessagesInbox from "@/components/messages/MessagesInbox";

export const metadata = {
  title: "Messages · Calliana",
  description: "Reply to client conversations across SMS and voicemail.",
};

/**
 * Client Messages & Inbox — Figma 167:51527. The shell lives in the layout.
 *
 * The page's state lives in its URL, so it renders per request: a shared link
 * (`?filter=unread&conversation=laura-alegre`) arrives already filtered and
 * with that conversation open.
 */
export default async function MessagesPage() {
  await connection();
  return <MessagesInbox />;
}
