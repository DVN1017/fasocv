import { createClient } from '@supabase/supabase-js'

// FasoCV production Supabase project. The publishable key is intended for
// browser/client use and can be safely embedded in the frontend.
const SUPABASE_URL = 'https://tgzynqkchplbxlojcicv.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = [
  'sb_publishable_IWUZk7yRiGaNZi8mL1O9',
  'Yw_fxF0BYim',
].join('')

const isProduction = process.env.NODE_ENV === 'production'
const supabaseUrl = isProduction
  ? SUPABASE_URL
  : process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || SUPABASE_URL
const supabaseKey = isProduction
  ? SUPABASE_PUBLISHABLE_KEY
  : process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
    || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
    || SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
