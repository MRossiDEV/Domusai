import { createTemplateAction } from "@/app/admin/_lib/actions/emails";
import { PageHeader } from "@/app/admin/_components/page-header";
import { TemplateForm } from "@/app/admin/(dashboard)/emails/_components/template-form";

export default function NewTemplatePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Nueva Plantilla" description="Creá una plantilla de email reutilizable." />
      <TemplateForm action={createTemplateAction} />
    </div>
  );
}
