import { connection } from "next/server";

import CallsDirectory from "@/components/calls/CallsDirectory";

export const metadata = {
  title: "Calls · Calliana",
  description: "Review call history, recordings and follow-ups.",
};

/**
 * Calls — Figma 202:38783. The shell lives in the layout.
 *
 * The page's state lives in its URL, so it renders per request: a shared link
 * (`?status=missed&client=laura-alegre-clinic&call=…`) arrives already
 * filtered and with the details panel open.
 */
export default async function CallsPage() {
  await connection();
  return <CallsDirectory />;
}
