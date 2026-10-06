import { profileData } from "@/data/admin/profile.data";

/**
 * The agent workspace's Profile — built from the design screenshot (the
 * Figma node was not reachable). The same profile page as the admin's
 * (`profileData`: Sofia Martínez's personal information and working
 * hours), not a copy. What differs is the agent's look: her photo in an
 * 80px avatar with a 24px name, a primary "Edit Profile", underlined
 * "EDIT" links, sections that sit flat, and day badges in capitals.
 */
export const agentProfileData = {
  ...profileData,
  editLinkVariant: "underline",
  editProfileVariant: "primary",
  elevatedSections: false,

  user: {
    ...profileData?.user,
    /** The design's photo — the same file the client's Business Profile uses. */
    avatar: "/client/avatars/laura-alegre-clinic.png",
    avatarSize: "2xl",
    nameSize: "lg",
    metaSize: "sm",
  },

  dayStatuses: {
    on: { label: "ACTIVE", tone: "success" },
    off: { label: "INACTIVE", tone: "neutral" },
  },
};
