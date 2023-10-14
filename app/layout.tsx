import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import Head from "next/head";

const dmSans = DM_Sans({ subsets: ["latin"] });

const title = "IndeWIZ - Simulateurs pour indépendants";
const description =
  "IndeWIZ est une collection de simulateurs qui mettent en lumière les avantages et inconvénients des différents statuts juridiques. Plus qu'un comparatif, ils permettent une étude des différentes stratégies répondants à une variété de besoins.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
} satisfies Metadata;

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
      <body className={cn(dmSans.className, "text-text")}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
