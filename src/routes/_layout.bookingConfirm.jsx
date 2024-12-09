import * as React from 'react'
import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router' 
import '../components/ButtonStyles.css'  
import { Button } from '@mantine/core'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';  

// Opretter en ny route til booking-confirmations-siden
export const Route = createFileRoute('/_layout/bookingConfirm')({
  component: RouteComponent,  // Forbinder ruten til RouteComponent
})

// Selve komponenten, der håndterer bookingbekræftelsen
function RouteComponent() {
  // const navigate = useNavigate({ from: '/bookingConfirm' })  
  const context = useRouteContext({ from: '/_layout/bookingConfirm' })
  console.log(context)

  return (
    <div
      style={{
        display: 'flex',  
        flexDirection: 'column', 
        alignItems: 'center',  
        justifyContent: 'center',  
        height: '80vh', 
      }}
    >
      
      {/* Bekræftelses ikon */}
      <FontAwesomeIcon
        style={{ fontSize: '250px', color: '#6eb47e' }}  
        icon={faCircleCheck} 
      />

      <p style={{ fontSize: '40px' }}>Booking bekræftet!</p>

      <Link to={'/myBookings'}>

        <Button
          size="lg"
          className="whiteBtn"  
        >
          Gå til mine bookinger  
        </Button>
      </Link>
    </div>
  )
}