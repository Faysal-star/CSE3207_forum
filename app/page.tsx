import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import React from "react";
import BorderMagicButton from "@/components/ui/border-magic-button";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { SquareSigma } from "lucide-react";

export default function Home() {
  return (
    <div className="h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-cyan-200/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col justify-center items-center gap-10">
        <TextGenerateEffect
          duration={2}
          filter={true}
          words={`KUET CSE 3207 Forum`}
        />

        <Link href="/posts" passHref>
            <BorderMagicButton 
          title="Visit The Forum" 
          icon={<SquareSigma />}
          />
        </Link>

        <Link href="https://forms.gle/QPUzVnJH6Mxt8fpC8" target="_blank">
          <BorderMagicButton
            title="Submit Your Assignment"
            icon={<BookOpenCheck />}
          />
        </Link>
      </div>
    </div>
  );
}
