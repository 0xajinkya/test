import { NextResponse } from 'next/server';
import { ensureAdmin } from '@/lib/auth';
import { getSiteConfig, updateSiteConfig } from '@/lib/data';

export async function GET() {
  const config = await getSiteConfig();
  return NextResponse.json(config);
}

export async function PATCH(request: Request) {
  try {
    await ensureAdmin();
    const body = await request.json();

    await updateSiteConfig(body.id, {
      hero_title: body.hero_title,
      hero_subtitle: body.hero_subtitle,
      whatsapp_link: body.whatsapp_link,
      trust_badges: body.trust_badges
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
