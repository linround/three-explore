import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  return (
    <div>{error.statusText || error.message}</div>
  )
}
