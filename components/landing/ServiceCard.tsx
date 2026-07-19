"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServiceCard({
  id,
  title,
  description,
  icon,
}: ServiceCardProps) {
  return (
    <Card
      id={`service-card-${id}`}
      className="
        group
        relative
        h-full
        overflow-hidden
        rounded-md
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-md
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#d7c3a0]/70
        hover:bg-white/[0.05]
      "
    >
      {/* Gold Accent */}

      <div
        className="
          absolute
          left-0
          top-0
          h-full
          w-[3px]
          origin-top
          scale-y-0
          bg-[#d7c3a0]
          transition-transform
          duration-500
          group-hover:scale-y-100
        "
      />

          <CardContent className="flex h-full flex-col p-2">
              
              <div className="flex w-full flex-row items-start gap-5">
                {/* Icon */}
                    <div
                    className="           
                        flex
                        h-16
                        w-16
                        p-5
                        items-center
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

                    {/* Title */}
                    <h3 className="mt-3 font-serif text-xl leading-tight text-white">
                    {title}
                    </h3>
                  
                  </div>



        {/* Description */}

        <p className="mt-6 p-4 flex-1 text-base leading-8 text-white/70">
          {description}
        </p>

        {/* Footer */}

        <div
          className="
            mt-10
            flex
            items-center
            justify-between
            border-t
            border-white/10
            pt-6
          "
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#d7c3a0]">
            Experiencia Premium
          </span>

          <ArrowUpRight
            className="
              h-5
              w-5
              text-white/50
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
              group-hover:text-[#d7c3a0]
            "
          />
        </div>

      </CardContent>
    </Card>
  );
}