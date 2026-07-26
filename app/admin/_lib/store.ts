import { supabaseAdmin } from "@/lib/supabase/admin";
import type {
  Agent,
  AgentRole,
  EmailLogEntry,
  EmailLogStatus,
  EmailTemplate,
  Lead,
  LeadContactMethod,
  LeadSource,
  LeadStatus,
  Property,
  PropertyStatus,
  PropertyType,
  SiteSettings,
  WizardAnswerValue,
} from "./types";

export type PropertyRow = {
  id: string;
  title: string;
  city: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area_m2: number;
  badge: string | null;
  tags: string[];
  cover_image_url: string;
  status: string;
  featured: boolean;
  property_type: string;
  rent_price: number | null;
  created_at: string;
  updated_at: string;
};

export type LeadRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  contact_method: string;
  message: string | null;
  source: LeadSource;
  assessment: Record<string, WizardAnswerValue> | null;
  status: LeadStatus;
  assigned_agent_id: string | null;
  created_at: string;
};

export type AgentRow = {
  id: string;
  slug: string;
  name: string;
  email: string;
  phone: string | null;
  role: AgentRole;
  avatar_url: string | null;
  bio: string | null;
  active: boolean;
  user_id: string | null;
  created_at: string;
};

type EmailTemplateRow = {
  id: string;
  name: string;
  subject: string;
  body: string;
  updated_at: string;
};

type EmailLogRow = {
  id: string;
  template_id: string | null;
  recipient: string;
  subject: string;
  status: EmailLogStatus;
  sent_at: string | null;
  created_at: string;
};

type SettingsRow = {
  contact_email: string;
  whatsapp_number: string;
  instagram_url: string | null;
  facebook_url: string | null;
  default_seo_description: string | null;
};

function slugify(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generateSlug(title: string, fallback = "item"): string {
  const base = slugify(title) || fallback;
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
}

function toDbPropertyStatus(status: PropertyStatus): string {
  return status === "off-market" ? "off_market" : status;
}

function fromDbPropertyStatus(status: string): PropertyStatus {
  return status === "off_market" ? "off-market" : (status as PropertyStatus);
}

function fromDbContactMethod(method: string): LeadContactMethod {
  switch (method) {
    case "email":
      return "Email";
    case "llamada":
      return "Llamada";
    default:
      return "WhatsApp";
  }
}

export function mapProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    title: row.title,
    city: row.city,
    description: row.description,
    price: Number(row.price),
    currency: "USD",
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    areaM2: Number(row.area_m2),
    badge: row.badge ?? "",
    tags: row.tags ?? [],
    image: row.cover_image_url,
    status: fromDbPropertyStatus(row.status),
    featured: row.featured,
    propertyType: row.property_type as PropertyType,
    rentPrice: row.rent_price === null ? null : Number(row.rent_price),
    createdAt: new Date(row.created_at).getTime(),
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

export function mapLead(row: LeadRow): Lead {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone ?? "",
    contactMethod: fromDbContactMethod(row.contact_method),
    message: row.message ?? undefined,
    source: row.source,
    assessment: row.assessment ?? undefined,
    status: row.status,
    assignedAgentId: row.assigned_agent_id ?? undefined,
    createdAt: new Date(row.created_at).getTime(),
  };
}

export function mapAgent(row: AgentRow): Agent {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    role: row.role,
    avatarUrl: row.avatar_url ?? undefined,
    bio: row.bio ?? undefined,
    active: row.active,
    hasAccount: row.user_id !== null,
    createdAt: new Date(row.created_at).getTime(),
  };
}

