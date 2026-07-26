"use client";

import { useActionState } from "react";

import type { SiteSettings } from "@/app/admin/_lib/types";
import { updateSettingsAction } from "@/app/admin/_lib/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState(updateSettingsAction, {});

  return (
    <form action={formAction} className="max-w-xl">
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="contactEmail">Email de contacto</FieldLabel>
            <FieldContent>
              <Input id="contactEmail" name="contactEmail" type="email" defaultValue={settings.contactEmail} required />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="whatsappNumber">WhatsApp</FieldLabel>
            <FieldContent>
              <Input id="whatsappNumber" name="whatsappNumber" defaultValue={settings.whatsappNumber} required />
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="instagramUrl">Instagram</FieldLabel>
            <FieldContent>
              <Input id="instagramUrl" name="instagramUrl" defaultValue={settings.instagramUrl} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="facebookUrl">Facebook</FieldLabel>
            <FieldContent>
              <Input id="facebookUrl" name="facebookUrl" defaultValue={settings.facebookUrl} />
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="defaultSeoDescription">Descripción SEO por defecto</FieldLabel>
          <FieldContent>
            <Textarea
              id="defaultSeoDescription"
              name="defaultSeoDescription"
              defaultValue={settings.defaultSeoDescription}
              rows={3}
            />
          </FieldContent>
        </Field>

        {state.error && <FieldError>{state.error}</FieldError>}
        {state.success && (
          <p className="text-sm text-accent">Configuración guardada correctamente.</p>
        )}

        <div>
          <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : "Guardar configuración"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
