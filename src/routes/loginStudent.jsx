import { createFileRoute } from '@tanstack/react-router'
import LoginFormStudent from '../components/LoginFormStudent'

export const Route = createFileRoute('/loginStudent')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      {/* <div>{context.userInfo.name ?? 'No name'}</div> */}
      <LoginFormStudent />
    </div>
  )
}
