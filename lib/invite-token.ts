import { createHmac, timingSafeEqual } from "crypto";

/**
 * Signed, stateless "set your password" invite links for agents and
 * partners — no admin self-registration, so this is the only way either
 * account type ever gets a first password. One shared secret; the account
 * type lives in the payload so a single module covers both roles instead of
 * duplicating this for each, unlike the session tokens (which intentionally
 * use separate per-role secrets since those gate ongoing access, not a
 * single one-time action).
 */

export type InviteAccountType = "agent" | "partner";

const INVITE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days — generous, since email delivery/pickup isn't instant

interface InvitePayload {
  type: InviteAccountType;
  id: string;
  exp: number;
}

function getSecret(): string {
  const secret = process.env.INVITE_TOKEN_SECRET;
  if (!secret) {
    throw new Error("INVITE_TOKEN_SECRET is not set — see .env.example.");
  }
  return secret;
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function sign(payloadB64: string): string {
  return createHmac("sha256", getSecret()).update(payloadB64).digest("base64url");
}

export function signInviteToken(type: InviteAccountType, id: string): string {
  const payload: InvitePayload = { type, id, exp: Date.now() + INVITE_TTL_MS };
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

export function verifyInviteToken(
  token: string | undefined,
  expectedType: InviteAccountType
): { id: string } | null {
  if (!token) return null;

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const expectedSignature = sign(payloadB64);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  let payload: InvitePayload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  if (typeof payload.id !== "string" || typeof payload.exp !== "number") return null;
  if (payload.type !== expectedType) return null;
  if (Date.now() > payload.exp) return null;

  return { id: payload.id };
}
