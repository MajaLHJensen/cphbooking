import { useEffect, useState } from 'react'; 
import { Link } from '@tanstack/react-router'; 
import { createClient } from "@supabase/supabase-js"; 
import { Button, Container } from '@mantine/core'; 
import '../components/ButtonStyles.css'; 
import { SUPABASE_URL, PUBLIC_ANON_KEY } from "../supabase/getSupabaseClient"; 

// Opretter en forbindelse til Supabase-databasen
const supabase = createClient(SUPABASE_URL, PUBLIC_ANON_KEY);

export default function BookingOverview() {
  // Opretter to states:
  const [bookings, setBookings] = useState([]);  // En liste med bookingdata, som bliver hentet fra databasen
  const [loading, setLoading] = useState(true); // Bruges til at håndtere en loading-tilstand

  // CSS-styling som et JavaScript-objekt
  const styles = {
    container: {
      backgroundColor: "#6eb47e", 
      borderRadius: "8px", 
      padding: "20px", 
      width: "800px", 
      margin: "100px auto 0 auto", 
      color: "white", 
    },
    header: {
      fontSize: "30px", 
    },
    bookingCard: {
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      backgroundColor: "#83c993", 
      padding: "15px", 
      borderRadius: "8px", 
      marginBottom: "10px", 
    },
    buttonContainer: {
      textAlign: "center", 
      padding: "30px 0", 
    },
  };

  // Opdatere når der sker handling
  // useEffect hook bruges til at kalde `viewBookings` en enkelt gang, når komponentet loader
  useEffect(() => { 
    viewBookings(); 
  }, []); // Den tomme dependency-array sikrer, at koden kun kører én gang

  // Funktion til at hente bookingdata fra databasen
  async function viewBookings() {
    setLoading(true); // Sætter loading til true, mens data hentes

    try {
      // Henter data fra Supabase REST API
      const data = await fetch(
        `${SUPABASE_URL}/rest/v1/bookings?select=*&order=booking_date.asc`, // Henter alle bookings, sorteret efter dato
        {
          headers: {
            apikey: PUBLIC_ANON_KEY, // Supabase API-nøgle for godkendelse
            Authorization: `Bearer ${PUBLIC_ANON_KEY}`, // Bearer-token for sikkerhed
          },
        }
      ).then((response) => response.json()); // Konverterer responsen til JSON-format

      // Formaterer data for at vise datoerne i et brugervenligt format
      const formattedData = data.map((booking) => ({
        ...booking, // Beholder alle bookingens eksisterende data
        formattedDate: new Intl.DateTimeFormat('da-DK', { // Ændre fra us til dk
          day: 'numeric',
          month: 'long', 
          year: 'numeric', 
        }).format(new Date(booking.booking_date)), // Konverterer datoen til et nyt format
      }));

      setBookings(formattedData); // Gemmer de formaterede bookings i state
    } catch (error) {
      console.error("Error fetching bookings:", error.message); 
    } finally {
      setLoading(false); // Sætter loading til false, når datahentningen er færdig
    }
  }

  // Funktion til at slette en booking baseret på dens ID
  async function deleteBooking(bookingId) {
    try {
      // Kalder Supabase for at slette en booking med det specificerede ID
      const { error } = await supabase
        .from("bookings") // Tabelnavnet i databasen
        .delete() // Angiver, at der skal slettes data
        .eq("id", bookingId); // Matcher rækken med det angivne ID
      if (error) throw error; 

      // Opdaterer listen over bookinger efter en succesfuld sletning
      viewBookings(); // Kalder funktionen igen for at hente de opdaterede data
    } catch (error) {
      console.error("Error deleting booking:", error.message); // Logger fejl, hvis sletning fejler
    }
  }

  // JSX til at rendere komponentet
  return (
    <Container style={styles.container}>
      <h1 style={styles.header}>Mine aktuelle bookinger</h1>
      {loading ? ( // Tjekker, om data stadig hentes
        <p>Henter data...</p> // Viser en tekst, hvis loading er true
      ) : (
        <div>
          {/* Mapper gennem listen af bookings og genererer et "kort" for hver */}
          {bookings.map((booking) => (
            // Key prop hjælper med at indentificere hvert element i listen
            <div key={booking.id} style={styles.bookingCard}>
              <div>
                <p>
                  <b>Dato:</b> {booking.formattedDate} 
                </p>
                <p>
                  <b>Lokale:</b> {booking.selectedRoom} 
                </p>
                <p>
                  <b>Tidsrum:</b> {booking.startTime} - {booking.endTime} 
                </p>
                <p>
                  <b>Email:</b> {booking.email} 
                </p>
              </div>
              {/* Knappen, der sletter en booking */}
              <Button
                className="deleteButton"
                onClick={() => deleteBooking(booking.id)} // Kalder deleteBooking med bookingens ID
              >
                Slet booking
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* Link til at navigere til en side, hvor brugeren kan oprette en ny booking */}
      <Link to="/booking">
        <div style={styles.buttonContainer}>
          <Button className="greenBtn">Opret ny booking</Button> 
        </div>
      </Link>
    </Container>
  );
}