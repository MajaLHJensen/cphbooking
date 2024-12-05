import { createFileRoute } from '@tanstack/react-router'  // Importerer funktionen fra TanStack Router for at oprette en rute
import LoginFormTeacher from '../components/LoginFormTeacher'  // Importerer LoginFormTeacher-komponenten, som bruges til login af lærere

// Opretter en rute for login-siden for lærere ('/loginTeacher')
// Når brugeren besøger '/loginTeacher', vises RouteComponent-komponenten
export const Route = createFileRoute('/loginTeacher')({
  component: RouteComponent,  // Binder denne rute til RouteComponent-komponenten
})

function RouteComponent() {
  return (
    <div>
      {/* Kommenteret kode, som kunne vise brugerens navn, hvis det er tilgængeligt i context:
      <div>{context.userInfo.name ?? 'No name'}</div> */}
      <LoginFormTeacher />  {/* Viser LoginFormTeacher-komponenten, som indeholder loginformularen for lærere */}
    </div>
  )
}
