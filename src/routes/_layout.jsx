import { createFileRoute, Outlet } from '@tanstack/react-router'
import NavBar from '../components/NavBar'  

// Opretter en rute til layoutet (route til '_layout'), som vil være den overordnede wrapper for alle relaterede ruter
export const Route = createFileRoute('/_layout')({
  component: RouteComponent,  // Forbinder ruten til RouteComponent, som definerer layoutet
})

function RouteComponent() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}