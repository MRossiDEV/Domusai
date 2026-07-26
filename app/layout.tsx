import type { Metadata, Viewport } from "next"

import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"

import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister"
import { ThemedToaster } from "@/components/ThemedToaster"
import { DiscoverProvider } from "@/lib/discover/filters-context"



const geistSans = Geist({

  variable:
    "--font-geist-sans",

  subsets:
    ["latin"],

})



const geistMono = Geist_Mono({

  variable:
    "--font-geist-mono",

  subsets:
    ["latin"],

})



const ibmPlexMono = IBM_Plex_Mono({

  variable:
    "--font-weeggo-mono",

  subsets:
    ["latin"],

  weight:
    ["400", "500", "600"],

})



const weeggoLogoFont = localFont({

  src:
    "../public/fonts/VanillaExtractRegular.ttf",

  variable:
    "--font-weeggo-logo",

  display:
    "swap",

})



export const viewport: Viewport = {

  themeColor:
    "#111111",

  width:
    "device-width",

  initialScale:
    1,

  maximumScale:
    1,

  userScalable:
    false,

  viewportFit:
    "cover",

}



export const metadata: Metadata = {

  metadataBase:
    new URL(
      "https://weeggo.app"
    ),


  title: {

    default:
      "WEEGGO | Find your next place in Uruguay",

    template:
      "%s | WEEGGO",

  },


  description:
    "Swipe through exclusive properties in Uruguay. WEEGGO matches buyers, renters, and investors with places that fit — fast, personal, and private.",



  keywords: [

    "Propiedades Uruguay",

    "Casas Uruguay",

    "Casas de lujo Uruguay",

    "Propiedades exclusivas",

    "Montevideo",

    "Carrasco",

    "Punta del Este",

    "José Ignacio",

    "Comprar casa Uruguay",

    "Inmobiliaria Uruguay",

    "WEEGGO",

  ],



  authors: [

    {
      name:
        "WEEGGO",
    }

  ],



  creator:
    "WEEGGO",


  publisher:
    "WEEGGO",


  applicationName:
    "WEEGGO",


  category:
    "Real Estate",



  robots: {

    index:
      true,

    follow:
      true,

    googleBot: {

      index:
        true,

      follow:
        true,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,

    },

  },



  appleWebApp: {

    capable:
      true,

    title:
      "WEEGGO",

    statusBarStyle:
      "default",

  },



  other: {

    "mobile-web-app-capable":
      "yes",

  },



  icons: {

    icon: [

      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },

      {
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },

    ],

    apple: [

      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },

    ],

  },



  formatDetection: {

    telephone:
      false,

  },



  openGraph: {

    type:
      "website",

    locale:
      "es_UY",

    url:
      "https://weeggo.app",

    siteName:
      "WEEGGO",

    title:
      "WEEGGO | Find your next place in Uruguay",

    description:
      "Swipe through exclusive properties in Uruguay — buy, rent, or invest.",

    images: [

      {

        url:
          "/opengraph-image",

        width:
          1200,

        height:
          630,

        alt:
          "WEEGGO - Find your next place",

      },

    ],

  },



  twitter: {

    card:
      "summary_large_image",

    title:
      "WEEGGO | Find your next place in Uruguay",

    description:
      "Swipe through exclusive properties in Uruguay — buy, rent, or invest.",

    images:
      [
        "/opengraph-image"
      ],

  },



  alternates: {

    canonical:
      "/",

  },


}



export default function RootLayout({

  children,

}: Readonly<{

  children:
    React.ReactNode

}>) {


  return (

    <html

      lang="es"

      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${ibmPlexMono.variable}
        ${weeggoLogoFont.variable}
        h-full
        scroll-smooth
        antialiased
      `}

    >

      <body

        suppressHydrationWarning

        className="
          min-h-screen
          overflow-x-hidden
          bg-[#111111]
          text-[#F5F1E8]
        "

      >

        <DiscoverProvider>{children}</DiscoverProvider>

        <ServiceWorkerRegister />

        <ThemedToaster />

      </body>


    </html>

  )

}