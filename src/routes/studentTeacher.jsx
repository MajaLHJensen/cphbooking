import * as React from 'react'  // Importerer React-biblioteket, som er nødvendigt for at arbejde med React-komponenter
import { createFileRoute, useRouteContext } from '@tanstack/react-router'  // Importerer funktioner fra TanStack Router til at oprette ruter og bruge kontekst
import { Container, Button } from '@mantine/core'  // Importerer komponenter fra Mantine UI-biblioteket
import styles from '../components/LoginForm.module.css'  // Importerer stilark fra LoginForm-komponenten
import '../components/ButtonStyles.css'  // Importerer eksterne knapstilarter
import { Link } from '@tanstack/react-router'  // Importerer Link fra TanStack Router for at skabe navigation til andre ruter

// Opretter en rute for '/studentTeacher', som håndterer valget af login som enten underviser eller studerende
export const Route = createFileRoute('/studentTeacher')({
  component: RouteComponent,  // Binder denne rute til RouteComponent-komponenten
})

function RouteComponent() {
  // Henter rute-konteksten (information om den aktuelle rute og dens navigation) for '/studentTeacher'
  const context = useRouteContext({ from: '/studentTeacher' })

  return (
    <Container className={styles.container}>
      <h1>BOOK LOKALE</h1>  {/* Titel på siden */}
      <h3>Log ind som</h3>  {/* Undertekst, der forklarer hvad brugeren skal vælge */}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',  // Giver et mellemrum mellem knapperne
        }}
      >
        {/* Knap for at logge ind som underviser */}
        <div>
          <Link to="/loginTeacher">  {/* Link til login-siden for underviser */}
            <Button
              size="lg"  // Sætter størrelsen af knappen til stor
              className="greenBtn"  // Bruger en grøn knapstil
              onClick={() => context.navigate('/loginTeacher')}  // Navigerer til login-siden for underviser, når knappen klikkes
            >
              Underviser
            </Button>
          </Link>
        </div>

        {/* Knap for at logge ind som studerende */}
        <div>
          <Link to="/loginStudent">  {/* Link til login-siden for studerende */}
            <Button
              size="lg"  // Sætter størrelsen af knappen til stor
              className="greenBtn"  // Bruger en grøn knapstil
              onClick={() => context.navigate('/loginStudent')}  // Navigerer til login-siden for studerende, når knappen klikkes
            >
              Studerende
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  )
}
