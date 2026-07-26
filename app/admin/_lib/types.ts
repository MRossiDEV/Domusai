export type PropertyStatus = "draft" | "published" | "off-market";

export type PropertyType = "apartment" | "house" | "ph" | "loft";

export interface Property {
  id: string;
  title: string;
  city: string;
  description: string;
  price: number;
  currency: "USD";
  bedrooms: number;
  bathrooms: number;
  areaM2: number;
  badge: string;
  tags: string[];
  image: string;
  status: PropertyStatus;
  featured: boolean;
  propertyType: PropertyType;
  /** Monthly rent estimate. Null when the property has no rental figure. */
  rentPrice: number | null;
  createdAt: number;
  updatedAt: number;
}

export type LeadStatus = "new" | "contacted" | "closed";
export type LeadSource = "wizard" | "contact" | "sell";
export type LeadContactMethod = "WhatsApp" | "Email" | "Llamada";

export type WizardAnswerValue = string | string[] | number;

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  contactMethod: LeadContactMethod;
  message?: string;
  source: LeadSource;
  assessment?: Record<string, WizardAnswerValue>;
  status: LeadStatus;
  assignedAgentId?: string;
  createdAt: number;
}

export type AgentRole = "admin" | "agent";

export interface Agent {
  id: string;
  slug: string;
  name: string;
  email: string;
  phone: string;
  role: AgentRole;
  avatarUrl?: string;
  bio?: string;
  active: boolean;
  hasAccount: boolean;
  createdAt: number;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  updatedAt: number;
}

export type EmailLogStatus = "sent" | "failed" | "queued";

export interface EmailLogEntry {
  id: string;
  templateId?: string;
  recipient: string;
  subject: string;
  status: EmailLogStatus;
  sentAt: number;
}

export interface SiteSettings {
  contactEmail: string;
  whatsappNumber: string;
  instagramUrl: string;
  facebookUrl: string;
  defaultSeoDescription: string;
}
