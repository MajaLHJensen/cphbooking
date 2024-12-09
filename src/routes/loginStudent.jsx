import { createFileRoute } from '@tanstack/react-router'  
import LoginFormStudent from '../components/LoginFormStudent'  

// Opretter en rute for login-siden for studerende ('/loginStudent')
// Når brugeren besøger '/loginStudent', vises RouteComponent-komponenten
export const Route = createFileRoute('/loginStudent')({
  component: RouteComponent,  // Binder denne rute til RouteComponent-komponenten
})

function RouteComponent() {

  return (
    <div>
      <LoginFormStudent />  
    </div>
  )
}