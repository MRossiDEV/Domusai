import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  centered = false,
}: Props) {
  return (
    <div
      className={cn(
        "mb-16",
        centered && "mx-auto max-w-3xl text-center"
      )}
    >
      {eyebrow && (
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
          {eyebrow}
        </p>
      )}

      <h2 className="font-serif text-5xl leading-tight text-white lg:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-8 text-lg leading-8 text-neutral-500">
          {description}
        </p>
      )}
    </div>
  );
}