import { redirect } from "next/navigation";

// Sign-in is the only screen built so far, so the root sends you there.
export default function Home() {
  redirect("/sign-in");
}
