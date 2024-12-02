import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { createClient } from "@supabase/supabase-js";
import { Button, Container } from '@mantine/core';
import '../components/ButtonStyles.css';

const SUPABASE_URL = 'https://czvtumfwyoalvjjriqjd.supabase.co';
const PUBLIC_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6dnR1bWZ3eW9hbHZqanJpcWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MDI4NzAsImV4cCI6MjA0NzA3ODg3MH0.NEY9zyupKwJFon_TWRWVrlTM8Yd_UXAjB-YhbeAIelE'; // Replace with your actual key
const supabase = createClient(SUPABASE_URL, PUBLIC_ANON_KEY);

export default function BookingOverview() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Styling som et JavaScript-objekt
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

  useEffect(() => {
    viewBookings();
  }, []);

  async function viewBookings() {
    setLoading(true);
    const data = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
      headers: {
        apikey: PUBLIC_ANON_KEY,
        Authorization: `Bearer ${PUBLIC_ANON_KEY}`,
      },
    }).then((response) => response.json());

    setBookings(data);
    setLoading(false);
  }

  async function deleteBooking(bookingId) {
    try {
      const { error } = await supabase.from("bookings").delete().eq("id", bookingId);
      if (error) throw error;
      viewBookings();
    } catch (error) {
      console.error("Error deleting booking:", error.message);
    }
  }

  return (
    <Container style={styles.container}>
      <h1 style={styles.header}>Mine aktuelle bookinger</h1>
      {loading ? (
        <p>Henter data...</p>
      ) : (
        <div>
          {bookings.map((booking) => (
            <div key={booking.id} style={styles.bookingCard}>
              <div>
                <p>
                  <b>Dato:</b> {booking.booking_date}
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
              <Button
                className="deleteButton"
                onClick={() => deleteBooking(booking.id)}
              >
                Slet booking
              </Button>
            </div>
          ))}
        </div>
      )}
      <Link to="/booking">
        <div style={styles.buttonContainer}>
          <Button className="greenBtn">Opret ny booking</Button>
        </div>
      </Link>
    </Container>
  );
}
