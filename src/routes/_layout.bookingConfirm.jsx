import * as React from 'react'  // Importerer React for at kunne bruge JSX
import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'  // Importerer funktioner til routing fra TanStack React Router
import '../components/ButtonStyles.css'  // Importerer CSS-fil til knapstil (ButtonStyles.css)
import { Button } from '@mantine/core'  // Importerer Button-komponenten fra Mantine UI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Importerer FontAwesome-komponent til ikoner
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';  // Importerer et konkret ikon (faCircleCheck) fra FontAwesome

// Opretter en ny route til booking-confirmations-siden
export const Route = createFileRoute('/_layout/bookingConfirm')({
  component: RouteComponent,  // Forbinder ruten til RouteComponent
})

// Selve komponenten, der håndterer bookingbekræftelsen
function RouteComponent() {
  // const navigate = useNavigate({ from: '/bookingConfirm' })  // Kommentareret ud navigering, kan bruges senere
  
  const context = useRouteContext({ from: '/_layout/bookingConfirm' })
  console.log(context)

  return (
    <div
      style={{
        display: 'flex',  // Flexbox layout for at centrerere indhold
        flexDirection: 'column',  // Arrangement af indhold i kolonne
        alignItems: 'center',  // Centerer indhold vandret
        justifyContent: 'center',  // Centerer indhold lodret
        height: '80vh',  // Højde på 80% af viewport-højden
      }}
    >
      {/* FontAwesome ikon, der viser et grønt cirkelformet "check" ikon */}
      <FontAwesomeIcon
        style={{ fontSize: '250px', color: '#6eb47e' }}  // Stil for at gøre ikonet stort og grønt
        icon={faCircleCheck}  // Det specifikke ikon der vises
      />

      {/* Bekræftelsesmeddelelse */}
      <p style={{ fontSize: '40px' }}>Booking bekræftet!</p>

      {/* Link til 'mine bookinger' siden */}
      <Link to={'/myBookings'}>
        {/* Button, der leder brugeren til 'myBookings' ruten */}
        <Button
          size="lg"
          className="whiteBtn"  // Brug af en stilklasse til knap
          // onClick={() => context.navigate('/_layout/myBookings')}  // Kommentareret ud, kan bruges senere
        >
          Gå til mine bookinger  {/* Knappen viser teksten 'Gå til mine bookinger' */}
        </Button>
      </Link>
    </div>
  )
}
