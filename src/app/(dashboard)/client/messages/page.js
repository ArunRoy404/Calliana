import { connection } from "next/server";

import MessagesInbox from "@/components/messages/MessagesInbox";

export const metadata = {
  title: "Messages · Calliana",
  description:
    "Your conversations with callers across SMS, voicemail and internal dispatch.",
};

/**
 * The client portal's Messages — the same inbox the admin works in (Figma
 * 167:51527): the conversation list, the open thread and the client's info.
 * One component for both portals (rule 0); the shell (client sidebar and top
 * bar) lives in the layout.
 *
 * The inbox's state lives in its URL, so it renders per request: a shared
 * link (`/client/messages?conversation=laura-alegre`) arrives with that
 * conversation open.
 */
export default async function ClientMessagesPage() {
  await connection();
  return <MessagesInbox />;
}
