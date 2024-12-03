import * as React from 'react'
import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { Container, Button } from '@mantine/core'
import styles from '../components/LoginForm.module.css'
import '../components/ButtonStyles.css'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/studentTeacher')({
  component: RouteComponent,
})

function RouteComponent() {
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
        <div>
          <Link to="/loginTeacher">
            <Button
              size="lg"
              className="greenBtn"
              onClick={() => context.navigate('/loginTeacher')}
            >
              Underviser
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/loginStudent">
            <Button
              size="lg"
              className="greenBtn"
              onClick={() => context.navigate('/loginStudent')}
            >
              Studerende
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  )
}
