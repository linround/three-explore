import { Link } from 'react-router-dom'

export default function Menus() {
  return (
    <div>
      <ul>
        <li><Link to='shader'>threejs 的 shader 中的常见变量；</Link></li>
        <li><Link to='geometry'>shader 几何生成；</Link></li>
        <li><Link to='native'>使用一种接近原生的方式去定义图形；</Link></li>
      </ul>
    </div>
  )
}
