import { createFileRoute, useRouteContext } from '@tanstack/react-router'  
import FrontPageNavbar from '../components/FrontPageNavbar'  
import FrontPageFooter from '../components/FrontPageFooter' 
import FrontPageContent from '../components/FrontPageContent'  

// Opretter en rute for forsiden ('/'), som viser Index-komponenten, når brugeren besøger roden af webapplikationen
export const Route = createFileRoute('/')({
  component: Index,  // Binder denne rute til Index-komponenten
})

function Index() {
  // Bruger useRouteContext til at hente den aktuelle rute kontekst (typisk data relateret til ruten)
  const context = useRouteContext({ from: '/' })
  console.log(context)  

  return (
    <div>
      <FrontPageNavbar />  
      <FrontPageContent />  
      <FrontPageFooter />  
    </div>
  )
}