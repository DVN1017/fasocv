import { createClient } from '@supabase/supabase-js'

// FasoCV production must always use this Supabase project. Client-side Supabase
// URL and anon/publishable keys are public configuration; secrets must never be
// placed here. Local development can still override the values with env vars.
const SUPABASE_URL = 'https://tgzynqkchplbxlojcicv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnenlucWtjaHBsYnhsb2pjaWN2IiwiaWF0IjoxNzg0MjI1NzIxLCJleHAiOjIwOTk4MDE3MjF9.5QQBt57h4qXsl9EJQMhya4_kPC8pdltBEz_NwToGxoQ'

const isProduction = process.env.NODE_ENV === 'production'
const supabaseUrl = isProduction
  ? SUPABASE_URL
  : process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || SUPABASE_URL
const supabaseAnonKey = isProduction
  ? SUPABASE_ANON_KEY
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
