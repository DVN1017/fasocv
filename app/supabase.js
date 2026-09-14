import { createClient } from '@supabase/supabase-js'

// These values are intentionally public client-side Supabase configuration.
// Keep environment variables supported for local/staging overrides, but use
// the production FasoCV project as a safe fallback so a Vercel deployment
// cannot silently initialize the client with an undefined URL/key.
const SUPABASE_URL = 'https://tgzynqkchplbxlojcicv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnenlucWtjaHBsYnhsb2pjaWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMjU3MjEsImV4cCI6MjA5OTgwMTcyMX0.5QQBt57h4qXsl9EJQMhya4_kPC8pdltBEz_NwToGxoQ'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
