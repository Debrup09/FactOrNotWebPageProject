import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://btcpxlwqesoprjbxrhfb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0Y3B4bHdxZXNvcHJqYnhyaGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5ODk5NzYsImV4cCI6MjA3MDU2NTk3Nn0.llxCGk2AeIGsrRfPiE-8yni34B_mkMnbJiZkpQjcveY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
