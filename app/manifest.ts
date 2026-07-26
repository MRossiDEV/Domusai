import type { MetadataRoute } from "next"


export default function manifest(): MetadataRoute.Manifest {

  return {

    name: "WEEGGO",

    short_name: "WEEGGO",

    description:
      "Swipe through exclusive properties in Uruguay — buy, rent, or invest.",


    id: "/",


    start_url: "/",


    scope: "/",


    display: "standalone",


    background_color:
      "#F7F7F8",


    theme_color:
      "#4F46E5",


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