import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { description, title } from "@/constants/metadata";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body
        className={cn(
          "bg-background font-sans antialiased flex flex-col w-full overflow-x-hidden text-text-500 relative min-h-full",
          fontSans.variable,
        )}
      >
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
