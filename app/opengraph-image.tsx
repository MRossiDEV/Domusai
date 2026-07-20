import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "DOMUSAI - Propiedades Exclusivas en Uruguay";
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
          background: "#0a0a0a",
          color: "white",
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
              "linear-gradient(135deg,#0b0b0b 0%,#141414 55%,#1b1b1b 100%)",
          }}
        />

        {/* Gold Accent */}

        <div
          style={{
            position: "absolute",
            left: 80,
            top: 80,
            width: 6,
            height: 470,
            background: "#d7c3a0",
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
              fontSize: 22,
              letterSpacing: 12,
              color: "#d7c3a0",
              textTransform: "uppercase",
              marginBottom: 30,
            }}
          >
            DOMUSAI
          </div>

          <div
            style={{
              fontSize: 74,
              lineHeight: 1.08,
              fontWeight: 700,
              maxWidth: 850,
            }}
          >
            Propiedades Exclusivas
            <br />
            en Uruguay
          </div>

          <div
            style={{
              marginTop: 40,
              fontSize: 28,
              color: "#d5d5d5",
              maxWidth: 760,
              lineHeight: 1.5,
            }}
          >
            Una experiencia privada para encontrar propiedades
            seleccionadas según tu estilo de vida.
          </div>
        </div>
      </div>
    ),
    size
  );
}