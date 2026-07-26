import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";

import { propertiesStore } from "@/app/admin/_lib/store";
import { deletePropertyAction } from "@/app/admin/_lib/actions/properties";
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

const statusVariant = {
  published: "default",
  draft: "secondary",
  "off-market": "outline",
} as const;

export default async function PropertiesPage() {
  const properties = await propertiesStore.list();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Propiedades"
        description={`${properties.length} propiedades en total`}
        action={
          <Button render={<Link href="/admin/properties/new" />}>
            <Plus />
            Nueva Propiedad
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Destacada</TableHead>
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
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-foreground">{property.title}</TableCell>
                <TableCell className="text-muted-foreground">{property.city}</TableCell>
                <TableCell className="text-muted-foreground">
                  {property.currency} {property.price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[property.status]}>{property.status}</Badge>
                </TableCell>
                <TableCell>
                  {property.featured && <Star className="size-4 text-accent" fill="currentColor" />}
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
