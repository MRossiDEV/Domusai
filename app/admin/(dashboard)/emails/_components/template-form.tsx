"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { EmailTemplate } from "@/app/admin/_lib/types";
import type { EmailTemplateFormState } from "@/app/admin/_lib/actions/emails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function TemplateForm({
  action,
  template,
}: {
  action: (state: EmailTemplateFormState, formData: FormData) => Promise<EmailTemplateFormState>;
  template?: EmailTemplate;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <Link
        href="/admin/emails"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver a Emails
      </Link>

      <FieldGroup className="max-w-2xl">
        <Field>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <FieldContent>
            <Input id="name" name="name" defaultValue={template?.name} required />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="subject">Asunto</FieldLabel>
          <FieldContent>
            <Input id="subject" name="subject" defaultValue={template?.subject} required />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="body">Contenido</FieldLabel>
          <FieldContent>
            <Textarea id="body" name="body" defaultValue={template?.body} rows={8} required />
            <FieldDescription>
              Podés usar variables como {"{{fullName}}"} para personalizar el mensaje.
            </FieldDescription>
          </FieldContent>
        </Field>

        {state.error && <FieldError>{state.error}</FieldError>}

        <div className="flex gap-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : template ? "Guardar cambios" : "Crear plantilla"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
