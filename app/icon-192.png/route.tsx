import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {

  return new ImageResponse(

    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4F46E5",
          borderRadius: 40,
          position: "relative",
        }}
      >

        <span
          style={{
            fontSize: 108,
            fontWeight: 800,
            letterSpacing: -2,
            color: "#FFFFFF",
            fontFamily: "sans-serif",
          }}
        >
          W
        </span>

        <div
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#F0653C",
            right: 40,
            bottom: 40,
          }}
        />

      </div>
    ),

    {
      width: 192,
      height: 192,
    }

  )

}
