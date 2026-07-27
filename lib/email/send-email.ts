import "server-only";
import nodemailer from "nodemailer";

/**
 * Thin SMTP wrapper (Forward Email, but any SMTP provider works) used for
 * account-invite emails. Missing credentials don't throw — they log a
 * warning and no-op, so the invite flow (and whatever server action
 * triggered it) still completes structurally before the real SMTP
 * credentials are wired in, instead of every admin action that creates an
 * agent/partner blowing up.
 */
export async function sendEmail(options: { to: string; subject: string; html: string; text: string }): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !password || !from) {
    console.warn(
      `[email] SMTP not configured — skipped sending "${options.subject}" to ${options.to}. Set SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASSWORD/EMAIL_FROM in .env.local.`
    );
    return;
  }

  const transport = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass: password },
  });

  await transport.sendMail({
    from: `WEEGGO <${from}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}
