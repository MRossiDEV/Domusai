"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Props = {
  image: string;
  city: string;
  title: string;
  description: string;
  specs: string;
  badge: string;
  tags: string[];
  featured?: boolean;
};

export default function PropertyCard({
  image,
  city,
  title,
  description,
  specs,
  badge,
  tags,
  featured = false,
}: Props) {
  return (
    <article
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-neutral-950
        ${
          featured
            ? "h-[720px]"
            : "h-[620px] w-full"
        }
      `}
    >
      <Image
        src={image}
        alt={title}
        fill
        quality={90}
        sizes={
          featured
            ? "(max-width:1024px)100vw,1200px"
            : "(max-width:1024px)100vw,420px"
        }
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

      {/* Content */}

      <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">

        {/* Badge */}

        <div className="mb-6 inline-flex rounded-full border border-[#d7c3a0]/40 bg-[#d7c3a0]/10 px-4 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d7c3a0]">
            {badge}
          </span>
        </div>

        {/* City */}

        <p className="text-xs uppercase tracking-[0.35em] text-white/60">
          {city}
        </p>

        {/* Title */}

        <h3 className="mt-3 font-serif text-3xl leading-tight text-white lg:text-4xl">
          {title}
        </h3>

        {/* Description */}

        <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
          {description}
        </p>

        {/* Divider */}

        <div className="my-6 h-px w-full bg-white/10" />

        {/* Specs */}

        <p className="text-sm uppercase tracking-[0.15em] text-white/60">
          {specs}
        </p>

        {/* Tags */}

        <div className="mt-6 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#d7c3a0]/30 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.12em] text-[#d7c3a0] backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}

        <button
          className="
            mt-8
            inline-flex
            items-center
            gap-3
            text-sm
            font-medium
            uppercase
            tracking-[0.2em]
            text-white
            transition-colors
            hover:text-[#d7c3a0]
          "
        >
          Descubrir propiedad

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

      </div>
    </article>
  );
}