import { createBrowserRouter } from 'react-router-dom'
import Root from './root.jsx'
import ErrorPage from './error-page.jsx'
import Menus from './menus.jsx'
import { Demo } from '../demo/demo.jsx'
import ShaderIntroduction from '../view/shader/shaderIntroduction.jsx'
import Geometry from '../view/geometry/geometry.jsx'

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
        path: 'shader',
        element: <ShaderIntroduction />,
      },
      {
        path: 'geometry',
        element: <Geometry />,
      }
    ],
  },
  {
    path: '/demo',
    element: <Demo />,
  }
])
