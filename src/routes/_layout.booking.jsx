import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'
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

export const Route = createFileRoute('/_layout/booking')({
  component: RouteComponent,
})

function RouteComponent() {
  const [datePicked, setDatePicked] = useState(dayjs())
  const [bookings, setBookings] = useState({})
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')
  const [modalOpened, setModalOpened] = useState(false)
  const [bookingInfo, setBookingInfo] = useState(null)
  const context = useRouteContext({ from: '/_layout/booking' })
  console.log(context)

  useEffect(() => {
    getBookings()
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

    if (data.length === 0) {
      setBookings({
        'Lokale 2.13 (4 pers.)': [],
        'Lokale 2.88 (3 pers.)': [],
        'Lokale 3.05 (8 pers.)': [],
        'Lokale 3.08 (4 pers.)': [],
        'Lokale 3.14 (6 pers.)': [],
      })
    } else {
      setBookings(combineSchedules(data))
    }
  }

  async function makeBooking() {
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

      const isConflict = existingBookings.some((booking) => {
        const existingSchedule = booking.schedule[selectedRoom] || []
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

      // Åbn modal og gem bookinginformation
      setBookingInfo({
        booking_date: dayjs(datePicked).format('YYYY-MM-DD'),
        schedule: data,
        startTime: startTime,
        endTime: endTime,
        selectedRoom: selectedRoom,
        email: context.userInfo?.email,
      })
      setModalOpened(true)
    } catch (error) {
      console.error('Fejl:', error)
      alert(`Fejl: ${error.message}`)
    }
  }

  async function confirmBooking() {
    console.log(bookingInfo)
    bookingInfo.email = "test@test.dk"; // dummy test data, slet denne linje igen.
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

      setModalOpened(false)
      setBookingInfo(null)
      getBookings()
    } catch (error) {
      console.error('Fejl:', error)
      // alert(`Fejl: ${error.message}`)
    }

    console.log("Booking gennemført!");
  }

  async function cancelBooking() {
    setModalOpened(false)
    setBookingInfo(null)
  }

  return (
    <div className="container">
      <div className="leftSection">
        <NewCalendar date={datePicked} setDate={setDatePicked} />
        <div className="dropdownContainer">
          <Dropdown selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
          <StartDropdown startTime={startTime} setStartTime={setStartTime} />
          <EndDropdown endTime={endTime} setEndTime={setEndTime} />
        </div>
        <div className="bookButtonContainer">
          <Button className="whiteBtn" onClick={makeBooking}>
            Book
          </Button>
        </div>
        <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
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
                <b>Email:</b> {context.userInfo?.email}
              </p>
            </div>
          </div>
          <div className="modalButtonContainer">
            <Button className="greenBtn" onClick={cancelBooking}>
              Annuller
            </Button>
            <Link to="/bookingConfirm">
              <Button className="greenBtn" onClick={confirmBooking}>
                Bekræft
              </Button>
            </Link>
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