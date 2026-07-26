import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { emailLogStore, emailTemplatesStore } from "@/app/admin/_lib/store";
import { deleteTemplateAction } from "@/app/admin/_lib/actions/emails";
import { PageHeader } from "@/app/admin/_components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const logStatusVariant = {
  sent: "default",
  queued: "secondary",
  failed: "destructive",
} as const;

export default async function EmailsPage() {
  const templates = await emailTemplatesStore.list();
  const log = await emailLogStore.list();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Emails"
        description="Plantillas y registro de envíos."
        action={
          <Button render={<Link href="/admin/emails/templates/new" />}>
            <Plus />
            Nueva Plantilla
          </Button>
        }
      />

      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="log">Registro de Envíos</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Asunto</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium text-foreground">{template.name}</TableCell>
                    <TableCell className="text-muted-foreground">{template.subject}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          render={<Link href={`/admin/emails/templates/${template.id}`} />}
                        >
                          <Pencil />
                        </Button>
                        <form action={deleteTemplateAction}>
                          <input type="hidden" name="id" value={template.id} />
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
        </TabsContent>

        <TabsContent value="log">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destinatario</TableHead>
                  <TableHead>Asunto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {log.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-foreground">{entry.recipient}</TableCell>
                    <TableCell className="text-muted-foreground">{entry.subject}</TableCell>
                    <TableCell>
                      <Badge variant={logStatusVariant[entry.status]}>{entry.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(entry.sentAt).toLocaleDateString("es-UY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
