/* eslint-disable react/no-unescaped-entities */

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";

import styles from "./home.module.css";
import { cn } from "@/lib/utils";
import { Stepper } from "@/components/ui/stepper";

export default function Home() {
  return (
    <>
      <Stepper progress={[false]} />
      <main className="flex flex-col md:flex-row max-w-7xl m-auto py-28 px-4">
        <div className="flex flex-col justify-center md:pr-8 w-2/3">
          <div className="max-w-2xl">
            <h1 className="font-medium text-4xl mb-4">
              Paie moins d'impôts et de cotisations en optimisant ta{" "}
              <strong className="bg-gradient-to-t from-primary-dark to-primary bg-clip-text text-transparent">
                rémunération
              </strong>
            </h1>
            <p className="text-secondary mb-8 md:mb-12">
              Contrairement à une micro-entreprise, une société permet
              d'optimiser ta rémunération qui peut conduire à une économie de
              cotisations et d'impôts.
            </p>
            <Button asChild>
              <Link href="/simulateur">Lance la simulation</Link>
            </Button>
          </div>
        </div>
        <div
          className={cn(
            styles.heroPictureContainer,
            "relative w-1/3 flex justify-center"
          )}
          style={{ maxWidth: "70%" }}
        >
          <span
            className={cn(
              styles.floatingLabel,
              "px-6 py-1 text-xl font-medium text-primary-dark -z-10"
            )}
            style={{
              top: "8%",
              right: 0,
              transform: "translateX(26%)",
            }}
          >
            <span className="bg-negative-light text-negative-dark inline-flex p-2 rounded-full mr-1 align-middle">
              <TrendingDown size={16} />
            </span>
            -4000€/an{" "}
            <small className="text-secondary text-sm font-normal">
              en SASU
            </small>
          </span>
          <span
            className={cn(
              styles.floatingLabel,
              "px-6 py-1 text-xl font-medium text-primary-dark"
            )}
            style={{
              top: "24%",
              left: "14%",
            }}
          >
            EURL ?
          </span>
          <span
            className={cn(
              styles.floatingLabel,
              "px-6 py-1 text-xl font-medium text-primary-dark -z-10"
            )}
            style={{
              top: "40%",
              right: "10%",
            }}
          >
            EI ?
          </span>
          <span
            className={cn(
              styles.floatingLabel,
              "px-6 py-1 text-xl font-medium text-primary-dark"
            )}
            style={{
              top: "52%",
              left: 0,
            }}
          >
            SASU ?
          </span>
          <span
            className={cn(
              styles.floatingLabel,
              "px-6 py-1 text-xl font-medium text-primary-dark"
            )}
            style={{
              top: "80%",
              left: 0,
              transform: "translateX(-30%)",
            }}
          >
            <span className="bg-positive-light text-positive-dark inline-flex p-2 rounded-full mr-1 align-middle">
              <TrendingUp size={16} />
            </span>
            +3000€/an{" "}
            <small className="text-secondary text-sm font-normal">
              en EURL
            </small>
          </span>
          <img src="/home-picture.png" alt="" width="100%" height="auto" />
        </div>
      </main>
    </>
  );
}
