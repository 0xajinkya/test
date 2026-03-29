import { getSupabase } from '@/lib/supabase';
import { Product, SiteConfig } from '@/lib/types';

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data as Product;
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from('site_config').select('*').limit(1).single();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data as SiteConfig;
}
