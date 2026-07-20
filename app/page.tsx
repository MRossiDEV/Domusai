import Header from "@/components/layout/Header";
import Hero from "@/components/landing/Hero";
import Process from "@/components/landing/Process";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import Services from "@/components/landing/Services";
import InternationalBuyers from "@/components/landing/InternationalBuyer";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://domusai.app/#organization",
      name: "Domusai",
      url: "https://domusai.app",
      logo: "https://domusai.app/images/logo.png",
      description:
        "Plataforma privada de búsqueda de propiedades exclusivas en Uruguay.",
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://domusai.app/#realestateagent",
      name: "Domusai",
      url: "https://domusai.app",
      description:
        "Asistente inmobiliario especializado en propiedades premium y selección personalizada de inmuebles en Uruguay.",
      areaServed: {
        "@type": "Country",
        name: "Uruguay",
      },
      serviceType: [
        "Compra de propiedades",
        "Propiedades premium",
        "Asesoramiento inmobiliario",
        "Compradores internacionales",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://domusai.app/#website",
      url: "https://domusai.app",
      name: "Domusai",
      inLanguage: "es-UY",
      publisher: {
        "@id": "https://domusai.app/#organization",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Header />

      <main className="overflow-hidden">
        <Hero />

        <Process />

        <FeaturedProperties />

        <Services />

        <InternationalBuyers />

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}