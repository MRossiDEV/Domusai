import Image from "next/image";
import { Star } from "lucide-react";

import { getMyPartnerProperties } from "@/app/partner/_lib/queries";
import { PageHeader } from "@/app/admin/_components/page-header";
import { Badge } from "@/components/ui/badge";
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

export default async function PartnerDashboardPage() {
  const properties = await getMyPartnerProperties();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Mis Propiedades" description={`${properties.length} propiedades asociadas`} />

      {properties.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Todavía no tenés propiedades asociadas a tu cuenta.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Barrio</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Destacada</TableHead>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
