import { NextResponse } from 'next/server';
import { createProduct, getProducts } from '@/lib/data';
import { ensureAdmin } from '@/lib/auth';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    await ensureAdmin();
    const body = await request.json();
    await createProduct({
      title: body.title,
      slug: body.slug,
      category: body.category,
      relationship: body.relationship,
      motto: body.motto,
      story: body.story,
      why_buy: body.why_buy,
      image_url: body.image_url,
      base_price: Number(body.base_price),
      show_price: Boolean(body.show_price),
      customizable: Boolean(body.customizable)
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
