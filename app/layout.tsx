import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { Footer } from "@/components/footer";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "IndeWIZ - Trouve enfin le statut qui convient le mieux à ton business",
  description:
    "En se basant sur ta situation et tes objectifs, IndeWIZ t'indiquera si faire évoluer le statut juridique de ta micro-entreprise te permettra de gagner de l'argent en réduisant tes cotisations et tes impôts.",
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
      <body className={cn(dmSans.className, "text-text bg-background")}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
