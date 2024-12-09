import * as React from 'react'  
import { createFileRoute } from '@tanstack/react-router'  
import BookingOverview from '../components/BookingOverview'  

// Opretter en rute til '_layout/myBookings' - denne rute viser bookingoversigten
export const Route = createFileRoute('/_layout/myBookings')({
  component: RouteComponent,  // Forbinder ruten med RouteComponent, som vil vise BookingOverview komponenten
})

function RouteComponent() {
  // Returnerer BookingOverview komponenten, som viser information om brugernes bookinger
  return <BookingOverview />
}