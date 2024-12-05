import { createFileRoute } from '@tanstack/react-router'  // Importerer funktionen til at oprette en rute fra TanStack Router
import LoginFormStudent from '../components/LoginFormStudent'  // Importerer LoginFormStudent-komponenten, som bruges til login af studerende

// Opretter en rute for login-siden for studerende ('/loginStudent')
// Når brugeren besøger '/loginStudent', vises RouteComponent-komponenten
export const Route = createFileRoute('/loginStudent')({
  component: RouteComponent,  // Binder denne rute til RouteComponent-komponenten
})

function RouteComponent() {
  return (
    <div>
      {/* Kommenteret kode, som kunne vise brugerens navn, hvis det er tilgængeligt i context:
      <div>{context.userInfo.name ?? 'No name'}</div> */}
      <LoginFormStudent />  {/* Viser LoginFormStudent-komponenten, som indeholder loginformularen for studerende */}
    </div>
  )
}
