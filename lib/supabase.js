import { createClient } from '@supabase/supabase-js';

// Valori impostati su Netlify → Site configuration → Environment variables
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

// Client del browser: usa la chiave pubblica, i permessi li applica il database (RLS).
export const supabase = supabaseConfigured
  ? createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
  : null;
