import { connection } from "next/server";

import AgentVoicemailView from "@/components/agent/voicemail/AgentVoicemailView";

export const metadata = {
  title: "Voicemail · Calliana",
  description: "Review voicemails, their transcriptions and callbacks.",
};

/**
 * The agent workspace's Voicemail. The shell lives in the layout. The
 * list's state lives in its URL, so it renders per request: a shared link
 * (`?status=pending&call=isabel-gomez-01`) arrives filtered, with that
 * voicemail's details open.
 */
export default async function AgentVoicemailPage() {
  await connection();
  return <AgentVoicemailView />;
}
