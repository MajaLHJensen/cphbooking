import { createFileRoute } from '@tanstack/react-router'  
import LoginFormTeacher from '../components/LoginFormTeacher'  

// Opretter en rute for login-siden for lærere ('/loginTeacher')
// Når brugeren besøger '/loginTeacher', vises RouteComponent-komponenten
export const Route = createFileRoute('/loginTeacher')({
  component: RouteComponent,  // Binder denne rute til RouteComponent-komponenten
})

function RouteComponent() {
  return (
    <div>
      <LoginFormTeacher />
    </div>
  )
}