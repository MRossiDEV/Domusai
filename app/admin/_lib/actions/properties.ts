"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { propertiesStore } from "@/app/admin/_lib/store";
import type { PropertyStatus, PropertyType } from "@/app/admin/_lib/types";

const PROPERTY_TYPES: PropertyType[] = ["apartment", "house", "ph", "loft"];

export interface PropertyFormState {
  error?: string;
}

function parsePropertyForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim() || "Uruguay";
  const departmentRaw = String(formData.get("department") ?? "").trim();
  const department = departmentRaw === "" ? null : departmentRaw;
  const localityRaw = String(formData.get("locality") ?? "").trim();
  const locality = localityRaw === "" ? null : localityRaw;
  const city = String(formData.get("city") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const bedrooms = Number(formData.get("bedrooms"));
  const bathrooms = Number(formData.get("bathrooms"));
  const areaM2 = Number(formData.get("areaM2"));
  const badges = formData.getAll("badges").map((badge) => String(badge).trim()).filter(Boolean);
  const image = String(formData.get("image") ?? "").trim();
  const status = String(formData.get("status") ?? "draft") as PropertyStatus;
  const featured = formData.get("featured") === "on";
  const propertyType = String(formData.get("propertyType") ?? "apartment") as PropertyType;
  const rentPriceRaw = String(formData.get("rentPrice") ?? "").trim();
  const rentPrice = rentPriceRaw === "" ? null : Number(rentPriceRaw);
  const tags = formData.getAll("tags").map((tag) => String(tag).trim()).filter(Boolean);
  const images = formData
    .getAll("images")
    .map((url) => String(url).trim())
    .filter(Boolean);
  const agentIdRaw = String(formData.get("agentId") ?? "");
  const agentId = agentIdRaw === "" || agentIdRaw === "none" ? null : agentIdRaw;
  const partnerIdRaw = String(formData.get("partnerId") ?? "");
  const partnerId = partnerIdRaw === "" || partnerIdRaw === "none" ? null : partnerIdRaw;

  if (!title || !city || !description || !image) {
    return { error: "Completá título, ciudad, descripción e imagen." } as const;
  }
  if (!Number.isFinite(price) || !Number.isFinite(bedrooms) || !Number.isFinite(bathrooms) || !Number.isFinite(areaM2)) {
    return { error: "Precio, dormitorios, baños y superficie deben ser números válidos." } as const;
  }
  if (!PROPERTY_TYPES.includes(propertyType)) {
    return { error: "Tipo de propiedad inválido." } as const;
  }
  if (rentPrice !== null && !Number.isFinite(rentPrice)) {
    return { error: "El alquiler mensual debe ser un número válido." } as const;
  }

  return {
    data: {
      title,
      country,
      department,
      locality,
      city,
      description,
      price,
      currency: "USD" as const,
      bedrooms,
      bathrooms,
      areaM2,
      badges,
      tags,
      image,
      images,
      status,
      featured,
      propertyType,
      rentPrice,
      agentId,
      partnerId,
    },
  } as const;
}

export async function createPropertyAction(
  _prevState: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  const parsed = parsePropertyForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  await propertiesStore.create(parsed.data);
  revalidatePath("/admin/properties");
  revalidatePath("/admin");
  redirect("/admin/properties");
}

export async function updatePropertyAction(
  id: string,
  _prevState: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  const parsed = parsePropertyForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  const updated = await propertiesStore.update(id, parsed.data);
  if (!updated) return { error: "No se encontró la propiedad." };

  revalidatePath("/admin/properties");
  revalidatePath("/admin");
  redirect("/admin/properties");
}

export async function deletePropertyAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (id) await propertiesStore.remove(id);
  revalidatePath("/admin/properties");
  revalidatePath("/admin");
}
