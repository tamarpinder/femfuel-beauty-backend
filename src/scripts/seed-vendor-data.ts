import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  console.error('Required: SUPABASE_URL and SUPABASE_SERVICE_KEY');
  process.exit(1);
}

// Use service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Dominican customer profiles (5-10 realistic profiles)
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
      preferences: {
        favorite_services: ['Manicure', 'Pedicure'],
        preferred_times: 'afternoons'
      }
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
      preferences: {
        favorite_services: ['Corte y Peinado', 'Tinte'],
        preferred_times: 'mornings'
      }
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
      preferences: {
        favorite_services: ['Tratamiento Facial', 'Masaje'],
        preferred_times: 'weekends'
      }
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
      preferences: {
        favorite_services: ['Pedicure con Spa', 'Manicure'],
        preferred_times: 'afternoons'
      }
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
      preferences: {
        favorite_services: ['Uñas Acrílicas', 'Diseño de Cejas'],
        preferred_times: 'evenings'
      }
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
      preferences: {
        favorite_services: ['Maquillaje', 'Peinado para Eventos'],
        preferred_times: 'flexible'
      }
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
      preferences: {
        favorite_services: ['Keratina', 'Botox Capilar'],
        preferred_times: 'mornings'
      }
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
      preferences: {
        favorite_services: ['Limpieza Facial', 'Microblading'],
        preferred_times: 'weekends'
      }
    }
  }
];

// Test vendor profile (the beauty salon owner)
const testVendor = {
  email: 'salon.belleza.divina@gmail.com',
  password: 'Vendor123!',
  profile: {
    first_name: 'Rosa',
    last_name: 'Méndez',
    business_name: 'Belleza Divina Salon & Spa',
    phone: '(809) 555-0000',
    address: 'Plaza Naco, Local 201',
    city: 'Santo Domingo',
    business_type: 'Salón de Belleza Completo',
    business_hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 5:00 PM'
    },
    is_active: true,
    is_verified: true,
    role: 'vendor' as const
  }
};

// Services offered by the vendor
const vendorServices = [
  {
    name: 'Manicure Completo',
    description: 'Manicure profesional con esmaltado de gel, incluye limado, cutícula e hidratación',
    category: 'nail_care',
    price: 800,
    duration: 60,
    is_active: true
  },
  {
    name: 'Pedicure con Spa',
    description: 'Pedicure relajante con exfoliación, masaje e hidratación profunda',
    category: 'nail_care',
    price: 1200,
    duration: 90,
    is_active: true
  },
  {
    name: 'Corte y Peinado',
    description: 'Corte profesional con peinado y styling incluido',
    category: 'hair_styling',
    price: 1500,
    duration: 75,
    is_active: true
  },
  {
    name: 'Tratamiento Facial',
    description: 'Limpieza facial profunda con extracción y mascarilla hidratante',
    category: 'skin_treatment',
    price: 1800,
    duration: 90,
    is_active: true
  },
  {
    name: 'Tinte de Cejas',
    description: 'Diseño y tinte profesional de cejas',
    category: 'micropigmentation',
    price: 600,
    duration: 30,
    is_active: true
  },
  {
    name: 'Uñas Acrílicas',
    description: 'Set completo de uñas acrílicas con diseño',
    category: 'nail_care',
    price: 2500,
    duration: 120,
    is_active: true
  },
  {
    name: 'Keratina Brasileña',
    description: 'Tratamiento de keratina para alisado y nutrición del cabello',
    category: 'hair_styling',
    price: 3500,
    duration: 180,
    is_active: true
  },
  {
    name: 'Maquillaje Profesional',
    description: 'Maquillaje para eventos especiales con productos premium',
    category: 'makeup',
    price: 2000,
    duration: 60,
    is_active: true
  }
];

