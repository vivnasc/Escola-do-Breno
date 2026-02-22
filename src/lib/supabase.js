import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client — connects to the PITCH backend.
 *
 * Environment variables (set in .env.local or Vercel dashboard):
 *   VITE_SUPABASE_URL     — Your Supabase project URL
 *   VITE_SUPABASE_ANON_KEY — Your Supabase anon/public key
 *
 * The app works fully offline without Supabase.
 * When connected, it syncs profiles + progress to the cloud.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      },
    })
  : null

/**
 * Check if Supabase is configured and available.
 */
export function isSupabaseConfigured() {
  return !!supabase
}