function mapTemplate(row: EmailTemplateRow): EmailTemplate {
  return {
    id: row.id,
    name: row.name,
    subject: row.subject,
    body: row.body,
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

function mapLogEntry(row: EmailLogRow): EmailLogEntry {
  return {
    id: row.id,
    templateId: row.template_id ?? undefined,
    recipient: row.recipient,
    subject: row.subject,
    status: row.status,
    sentAt: new Date(row.sent_at ?? row.created_at).getTime(),
  };
}

function mapSettings(row: SettingsRow): SiteSettings {
  return {
    contactEmail: row.contact_email,
    whatsappNumber: row.whatsapp_number,
    instagramUrl: row.instagram_url ?? "",
    facebookUrl: row.facebook_url ?? "",
    defaultSeoDescription: row.default_seo_description ?? "",
  };
}

function assertNoError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export const propertiesStore = {
  async list(): Promise<Property[]> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_properties")
      .select("*")
      .order("created_at", { ascending: false });
    assertNoError(error);
    return (data as PropertyRow[]).map(mapProperty);
  },

  async get(id: string): Promise<Property | undefined> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_properties")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    assertNoError(error);
    return data ? mapProperty(data as PropertyRow) : undefined;
  },

  async create(data: Omit<Property, "id" | "createdAt" | "updatedAt">): Promise<Property> {
    const { data: row, error } = await supabaseAdmin
      .from("weeggo_properties")
      .insert({
        slug: generateSlug(data.title, "propiedad"),
        title: data.title,
        city: data.city,
        description: data.description,
        price: data.price,
        currency: data.currency,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area_m2: data.areaM2,
        badge: data.badge,
        tags: data.tags,
        cover_image_url: data.image,
        status: toDbPropertyStatus(data.status),
        featured: data.featured,
        property_type: data.propertyType,
        rent_price: data.rentPrice,
      })
      .select()
      .single();
    assertNoError(error);
    return mapProperty(row as PropertyRow);
  },

  async update(
    id: string,
    data: Omit<Property, "id" | "createdAt" | "updatedAt">
  ): Promise<Property | undefined> {
    const { data: row, error } = await supabaseAdmin
      .from("weeggo_properties")
      .update({
        title: data.title,
        city: data.city,
        description: data.description,
        price: data.price,
        currency: data.currency,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area_m2: data.areaM2,
        badge: data.badge,
        tags: data.tags,
        cover_image_url: data.image,
        status: toDbPropertyStatus(data.status),
        featured: data.featured,
        property_type: data.propertyType,
        rent_price: data.rentPrice,
      })
      .eq("id", id)
      .select()
      .maybeSingle();
    assertNoError(error);
    return row ? mapProperty(row as PropertyRow) : undefined;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabaseAdmin.from("weeggo_properties").delete().eq("id", id);
    assertNoError(error);
  },
};

export const leadsStore = {
  async list(): Promise<Lead[]> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_leads")
      .select("*")
      .order("created_at", { ascending: false });
    assertNoError(error);
    return (data as LeadRow[]).map(mapLead);
  },

  async get(id: string): Promise<Lead | undefined> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_leads")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    assertNoError(error);
    return data ? mapLead(data as LeadRow) : undefined;
  },

  async updateStatus(id: string, status: LeadStatus): Promise<Lead | undefined> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_leads")
      .update({ status })
      .eq("id", id)
      .select()
      .maybeSingle();
    assertNoError(error);
    return data ? mapLead(data as LeadRow) : undefined;
  },

  async assignAgent(id: string, agentId: string | null): Promise<Lead | undefined> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_leads")
      .update({ assigned_agent_id: agentId })
      .eq("id", id)
      .select()
      .maybeSingle();
    assertNoError(error);
    return data ? mapLead(data as LeadRow) : undefined;
  },
};

