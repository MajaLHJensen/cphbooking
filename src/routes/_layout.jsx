import { createFileRoute, Outlet } from '@tanstack/react-router'  // Importerer funktioner fra TanStack React Router til routing
import NavBar from '../components/NavBar'  // Importerer NavBar-komponenten, der bruges til navigation i applikationen

// Opretter en rute til layoutet (route til '_layout'), som vil være den overordnede wrapper for alle relaterede ruter
export const Route = createFileRoute('/_layout')({
  component: RouteComponent,  // Forbinder ruten til RouteComponent, som definerer layoutet
})

function RouteComponent() {
  return (
    <div>
      {/* NavBar komponenten, der indeholder navigationsmenuen */}
      <NavBar />
      
      {/* Outlet bruges til at vise de indholdskomponenter, der matcher den aktuelle route */}
      <Outlet />
    </div>
  );
}
