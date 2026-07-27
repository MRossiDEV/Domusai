"use client";

import { useActionState } from "react";

import { signInAdminAction } from "@/app/admin/_lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signInAdminAction, {});

  return (
    <div className="theme-weeggo flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
        <h1 className="text-2xl font-extrabold text-foreground">
          WEEGG<span className="text-accent">O</span> Admin
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ingresá tu email y contraseña para acceder al panel de administración.
        </p>

        <form action={formAction} className="mt-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <FieldContent>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </FieldContent>
            </Field>

            {state.error && <FieldError>{state.error}</FieldError>}

            <Button type="submit" disabled={pending}>
              {pending ? "Ingresando…" : "Ingresar"}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
