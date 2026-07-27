"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { Agent, AgentRole } from "@/app/admin/_lib/types";
import type { AgentFormState } from "@/app/admin/_lib/actions/agents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const roleOptions: { value: AgentRole; label: string }[] = [
  { value: "agent", label: "Agente" },
  { value: "admin", label: "Administrador" },
];

export function AgentForm({
  action,
  agent,
}: {
  action: (state: AgentFormState, formData: FormData) => Promise<AgentFormState>;
  agent?: Agent;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const roleItems = Object.fromEntries(roleOptions.map((o) => [o.value, o.label]));

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <Link
        href="/admin/agents"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver a Agentes
      </Link>

      <FieldGroup className="max-w-xl rounded-xl border border-border bg-card p-6">
        <Field>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <FieldContent>
            <Input id="name" name="name" defaultValue={agent?.name} required />
          </FieldContent>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
              <Input id="email" name="email" type="email" defaultValue={agent?.email} required />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
            <FieldContent>
              <Input id="phone" name="phone" defaultValue={agent?.phone} />
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="role">Rol</FieldLabel>
            <FieldContent>
              <Select name="role" items={roleItems} defaultValue={agent?.role ?? "agent"}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="active">Activo</FieldLabel>
            </FieldContent>
            <Switch id="active" name="active" defaultChecked={agent?.active ?? true} />
          </Field>
        </div>

        {state.error && <FieldError>{state.error}</FieldError>}

        <div className="flex gap-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : agent ? "Guardar cambios" : "Crear agente"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
