import { Geist } from "next/font/google";

import ToasterProvider from "@/components/providers/ToasterProvider";
import { cn } from "@/lib/cn";

import "goey-toast/styles.css";
import "./globals.css";

// Geist is the only family in the Figma design system.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata = {
  title: "Calliana",
  description:
    "Manage calls, messages, appointments and client requests — all in one focused workspace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn(geist.variable, "h-full antialiased")}>
      <body className="min-h-full flex flex-col">
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
