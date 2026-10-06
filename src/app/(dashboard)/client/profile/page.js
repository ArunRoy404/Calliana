import BusinessProfileView from "@/components/client/profile/BusinessProfileView";

export const metadata = {
  title: "Business Profile · Calliana",
  description:
    "Your business information, working hours and instructions for agents.",
};

/** The client portal's Business Profile. The shell lives in the layout. */
export default function BusinessProfilePage() {
  return <BusinessProfileView />;
}
