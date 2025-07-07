import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; https://okqesdddonaaicozavmj.supabase.co
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rcWVzZGRkb25hYWljb3phdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NjE3NzQsImV4cCI6MjA2NzMzNzc3NH0.Z2ANB03qznTIryGPxlhiojv0vI8ZPtyHPDy8yHJZHV

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
