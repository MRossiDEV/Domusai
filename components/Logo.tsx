interface LogoProps {
  className?: string;
  dot?: boolean;
}

// Shared wordmark: WEE + O in light gray, the "GG" in orange, set in the
// custom VanillaExtract display font. Font size is controlled entirely by
// the caller's className so the dot (sized in em) scales with it.
export function Logo({ className = "", dot = true }: LogoProps) {
  return (
    <span className={`font-weeggo-logo inline-flex items-baseline ${className}`}>
      <span style={{ color: "var(--weeggo-logo-gray)" }}>wee</span>
      <span style={{ color: "var(--weeggo-orange)" }}>gg</span>
      <span style={{ color: "var(--weeggo-logo-gray)" }}>o</span>
      {dot && (
        <span
          aria-hidden
          className="ml-[0.15em] inline-block self-center rounded-full"
          style={{ width: "0.22em", height: "0.22em", background: "var(--weeggo-green)" }}
        />
      )}
    </span>
  );
}
