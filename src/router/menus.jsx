import { Link } from 'react-router-dom'

export default function Menus() {
  return (
    <div>
      <ul>
        <li><Link to='shader'>在 threejs 的 shader 中的常见变量；</Link></li>
        <li><Link to='geometry'>shader 几何生成；</Link></li>
        <li><Link to='color'>color 的奇妙 idea ；</Link></li>
        <li><Link to='variety'>图案的变化：平移、旋转、缩放；</Link></li>
        <li><Link to='cube'>关于立方体的渲染生成；</Link></li>
        <li><Link to='light'>光照在模型中的实现；</Link></li>
        <li><Link to='image'>使用 shader 进行图像处理，模糊，边缘检测、锐化······；</Link></li>
        <li><Link to='curvedSurface'>如何构建曲面；</Link></li>
        <li><Link to='native'>使用一种接近原生的方式去定义图形；</Link></li>
      </ul>
    </div>
  )
}
