/* eslint-disable react/no-unescaped-entities */

import { TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import styles from "./home.module.css";
import { cn } from "@/lib/utils";

interface HeroNoticeProps
  extends Pick<
    React.HTMLAttributes<HTMLDivElement>,
    "className" | "children"
  > {}

const HeroNotice = ({ className, children }: HeroNoticeProps) => {
  return (
    <div
      className={cn(
        "absolute bg-opacity-80 bg-white rounded-full py-2 px-6 left-1/2 -translate-x-1/2 text-primary-700 font-medium text-xl flex gap-1 items-center whitespace-nowrap",
        styles.heroNotice,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Progress />
      <main className="flex flex-col md:flex-row gap-14 md:gap-8 md:items-center container pb-4">
        <div className="text-center md:text-left md:flex-1">
          <h1 className="text-4xl font-bold md:font-medium mb-6">
            Paie moins de cotisations et d'impôt en optimisant ta{" "}
            <strong className="bg-gradient-to-t from-primary-700 to-primary-500 bg-clip-text text-transparent">
              rémunération
            </strong>
          </h1>
          <p className="text-text-300 mb-12">
            Contrairement à une micro-entreprise une société permet d'ajuster ta
            rémunération et conduire à une économie de cotisations et d'impôts.
          </p>
          <Button className="w-full md:w-auto" asChild>
            <Link href="/simulateur">Lance le simulateur</Link>
          </Button>
        </div>
        <div
          className={cn("relative m-auto px-12 md:max-w-[40%]", styles.hero)}
        >
          <HeroNotice className="top-[10%] left-[66%] -z-10">EURL ?</HeroNotice>
          <HeroNotice className="top-[25%] left-[25%]">SASU ?</HeroNotice>
          <HeroNotice className="top-[42%] left-[58%]">
            <span className="p-1 bg-negative-50 text-negative-500 rounded-full inline-flex">
              <TrendingDown size={16} />
            </span>
            <span>
              -6000€/an{" "}
              <span className="text-sm text-text-300 font-normal">en SASU</span>
            </span>
          </HeroNotice>
          <HeroNotice className="top-[60%] left-[30%]">EI ?</HeroNotice>
          <HeroNotice className="top-[80%] left-[64%]">
            <span className="p-1 bg-positive-50 text-positive-500 rounded-full inline-flex">
              <TrendingUp size={16} />
            </span>
            <span>
              +3000€/an{" "}
              <span className="text-sm text-text-300 font-normal">en EURL</span>
            </span>
          </HeroNotice>
          <img src="/hero.png" alt="" className="max-w-[400px] w-full" />
        </div>
      </main>
    </>
  );
}
