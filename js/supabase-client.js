const SUPABASE_URL = "https://joypslhhghexeudptgri.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveXBzbGhoZ2hleGV1ZHB0Z3JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NTYyMDYsImV4cCI6MjEwNjQzMjIwNn0.9pCNc830g3dA40LTtfrKi-hIJTqDMfgNUwmscWrOOco";

const { createClient } = supabase;
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);