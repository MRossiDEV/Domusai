"use client";

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Mail, MessageCircle, Phone } from "lucide-react";

import type { Lead } from "@/app/admin/_lib/types";
import { getAnswerLabel, getQuestionLabel } from "@/lib/wizard-assessment-labels";
import { Button } from "@/components/ui/button";
import { CopyIconButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;
}

export function LeadContactBlock({ lead }: { lead: Lead }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Contacto</p>

      <div className="mt-2 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-foreground">
            <Mail className="size-3.5 text-muted-foreground" />
            {lead.email}
          </span>
          <CopyIconButton value={lead.email} label="Email" />
        </div>

        {lead.phone && (
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-foreground">
              <Phone className="size-3.5 text-muted-foreground" />
              {lead.phone}
            </span>
            <CopyIconButton value={lead.phone} label="Teléfono" />
          </div>
        )}

        <p className="text-muted-foreground">Método preferido: {lead.contactMethod}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" render={<a href={`mailto:${lead.email}`} />}>
          <Mail />
          Email
        </Button>
        {lead.phone && (
          <>
            <Button variant="outline" size="sm" render={<a href={`tel:${lead.phone}`} />}>
              <Phone />
              Llamar
            </Button>
            <Button
              variant="outline"
              size="sm"
              render={<a href={whatsappHref(lead.phone)} target="_blank" rel="noreferrer" />}
            >
              <MessageCircle />
              WhatsApp
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export function LeadAssessmentBlock({
  assessment,
}: {
  assessment: NonNullable<Lead["assessment"]>;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Respuestas de evaluación
      </p>
      <dl className="mt-2 flex flex-col gap-3">
        {Object.entries(assessment).map(([questionId, value]) => (
          <div key={questionId}>
            <dt className="text-muted-foreground">{getQuestionLabel(questionId)}</dt>
            <dd className="mt-0.5 text-foreground">{getAnswerLabel(questionId, value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function LeadMetaBlock({ lead, className }: { lead: Lead; className?: string }) {
  const date = new Date(lead.createdAt);

  return (
    <div className={cn("flex items-center gap-1.5 text-xs text-muted-foreground", className)}>
      <Calendar className="size-3.5" />
      <span>
        Recibido {formatDistanceToNow(date, { addSuffix: true, locale: es })} ·{" "}
        {date.toLocaleString("es-UY", { dateStyle: "medium", timeStyle: "short" })}
      </span>
    </div>
  );
}
