import * as React from 'react'  
import { createFileRoute, useRouteContext } from '@tanstack/react-router'  
import { Container, Button } from '@mantine/core'  
import styles from '../components/LoginForm.module.css'  
import '../components/ButtonStyles.css'  
import { Link } from '@tanstack/react-router'

// Opretter en rute for '/studentTeacher', som håndterer valget af login som enten underviser eller studerende
export const Route = createFileRoute('/studentTeacher')({
  component: RouteComponent,  // Binder denne rute til RouteComponent-komponenten
})

function RouteComponent() {
  // Henter rute-konteksten (information om den aktuelle rute og dens navigation) for '/studentTeacher'
  const context = useRouteContext({ from: '/studentTeacher' })

  return (
    <Container className={styles.container}>
      <h1>BOOK LOKALE</h1>  
      <h3>Log ind som</h3> 

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px', 
        }}
      >

        {/* Knap for at logge ind som underviser */}
        <div>
          <Link to="/loginTeacher">  {/* Link til login-siden for underviser */}
            <Button
              size="lg"  
              className="greenBtn"  
            >
              Underviser
            </Button>
          </Link>
        </div>

        {/* Knap for at logge ind som studerende */}
        <div>
          <Link to="/loginStudent">  {/* Link til login-siden for studerende */}
            <Button
              size="lg" 
              className="greenBtn"
            >
              Studerende
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  )
}