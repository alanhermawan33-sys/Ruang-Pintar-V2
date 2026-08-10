import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sumywlwhlwcczhxclijt.supabase.co';
const supabaseAnonKey = 'sb_publishable_CgDaMApcv9067qXNx7w7Og_rKS32gMV';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
