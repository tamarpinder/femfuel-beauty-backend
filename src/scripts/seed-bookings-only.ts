import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate realistic bookings for the current week with the specific customers you mentioned
function generateSpecificBookings(vendorId: string, customerData: any[], serviceData: any[]) {
  const bookings = [];
  
  // Today's date (2025-08-28 according to system)
  const today = new Date('2025-08-28');
  
  // Create the specific bookings you mentioned for consistency
  const specificBookings = [
    {
      customerName: 'María González',
      serviceName: 'Manicure Completo',
      date: '2025-08-26', // Monday
      time: '14:00', // 2:00 PM
      status: 'pending',
      price: 800
    },
    {
      customerName: 'Carmen Rodríguez', 
      serviceName: 'Corte y Peinado Profesional',
      date: '2025-08-26', // Monday  
      time: '16:00', // 4:00 PM
      status: 'confirmed',
      price: 1200
    },
    {
      customerName: 'Ana Pérez',
      serviceName: 'Facial Hidratante', 
      date: '2025-08-27', // Tuesday
      time: '10:00', // 10:00 AM
      status: 'pending',
      price: 1500
    }
  ];

  // Create bookings from the specific list
  for (const booking of specificBookings) {
    // Find customer by name
    const customer = customerData.find(c => 
      `${c.first_name} ${c.last_name}` === booking.customerName
    );
    
    // Find service by name
    const service = serviceData.find(s => s.name === booking.serviceName);
    
    if (customer && service) {
      const [hours, minutes] = booking.time.split(':');
      const scheduledDate = new Date(booking.date);
      scheduledDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      bookings.push({
        vendor_id: vendorId,
        customer_id: customer.id,
        service_id: service.id,
        scheduled_date: booking.date,
        scheduled_time: booking.time,
        status: booking.status,
        payment_status: booking.status === 'completed' ? 'paid' : 'pending',
        total_amount: booking.price,
        notes: booking.customerName === 'María González' ? 'Prefiere esmalte rojo' : null
      });
    }
  }

  // Add some additional bookings for variety
  const additionalBookings = [
    {
      customerName: 'Sofía Martínez',
      serviceName: 'Pedicure Deluxe',
      date: '2025-08-29', // Thursday
      time: '11:00',
      status: 'pending',
      price: 1200,
      notes: 'Primera vez en el salón'
    },
    {
      customerName: 'Laura Díaz',
      serviceName: 'Manicure Completo',
      date: '2025-08-25', // Sunday (completed)
      time: '15:00',
      status: 'completed',
      price: 2500
    },
    {
      customerName: 'Isabella Santos',
      serviceName: 'Maquillaje Social',
      date: '2025-08-24', // Saturday (completed)
      time: '17:00',
      status: 'completed', 
      price: 2000
    },
    {
      customerName: 'Valentina Reyes',
      serviceName: 'Tinte Completo',
      date: '2025-08-30', // Friday
      time: '09:00',
      status: 'confirmed',
      price: 3500
    }
  ];

  // Add the additional bookings
  for (const booking of additionalBookings) {
    const customer = customerData.find(c => 
      `${c.first_name} ${c.last_name}` === booking.customerName
    );
    
    const service = serviceData.find(s => s.name === booking.serviceName);
    
    if (customer && service) {
      const [hours, minutes] = booking.time.split(':');
      const scheduledDate = new Date(booking.date);
      scheduledDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      bookings.push({
        vendor_id: vendorId,
        customer_id: customer.id,
        service_id: service.id,
        scheduled_date: booking.date,
        scheduled_time: booking.time,
        status: booking.status,
        payment_status: booking.status === 'completed' ? 'paid' : 'pending',
        total_amount: booking.price,
        notes: booking.notes || null
      });
    }
  }

  return bookings;
}

async function seedBookingsData() {
  console.log('🌱 Creating realistic bookings data...');

  try {
    // Get existing vendor (the one that already exists)
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'vendor')
      .limit(1);

    if (profilesError || !profiles || profiles.length === 0) {
      console.error('No vendor found. Please create a vendor first.');
      return;
    }

    const vendorId = profiles[0].id;
    console.log('✅ Found vendor:', profiles[0].business_name || profiles[0].first_name);

    // Get existing customers
    const { data: customers, error: customersError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'customer');

    if (customersError) {
      console.error('Error fetching customers:', customersError);
      return;
    }

    console.log(`✅ Found ${customers?.length || 0} customers`);

    // Get existing services
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .eq('vendor_id', vendorId);

    if (servicesError) {
      console.error('Error fetching services:', servicesError);
      return;
    }

    console.log(`✅ Found ${services?.length || 0} services`);

    // Clear existing bookings for this vendor
    console.log('Clearing existing bookings...');
    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .eq('vendor_id', vendorId);

    if (deleteError) {
      console.error('Error clearing bookings:', deleteError);
      return;
    }

    // Create the specific bookings for consistency
    if (customers && services && customers.length > 0 && services.length > 0) {
      const bookingData = generateSpecificBookings(vendorId, customers, services);
      
      console.log(`Creating ${bookingData.length} bookings...`);
      
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select();

      if (bookingsError) {
        console.error('Error creating bookings:', bookingsError);
        return;
      }

      console.log(`✅ Created ${bookings.length} bookings`);
      
      // Display the created bookings for verification
      console.log('\n📅 Recent Bookings Created:');
      for (const booking of bookings.slice(0, 3)) {
        const customer = customers.find(c => c.id === booking.customer_id);
        const service = services.find(s => s.id === booking.service_id);
        const date = new Date(booking.scheduled_date);
        
        console.log(`- ${customer?.first_name} ${customer?.last_name}`);
        console.log(`  ${service?.name}`);
        console.log(`  ${date.toLocaleDateString()} - ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`);
        console.log(`  RD$${booking.total_amount?.toLocaleString()}`);
        console.log(`  ${booking.status === 'pending' ? 'Pendiente' : booking.status === 'confirmed' ? 'Confirmada' : 'Completada'}`);
        console.log('');
      }

    } else {
      console.log('⚠️  Not enough customers or services found to create bookings');
    }

    console.log('\n🎉 Bookings seeding completed successfully!');

  } catch (error) {
    console.error('Seeding error:', error);
  }
}

// Run the seeding script
seedBookingsData();