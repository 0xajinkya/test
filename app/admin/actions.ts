'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getAdminSupabase } from '@/lib/supabase';

const ADMIN_COOKIE = 'murtikar-admin-auth';

async function ensureAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE)?.value;
  if (session !== 'ok') {
    throw new Error('Not authorized.');
  }
}

export async function loginAdmin(formData: FormData) {
  const password = formData.get('password')?.toString();

  if (!password || password !== process.env.ADMIN_PANEL_PASSWORD) {
    throw new Error('Invalid admin password.');
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, 'ok', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  });
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function createProduct(formData: FormData) {
  await ensureAdmin();

  const supabase = getAdminSupabase();

  const payload = {
    title: formData.get('title')?.toString() ?? '',
    slug: formData.get('slug')?.toString() ?? '',
    category: formData.get('category')?.toString() ?? '',
    relationship: formData.get('relationship')?.toString() ?? '',
    motto: formData.get('motto')?.toString() ?? '',
    story: formData.get('story')?.toString() ?? '',
    why_buy: formData.get('why_buy')?.toString() ?? '',
    image_url: formData.get('image_url')?.toString() ?? '',
    base_price: Number(formData.get('base_price')?.toString() ?? 0),
    show_price: formData.get('show_price') === 'on',
    customizable: formData.get('customizable') === 'on'
  };

  const { error } = await supabase.from('products').insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateConfig(formData: FormData) {
  await ensureAdmin();

  const supabase = getAdminSupabase();
  const configId = formData.get('id')?.toString() ?? '';

  const payload = {
    hero_title: formData.get('hero_title')?.toString() ?? '',
    hero_subtitle: formData.get('hero_subtitle')?.toString() ?? '',
    whatsapp_link: formData.get('whatsapp_link')?.toString() ?? '',
    trust_badges: (formData.get('trust_badges')?.toString() ?? '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
  };

  const { error } = await supabase.from('site_config').update(payload).eq('id', configId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin');
}
