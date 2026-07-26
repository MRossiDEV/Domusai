import { Metadata } from "next";

export const siteConfig = {
  name: "WEEGGO",
  shortName: "WEEGGO",

  title:
    "WEEGGO | Find your next place in Uruguay",
  description:
    "Swipe through exclusive properties in Uruguay. WEEGGO matches buyers, renters, and investors with places that fit — fast, personal, and private.",

  url: "https://weeggo.app",

  ogImage: "/opengraph-image",

  locale: "en_US",

  keywords: [
    "Real Estate Uruguay",
    "Buy Property Uruguay",
    "Rent Property Uruguay",
    "International Buyers Uruguay",
    "Relocation Uruguay",
    "Homes Punta del Este",
    "Homes Carrasco",
    "Uruguay Investment",
    "Real Estate App",
    "WEEGGO",
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: "%s | Domusai",
  },

  description: siteConfig.description,

  keywords: siteConfig.keywords,

  applicationName: siteConfig.name,

  category: "Real Estate",

  authors: [
    {
      name: "Domusai",
    },
  ],

  creator: "Domusai",

  publisher: "Domusai",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",

    url: siteConfig.url,

    siteName: siteConfig.name,

    title: siteConfig.title,

    description: siteConfig.description,

    locale: siteConfig.locale,

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: siteConfig.title,

    description: siteConfig.description,

    images: [siteConfig.ogImage],
  },
};