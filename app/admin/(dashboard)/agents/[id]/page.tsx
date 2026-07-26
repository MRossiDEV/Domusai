import { notFound } from "next/navigation";

import { agentsStore } from "@/app/admin/_lib/store";
import { updateAgentAction } from "@/app/admin/_lib/actions/agents";
import { PageHeader } from "@/app/admin/_components/page-header";
import { AgentForm } from "@/app/admin/(dashboard)/agents/_components/agent-form";
import { Badge } from "@/components/ui/badge";

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = await agentsStore.get(id);
  if (!agent) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={agent.name}
        description="Editá los datos del agente."
        action={
          <Badge variant={agent.hasAccount ? "default" : "outline"}>
            {agent.hasAccount ? "Cuenta vinculada" : "Sin vincular"}
          </Badge>
        }
      />
      <AgentForm action={updateAgentAction.bind(null, id)} agent={agent} />
    </div>
  );
}