// Generate realistic bookings for the current week
function generateBookings(vendorId: string, customerIds: string[], serviceIds: string[]) {
  const bookings = [];
  const today = new Date('2025-08-28'); // Current date from system
  
  // Booking patterns for realistic scheduling
  const bookingSlots = [
    { time: '09:00', probability: 0.6 },
    { time: '10:00', probability: 0.8 },
    { time: '11:00', probability: 0.8 },
    { time: '14:00', probability: 0.9 },
    { time: '15:00', probability: 0.9 },
    { time: '16:00', probability: 0.9 },
    { time: '17:00', probability: 0.8 },
    { time: '18:00', probability: 0.7 },
  ];

  // Generate bookings for past week (completed)
  for (let daysAgo = 7; daysAgo >= 1; daysAgo--) {
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    
    // 2-4 bookings per day for past dates
    const numBookings = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < numBookings; i++) {
      const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
      const serviceId = serviceIds[Math.floor(Math.random() * serviceIds.length)];
      const slot = bookingSlots[Math.floor(Math.random() * bookingSlots.length)];
      
      const [hours, minutes] = slot.time.split(':');
      const scheduledDate = new Date(date);
      scheduledDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      bookings.push({
        vendor_id: vendorId,
        customer_id: customerId,
        service_id: serviceId,
        scheduled_date: scheduledDate.toISOString(),
        status: 'completed',
        payment_status: 'paid',
        total_amount: vendorServices[serviceIds.indexOf(serviceId)]?.price || 1000,
        notes: null
      });
    }
  }

  // Today's bookings (mix of statuses)
  const todayStatuses = ['pending', 'confirmed', 'completed'];
  for (let i = 0; i < 4; i++) {
    const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
    const serviceId = serviceIds[Math.floor(Math.random() * serviceIds.length)];
    const slot = bookingSlots[i + 2]; // Middle of day slots
    
    const [hours, minutes] = slot.time.split(':');
    const scheduledDate = new Date(today);
    scheduledDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const status = todayStatuses[i % todayStatuses.length];
    
    bookings.push({
      vendor_id: vendorId,
      customer_id: customerId,
      service_id: serviceId,
      scheduled_date: scheduledDate.toISOString(),
      status: status,
      payment_status: status === 'completed' ? 'paid' : 'pending',
      total_amount: vendorServices[serviceIds.indexOf(serviceId)]?.price || 1000,
      notes: i === 0 ? 'Prefiere esmalte rojo' : i === 1 ? 'Primera vez en el salón' : null
    });
  }

  // Future bookings (next 3 days)
  for (let daysAhead = 1; daysAhead <= 3; daysAhead++) {
    const date = new Date(today);
    date.setDate(date.getDate() + daysAhead);
    
    // 2-3 bookings per future day
    const numBookings = Math.floor(Math.random() * 2) + 2;
    
    for (let i = 0; i < numBookings; i++) {
      const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
      const serviceId = serviceIds[Math.floor(Math.random() * serviceIds.length)];
      const slot = bookingSlots[Math.floor(Math.random() * bookingSlots.length)];
      
      const [hours, minutes] = slot.time.split(':');
      const scheduledDate = new Date(date);
      scheduledDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      bookings.push({
        vendor_id: vendorId,
        customer_id: customerId,
        service_id: serviceId,
        scheduled_date: scheduledDate.toISOString(),
        status: Math.random() > 0.5 ? 'confirmed' : 'pending',
        payment_status: 'pending',
        total_amount: vendorServices[serviceIds.indexOf(serviceId)]?.price || 1000,
        notes: null
      });
    }
  }

  return bookings;
}

