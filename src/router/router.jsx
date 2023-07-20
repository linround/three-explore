import { createBrowserRouter } from 'react-router-dom'
import Root from './root.jsx'
import ErrorPage from './error-page.jsx'
import Water from '../view/water/water.jsx'
import Menus from './menus.jsx'
import { Demo } from '../demo/demo.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Menus />,
      },
      {
        path: 'water',
        element: <Water />,
      }
    ],
  },
  {
    path: '/demo',
    element: <Demo />,
  }
])
