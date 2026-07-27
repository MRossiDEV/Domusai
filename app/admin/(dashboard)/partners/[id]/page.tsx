import { notFound } from "next/navigation";
import Link from "next/link";
import { LogIn, Pencil } from "lucide-react";

import { partnersStore, propertiesStore } from "@/app/admin/_lib/store";
import { updatePartnerAction } from "@/app/admin/_lib/actions/partners";
import { impersonatePartnerAction } from "@/app/admin/_lib/actions/impersonate";
import { PageHeader } from "@/app/admin/_components/page-header";
import { PartnerForm } from "@/app/admin/(dashboard)/partners/_components/partner-form";
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

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [partner, properties] = await Promise.all([
    partnersStore.get(id),
    propertiesStore.listByPartner(id),
  ]);
  if (!partner) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={partner.name}
        description="Editá los datos del partner."
        action={
          <div className="flex items-center gap-2">
            <Badge variant={partner.hasAccount ? "default" : "outline"}>
              {partner.hasAccount ? "Cuenta activada" : "Invitación pendiente"}
            </Badge>
            <form action={impersonatePartnerAction.bind(null, partner.id)}>
              <Button type="submit" variant="outline" size="sm">
                <LogIn />
                Entrar como {partner.name.split(" ")[0]}
              </Button>
            </form>
          </div>
        }
      />
      <PartnerForm action={updatePartnerAction.bind(null, id)} partner={partner} />

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-extrabold text-foreground">
          Propiedades asociadas ({properties.length})
        </h2>

        {properties.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Este partner todavía no tiene propiedades asignadas.
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
