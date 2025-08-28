import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkData() {
  console.log('🔍 Checking database contents...');
  
  // Check auth users
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
  console.log(`Auth users: ${authUsers?.users?.length || 0}`);
  
  // Check profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*');
  console.log(`Profiles: ${profiles?.length || 0}`);
  
  if (profiles) {
    console.log('Profile roles:', profiles.map(p => ({ name: `${p.first_name} ${p.last_name}`, role: p.role })));
  }
  
  if (profilesError) console.error('Profiles error:', profilesError);
}

checkData();