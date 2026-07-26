"use client";

import { useActionState } from "react";

import type { Agent } from "@/app/admin/_lib/types";
import { updateMyProfileAction, type ProfileFormState } from "@/app/agent/_lib/actions";
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

const initialState: ProfileFormState = {};

export function ProfileForm({ agent }: { agent: Agent }) {
  const [state, formAction, pending] = useActionState(updateMyProfileAction, initialState);

  return (
    <form action={formAction} className="max-w-xl">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <FieldContent>
            <Input id="name" name="name" defaultValue={agent.name} required />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
          <FieldContent>
            <Input id="phone" name="phone" defaultValue={agent.phone} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="avatarUrl">URL de foto de perfil</FieldLabel>
          <FieldContent>
            <Input id="avatarUrl" name="avatarUrl" defaultValue={agent.avatarUrl} />
            <FieldDescription>Ej: https://…/mi-foto.jpg</FieldDescription>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="bio">Biografía</FieldLabel>
          <FieldContent>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={agent.bio}
              rows={4}
              placeholder="Contales a tus clientes sobre vos…"
            />
            <FieldDescription>Se muestra en tu perfil público.</FieldDescription>
          </FieldContent>
        </Field>

        {state.error && <FieldError>{state.error}</FieldError>}
        {state.success && <p className="text-sm text-accent">Perfil actualizado.</p>}

        <div>
          <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
