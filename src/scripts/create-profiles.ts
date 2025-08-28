import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const customerProfiles = [
  { email: 'maria.gonzalez@gmail.com', first_name: 'María', last_name: 'González', phone: '(809) 123-4567', role: 'customer' },
  { email: 'carmen.rodriguez@hotmail.com', first_name: 'Carmen', last_name: 'Rodríguez', phone: '(829) 987-6543', role: 'customer' },
  { email: 'ana.perez@yahoo.com', first_name: 'Ana', last_name: 'Pérez', phone: '(849) 555-0123', role: 'customer' },
  { email: 'sofia.martinez@gmail.com', first_name: 'Sofía', last_name: 'Martínez', phone: '(809) 777-8888', role: 'customer' },
  { email: 'laura.diaz@outlook.com', first_name: 'Laura', last_name: 'Díaz', phone: '(829) 444-5555', role: 'customer' },
  { email: 'isabella.santos@gmail.com', first_name: 'Isabella', last_name: 'Santos', phone: '(849) 222-3333', role: 'customer' },
  { email: 'valentina.reyes@hotmail.com', first_name: 'Valentina', last_name: 'Reyes', phone: '(809) 666-7777', role: 'customer' },
  { email: 'camila.fernandez@yahoo.com', first_name: 'Camila', last_name: 'Fernández', phone: '(829) 888-9999', role: 'customer' }
];

async function createMissingProfiles() {
  console.log('👤 Creating missing customer profiles...');

  // Get all auth users
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    console.error('Error fetching auth users:', authError);
    return;
  }

  for (const profile of customerProfiles) {
    // Find the auth user by email
    const authUser = authUsers.users.find(u => u.email === profile.email);
    if (!authUser) {
      console.log(`⚠️ No auth user found for ${profile.email}`);
      continue;
    }

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', authUser.id)
      .single();

    if (existingProfile) {
      console.log(`⚠️ Profile already exists for ${profile.first_name} ${profile.last_name}`);
      continue;
    }

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authUser.id,
        ...profile
      });

    if (profileError) {
      console.error(`❌ Error creating profile for ${profile.email}:`, profileError);
    } else {
      console.log(`✅ Created profile for ${profile.first_name} ${profile.last_name}`);
    }
  }
}

createMissingProfiles();