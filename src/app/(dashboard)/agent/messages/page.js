import { connection } from "next/server";

import MessagesInbox from "@/components/messages/MessagesInbox";

export const metadata = {
  title: "Messages · Calliana",
  description:
    "Your conversations with clients across SMS, voicemail and internal dispatch.",
};

/**
 * The agent workspace's Messages — the same inbox the admin and the client
 * portal work in (Figma 167:51527): the conversation list, the open thread
 * and the client's info. One component for every portal (rule 0).
 *
 * The inbox's state lives in its URL, so it renders per request: a shared
 * link (`/agent/messages?conversation=laura-alegre`) arrives with that
 * conversation open.
 */
export default async function AgentMessagesPage() {
  await connection();
  return <MessagesInbox />;
}
