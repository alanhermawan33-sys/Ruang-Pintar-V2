import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sumywlwhlwcczhxclijt.supabase.co';
const supabaseAnonKey = 'PASTE_PUBLISHABLE_ANON_KEY_KAMU_DI_SINI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
