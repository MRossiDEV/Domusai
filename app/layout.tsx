import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://domusai.app"),

  title: {
    default: "DOMUSAI | Propiedades Exclusivas en Uruguay",
    template: "%s | DOMUSAI",
  },

  description:
    "Descubrí propiedades exclusivas en Uruguay mediante una experiencia privada y personalizada. Domusai combina inteligencia inmobiliaria con asesoramiento experto para ayudarte a encontrar la propiedad ideal.",

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
    "DOMUSAI",
  ],

  authors: [
    {
      name: "DOMUSAI",
    },
  ],

  creator: "DOMUSAI",

  publisher: "DOMUSAI",

  applicationName: "DOMUSAI",

  category: "Real Estate",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_UY",
    url: "https://domusai.app",
    siteName: "DOMUSAI",
    title: "DOMUSAI | Propiedades Exclusivas en Uruguay",
    description:
      "Una experiencia privada para encontrar propiedades excepcionales en Uruguay.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DOMUSAI - Propiedades Exclusivas en Uruguay",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DOMUSAI | Propiedades Exclusivas en Uruguay",
    description:
      "Una experiencia privada para encontrar propiedades excepcionales en Uruguay.",
    images: ["/opengraph-image"],
  },

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-white text-neutral-950">
        {children}
      </body>
    </html>
  );
}