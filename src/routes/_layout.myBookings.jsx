import * as React from 'react'  // Importerer React for at kunne bruge JSX og React-komponenter
import { createFileRoute } from '@tanstack/react-router'  // Importerer createFileRoute fra TanStack Router til at oprette ruter
import BookingOverview from '../components/BookingOverview'  // Importerer BookingOverview komponenten, der viser en oversigt over bookinger

// Opretter en rute til '_layout/myBookings' - denne rute viser bookingoversigten
export const Route = createFileRoute('/_layout/myBookings')({
  component: RouteComponent,  // Forbinder ruten med RouteComponent, som vil vise BookingOverview komponenten
})

function RouteComponent() {
  // Returnerer BookingOverview komponenten, som viser information om brugernes bookinger
  return <BookingOverview />
}
