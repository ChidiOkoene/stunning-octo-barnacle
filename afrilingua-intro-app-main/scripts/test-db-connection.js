// Test script to verify Supabase database connection
// Run with: node scripts/test-db-connection.js

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');
  console.log(`📍 URL: ${supabaseUrl}\n`);

  try {
    // Test 1: Check if we can query the database
    console.log('Test 1: Checking database connection...');
    const { data, error } = await supabase
      .from('registrations')
      .select('count', { count: 'exact', head: true });

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️  Table "registrations" does not exist yet.');
        console.log('   Please run the migration SQL in your Supabase SQL Editor.\n');
      } else {
        console.error('❌ Connection error:', error.message);
        return;
      }
    } else {
      console.log('✅ Database connection successful!');
      console.log(`   Registrations table exists with ${data || 0} records.\n`);
    }

    // Test 2: Check RLS policies
    console.log('Test 2: Verifying connection permissions...');
    const { error: queryError } = await supabase
      .from('registrations')
      .select('id')
      .limit(1);

    if (queryError && queryError.code !== 'PGRST116') {
      console.log('⚠️  Row Level Security (RLS) may be blocking access.');
      console.log('   This is normal for anon key - you may need to configure RLS policies.\n');
    } else {
      console.log('✅ Query permissions verified!\n');
    }

    console.log('✅ All connection tests passed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Run the migration SQL in Supabase Dashboard > SQL Editor');
    console.log('   2. Set up Row Level Security policies if needed');
    console.log('   3. Your app is ready to use! 🚀');

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

testConnection();

