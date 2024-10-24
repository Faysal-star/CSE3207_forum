"use client";

import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";

const BorderMagicButton = ({
  title,
  icon,
  otherClasses,
}: {
  title: string;
  icon?: React.ReactNode;
  otherClasses?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
  };
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none w-full xsm:w-80 "
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00ffff_0%,#07f783_50%,#00ffff_100%)]" />
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 font-sans text-white backdrop-blur-3xl ${otherClasses}`}
      >
        <span>{title}</span>
        {isLoading ? (
          <LoaderCircle className="ml-auto h-5 w-5 animate-spin" />
        ) : (
          icon && <span className="ml-auto">{icon}</span>
        )}
      </span>
    </button>
  );
};

export default BorderMagicButton;
