"use client";

import { ArrowUpRight } from "lucide-react";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function InternationalFeatureCard({
  icon,
  title,
  description,
}: Props) {
  return (
    <div
          className="
      min-w-[300px]
      rounded-md
      group
      relative
      overflow-hidden
      border
      border-white/10
      bg-white/[0.04]
      p-2
      backdrop-blur-md
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-[#d7c3a0]/70
      hover:bg-white/[0.08]
      "
    >
      {/* Gold line */}

      <div className="absolute left-0 top-0 h-1 w-full bg-[#d7c3a0] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          <div className="flex w-full flex-row items-start gap-5">
                <div className="flex h-14 w-14 p-4 items-center
                    justify-center
                    rounded-full
                    border
                    border-[#d7c3a0]/40
                    bg-[#d7c3a0]/10
                    text-[#d7c3a0]
                    transition-all
                    duration-500
                    group-hover:bg-[#d7c3a0]
                    group-hover:text-black
                    "
                >
                {icon}
            </div>

            <h3 className="mt-4 font-serif text-xl">
                {title}
            </h3>
              
              </div>


      <p className="mt-5 pl-3 leading-7 text-white/70">
        {description}
      </p>

      <div className="mt-8 flex justify-end">

        <ArrowUpRight
          className="
          h-5
          w-5
          text-white/40
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:-translate-y-1
          group-hover:text-[#d7c3a0]
          "
        />

      </div>
    </div>
  );
}