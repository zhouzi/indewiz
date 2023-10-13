/* eslint-disable react/no-unescaped-entities */

import { Button } from "@/components/ui/button";
import Link from "next/link";

import styles from "./home.module.css";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row max-w-7xl m-auto py-6 px-4">
      <div className="flex-1 flex flex-col justify-center md:pr-8">
        <div className="max-w-2xl">
          <h1 className="font-medium text-4xl mb-4">
            Paie moins d'impôts et de cotisations en optimisant ta{" "}
            <strong className="bg-gradient-to-t from-primary-dark to-primary bg-clip-text text-transparent">
              rémunération
            </strong>
          </h1>
          <p className="text-secondary mb-8 md:mb-12 text-xl">
            Contrairement à une micro-entreprise, une société permet d'optimiser
            ta rémunération et conduire à une économie de cotisations et
            d'impôts.
          </p>
          <Button asChild>
            <Link href="/simulateur">Lance le simulateur</Link>
          </Button>
        </div>
      </div>
      <div
        className="relative self-center mt-8 md:mt-0"
        style={{ maxWidth: "70%" }}
      >
        <span
          className={cn(styles.floatingLabel, "px-6 py-1 text-xl font-medium")}
          style={{
            top: "80%",
            left: 0,
            transform: "translateX(-20%)",
          }}
        >
          EI
        </span>
        <span
          className={cn(styles.floatingLabel, "px-6 py-1 text-xl font-medium")}
          style={{
            top: "40%",
            right: 0,
            transform: "translateX(60%)",
          }}
        >
          EURL
        </span>
        <span
          className={cn(styles.floatingLabel, "px-6 py-1 text-xl font-medium")}
          style={{
            top: "20%",
            left: 0,
            transform: "translateX(-40%)",
          }}
        >
          SASU
        </span>
        <img src="/home-picture.png" alt="" width={369} height="auto" />
      </div>
    </main>
  );
}
