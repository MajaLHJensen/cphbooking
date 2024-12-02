import { createFileRoute } from '@tanstack/react-router'
import LoginFormTeacher from '../components/LoginFormTeacher'

export const Route = createFileRoute('/loginTeacher')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      {/* <div>{context.userInfo.name ?? 'No name'}</div> */}
      <LoginFormTeacher />
    </div>
  )
}
