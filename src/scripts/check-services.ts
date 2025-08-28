import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkServices() {
  const { data: services, error } = await supabase
    .from('services')
    .select('name');
    
  console.log('Available services:');
  services?.forEach(s => console.log(`- ${s.name}`));
}

checkServices();