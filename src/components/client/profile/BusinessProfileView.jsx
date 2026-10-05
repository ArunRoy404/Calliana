"use client";

import ProfileView from "@/components/profile/ProfileView";
import { useBusinessProfileStore } from "@/store/client/useBusinessProfileStore";

/**
 * The client portal's Business Profile — the shared `ProfileView` over the
 * clinic's profile store. A server page cannot hand a store hook to a
 * client component, so this one line is its own client file.
 */
export default function BusinessProfileView() {
  return <ProfileView useStore={useBusinessProfileStore} />;
}
