import { createClient } from "@supabase/supabase-js";

// #######################################################
// MODIFY THESE VARIABLES, TO YOUR SUPABASE INSTALLATION.
// #######################################################
export const SUPABASE_URL = "https://czvtumfwyoalvjjriqjd.supabase.co";
export const PUBLIC_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6dnR1bWZ3eW9hbHZqanJpcWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MDI4NzAsImV4cCI6MjA0NzA3ODg3MH0.NEY9zyupKwJFon_TWRWVrlTM8Yd_UXAjB-YhbeAIelE";
// #######################################################

let supabaseClientSingletong = undefined;
export function getSupabaseClient() {
  if (supabaseClientSingletong == undefined) {
    supabaseClientSingletong = createClient(SUPABASE_URL, PUBLIC_ANON_KEY);
  }

  return supabaseClientSingletong;
}