import { createPartnerAction } from "@/app/admin/_lib/actions/partners";
import { PageHeader } from "@/app/admin/_components/page-header";
import { PartnerForm } from "@/app/admin/(dashboard)/partners/_components/partner-form";

export default function NewPartnerPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Nuevo Partner" description="Agregá una inmobiliaria o realtor asociado." />
      <PartnerForm action={createPartnerAction} />
    </div>
  );
}
