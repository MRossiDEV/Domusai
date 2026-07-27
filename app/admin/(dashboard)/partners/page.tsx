import Link from "next/link";
import { LogIn, Pencil, Plus, Trash2 } from "lucide-react";

import { partnersStore, propertiesStore } from "@/app/admin/_lib/store";
import { deletePartnerAction } from "@/app/admin/_lib/actions/partners";
import { impersonatePartnerAction } from "@/app/admin/_lib/actions/impersonate";
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

export default async function PartnersPage() {
  const [partners, properties] = await Promise.all([partnersStore.list(), propertiesStore.list()]);

  const propertyCountByPartner = new Map<string, number>();
  for (const property of properties) {
    if (!property.partnerId) continue;
    propertyCountByPartner.set(property.partnerId, (propertyCountByPartner.get(property.partnerId) ?? 0) + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Partners"
        description={`${partners.length} partners registrados`}
        action={
          <Button render={<Link href="/admin/partners/new" />}>
            <Plus />
            Nuevo Partner
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Cuenta</TableHead>
              <TableHead>Propiedades</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell className="font-medium text-foreground">{partner.name}</TableCell>
                <TableCell className="text-muted-foreground">{partner.contactName || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{partner.email || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{partner.phone || "—"}</TableCell>
                <TableCell>
                  <Badge variant={partner.active ? "default" : "secondary"}>
                    {partner.active ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={partner.hasAccount ? "default" : "outline"}>
                    {partner.hasAccount ? "Activada" : "Invitación pendiente"}
                  </Badge>
                </TableCell>
                <TableCell className="font-weeggo-mono text-muted-foreground">
                  {propertyCountByPartner.get(partner.id) ?? 0}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <form action={impersonatePartnerAction.bind(null, partner.id)}>
                      <Button variant="ghost" size="icon-sm" type="submit" title={`Entrar como ${partner.name}`}>
                        <LogIn />
                      </Button>
                    </form>
                    <Button variant="ghost" size="icon-sm" render={<Link href={`/admin/partners/${partner.id}`} />}>
                      <Pencil />
                    </Button>
                    <form action={deletePartnerAction}>
                      <input type="hidden" name="id" value={partner.id} />
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
