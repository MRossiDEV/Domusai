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
          borderRadius: 108,
          position: "relative",
        }}
      >

        <span
          style={{
            fontSize: 288,
            fontWeight: 800,
            letterSpacing: -4,
            color: "#FFFFFF",
            fontFamily: "sans-serif",
          }}
        >
          W
        </span>

        <div
          style={{
            position: "absolute",
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "#F0653C",
            right: 108,
            bottom: 108,
          }}
        />

      </div>
    ),

    {
      width: 512,
      height: 512,
    }

  )

}
