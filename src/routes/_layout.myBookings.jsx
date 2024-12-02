import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import BookingOverview from '../components/BookingOverview'

export const Route = createFileRoute('/_layout/myBookings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BookingOverview />
}
