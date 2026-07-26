import { createPropertyAction } from "@/app/admin/_lib/actions/properties";
import { PageHeader } from "@/app/admin/_components/page-header";
import { PropertyForm } from "@/app/admin/(dashboard)/properties/_components/property-form";

export default function NewPropertyPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Nueva Propiedad" description="Agregá una propiedad al catálogo." />
      <PropertyForm action={createPropertyAction} />
    </div>
  );
}
