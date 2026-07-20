import type { MetadataRoute } from "next"


export default function manifest(): MetadataRoute.Manifest {

  return {

    name: "DOMUSAI",

    short_name: "DOMUSAI",

    description:
      "Una experiencia personalizada para encontrar propiedades alineadas con tu estilo de vida.",


    start_url: "/wizard",


    display: "standalone",


    background_color:
      "#F8F7F3",


    theme_color:
      "#F8F7F3",


    lang:
      "es-UY",


    orientation:
      "portrait",


    categories: [
      "real-estate",
      "business",
      "lifestyle"
    ],


    screenshots: [
      {
        src: "/screenshots/mobile-home.png",
        sizes: "1080x1920",
        type: "image/png"
      }
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