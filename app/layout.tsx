import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";

import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "indéwiz",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col max-w-full overflow-x-hidden text-text-500",
          fontSans.variable,
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
