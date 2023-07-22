import { Link } from 'react-router-dom'

export default function Menus() {
  return (
    <div>
      <ul>
        <li><Link to='shader'>threejs 的 shader 中的常见变量；</Link></li>
        <li><Link to='geometry'>shader 几何生成；</Link></li>
        <li><Link to='/'>使用 threejs 定义顶点、法向量；使用 webgl 自定义顶点、法向量；</Link></li>
      </ul>
    </div>
  )
}