export const agentsStore = {
  async list(): Promise<Agent[]> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_agents")
      .select("*")
      .order("name", { ascending: true });
    assertNoError(error);
    return (data as AgentRow[]).map(mapAgent);
  },

  async get(id: string): Promise<Agent | undefined> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_agents")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    assertNoError(error);
    return data ? mapAgent(data as AgentRow) : undefined;
  },

  async create(
    data: Omit<Agent, "id" | "slug" | "createdAt" | "hasAccount">
  ): Promise<Agent> {
    const { data: row, error } = await supabaseAdmin
      .from("weeggo_agents")
      .insert({
        slug: generateSlug(data.name, "agente"),
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        avatar_url: data.avatarUrl,
        active: data.active,
      })
      .select()
      .single();
    assertNoError(error);
    return mapAgent(row as AgentRow);
  },

  async update(
    id: string,
    data: Omit<Agent, "id" | "slug" | "createdAt" | "hasAccount">
  ): Promise<Agent | undefined> {
    const { data: row, error } = await supabaseAdmin
      .from("weeggo_agents")
      .update({
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        avatar_url: data.avatarUrl,
        active: data.active,
      })
      .eq("id", id)
      .select()
      .maybeSingle();
    assertNoError(error);
    return row ? mapAgent(row as AgentRow) : undefined;
  },

  async updateProfile(
    id: string,
    data: { name: string; phone: string; avatarUrl?: string; bio?: string }
  ): Promise<Agent | undefined> {
    const { data: row, error } = await supabaseAdmin
      .from("weeggo_agents")
      .update({
        name: data.name,
        phone: data.phone,
        avatar_url: data.avatarUrl || null,
        bio: data.bio || null,
      })
      .eq("id", id)
      .select()
      .maybeSingle();
    assertNoError(error);
    return row ? mapAgent(row as AgentRow) : undefined;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabaseAdmin.from("weeggo_agents").delete().eq("id", id);
    assertNoError(error);
  },
};

export const emailTemplatesStore = {
  async list(): Promise<EmailTemplate[]> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_email_templates")
      .select("*")
      .order("name", { ascending: true });
    assertNoError(error);
    return (data as EmailTemplateRow[]).map(mapTemplate);
  },

  async get(id: string): Promise<EmailTemplate | undefined> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_email_templates")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    assertNoError(error);
    return data ? mapTemplate(data as EmailTemplateRow) : undefined;
  },

  async create(data: Omit<EmailTemplate, "id" | "updatedAt">): Promise<EmailTemplate> {
    const { data: row, error } = await supabaseAdmin
      .from("weeggo_email_templates")
      .insert({ name: data.name, subject: data.subject, body: data.body })
      .select()
      .single();
    assertNoError(error);
    return mapTemplate(row as EmailTemplateRow);
  },

  async update(
    id: string,
    data: Omit<EmailTemplate, "id" | "updatedAt">
  ): Promise<EmailTemplate | undefined> {
    const { data: row, error } = await supabaseAdmin
      .from("weeggo_email_templates")
      .update({ name: data.name, subject: data.subject, body: data.body })
      .eq("id", id)
      .select()
      .maybeSingle();
    assertNoError(error);
    return row ? mapTemplate(row as EmailTemplateRow) : undefined;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabaseAdmin.from("weeggo_email_templates").delete().eq("id", id);
    assertNoError(error);
  },
};

export const emailLogStore = {
  async list(): Promise<EmailLogEntry[]> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_email_log")
      .select("*")
      .order("created_at", { ascending: false });
    assertNoError(error);
    return (data as EmailLogRow[]).map(mapLogEntry);
  },
};

export const settingsStore = {
  async get(): Promise<SiteSettings> {
    const { data, error } = await supabaseAdmin
      .from("weeggo_settings")
      .select("*")
      .eq("id", 1)
      .single();
    assertNoError(error);
    return mapSettings(data as SettingsRow);
  },

  async update(data: SiteSettings): Promise<SiteSettings> {
    const { data: row, error } = await supabaseAdmin
      .from("weeggo_settings")
      .update({
        contact_email: data.contactEmail,
        whatsapp_number: data.whatsappNumber,
        instagram_url: data.instagramUrl,
        facebook_url: data.facebookUrl,
        default_seo_description: data.defaultSeoDescription,
      })
      .eq("id", 1)
      .select()
      .single();
    assertNoError(error);
    return mapSettings(row as SettingsRow);
  },
};
