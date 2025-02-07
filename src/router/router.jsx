import { createBrowserRouter } from 'react-router-dom'
import Root from './root.jsx'
import ErrorPage from './error-page.jsx'
import Menus from './menus.jsx'
import ShaderIntroduction from '../view/shader/shaderIntroduction.jsx'
import Geometry from '../view/geometry/geometry.jsx'
import Native from '../view/native/native.jsx'
import { Color } from '../view/color/Color.jsx'
import { Variety } from '../view/variety/Variety.jsx'
import { Cube } from '../view/cube/Cube.jsx'
import { Image } from '../view/image/image.jsx'
import { CurvedSurface } from '../view/curvedSurface/curvedSurface.jsx'
import { Light } from '../view/light/light.jsx'
import SDF from '../view/sdf/sdf.jsx'
import { Texture } from '../view/texture/texture.jsx'
import Bump from '../view/bump/bump.jsx'
import { Renderer } from '../view/renderer/renderer.jsx'
import { DrawingLine } from '../view/drawingLine/drawingLine.jsx'
import { WebglCamera } from '../view/webglCamera/WebglCamera.jsx'
import { GeometryConvex } from '../view/geometryConvex/GeometryConvex.jsx'
import { BrightnessAndContrast } from '../view/BrightnessAndContrast/BrightnessAndContrast.jsx'
import { HueSaturation } from '../view/HueSaturation/HueSaturation.jsx'
import { Curves } from '../view/curves/Curves.jsx'
import {CustomHook} from '../view/customHook/customHook.jsx'


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
        path: 'CustomHook',
        element: <CustomHook />,
      },
      {
        path: 'HueSaturation',
        element: <HueSaturation />,
      },
      {
        path: 'Curves',
        element: <Curves />,
      },
      {
        path: 'BrightnessAndContrast',
        element: <BrightnessAndContrast />,
      },
      {
        path: 'DrawingLine',
        element: <DrawingLine />,
      },
      {
        path: 'GeometryConvex',
        element: <GeometryConvex />,
      },
      {
        path: 'WebglCamera',
        element: <WebglCamera />,
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
      },
      {
        path: 'variety',
        element: <Variety />,
      },
      {
        path: 'cube',
        element: <Cube />,
      },
      {
        path: 'image',
        element: <Image />,
      },
      {
        path: 'curvedSurface',
        element: <CurvedSurface />,
      },
      {
        path: 'light',
        element: <Light />,
      },
      {
        path: 'sdf',
        element: <SDF />,
      },
      {
        path: 'texture',
        element: <Texture />,
      },
      {
        path: 'bump',
        element: <Bump />,
      }
    ],
  },
  {
    path: 'renderer',
    element: <Renderer />,
  }
])
