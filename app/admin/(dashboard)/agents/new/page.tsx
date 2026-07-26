import { createAgentAction } from "@/app/admin/_lib/actions/agents";
import { PageHeader } from "@/app/admin/_components/page-header";
import { AgentForm } from "@/app/admin/(dashboard)/agents/_components/agent-form";

export default function NewAgentPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Nuevo Agente" description="Agregá un agente o administrador." />
      <AgentForm action={createAgentAction} />
    </div>
  );
}
