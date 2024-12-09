import { createFileRoute, useRouteContext, useNavigate } from '@tanstack/react-router'
import NewCalendar from '../components/NewCalendar'
import Schedule from '../components/Schedule'
import { useEffect, useState } from 'react'
import Dropdown from '../components/Dropdown'
import StartDropdown from '../components/StartDropdown'
import EndDropdown from '../components/EndDropdown'
import dayjs from 'dayjs'
import { combineSchedules } from '../chatgpt-utils/combine-schedule'
import { calculateBooking } from '../chatgpt-utils/calculate-booking'
import { Modal, Button } from '@mantine/core'
import '../components/ButtonStyles.css'
import '../components/BookingStyles.css'
import { SUPABASE_URL, PUBLIC_ANON_KEY } from "../supabase/getSupabaseClient";
import Spinner from '../components/Spinner'

// Opretter en ny rute for bookingsiden
export const Route = createFileRoute('/_layout/booking')({
  component: RouteComponent,
})

function RouteComponent() {
  const [datePicked, setDatePicked] = useState(dayjs()); // Den aktuelt valgte dato
  const [bookings, setBookings] = useState({}); // Aktuelle bookinger for valgte dato
  const [startTime, setStartTime] = useState(''); // Starttidspunkt for booking
  const [endTime, setEndTime] = useState(''); // Sluttidspunkt for booking
  const [selectedRoom, setSelectedRoom] = useState(''); // Det valgte lokale
  const [modalOpened, setModalOpened] = useState(false); // Om modalen er åben
  const [isLoading, setLoading] = useState(false); // Indikator for, om der er en igangværende handling
  const [bookingInfo, setBookingInfo] = useState(null); // Info om den aktuelle booking

  const navigate = useNavigate(); 
  const context = useRouteContext({ 
    from: '/_layout/booking',
  })
  
  // Henter bookinger for den valgte dato, når datoen ændres
  useEffect(() => {
    getBookings() // Henter bookinger for den valgte dato
  }, [datePicked])

  async function getBookings() {
    const pickedDateFormatted = dayjs(datePicked).format('YYYY-MM-DD')
    const data = await fetch(
      `${SUPABASE_URL}/rest/v1/bookings?booking_date=eq."${pickedDateFormatted}"`,
      {
        headers: {
          apikey: PUBLIC_ANON_KEY,
          Authorization: `Bearer ${PUBLIC_ANON_KEY}`,
        },
      },
    ).then((response) => response.json())

    // Hvis der ingen bookinger er, oprettes tomme lister for hvert lokale
    if (data.length === 0) {
      setBookings({
        'Lokale 2.13 (4 pers.)': [],
        'Lokale 2.88 (3 pers.)': [],
        'Lokale 3.05 (8 pers.)': [],
        'Lokale 3.08 (4 pers.)': [],
        'Lokale 3.14 (6 pers.)': [],
      })
    } else {
      // Kombiner eksisterende bookinger
      setBookings(combineSchedules(data))
    }
  }

  // Funktion til at håndtere en ny booking
  async function makeBooking() {
    setLoading(true);

    // Beregner bookingen for det valgte lokale og tidsinterval
    const data = calculateBooking(selectedRoom, startTime, endTime)

    // Konverterer den valgte dato (datePicked) til et JavaScript Date-objekt
    const selectedDate = new Date(datePicked);

    // Får dagen i ugen som et tal (0 = søndag, 1 = mandag, ..., 6 = lørdag)
    const day = selectedDate.getDay();

    // Tjekker, om dagen er søndag (0) eller lørdag (6)
    if (day === 0 || day === 6) {
   // Viser en besked til brugeren og stopper booking-processen
    alert("Du kan ikke booke i weekenden.");
    return; 
    }

    try {
      // Tjekker for konflikter med eksisterende bookinger
      const existingBookingsResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/bookings?booking_date=eq.${dayjs(datePicked).format('YYYY-MM-DD')}&select=*`,
        {
          method: 'GET',
          headers: {
            apikey: PUBLIC_ANON_KEY,
            Authorization: `Bearer ${PUBLIC_ANON_KEY}`,
          },
        },
      )

      if (!existingBookingsResponse.ok) {
        throw new Error(
          `Fejl ved hentning af eksisterende bookinger: ${existingBookingsResponse.status}`,
        )
      }

      const existingBookings = await existingBookingsResponse.json() 

      // Tjekker for overlap mellem den nye booking og eksisterende bookinger
      const isConflict = existingBookings.some((booking) => {
        const existingSchedule = booking.schedule[selectedRoom] || [] // Henter eksisterende tidsrum for lokalet
        return data[selectedRoom].some((time) =>
          existingSchedule.includes(time),
        )
      })

      if (isConflict) {
        alert(
          'Fejl: Tidsrum er allerede booket. Prøv igen med et andet tidsrum.',
        )
        return
      }

      setLoading(false); 

      // Åbn modal og gem bookinginformation
      setBookingInfo({
        booking_date: dayjs(datePicked).format('YYYY-MM-DD'),
        schedule: data,
        startTime: startTime,
        endTime: endTime,
        selectedRoom: selectedRoom,
        email: context.userInfo?.email,
      })
      // Åbner modal
      setModalOpened(true) 
    } catch (error) {
      console.error('Fejl:', error)
      alert(`Fejl: ${error.message}`)
    }
  }

  // Bekræfter og gemmer den nye booking i databasen
  async function confirmBooking() {
    console.log(bookingInfo)
    setLoading(true); 
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
        method: 'POST',
        headers: {
          apikey: PUBLIC_ANON_KEY,
          Authorization: `Bearer ${PUBLIC_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingInfo),
      })

      console.log(response)

      if (!response.ok) {
        throw new Error(`Fejl ved oprettelse af booking: ${response.status}`)
      }

      // Lukker modal, nulstiller info og opdaterer bookings
      setModalOpened(false)
      setBookingInfo(null)
      getBookings() 
    } catch (error) {
      console.error('Fejl:', error)
      // alert(`Fejl: ${error.message}`)
    } finally {
    setLoading(false);  // Sørger for at 'loading' altid bliver sat til false
    navigate({to: "/bookingConfirm"});
}

    console.log("Booking gennemført!");
  }

  // Annullerer den aktuelle booking
  async function cancelBooking() {
    setModalOpened(false) // Lukker modal
    setBookingInfo(null) // Nulstiller bookinginfo
  }

  return (
    // Indhold på booking side
    <div className="container">
      {/* Venstre side med kalender, dropdowns og knap */}
      <div className="leftSection">
        <NewCalendar date={datePicked} setDate={setDatePicked} />
        <div className="dropdownContainer">
          <Dropdown selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
          <StartDropdown startTime={startTime} setStartTime={setStartTime} />
          <EndDropdown endTime={endTime} setEndTime={setEndTime} />
        </div>
        
        {/* Hvis systemet er i gang med at hente data eller oprette en booking, vises en spinner */}
        {isLoading && <Spinner/>}
        
        {/* Knap til at oprette en booking */}
        <div className="bookButtonContainer">
          <Button className="whiteBtn" onClick={makeBooking}>
            Book
          </Button>
        </div>
        
        {/* Modal der vises med bookingopsummering */}
        <Modal
            opened={modalOpened} // Kontrollerer om modalen er åben
            onClose={() => setModalOpened(false)} // Lukker modalen når brugeren klikker på luk-knap
            centered
            withCloseButton={false}
            overlayProps={{ className: "modalOverlay" }}
            styles={{
              content: {
                padding: "20px",
                backgroundColor:"#6eb47e",
                borderRadius: "8px",
              },
            }}
          >
          
          {/* Indhold af modalen */}
          <div className="modalInnerSection">
            <h3 className="modalSummary">Opsummering:</h3>
            <div className="modalSummaryContent">
              <p>
                <b>Dato:</b> {bookingInfo?.booking_date}
              </p>
              <p>
                <b>Lokale:</b> {selectedRoom}
              </p>
              <p>
                <b>Tidsrum:</b> {startTime} - {endTime}
              </p>
              <p>
                <b>Email:</b> {context.userInfo.email}
              </p>
            </div>
          </div>

          {/* Knapper i modalen til at annullere eller bekræfte bookingen */}
          <div className="modalButtonContainer">
            <Button className="greenBtn" onClick={cancelBooking}>
              Annuller
            </Button>

            {/* Hvis systemet er i gang med at hente data eller oprette booking, vises en spinner */}
            {isLoading && <Spinner/>}
            
            {/* Knap til at bekræfte booking */}
            <Button className="greenBtn" onClick={confirmBooking}>
              Bekræft
            </Button>
          </div>
        </Modal>
      </div>
      
      <div className="rightSection">
        <Schedule value={bookings} />
      </div>
    </div>
  );
}

export default RouteComponent;