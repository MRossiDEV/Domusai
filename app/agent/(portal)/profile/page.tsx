import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { siteConfig } from "@/lib/seo";
import { getMyAgentProfile } from "@/app/agent/_lib/queries";
import { PageHeader } from "@/app/admin/_components/page-header";
import { ProfileForm } from "@/app/agent/(portal)/profile/_components/profile-form";
import { CopyIconButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";

export default async function AgentProfilePage() {
  const agent = await getMyAgentProfile();

  if (!agent) {
    return null;
  }

  const publicUrl = `${siteConfig.url}/agents/${agent.slug}`;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Mi Perfil" description="Gestioná tu información y tu perfil público." />

      <div className="max-w-xl rounded-xl border border-border bg-card p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Tu link público</p>
        <div className="mt-2 flex items-center gap-2">
          <code className="flex-1 truncate rounded-md bg-muted px-3 py-2 text-sm text-foreground">
            {publicUrl}
          </code>
          <CopyIconButton value={publicUrl} label="Link" />
          <Button
            variant="outline"
            size="icon-sm"
            render={<Link href={`/agents/${agent.slug}`} target="_blank" rel="noreferrer" />}
          >
            <ExternalLink />
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Compartí este link con tus clientes para que vean tu perfil y tus propiedades publicadas.
        </p>
      </div>

      <ProfileForm agent={agent} />
    </div>
  );
}
