import { connection } from "next/server";

import RoutingDirectory from "@/app/(dashboard)/admin/routing/_components/RoutingDirectory";

export const metadata = {
  title: "Call Routing · Calliana",
  description: "Configure PBX routing queues and fallback rules.",
};

/**
 * Call Routing / Queues — Figma 381:38131. The shell lives in the layout.
 *
 * The page's state lives in its URL, so a shared link (`?queue=<id>`) opens
 * straight to that queue's routing rules.
 */
export default async function RoutingPage() {
  await connection();
  return <RoutingDirectory />;
}
