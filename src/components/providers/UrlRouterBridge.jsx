"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { setUrlRouter } from "@/lib/url/urlState";

/**
 * Hands the app router to the URL-state service, so store actions can make a
 * `shallow: false` write (one that re-runs server components) without every
 * store needing a hook. Mounted exactly once, in the root layout.
 */
export default function UrlRouterBridge() {
  const router = useRouter();

  useEffect(() => {
    setUrlRouter(router);
    return () => setUrlRouter(null);
  }, [router]);

  return null;
}
