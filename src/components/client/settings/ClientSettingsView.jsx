"use client";

import SettingsView from "@/components/settings/SettingsView";
import { useClientSettingsStore } from "@/store/client/useClientSettingsStore";

/**
 * The client portal's Settings — the shared `SettingsView` over the
 * client's settings store. A server page cannot hand a store hook to a
 * client component, so this one line is its own client file.
 */
export default function ClientSettingsView() {
  return <SettingsView useStore={useClientSettingsStore} />;
}
