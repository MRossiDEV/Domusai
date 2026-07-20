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
          background: "#111111",
        }}
      >

        <span
          style={{
            fontSize: 260,
            fontWeight: 300,
            letterSpacing: -4,
            color: "#C8AD7F",
            fontFamily: "serif",
          }}
        >
          D
        </span>

      </div>
    ),

    {
      width: 512,
      height: 512,
    }

  )

}
