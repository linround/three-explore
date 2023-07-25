import { createBrowserRouter } from 'react-router-dom'
import Root from './root.jsx'
import ErrorPage from './error-page.jsx'
import Menus from './menus.jsx'
import { Demo } from '../demo/demo.jsx'
import ShaderIntroduction from '../view/shader/shaderIntroduction.jsx'
import Geometry from '../view/geometry/geometry.jsx'
import Native from '../view/native/native.jsx'
import { Color } from '../view/color/Color.jsx'

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
      },
      {
        path: 'native',
        element: <Native />,
      },
      {
        path: 'color',
        element: <Color />,
      }
    ],
  },
  {
    path: '/demo',
    element: <Demo />,
  }
])
