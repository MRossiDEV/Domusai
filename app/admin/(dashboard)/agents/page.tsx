import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { agentsStore } from "@/app/admin/_lib/store";
import { deleteAgentAction } from "@/app/admin/_lib/actions/agents";
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
  const agents = await agentsStore.list();

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
                    {agent.hasAccount ? "Vinculada" : "Sin vincular"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
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
