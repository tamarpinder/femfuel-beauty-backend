import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateSchema() {
  console.log('🔧 Updating database schema...');

  try {
    // Add address column to profiles table
    const { error: addressError } = await supabase.rpc('exec', {
      sql: `
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city TEXT;
      `
    });

    if (addressError) {
      console.error('Error adding address columns:', addressError);
      
      // Alternative: Try using SQL directly
      console.log('Trying alternative method...');
      
      // First try to add address column
      const { error: error1 } = await supabase
        .from('profiles')
        .select('address')
        .limit(1);
        
      if (error1 && error1.message.includes('column "address" does not exist')) {
        console.log('Address column needs to be added manually in Supabase dashboard');
        console.log('Please run this SQL in Supabase SQL Editor:');
        console.log('ALTER TABLE profiles ADD COLUMN address TEXT;');
        console.log('ALTER TABLE profiles ADD COLUMN city TEXT;');
        
        return;
      }
    } else {
      console.log('✅ Address columns added successfully');
    }

    console.log('✅ Database schema updated successfully!');

  } catch (error) {
    console.error('Schema update error:', error);
    console.log('\n📝 Manual SQL to run in Supabase Dashboard:');
    console.log('ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;');
    console.log('ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city TEXT;');
  }
}

updateSchema();