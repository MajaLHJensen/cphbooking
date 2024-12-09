import { createClient } from "@supabase/supabase-js";  

// Supabase URL: Den URL, der peger på din Supabase-instans. Skal ændres til din egen Supabase URL.
export const SUPABASE_URL = "https://czvtumfwyoalvjjriqjd.supabase.co";
// Supabase offentlig nøgle: Den offentlige anonyme API-nøgle for at få adgang til Supabase. Denne nøgle skal også være korrekt og sikre.
export const PUBLIC_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6dnR1bWZ3eW9hbHZqanJpcWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MDI4NzAsImV4cCI6MjA0NzA3ODg3MH0.NEY9zyupKwJFon_TWRWVrlTM8Yd_UXAjB-YhbeAIelE";

// Variabel til at gemme instansen af Supabase-klienten, så den kun bliver oprettet én gang (Singleton-mønster)
let supabaseClientSingletong = undefined;

// Funktion til at hente Supabase-klienten. Denne funktion sikrer, at kun én instans af Supabase-klienten bliver oprettet (Singleton)
export function getSupabaseClient() {
  // Hvis supabaseClientSingletong ikke er defineret (dvs. første gang funktionen kaldes), opretter vi en ny Supabase-klient
  if (supabaseClientSingletong == undefined) {
    // Opretter en ny instans af Supabase-klienten med den angivne URL og API-nøgle
    supabaseClientSingletong = createClient(SUPABASE_URL, PUBLIC_ANON_KEY);
  }

  // Returnerer den eksisterende eller nye instans af Supabase-klienten
  return supabaseClientSingletong;
}