// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Optional: Add some helper functions
export const getPublicUrl = (bucket, path) => {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
}

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('personal_info').select('count').limit(1)
    if (error) throw error
    console.log('✅ Supabase connection successful!')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message)
    return false
  }
}