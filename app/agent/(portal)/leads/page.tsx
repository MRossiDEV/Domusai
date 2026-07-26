import { getMyLeads } from "@/app/agent/_lib/queries";
import { PageHeader } from "@/app/admin/_components/page-header";
import { AgentLeadsTable } from "@/app/agent/(portal)/leads/_components/leads-table";

export default async function AgentLeadsPage() {
  const leads = await getMyLeads();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Mis Leads" description={`${leads.length} contactos asignados`} />
      <AgentLeadsTable leads={leads} />
    </div>
  );
}
