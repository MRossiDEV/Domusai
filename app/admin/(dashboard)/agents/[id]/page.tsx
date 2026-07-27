import { notFound } from "next/navigation";
import Link from "next/link";
import { LogIn, Pencil } from "lucide-react";

import { agentsStore, propertiesStore } from "@/app/admin/_lib/store";
import { updateAgentAction } from "@/app/admin/_lib/actions/agents";
import { impersonateAgentAction } from "@/app/admin/_lib/actions/impersonate";
import { PageHeader } from "@/app/admin/_components/page-header";
import { AgentForm } from "@/app/admin/(dashboard)/agents/_components/agent-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusVariant = {
  published: "default",
  draft: "secondary",
  "off-market": "outline",
} as const;

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [agent, properties] = await Promise.all([agentsStore.get(id), propertiesStore.listByAgent(id)]);
  if (!agent) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={agent.name}
        description="Editá los datos del agente."
        action={
          <div className="flex items-center gap-2">
            <Badge variant={agent.hasAccount ? "default" : "outline"}>
              {agent.hasAccount ? "Cuenta activada" : "Invitación pendiente"}
            </Badge>
            <form action={impersonateAgentAction.bind(null, agent.id)}>
              <Button type="submit" variant="outline" size="sm">
                <LogIn />
                Entrar como {agent.name.split(" ")[0]}
              </Button>
            </form>
          </div>
        }
      />
      <AgentForm action={updateAgentAction.bind(null, id)} agent={agent} />

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-extrabold text-foreground">
          Propiedades asignadas ({properties.length})
        </h2>

        {properties.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Este agente todavía no tiene propiedades asignadas.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Barrio</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium text-foreground">{property.title}</TableCell>
                    <TableCell className="text-muted-foreground">{property.city}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {property.currency} {property.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[property.status]}>{property.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        render={<Link href={`/admin/properties/${property.id}`} />}
                      >
                        <Pencil />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
