import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE = 'murtikar-admin-auth';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  exp: number;
  iat: number;
};

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 24) {
    throw new Error('ADMIN_SESSION_SECRET is missing or too short. Use at least 24 characters.');
  }
  return secret;
}

function base64url(input: string) {
  return Buffer.from(input).toString('base64url');
}

function sign(data: string, secret: string) {
  return createHmac('sha256', secret).update(data).digest('base64url');
}

function encodeSession(payload: SessionPayload) {
  const secret = getSessionSecret();
  const body = base64url(JSON.stringify(payload));
  const signature = sign(body, secret);
  return `${body}.${signature}`;
}

function decodeSession(token: string): SessionPayload | null {
  const secret = getSessionSecret();
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  const expected = sign(body, secret);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  const parsed = JSON.parse(Buffer.from(body, 'base64url').toString()) as SessionPayload;
  if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return parsed;
}

export async function setAdminSession() {
  const now = Math.floor(Date.now() / 1000);
  const token = encodeSession({ iat: now, exp: now + SESSION_TTL_SECONDS });
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_TTL_SECONDS,
    path: '/'
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return Boolean(decodeSession(token));
}

export async function ensureAdmin() {
  const valid = await isAdminAuthenticated();
  if (!valid) {
    throw new Error('Unauthorized');
  }
}
