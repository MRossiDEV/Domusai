import { createHmac, timingSafeEqual } from "crypto";

// Mirrors app/admin/_lib/admin-session.ts / app/agent/_lib/agent-session.ts
// exactly, with its own cookie name and secret — the three signing domains
// stay fully separate so a leaked/forged session for one role can never
// grant access to another.

export const PARTNER_SESSION_COOKIE = "weeggo_partner_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface SessionPayload {
  id: string;
  exp: number;
}

function getSecret(): string {
  const secret = process.env.PARTNER_SESSION_SECRET;
  if (!secret) {
    throw new Error("PARTNER_SESSION_SECRET is not set — see .env.example.");
  }
  return secret;
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function sign(payloadB64: string): string {
  return createHmac("sha256", getSecret()).update(payloadB64).digest("base64url");
}

export function signPartnerSessionToken(partnerId: string): string {
  const payload: SessionPayload = { id: partnerId, exp: Date.now() + SESSION_TTL_MS };
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

export function verifyPartnerSessionToken(token: string | undefined): { id: string } | null {
  if (!token) return null;

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const expectedSignature = sign(payloadB64);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  if (typeof payload.id !== "string" || typeof payload.exp !== "number") return null;
  if (Date.now() > payload.exp) return null;

  return { id: payload.id };
}
