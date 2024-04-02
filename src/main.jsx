import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.jsx'
console.log('test')
ReactDOM.createRoot(document.getElementById('root'))
  .render(<RouterProvider router={router} />)
