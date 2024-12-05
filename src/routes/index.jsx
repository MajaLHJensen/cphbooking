import { createFileRoute, useRouteContext } from '@tanstack/react-router'  // Importerer nødvendige funktioner fra TanStack Router
import FrontPageNavbar from '../components/FrontPageNavbar'  // Importerer FrontPageNavbar komponenten til visning af navigation på forsiden
import FrontPageFooter from '../components/FrontPageFooter'  // Importerer FrontPageFooter komponenten til visning af footer på forsiden
import FrontPageContent from '../components/FrontPageContent'  // Importerer FrontPageContent komponenten, som indeholder hovedindholdet på forsiden

// Opretter en rute for forsiden ('/'), som viser Index-komponenten, når brugeren besøger roden af webapplikationen
export const Route = createFileRoute('/')({
  component: Index,  // Binder denne rute til Index-komponenten
})

function Index() {
  // Bruger useRouteContext til at hente den aktuelle rute kontekst (typisk data relateret til ruten)
  const context = useRouteContext({ from: '/' })
  console.log(context)  // Logger rute-kontexten for debugging, så du kan se hvilken data der er tilknyttet ruten

  return (
    <div>
      {/* Viser forsiden med navigation, indhold og footer */}
      <FrontPageNavbar />  {/* Navigationskomponent */}
      <FrontPageContent />  {/* Hovedindhold på forsiden */}
      <FrontPageFooter />  {/* Footer komponent */}
    </div>
  )
}
