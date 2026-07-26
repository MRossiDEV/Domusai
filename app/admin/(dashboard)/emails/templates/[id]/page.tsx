import { notFound } from "next/navigation";

import { emailTemplatesStore } from "@/app/admin/_lib/store";
import { updateTemplateAction } from "@/app/admin/_lib/actions/emails";
import { PageHeader } from "@/app/admin/_components/page-header";
import { TemplateForm } from "@/app/admin/(dashboard)/emails/_components/template-form";

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = await emailTemplatesStore.get(id);
  if (!template) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={template.name} description="Editá la plantilla de email." />
      <TemplateForm action={updateTemplateAction.bind(null, id)} template={template} />
    </div>
  );
}
