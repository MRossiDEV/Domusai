import Link from "next/link";
import { LogIn, Pencil, Plus, Trash2 } from "lucide-react";

import { agentsStore, propertiesStore } from "@/app/admin/_lib/store";
import { deleteAgentAction } from "@/app/admin/_lib/actions/agents";
import { impersonateAgentAction } from "@/app/admin/_lib/actions/impersonate";
import { PageHeader } from "@/app/admin/_components/page-header";
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

export default async function AgentsPage() {
  const [agents, properties] = await Promise.all([agentsStore.list(), propertiesStore.list()]);

  const propertyCountByAgent = new Map<string, number>();
  for (const property of properties) {
    if (!property.agentId) continue;
    propertyCountByAgent.set(property.agentId, (propertyCountByAgent.get(property.agentId) ?? 0) + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Agentes"
        description={`${agents.length} agentes registrados`}
        action={
          <Button render={<Link href="/admin/agents/new" />}>
            <Plus />
            Nuevo Agente
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Cuenta</TableHead>
              <TableHead>Propiedades</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium text-foreground">{agent.name}</TableCell>
                <TableCell className="text-muted-foreground">{agent.email}</TableCell>
                <TableCell>
                  <Badge variant={agent.role === "admin" ? "default" : "outline"}>{agent.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={agent.active ? "default" : "secondary"}>
                    {agent.active ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={agent.hasAccount ? "default" : "outline"}>
                    {agent.hasAccount ? "Activada" : "Invitación pendiente"}
                  </Badge>
                </TableCell>
                <TableCell className="font-weeggo-mono text-muted-foreground">
                  {propertyCountByAgent.get(agent.id) ?? 0}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <form action={impersonateAgentAction.bind(null, agent.id)}>
                      <Button variant="ghost" size="icon-sm" type="submit" title={`Entrar como ${agent.name}`}>
                        <LogIn />
                      </Button>
                    </form>
                    <Button variant="ghost" size="icon-sm" render={<Link href={`/admin/agents/${agent.id}`} />}>
                      <Pencil />
                    </Button>
                    <form action={deleteAgentAction}>
                      <input type="hidden" name="id" value={agent.id} />
                      <Button variant="ghost" size="icon-sm" type="submit">
                        <Trash2 />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
