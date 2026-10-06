import { Geist } from "next/font/google";

import ToasterProvider from "@/components/providers/ToasterProvider";
import UrlRouterBridge from "@/components/providers/UrlRouterBridge";
import { cn } from "@/lib/cn";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

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
    // The theme script sets `.dark` on <html> before React hydrates, so the
    // class legitimately differs from the server's markup.
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(geist.variable, "h-full antialiased")}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ToasterProvider />
        <UrlRouterBridge />
      </body>
    </html>
  );
}
