import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-28 lg:py-36", className)}
    >
      {children}
    </section>
  );
}