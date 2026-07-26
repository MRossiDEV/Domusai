import { CheckCircle2, Inbox, MailCheck, Users } from "lucide-react";

import { getMyLeads } from "@/app/agent/_lib/queries";
import { PageHeader } from "@/app/admin/_components/page-header";
import { StatCard } from "@/app/admin/_components/stat-card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const leadStatusVariant = {
  new: "default",
  contacted: "secondary",
  closed: "outline",
} as const;

export default async function AgentDashboardPage() {
  const leads = await getMyLeads();

  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const closedCount = leads.filter((l) => l.status === "closed").length;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard" description="Resumen de tus leads asignados." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Leads Totales" value={leads.length} icon={Users} />
        <StatCard label="Nuevos" value={newCount} icon={Inbox} />
        <StatCard label="Contactados" value={contactedCount} icon={MailCheck} />
        <StatCard label="Cerrados" value={closedCount} icon={CheckCircle2} />
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-medium text-foreground">Leads Recientes</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.slice(0, 5).map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.fullName}</TableCell>
                <TableCell className="text-muted-foreground">
                  {lead.source === "wizard" ? "Wizard" : "Contacto"}
                </TableCell>
                <TableCell>
                  <Badge variant={leadStatusVariant[lead.status]}>{lead.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
