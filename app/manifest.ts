import type { MetadataRoute } from "next"


export default function manifest(): MetadataRoute.Manifest {

  return {

    name: "DOMUSAI",

    short_name: "DOMUSAI",

    description:
      "Una experiencia personalizada para encontrar propiedades alineadas con tu estilo de vida.",


    id: "/",


    start_url: "/",


    scope: "/",


    display: "standalone",


    background_color:
      "#111111",


    theme_color:
      "#111111",


    lang:
      "es-UY",


    orientation:
      "portrait",


    categories: [
      "real-estate",
      "business",
      "lifestyle"
    ],


    icons: [

      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose:
          "any"
      },


      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose:
          "maskable"
      },


      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png"
      }

    ]

  }

}