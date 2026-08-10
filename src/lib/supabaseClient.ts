import { createClient } from '@supabase/supabase-js';

// Menggunakan fallback dummy jika ENV belum terbaca Vercel agar aplikasi tidak crash (blank)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
