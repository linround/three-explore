import { Link } from 'react-router-dom'


export default function Menus() {
  return (
    <div>
      <ul>
        <h1>shader</h1>
        <li><Link to='shader'>在 threejs 的 shader 中的常见变量；</Link></li>
        <li><Link to='geometry'>shader 几何生成；</Link></li>
        <li><Link to='color'>color 的奇妙 idea ；</Link></li>
        <li><Link to='variety'>图案的变化：平移、旋转、缩放；</Link></li>
        <li><Link to='cube'>关于立方体的渲染生成；</Link></li>
        <li><Link to='sdf'>sdf；</Link></li>
        <li><Link to='curvedSurface'>如何构建曲面；</Link></li>
        <li><Link to='light'>光照在模型中的实现；</Link></li>

        <li><Link to='texture'>纹理表面细节添加方法；</Link></li>
        <li><Link to='image'>使用 shader 进行图像处理，模糊，边缘检测、锐化······；</Link></li>
        <li><Link to='native'>使用一种接近原生的方式去定义图形；</Link></li>
        <li><Link to='bump'>凹凸贴图；</Link></li>
        <h1>图像处理</h1>
        <li><Link to='BrightnessAndContrast'>Brightness And Contrast</Link></li>
        <li><Link to='HueSaturation'>Hue And Saturation</Link></li>
        <li><Link to='Curves'>Curves</Link></li>

        <h1>threejs</h1>
        <li><Link to='DrawingLine'>绘制线条；</Link></li>



        <li><Link to='WebglCamera'>WebglCamera：多个观察角度下的渲染；</Link></li>
        <li><Link to='GeometryConvex'>GeometryConvex；</Link></li>

        {/*<p>工具</p>*/}
        {/*<li>*/}
        {/*  <Link to={'renderer'}>*/}
        {/*    光线追踪可视化*/}
        {/*  </Link>*/}
        {/*</li>*/}

        <p>拓展阅读：</p>
        <li><Link to={'https://www.scratchapixel.com/'}>
          scratchapixel（对计算机图形学的介绍）</Link></li>
        <li><Link to={'https://medium.com/@junyingw/future-of-gaming-rasterization-vs-ray-tracing-vs-path-tracing-32b334510f1f'}>
          Rasterization vs Ray Tracing vs Path Tracing
        </Link></li>
        <li><Link to={'https://learnopengl-cn.github.io/'}>
          learnopengl
        </Link></li>

        <h1>React</h1>
        <li>
          <Link to="CustomHook">自定义钩子</Link>
        </li>

      </ul>
    </div>
  )
}
