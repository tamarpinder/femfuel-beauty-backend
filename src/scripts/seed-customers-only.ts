import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Dominican customer profiles (8 realistic profiles)
const testCustomers = [
  {
    email: 'maria.gonzalez@gmail.com',
    password: 'Test123!',
    profile: {
      first_name: 'María',
      last_name: 'González',
      phone: '(809) 123-4567',
      address: 'Piantini, Santo Domingo',
      city: 'Santo Domingo',
      role: 'customer' as const
    }
  },
  {
    email: 'carmen.rodriguez@hotmail.com',
    password: 'Test123!',
    profile: {
      first_name: 'Carmen',
      last_name: 'Rodríguez',
      phone: '(829) 987-6543',
      address: 'Naco, Santo Domingo',
      city: 'Santo Domingo',
      role: 'customer' as const
    }
  },
  {
    email: 'ana.perez@yahoo.com',
    password: 'Test123!',
    profile: {
      first_name: 'Ana',
      last_name: 'Pérez',
      phone: '(849) 555-0123',
      address: 'Bella Vista, Santo Domingo',
      city: 'Santo Domingo',
      role: 'customer' as const
    }
  },
  {
    email: 'sofia.martinez@gmail.com',
    password: 'Test123!',
    profile: {
      first_name: 'Sofía',
      last_name: 'Martínez',
      phone: '(809) 777-8888',
      address: 'Evaristo Morales, Santo Domingo',
      city: 'Santo Domingo',
      role: 'customer' as const
    }
  },
  {
    email: 'laura.diaz@outlook.com',
    password: 'Test123!',
    profile: {
      first_name: 'Laura',
      last_name: 'Díaz',
      phone: '(829) 444-5555',
      address: 'Serralles, Santo Domingo',
      city: 'Santo Domingo',
      role: 'customer' as const
    }
  },
  {
    email: 'isabella.santos@gmail.com',
    password: 'Test123!',
    profile: {
      first_name: 'Isabella',
      last_name: 'Santos',
      phone: '(849) 222-3333',
      address: 'La Esperilla, Santo Domingo',
      city: 'Santo Domingo',
      role: 'customer' as const
    }
  },
  {
    email: 'valentina.reyes@hotmail.com',
    password: 'Test123!',
    profile: {
      first_name: 'Valentina',
      last_name: 'Reyes',
      phone: '(809) 666-7777',
      address: 'Gazcue, Santo Domingo',
      city: 'Santo Domingo',
      role: 'customer' as const
    }
  },
  {
    email: 'camila.fernandez@yahoo.com',
    password: 'Test123!',
    profile: {
      first_name: 'Camila',
      last_name: 'Fernández',
      phone: '(829) 888-9999',
      address: 'Los Cacicazgos, Santo Domingo',
      city: 'Santo Domingo',
      role: 'customer' as const
    }
  }
];

async function seedCustomers() {
  console.log('👥 Creating customer accounts...');

  try {
    let successCount = 0;
    let skipCount = 0;

    for (const customer of testCustomers) {
      try {
        // Try to create the user account
        const { data: customerAuth, error: customerError } = await supabase.auth.signUp({
          email: customer.email,
          password: customer.password,
          options: {
            data: customer.profile
          }
        });

        if (customerError) {
          if (customerError.message.includes('User already registered')) {
            console.log(`⚠️  Customer ${customer.profile.first_name} ${customer.profile.last_name} already exists`);
            skipCount++;
            continue;
          } else {
            console.error(`❌ Error creating customer ${customer.email}:`, customerError);
            continue;
          }
        }

        if (customerAuth.user?.id) {
          // Create customer profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: customerAuth.user.id,
              first_name: customer.profile.first_name,
              last_name: customer.profile.last_name,
              phone: customer.profile.phone,
              role: customer.profile.role,
              email: customer.email
            });

          if (profileError) {
            console.error(`❌ Error creating profile for ${customer.email}:`, profileError);
          } else {
            console.log(`✅ Customer created: ${customer.profile.first_name} ${customer.profile.last_name}`);
            successCount++;
          }
        }
      } catch (error) {
        console.error(`❌ Unexpected error for ${customer.email}:`, error);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Created: ${successCount} customers`);
    console.log(`⚠️  Skipped: ${skipCount} existing customers`);
    console.log(`🎉 Customer seeding completed!`);

    if (successCount > 0) {
      console.log('\n📧 Sample Customer Login:');
      console.log(`   Email: ${testCustomers[0].email}`);
      console.log(`   Password: ${testCustomers[0].password}`);
    }

  } catch (error) {
    console.error('Customer seeding error:', error);
  }
}

// Run the seeding script
seedCustomers();