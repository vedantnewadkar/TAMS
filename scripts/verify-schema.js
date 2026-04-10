/**
 * TAMS Schema Verification Script
 * Run with: node scripts/verify-schema.js
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Credentials missing. Ensure .env.local has SUPABASE_URL and SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tablesToVerify = [
  'profiles', 'branches', 'classes', 'subjects',
  'mentors', 'teachers', 'students', 'parents',
  'attendance', 'tests', 'test_marks', 'fees',
  'message_threads', 'messages', 'notifications'
];

async function verify() {
  console.log("🔍 Initializing TAMS Schema Verification...");

  for (const table of tablesToVerify) {
    const { error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error(`❌ Table [${table}]: Failed - ${error.message}`);
    } else {
      console.log(`✅ Table [${table}]: Verified`);
    }
  }

  console.log("\n✨ Verification Complete.");
}

verify();
