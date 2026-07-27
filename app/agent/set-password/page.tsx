import { verifyInviteToken } from "@/lib/invite-token";
import { setAgentPasswordAction } from "@/app/agent/_lib/actions/auth";
import { SetPasswordForm } from "./_components/set-password-form";

export default async function AgentSetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const token = typeof sp.token === "string" ? sp.token : "";
  const invite = verifyInviteToken(token, "agent");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
        <h1 className="font-serif text-2xl text-foreground">Portal de Agentes</h1>

        {invite ? (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Elegí una contraseña para completar tu cuenta.
            </p>
            <SetPasswordForm action={setAgentPasswordAction.bind(null, token)} />
          </>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Este link no es válido o venció. Pedile a un administrador que te reenvíe la invitación.
          </p>
        )}
      </div>
    </div>
  );
}
