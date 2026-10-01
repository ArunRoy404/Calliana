import { connection } from "next/server";

import ProfileView from "@/components/profile/ProfileView";

export const metadata = {
  title: "Profile · Calliana",
  description: "Your personal information and working hours.",
};

/** Profile — Figma 167:52857. The shell lives in the layout. */
export default async function ProfilePage() {
  await connection();
  return <ProfileView />;
}
