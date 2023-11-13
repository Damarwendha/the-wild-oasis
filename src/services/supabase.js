import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://arusamdftguxofxiukuv.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFydXNhbWRmdGd1eG9meGl1a3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4MzUwOTIsImV4cCI6MjAxNTQxMTA5Mn0.6KyCWjiaOUKGE9Fj8-j-kW8MrZaHEaFZ72cYaRzSrIM";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default supabase;
