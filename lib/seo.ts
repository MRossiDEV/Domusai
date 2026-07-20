import { Metadata } from "next";

export const siteConfig = {
  name: "Domusai",
    shortName: "Domusai",
  
  title:
    "Luxury Real Estate Concierge in Uruguay | Domusai",
  description:
    "Discover exceptional properties in Uruguay through a private AI-powered real estate concierge. Personalized property selection, expert guidance and exclusive opportunities for local and international buyers.",

  url: "https://domusai.app",

  ogImage: "/og-image.jpg",

  locale: "en_US",

  keywords: [
    "Luxury Real Estate Uruguay",
    "Buy Property Uruguay",
    "International Buyers Uruguay",
    "Relocation Uruguay",
    "Luxury Homes Punta del Este",
    "Luxury Homes Carrasco",
    "Uruguay Investment",
    "Real Estate Concierge",
    "Private Property Advisor",
    "Domusai",
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