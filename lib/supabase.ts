import { createClient } from '@supabase/supabase-js';

function getPublicEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return { supabaseUrl, supabaseAnonKey };
}

export const getSupabase = () => {
  const env = getPublicEnv();
  if (!env) {
    return null;
  }

  return createClient(env.supabaseUrl, env.supabaseAnonKey);
};

export const getAdminSupabase = () => {
  const env = getPublicEnv();
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!env || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables for admin operations.');
  }

  return createClient(env.supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
};
