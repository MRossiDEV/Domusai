import { settingsStore } from "@/app/admin/_lib/store";
import { PageHeader } from "@/app/admin/_components/page-header";
import { SettingsForm } from "@/app/admin/(dashboard)/settings/_components/settings-form";

export default async function SettingsPage() {
  const settings = await settingsStore.get();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Configuración" description="Datos generales del sitio." />
      <SettingsForm settings={settings} />
    </div>
  );
}
