import { create } from "zustand";

import { profileData } from "@/data/admin/profile.data";

/** The profile page's dummy content. */
export const useProfileStore = create(() => ({
  profile: profileData,
}));
