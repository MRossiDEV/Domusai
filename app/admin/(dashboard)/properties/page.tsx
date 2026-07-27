import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";

import { agentsStore, partnersStore, propertiesStore } from "@/app/admin/_lib/store";
import { deletePropertyAction } from "@/app/admin/_lib/actions/properties";
import type { PropertyStatus, PropertyType } from "@/app/admin/_lib/types";
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
import { CITIES, DEPARTMENTS, NEIGHBORHOODS, PROPERTY_TYPES } from "@/lib/discover/constants";

const statusVariant = {
  published: "default",
  draft: "secondary",
  "off-market": "outline",
} as const;

const statusOptions: { value: PropertyStatus; label: string }[] = [
  { value: "draft", label: "Borrador" },
  { value: "published", label: "Publicada" },
  { value: "off-market", label: "Fuera de mercado" },
];

const fieldClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-muted px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-ring/50";

function getParam(searchParams: { [key: string]: string | string[] | undefined }, key: string) {
  const value = searchParams[key];
  const single = Array.isArray(value) ? value[0] : value;
  return single && single !== "" ? single : undefined;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const status = getParam(sp, "status") as PropertyStatus | undefined;
  const propertyType = getParam(sp, "propertyType") as PropertyType | undefined;
  const city = getParam(sp, "city");
  const locality = getParam(sp, "locality");
  const department = getParam(sp, "department");
  const agentId = getParam(sp, "agentId");
  const partnerId = getParam(sp, "partnerId");
  const hasActiveFilters = !!(
    status ||
    propertyType ||
    city ||
    locality ||
    department ||
    agentId ||
    partnerId
  );

  const [properties, agents, partners] = await Promise.all([
    propertiesStore.list({ status, propertyType, city, locality, department, agentId, partnerId }),
    agentsStore.list(),
    partnersStore.list(),
  ]);

  const agentNameById = new Map(agents.map((agent) => [agent.id, agent.name]));
  const partnerNameById = new Map(partners.map((partner) => [partner.id, partner.name]));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Propiedades"
        description={`${properties.length} propiedades${hasActiveFilters ? " (filtradas)" : " en total"}`}
        action={
          <Button render={<Link href="/admin/properties/new" />}>
            <Plus />
            Nueva Propiedad
          </Button>
        }
      />

      <form
        method="get"
        className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4"
      >
        <div className="flex w-40 flex-col gap-1.5">
          <label htmlFor="status" className="text-xs font-medium text-muted-foreground">
            Estado
          </label>
          <select id="status" name="status" defaultValue={status ?? ""} className={fieldClassName}>
            <option value="">Todos</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-40 flex-col gap-1.5">
          <label htmlFor="propertyType" className="text-xs font-medium text-muted-foreground">
            Tipo
          </label>
          <select
            id="propertyType"
            name="propertyType"
            defaultValue={propertyType ?? ""}
            className={fieldClassName}
          >
            <option value="">Todos</option>
            {PROPERTY_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-40 flex-col gap-1.5">
          <label htmlFor="city" className="text-xs font-medium text-muted-foreground">
            Barrio
          </label>
          <select id="city" name="city" defaultValue={city ?? ""} className={fieldClassName}>
            <option value="">Todos</option>
            {NEIGHBORHOODS.map((hood) => (
              <option key={hood} value={hood}>
                {hood}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-40 flex-col gap-1.5">
          <label htmlFor="locality" className="text-xs font-medium text-muted-foreground">
            Ciudad
          </label>
          <select id="locality" name="locality" defaultValue={locality ?? ""} className={fieldClassName}>
            <option value="">Todas</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-40 flex-col gap-1.5">
          <label htmlFor="department" className="text-xs font-medium text-muted-foreground">
            Departamento
          </label>
          <select id="department" name="department" defaultValue={department ?? ""} className={fieldClassName}>
            <option value="">Todos</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-40 flex-col gap-1.5">
          <label htmlFor="agentId" className="text-xs font-medium text-muted-foreground">
            Agente
          </label>
          <select id="agentId" name="agentId" defaultValue={agentId ?? ""} className={fieldClassName}>
            <option value="">Todos</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-40 flex-col gap-1.5">
          <label htmlFor="partnerId" className="text-xs font-medium text-muted-foreground">
            Partner
          </label>
          <select id="partnerId" name="partnerId" defaultValue={partnerId ?? ""} className={fieldClassName}>
            <option value="">Todos</option>
            {partners.map((partner) => (
              <option key={partner.id} value={partner.id}>
                {partner.name}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="outline" size="sm">
          Filtrar
        </Button>
        {hasActiveFilters && (
          <Button type="button" variant="ghost" size="sm" render={<Link href="/admin/properties" />}>
            Limpiar
          </Button>
        )}
      </form>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Barrio</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Destacada</TableHead>
              <TableHead>Agente</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>
                  <div className="relative size-10 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      sizes="50px"
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-foreground">{property.title}</TableCell>
                <TableCell className="text-muted-foreground">{property.city}</TableCell>
                <TableCell className="text-muted-foreground">{property.locality ?? "—"}</TableCell>
                <TableCell className="text-muted-foreground">{property.department ?? "—"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {property.currency} {property.price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[property.status]}>{property.status}</Badge>
                </TableCell>
                <TableCell>
                  {property.featured && <Star className="size-4 text-accent" fill="currentColor" />}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {property.agentId ? (agentNameById.get(property.agentId) ?? "—") : "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {property.partnerId ? (partnerNameById.get(property.partnerId) ?? "—") : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      render={<Link href={`/admin/properties/${property.id}`} />}
                    >
                      <Pencil />
                    </Button>
                    <form action={deletePropertyAction}>
                      <input type="hidden" name="id" value={property.id} />
                      <Button variant="ghost" size="icon-sm" type="submit">
                        <Trash2 />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {properties.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="py-8 text-center text-sm text-muted-foreground">
                  Ninguna propiedad coincide con estos filtros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
