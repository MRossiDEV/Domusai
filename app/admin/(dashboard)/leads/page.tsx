import { agentsStore, leadsStore } from "@/app/admin/_lib/store";
import { PageHeader } from "@/app/admin/_components/page-header";
import { LeadsTable } from "@/app/admin/(dashboard)/leads/_components/leads-table";

export default async function LeadsPage() {
  const [leads, agents] = await Promise.all([leadsStore.list(), agentsStore.list()]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Leads" description={`${leads.length} contactos recibidos`} />
      <LeadsTable leads={leads} agents={agents} />
    </div>
  );
}
