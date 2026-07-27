"use client";

import { useActionState } from "react";

import type { SetPasswordFormState } from "@/app/agent/_lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

export function SetPasswordForm({
  action,
}: {
  action: (state: SetPasswordFormState, formData: FormData) => Promise<SetPasswordFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="mt-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="password">Nueva contraseña</FieldLabel>
          <FieldContent>
            <Input id="password" name="password" type="password" required autoComplete="new-password" />
            <p className="text-xs text-muted-foreground">Mínimo 8 caracteres.</p>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirmar contraseña</FieldLabel>
          <FieldContent>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
            />
          </FieldContent>
        </Field>

        {state.error && <FieldError>{state.error}</FieldError>}

        <Button type="submit" disabled={pending}>
          {pending ? "Guardando…" : "Guardar y entrar"}
        </Button>
      </FieldGroup>
    </form>
  );
}
