import Link from "next/link";
import { ShieldAlert } from "lucide-react";

/**
 * Shown in the agent/partner portal when the visitor also holds a valid
 * admin session — i.e. an admin used "Entrar como" (see
 * app/admin/_lib/actions/impersonate.ts) rather than the account itself
 * logging in. Purely informational + a quick way back; doesn't change
 * anything about which session is authoritative for this page.
 */
export function ImpersonationBanner() {
  return (
    <div className="flex items-center justify-center gap-2 bg-amber-500/15 px-4 py-2 text-center text-xs font-medium text-amber-600 dark:text-amber-400">
      <ShieldAlert className="size-3.5 shrink-0" />
      Estás viendo este portal como administrador.
      <Link href="/admin" className="underline underline-offset-2">
        Volver al panel de administración
      </Link>
    </div>
  );
}
