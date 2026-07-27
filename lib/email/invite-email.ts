import { sendEmail } from "./send-email";
import { signInviteToken, type InviteAccountType } from "@/lib/invite-token";
import { siteConfig } from "@/lib/seo";

const PORTAL_LABEL: Record<InviteAccountType, string> = {
  agent: "el portal de agentes",
  partner: "el portal de partners",
};

const PORTAL_PATH: Record<InviteAccountType, string> = {
  agent: "/agent/set-password",
  partner: "/partner/set-password",
};

/** siteConfig.url is the hardcoded production domain — override for local/preview so invite links actually work there. */
function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";
  return siteConfig.url;
}

export async function sendAccountInviteEmail(type: InviteAccountType, id: string, name: string, email: string) {
  const token = signInviteToken(type, id);
  const url = `${getBaseUrl()}${PORTAL_PATH[type]}?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Te invitaron a WEEGGO",
    text: `Hola ${name},\n\nCreamos tu cuenta para acceder a ${PORTAL_LABEL[type]} de WEEGGO. Entrá a este link para elegir tu contraseña:\n\n${url}\n\nEste link vence en 7 días.\n\n— WEEGGO`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #18181B;">Te invitaron a WEEGGO</h2>
        <p>Hola ${name},</p>
        <p>Creamos tu cuenta para acceder a ${PORTAL_LABEL[type]} de WEEGGO. Hacé clic abajo para elegir tu contraseña.</p>
        <p style="margin: 24px 0;">
          <a href="${url}" style="background: #4F46E5; color: #fff; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: bold;">
            Elegir contraseña
          </a>
        </p>
        <p style="color: #71717A; font-size: 13px;">Este link vence en 7 días.</p>
      </div>
    `,
  });
}
