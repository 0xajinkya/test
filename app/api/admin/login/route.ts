import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { setAdminSession } from '@/lib/auth';

function safeString(input: unknown) {
  return typeof input === 'string' ? input : '';
}

export async function POST(request: Request) {
  const body = await request.json();
  const password = safeString(body.password);
  const envPassword = process.env.ADMIN_PANEL_PASSWORD ?? '';

  const passwordBuffer = Buffer.from(password);
  const envBuffer = Buffer.from(envPassword);
  const valid = passwordBuffer.length === envBuffer.length && timingSafeEqual(passwordBuffer, envBuffer);

  if (!valid || !envPassword) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
