import Image from "next/image";

interface LogoProps {
  className?: string;
  /** Rendered height in px — width follows the logo's natural aspect ratio. */
  height?: number;
}

const LOGO_ASPECT_RATIO = 1835 / 293;

// The wordmark image already bakes in the gray/orange color split and the
// green dot — no separate styling or dot element needed at call sites.
export function Logo({ className = "", height = 28 }: LogoProps) {
  return (
    <Image
      src="/images/brand/weeggo-wordmark.svg"
      alt="WEEGGO"
      width={Math.round(height * LOGO_ASPECT_RATIO)}
      height={height}
      className={className}
      priority
    />
  );
}
