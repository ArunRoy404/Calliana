import { profileData } from "@/data/admin/profile.data";
import { createProfileStore } from "@/store/profile/createProfileStore";

/** The admin's Profile — the shared profile store over the admin's data. */
export const useProfileStore = createProfileStore(profileData);
