import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { supabasePublic } from "@/lib/supabase/public";
import { siteConfig } from "@/lib/seo";
import Container from "@/components/layout/Container";
import Footer from "@/components/landing/Footer";
import PropertyCard from "@/components/landing/PropertyCard";

type PublicAgentRow = {
  id: string;
  name: string;
  role: "admin" | "agent";
  phone: string | null;
  email: string;
  avatar_url: string | null;
  bio: string | null;
};

type PublicPropertyRow = {
  title: string;
  city: string;
  description: string;
  bedrooms: number;
  area_m2: number;
  badges: string[] | null;
  tags: string[];
  cover_image_url: string;
};

async function getPublicAgent(slug: string) {
  const { data, error } = await supabasePublic
    .from("weeggo_agents")
    .select("id, name, role, phone, email, avatar_url, bio")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as PublicAgentRow | null;
}

async function getAgentProperties(agentId: string) {
  const { data, error } = await supabasePublic
    .from("weeggo_properties")
    .select("title, city, description, bedrooms, area_m2, badges, tags, cover_image_url")
    .eq("agent_id", agentId)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as PublicPropertyRow[]) ?? [];
}

function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getPublicAgent(slug);

  if (!agent) return {};

  return {
    title: agent.name,
    description: agent.bio ?? `Perfil de ${agent.name} en WEEGGO.`,
  };
}

export default async function PublicAgentProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = await getPublicAgent(slug);
  if (!agent) notFound();

  const properties = await getAgentProperties(agent.id);

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F1E8]">
      <header className="border-b border-white/10 py-6">
        <Container className="flex items-center justify-between">
          <Link href="/" className="text-lg font-light tracking-[0.35em] text-white">
            WEEGGO
          </Link>
          <Link
            href="/wizard"
            className="rounded-full bg-[#C8AD7F] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03]"
          >
            Consulta
          </Link>
        </Container>
      </header>

      <Container className="py-16">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#181818]">
            {agent.avatar_url && (
              // eslint-disable-next-line @next/next/no-img-element -- avatar_url is an
              // arbitrary agent-supplied external URL, not configured in next.config images
              <img
                src={agent.avatar_url}
                alt={agent.name}
                className="size-full object-cover"
              />
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C8AD7F]">
              {agent.role === "admin" ? "Administrador" : "Agente"} WEEGGO
            </p>
            <h1 className="mt-2 font-serif text-4xl text-white">{agent.name}</h1>

            {agent.bio && (
              <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{agent.bio}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`mailto:${agent.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-[#C8AD7F] hover:text-[#C8AD7F]"
              >
                <Mail size={16} />
                Email
              </Link>
              {agent.phone && (
                <>
                  <Link
                    href={`tel:${agent.phone}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-[#C8AD7F] hover:text-[#C8AD7F]"
                  >
                    <Phone size={16} />
                    Llamar
                  </Link>
                  <Link
                    href={whatsappHref(agent.phone)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-[#C8AD7F] hover:text-[#C8AD7F]"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>

      {properties.length > 0 && (
        <Container className="pb-24">
          <h2 className="mb-8 font-serif text-2xl text-white">
            Propiedades de {agent.name.split(" ")[0]}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.title}
                image={property.cover_image_url}
                city={property.city}
                title={property.title}
                badges={property.badges ?? []}
                description={property.description}
                specs={`${property.bedrooms} Dormitorios • ${property.area_m2} m²`}
                tags={property.tags ?? []}
              />
            ))}
          </div>
        </Container>
      )}

      <Footer />
    </div>
  );
}

export const revalidate = 0;
