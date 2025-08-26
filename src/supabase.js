import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL:", supabaseUrl);
  console.error("Supabase Anon Key:", supabaseKey);
  throw new Error("Supabase URL and Anon Key are required. Check your .env file and ensure they are prefixed with VITE_ and the dev server was restarted.");
}

 HEAD
export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
 d9374bf2bbe1085ada73e381f0ef45430c53fc5d
