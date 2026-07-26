import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "WEEGGO - Find your next place";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#FAFAFA",
          color: "#18181B",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg,#EEF2FF 0%,#FAFAFA 55%,#ECFDF5 100%)",
          }}
        />

        {/* Content */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 120px",
            zIndex: 2,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -1,
              marginBottom: 30,
            }}
          >
            <span style={{ color: "#4F46E5" }}>WEEG</span>
            <span style={{ color: "#F0653C" }}>GO</span>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#10B981",
                marginLeft: 6,
              }}
            />
          </div>

          <div
            style={{
              fontSize: 74,
              lineHeight: 1.08,
              fontWeight: 800,
              maxWidth: 850,
              letterSpacing: -1,
            }}
          >
            Find your next
            <br />
            place
          </div>

          <div
            style={{
              marginTop: 40,
              fontSize: 28,
              color: "#71717A",
              maxWidth: 760,
              lineHeight: 1.5,
            }}
          >
            Swipe through exclusive properties in Uruguay — buy, rent, or
            invest.
          </div>
        </div>
      </div>
    ),
    size
  );
}