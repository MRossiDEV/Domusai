import { createHmac, timingSafeEqual } from "crypto";

// Admin auth is a direct email+password check against weeggo_admins (see
// actions/auth.ts), decoupled from Supabase Auth entirely — so the signed-in
// state can't live in a Supabase session cookie. This is a small
// self-contained signed-cookie session instead: a JSON payload plus an
// HMAC-SHA256 signature, both base64url-encoded. Node's `crypto` (not Web
// Crypto) is fine here — this Next.js version's proxy.ts defaults to the
// Node.js runtime, not Edge, so the full module is available wherever this
// is imported (proxy.ts, server actions, session.ts).

export const ADMIN_SESSION_COOKIE = "weeggo_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface SessionPayload {
  id: string;
  exp: number;
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set — see .env.example.");
  }
  return secret;
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function sign(payloadB64: string): string {
  return createHmac("sha256", getSecret()).update(payloadB64).digest("base64url");
}

export function signAdminSessionToken(adminId: string): string {
  const payload: SessionPayload = { id: adminId, exp: Date.now() + SESSION_TTL_MS };
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

export function verifyAdminSessionToken(token: string | undefined): { id: string } | null {
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
