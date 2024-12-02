import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import FrontPageNavbar from '../components/FrontPageNavbar'
import FrontPageFooter from '../components/FrontPageFooter'
import FrontPageContent from '../components/FrontPageContent'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
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
