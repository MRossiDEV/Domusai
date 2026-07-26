/**
 * Ambient background for the wizard welcome screen — flowing wave ribbons +
 * a halftone dot corner, in WEEGGO's blue/orange palette (adapted from a
 * reference mood image, not a literal copy of it). Pure CSS drift
 * animation (see .weeggo-wave-* in globals.css), so it costs nothing on
 * React's render cycle.
 */
export function IntroWaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#FAFAFA]">
      <div
        className="weeggo-halftone absolute -right-10 -top-10 size-[280px] text-[var(--weeggo-blue)] opacity-[0.14]"
        style={{ maskImage: "radial-gradient(circle, black 0%, transparent 72%)" }}
      />
      <div
        className="weeggo-halftone absolute -bottom-16 -left-16 size-[260px] text-[var(--weeggo-orange)] opacity-[0.12]"
        style={{ maskImage: "radial-gradient(circle, black 0%, transparent 72%)" }}
      />

      <div className="weeggo-wave-field">
        <svg
          className="weeggo-wave weeggo-wave-a absolute inset-0 size-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M -100 560 C 150 500, 320 660, 520 590 C 720 520, 860 360, 1100 320 C 1260 296, 1380 270, 1520 210"
            stroke="var(--weeggo-blue)"
            strokeOpacity="0.16"
            strokeWidth="80"
            strokeLinecap="round"
          />
        </svg>

        <svg
          className="weeggo-wave weeggo-wave-b absolute inset-0 size-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M -100 630 C 150 580, 320 710, 520 640 C 720 570, 860 430, 1100 380 C 1260 348, 1380 320, 1520 270"
            stroke="var(--weeggo-orange)"
            strokeOpacity="0.22"
            strokeWidth="46"
            strokeLinecap="round"
          />
          <path
            d="M -100 630 C 150 580, 320 710, 520 640 C 720 570, 860 430, 1100 380 C 1260 348, 1380 320, 1520 270"
            stroke="var(--weeggo-orange)"
            strokeOpacity="0.55"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
