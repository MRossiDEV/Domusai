"use client";

import { useState, useTransition } from "react";
import { Eye, Kanban, List, UserCog } from "lucide-react";

import type { Agent, Lead, LeadSource, LeadStatus } from "@/app/admin/_lib/types";
import { assignLeadAgentAction, updateLeadStatusAction } from "@/app/admin/_lib/actions/leads";
import {
  LeadAssessmentBlock,
  LeadContactBlock,
  LeadMetaBlock,
} from "@/components/leads/lead-detail-blocks";
import { LeadsKanbanBoard } from "@/components/leads/leads-kanban-board";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "Nuevo" },
  { value: "contacted", label: "Contactado" },
  { value: "closed", label: "Cerrado" },
];

const statusVariant = {
  new: "default",
  contacted: "secondary",
  closed: "outline",
} as const;

const sourceLabel: Record<LeadSource, string> = {
  wizard: "Wizard",
  contact: "Contacto",
  sell: "Vender",
};

const sourceOrigin: Record<LeadSource, string> = {
  wizard: "Enviado desde el wizard",
  contact: "Enviado desde el formulario de contacto",
  sell: "Enviado desde el wizard de venta",
};

function LeadStatusSelect({ id, status }: { id: string; status: LeadStatus }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string | null) {
    if (!value) return;
    const formData = new FormData();
    formData.set("id", id);
    formData.set("status", value);
    startTransition(() => {
      updateLeadStatusAction(formData);
    });
  }

  return (
    <Select defaultValue={status} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger size="sm" className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function AgentAssignSelect({
  leadId,
  agentId,
  agents,
}: {
  leadId: string;
  agentId?: string;
  agents: Agent[];
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string | null) {
    const formData = new FormData();
    formData.set("id", leadId);
    formData.set("agentId", value === "unassigned" ? "" : (value ?? ""));
    startTransition(() => {
      assignLeadAgentAction(formData);
    });
  }

  return (
    <Select defaultValue={agentId ?? "unassigned"} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger size="sm" className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">Sin asignar</SelectItem>
        {agents.map((agent) => (
          <SelectItem key={agent.id} value={agent.id}>
            {agent.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function changeLeadStatus(id: string, status: LeadStatus) {
  const formData = new FormData();
  formData.set("id", id);
  formData.set("status", status);
  updateLeadStatusAction(formData);
}

export function LeadsTable({ leads, agents }: { leads: Lead[]; agents: Agent[] }) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const agentById = new Map(agents.map((agent) => [agent.id, agent]));

  return (
    <>
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">
            <List />
            Lista
          </TabsTrigger>
          <TabsTrigger value="kanban">
            <Kanban />
            Kanban
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Agente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Detalle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium text-foreground">{lead.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {sourceLabel[lead.source]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lead.assignedAgentId
                      ? (agentById.get(lead.assignedAgentId)?.name ?? "—")
                      : "Sin asignar"}
                  </TableCell>
                  <TableCell>
                    <LeadStatusSelect id={lead.id} status={lead.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon-sm" onClick={() => setSelectedLead(lead)}>
                      <Eye />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </TabsContent>

        <TabsContent value="kanban">
          <LeadsKanbanBoard
            leads={leads}
            agentById={agentById}
            onOpenDetail={setSelectedLead}
            onStatusChange={changeLeadStatus}
          />
        </TabsContent>
      </Tabs>

      <Sheet open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <SheetContent className="gap-0">
          {selectedLead && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedLead.fullName}</SheetTitle>
                <SheetDescription>
                  {sourceOrigin[selectedLead.source]}
                </SheetDescription>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant={statusVariant[selectedLead.status]}>
                    {statusOptions.find((o) => o.value === selectedLead.status)?.label}
                  </Badge>
                </div>
              </SheetHeader>

              <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4 text-sm">
                <LeadContactBlock lead={selectedLead} />

                <Separator />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="mb-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                      Estado
                    </p>
                    <LeadStatusSelect id={selectedLead.id} status={selectedLead.status} />
                  </div>
                  <div>
                    <p className="mb-1.5 flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
                      <UserCog className="size-3.5" />
                      Agente
                    </p>
                    <AgentAssignSelect
                      leadId={selectedLead.id}
                      agentId={selectedLead.assignedAgentId}
                      agents={agents}
                    />
                  </div>
                </div>

                {selectedLead.message && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Mensaje
                      </p>
                      <p className="mt-1 text-foreground">{selectedLead.message}</p>
                    </div>
                  </>
                )}

                {selectedLead.assessment && (
                  <>
                    <Separator />
                    <LeadAssessmentBlock assessment={selectedLead.assessment} />
                  </>
                )}

                <Separator />
                <LeadMetaBlock lead={selectedLead} />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
