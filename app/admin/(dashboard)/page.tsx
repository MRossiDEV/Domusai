import Link from "next/link";
import { Building2, UserCog, Users, CheckCircle2 } from "lucide-react";

import { agentsStore, leadsStore, propertiesStore } from "@/app/admin/_lib/store";
import { PageHeader } from "@/app/admin/_components/page-header";
import { StatCard } from "@/app/admin/_components/stat-card";
import { LeadsChart } from "@/app/admin/_components/leads-chart";
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

const leadSourceLabel = {
  wizard: "Wizard",
  contact: "Contacto",
  sell: "Vender",
} as const;

export default async function AdminDashboardPage() {
  const properties = await propertiesStore.list();
  const leads = await leadsStore.list();
  const agents = await agentsStore.list();

  const publishedCount = properties.filter((p) => p.status === "published").length;
  const sevenDaysAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
  const newLeadsCount = leads.filter((l) => l.createdAt >= sevenDaysAgo).length;
  const activeAgentsCount = agents.filter((a) => a.active).length;

  const chartData = Array.from({ length: 14 }).map((_, index) => {
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);
    dayStart.setDate(dayStart.getDate() - (13 - index));
    const dayEnd = dayStart.getTime() + 24 * 60 * 60 * 1000;

    const count = leads.filter(
      (l) => l.createdAt >= dayStart.getTime() && l.createdAt < dayEnd
    ).length;

    return {
      date: dayStart.toLocaleDateString("es-UY", { day: "2-digit", month: "2-digit" }),
      count,
    };
  });

  const recentLeads = leads.slice(0, 5);
  const recentProperties = properties.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Resumen general de propiedades, leads y agentes."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Propiedades Totales" value={properties.length} icon={Building2} />
        <StatCard label="Propiedades Publicadas" value={publishedCount} icon={CheckCircle2} />
        <StatCard label="Leads Nuevos (7 días)" value={newLeadsCount} icon={Users} />
        <StatCard label="Agentes Activos" value={activeAgentsCount} icon={UserCog} />
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-medium text-foreground">Leads por día (últimos 14 días)</h2>
        <LeadsChart data={chartData} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Leads Recientes</h2>
            <Link href="/admin/leads" className="text-xs text-accent hover:underline">
              Ver todos
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {leadSourceLabel[lead.source]}
                  </TableCell>
                  <TableCell>
                    <Badge variant={leadStatusVariant[lead.status]}>{lead.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Propiedades Recientes</h2>
            <Link href="/admin/properties" className="text-xs text-accent hover:underline">
              Ver todas
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Ciudad</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.title}</TableCell>
                  <TableCell className="text-muted-foreground">{property.city}</TableCell>
                  <TableCell>
                    <Badge variant={property.status === "published" ? "default" : "outline"}>
                      {property.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
