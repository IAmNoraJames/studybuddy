import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "../components/ui/sonner"; // ← RELATIVE import (no @/)

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
