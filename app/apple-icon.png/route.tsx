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
        }}
      >

        <span
          style={{
            fontSize: 100,
            fontWeight: 800,
            letterSpacing: -2,
            color: "#FFFFFF",
            fontFamily: "sans-serif",
          }}
        >
          W
        </span>

      </div>
    ),

    {
      width: 180,
      height: 180,
    }

  )

}
