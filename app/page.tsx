// app/page.tsx

import Header from "@/components/layout/Header";
import Hero from "@/components/landing/Hero";
import Process from "@/components/landing/Process";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import Services from "@/components/landing/Services";
import InternationalBuyers from "@/components/landing/InternationalBuyer";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
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