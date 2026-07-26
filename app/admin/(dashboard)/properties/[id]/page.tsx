import { notFound } from "next/navigation";

import { propertiesStore } from "@/app/admin/_lib/store";
import { updatePropertyAction } from "@/app/admin/_lib/actions/properties";
import { PageHeader } from "@/app/admin/_components/page-header";
import { PropertyForm } from "@/app/admin/(dashboard)/properties/_components/property-form";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await propertiesStore.get(id);
  if (!property) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={property.title} description="Editá los detalles de la propiedad." />
      <PropertyForm action={updatePropertyAction.bind(null, id)} property={property} />
    </div>
  );
}
