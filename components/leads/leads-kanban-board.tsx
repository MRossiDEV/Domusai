"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { GripVertical } from "lucide-react";

import type { Agent, Lead, LeadStatus } from "@/app/admin/_lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const columns: { status: LeadStatus; label: string }[] = [
  { status: "new", label: "Nuevo" },
  { status: "contacted", label: "Contactado" },
  { status: "closed", label: "Cerrado" },
];

function LeadKanbanCard({
  lead,
  agent,
  onOpenDetail,
}: {
  lead: Lead;
  agent?: Agent;
  onOpenDetail: (lead: Lead) => void;
}) {
  return (
    <button
      type="button"
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", lead.id);
        event.dataTransfer.effectAllowed = "move";
      }}
      onClick={() => onOpenDetail(lead)}
      className="flex w-full cursor-grab flex-col gap-1.5 rounded-lg border border-border bg-background p-3 text-left text-sm transition-colors hover:border-accent/50 active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-foreground">{lead.fullName}</span>
        <GripVertical className="size-3.5 shrink-0 text-muted-foreground" />
      </div>
      <span className="truncate text-xs text-muted-foreground">{lead.email}</span>
      <div className="mt-1 flex flex-wrap items-center gap-1.5">
        <Badge variant="outline" className="text-[10px]">
          {lead.source === "wizard" ? "Wizard" : "Contacto"}
        </Badge>
        {agent && (
          <Badge variant="secondary" className="text-[10px]">
            {agent.name}
          </Badge>
        )}
      </div>
      <span className="text-[11px] text-muted-foreground">
        {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true, locale: es })}
      </span>
    </button>
  );
}

function KanbanColumn({
  status,
  label,
  leads,
  agentById,
  onOpenDetail,
  onDropLead,
}: {
  status: LeadStatus;
  label: string;
  leads: Lead[];
  agentById?: Map<string, Agent>;
  onOpenDetail: (lead: Lead) => void;
  onDropLead: (leadId: string, status: LeadStatus) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragOver(false);
        const leadId = event.dataTransfer.getData("text/plain");
        if (leadId) onDropLead(leadId, status);
      }}
      className={cn(
        "flex min-h-[16rem] flex-1 flex-col gap-2 rounded-xl border border-border bg-card p-3 transition-colors",
        isDragOver && "border-accent bg-accent/5"
      )}
    >
      <div className="mb-1 flex items-center justify-between px-1">
        <h3 className="text-sm font-medium text-foreground">{label}</h3>
        <Badge variant="outline">{leads.length}</Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        {leads.length === 0 ? (
          <p className="px-1 text-xs text-muted-foreground">Sin leads</p>
        ) : (
          leads.map((lead) => (
            <LeadKanbanCard
              key={lead.id}
              lead={lead}
              agent={lead.assignedAgentId ? agentById?.get(lead.assignedAgentId) : undefined}
              onOpenDetail={onOpenDetail}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function LeadsKanbanBoard({
  leads,
  agentById,
  onOpenDetail,
  onStatusChange,
}: {
  leads: Lead[];
  agentById?: Map<string, Agent>;
  onOpenDetail: (lead: Lead) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
}) {
  function handleDrop(leadId: string, status: LeadStatus) {
    const lead = leads.find((l) => l.id === leadId);
    if (lead && lead.status !== status) {
      onStatusChange(leadId, status);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          status={column.status}
          label={column.label}
          leads={leads.filter((lead) => lead.status === column.status)}
          agentById={agentById}
          onOpenDetail={onOpenDetail}
          onDropLead={handleDrop}
        />
      ))}
    </div>
  );
}
