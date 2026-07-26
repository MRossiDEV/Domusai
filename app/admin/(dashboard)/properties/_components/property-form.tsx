"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { Property, PropertyStatus, PropertyType } from "@/app/admin/_lib/types";
import type { PropertyFormState } from "@/app/admin/_lib/actions/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const statusOptions: { value: PropertyStatus; label: string }[] = [
  { value: "draft", label: "Borrador" },
  { value: "published", label: "Publicada" },
  { value: "off-market", label: "Fuera de mercado" },
];

const propertyTypeOptions: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartamento" },
  { value: "house", label: "Casa" },
  { value: "ph", label: "PH" },
  { value: "loft", label: "Loft" },
];

export function PropertyForm({
  action,
  property,
}: {
  action: (state: PropertyFormState, formData: FormData) => Promise<PropertyFormState>;
  property?: Property;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <Link
        href="/admin/properties"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver a Propiedades
      </Link>

      <FieldGroup className="max-w-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="title">Título</FieldLabel>
            <FieldContent>
              <Input id="title" name="title" defaultValue={property?.title} required />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="city">Ciudad</FieldLabel>
            <FieldContent>
              <Input id="city" name="city" defaultValue={property?.city} required />
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="description">Descripción</FieldLabel>
          <FieldContent>
            <Textarea
              id="description"
              name="description"
              defaultValue={property?.description}
              rows={4}
              required
            />
          </FieldContent>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="image">URL de imagen</FieldLabel>
            <FieldContent>
              <Input id="image" name="image" defaultValue={property?.image} required />
              <FieldDescription>Ej: /images/property-1.png</FieldDescription>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="badge">Badge</FieldLabel>
            <FieldContent>
              <Input id="badge" name="badge" defaultValue={property?.badge} />
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <Field>
            <FieldLabel htmlFor="price">Precio de venta (USD)</FieldLabel>
            <FieldContent>
              <Input id="price" name="price" type="number" min={0} defaultValue={property?.price} required />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="rentPrice">Alquiler mensual (USD)</FieldLabel>
            <FieldContent>
              <Input
                id="rentPrice"
                name="rentPrice"
                type="number"
                min={0}
                defaultValue={property?.rentPrice ?? undefined}
              />
              <FieldDescription>Opcional. Dejar vacío si no aplica.</FieldDescription>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="bedrooms">Dormitorios</FieldLabel>
            <FieldContent>
              <Input id="bedrooms" name="bedrooms" type="number" min={0} defaultValue={property?.bedrooms} required />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="bathrooms">Baños</FieldLabel>
            <FieldContent>
              <Input id="bathrooms" name="bathrooms" type="number" min={0} defaultValue={property?.bathrooms} required />
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="propertyType">Tipo de propiedad</FieldLabel>
            <FieldContent>
              <Select name="propertyType" defaultValue={property?.propertyType ?? "apartment"}>
                <SelectTrigger id="propertyType" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="areaM2">Superficie (m²)</FieldLabel>
            <FieldContent>
              <Input id="areaM2" name="areaM2" type="number" min={0} defaultValue={property?.areaM2} required />
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="tags">Tags (separados por coma)</FieldLabel>
          <FieldContent>
            <Input id="tags" name="tags" defaultValue={property?.tags.join(", ")} />
          </FieldContent>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="status">Estado</FieldLabel>
            <FieldContent>
              <Select name="status" defaultValue={property?.status ?? "draft"}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="featured">Destacada en portada</FieldLabel>
            </FieldContent>
            <Switch id="featured" name="featured" defaultChecked={property?.featured} />
          </Field>
        </div>

        {state.error && <FieldError>{state.error}</FieldError>}

        <div className="flex gap-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : property ? "Guardar cambios" : "Crear propiedad"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
