// lib/supabase.js
// This file connects your app to Supabase

import { createClient } from '@supabase/supabase-js'

// Get credentials from environment file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)