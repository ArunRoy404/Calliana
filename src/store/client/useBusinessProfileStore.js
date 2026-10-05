import { businessProfileData } from "@/data/client/business-profile.data";
import { createProfileStore } from "@/store/profile/createProfileStore";

/**
 * The client portal's Business Profile — the shared profile store over the
 * clinic's data, with each working day's switch.
 */
export const useBusinessProfileStore = createProfileStore(businessProfileData);
