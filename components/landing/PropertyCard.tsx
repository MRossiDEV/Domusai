"use client";

import Image from "next/image";

type Props = {
  image: string;
  city: string;
  title: string;
  price: string;
  specs: string;
  featured?: boolean;
};

export default function PropertyCard({
  image,
  city,
  title,
  price,
  specs,
  featured = false,
}: Props) {
  return (
    <article
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        ${
          featured
            ? "h-[720px]"
            : "h-[350px]"
        }
      `}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes={featured ? "(max-width: 1024px) 100vw, 720px" : "(max-width: 1024px) 100vw, 350px"}
        className="
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">

        <span className="text-sm uppercase tracking-[0.3em] text-[#d7c3a0]">
          {city}
        </span>

        <h3 className="mt-4 font-serif text-4xl leading-tight">
          {title}
        </h3>

        <p className="mt-4 text-lg text-white/80">
          {specs}
        </p>

        <div className="mt-8 flex items-center justify-between">

          <span className="text-xl font-semibold">
            {price}
          </span>

          <button
            className="
              rounded-full
              border
              border-white/30
              px-6
              py-3
              text-xs
              uppercase
              tracking-[0.25em]
              transition
              hover:bg-white
              hover:text-black
            "
          >
            Ver Más
          </button>

        </div>

      </div>
    </article>
  );
}