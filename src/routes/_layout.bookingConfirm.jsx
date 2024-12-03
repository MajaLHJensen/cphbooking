import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import '../components/ButtonStyles.css'
import { Button } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export const Route = createFileRoute('/_layout/bookingConfirm')({
  component: RouteComponent,
})

function RouteComponent() {
  // const navigate = useNavigate({ from: '/bookingConfirm' })

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
       
    <FontAwesomeIcon
      style={{ fontSize: '250px', color: '#6eb47e' }}
      icon={faCircleCheck}
    />

      <p style={{ fontSize: '40px' }}>Booking bekræftet!</p>
      <Link to={'/myBookings'}>
        <Button
          size="lg"
          className="whiteBtn"

          // onClick={() => context.navigate('/_layout/myBookings')}
        >
          Gå til mine bookinger
        </Button>
      </Link>
    </div>
  )
}
