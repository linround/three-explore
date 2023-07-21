import { Link } from 'react-router-dom'

export default function Menus() {
  return (
    <div>
      <ul>
        <li><Link to='shader'>shader 中的常见变量；</Link></li>
        <li><Link to='geometry'>shader 几何生成；</Link></li>
      </ul>
    </div>
  )
}