// Generate reviews for completed bookings
function generateReviews(bookings: any[]) {
  const reviews = [];
  const reviewTexts = [
    { rating: 5, comment: 'Excelente servicio! El salón es muy limpio y profesional.' },
    { rating: 5, comment: 'Me encantó el resultado, definitivamente volveré.' },
    { rating: 4, comment: 'Muy buen trabajo, solo tuve que esperar un poco.' },
    { rating: 5, comment: 'Las mejores uñas que me han hecho! Super recomendado.' },
    { rating: 5, comment: 'El trato es espectacular y los precios justos.' },
    { rating: 4, comment: 'Buen servicio, ambiente agradable.' },
    { rating: 5, comment: 'Profesionales de verdad! Quedé fascinada.' }
  ];

  // Add reviews for 70% of completed bookings
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const reviewCount = Math.floor(completedBookings.length * 0.7);
  
  for (let i = 0; i < reviewCount && i < completedBookings.length; i++) {
    const booking = completedBookings[i];
    const review = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
    
    reviews.push({
      vendor_id: booking.vendor_id,
      customer_id: booking.customer_id,
      service_id: booking.service_id,
      booking_id: booking.id,
      rating: review.rating,
      comment: review.comment,
      is_visible: true
    });
  }

  return reviews;
}

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Step 1: Create vendor account
    console.log('Creating vendor account...');
    const { data: vendorAuth, error: vendorError } = await supabase.auth.signUp({
      email: testVendor.email,
      password: testVendor.password,
      options: {
        data: testVendor.profile
      }
    });

    if (vendorError) {
      console.error('Error creating vendor:', vendorError);
      return;
    }

    const vendorId = vendorAuth.user?.id;
    if (!vendorId) {
      console.error('Vendor ID not found');
      return;
    }

    // Create vendor profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: vendorId,
        ...testVendor.profile,
        email: testVendor.email
      });

    if (profileError) {
      console.error('Error creating vendor profile:', profileError);
    }

    console.log('✅ Vendor account created:', testVendor.profile.business_name);

    // Step 2: Create services
    console.log('Creating services...');
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .insert(vendorServices.map(service => ({
        ...service,
        vendor_id: vendorId
      })))
      .select();

    if (servicesError) {
      console.error('Error creating services:', servicesError);
      return;
    }

    const serviceIds = services.map(s => s.id);
    console.log(`✅ Created ${services.length} services`);

    // Step 3: Create customer accounts
    console.log('Creating customer accounts...');
    const customerIds = [];

    for (const customer of testCustomers) {
      const { data: customerAuth, error: customerError } = await supabase.auth.signUp({
        email: customer.email,
        password: customer.password,
        options: {
          data: { ...customer.profile, role: 'customer' }
        }
      });

      if (customerError) {
        console.error(`Error creating customer ${customer.email}:`, customerError);
        continue;
      }

      if (customerAuth.user?.id) {
        customerIds.push(customerAuth.user.id);
        
        // Create customer profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: customerAuth.user.id,
            ...customer.profile,
            email: customer.email,
            role: 'customer'
          });

        if (profileError) {
          console.error(`Error creating profile for ${customer.email}:`, profileError);
        } else {
          console.log(`✅ Customer created: ${customer.profile.first_name} ${customer.profile.last_name}`);
        }
      }
    }

    // Step 4: Create bookings
    console.log('Creating bookings...');
    const bookingData = generateBookings(vendorId, customerIds, serviceIds);
    
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select();

    if (bookingsError) {
      console.error('Error creating bookings:', bookingsError);
    } else {
      console.log(`✅ Created ${bookings.length} bookings`);
      
      // Step 5: Create reviews for completed bookings
      console.log('Creating reviews...');
      const reviewData = generateReviews(bookings);
      
      if (reviewData.length > 0) {
        const { data: reviews, error: reviewsError } = await supabase
          .from('reviews')
          .insert(reviewData)
          .select();

        if (reviewsError) {
          console.error('Error creating reviews:', reviewsError);
        } else {
          console.log(`✅ Created ${reviews.length} reviews`);
        }
      }
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📧 Vendor Login Credentials:');
    console.log(`   Email: ${testVendor.email}`);
    console.log(`   Password: ${testVendor.password}`);
    console.log('\n📧 Sample Customer Login:');
    console.log(`   Email: ${testCustomers[0].email}`);
    console.log(`   Password: ${testCustomers[0].password}`);

  } catch (error) {
    console.error('Seeding error:', error);
  }
}

// Run the seeding script
seedDatabase();