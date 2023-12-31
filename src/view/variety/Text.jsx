import cellFragment from './cellFragment.glsl?url'
import cell1 from './cell_1.png?url'
import cell2 from './cell_2.png?url'
import cell4 from './cell_4.png?url'
export function Text() {
  return (
    <main>
      <h1>图形</h1>
      <p>图形的常见变换包括，<a>平移，旋转、缩放、</a>反射、错切</p>
      <p>反射即使对坐标发生一些翻转</p>
      <p>错切，即以不规则的比例对图形进行缩放，使得图形发生变形</p>
      <ul>
        <li>关于细胞的生成方式记录；<a href={cellFragment}>查看</a></li>
        <p>首先基于距离场，可生成静态的图形</p>
        <ul>
          <li>选取五个坐标点</li>
          <li>计算目标像素点到 所选取的五个坐标点的的距离</li>
          <li>找到最小的距离值，以最小距离值作为该店的颜色值</li>
        </ul>
        <p>以上三步模拟的场景：将目标像素点，与距离较近的中心点构成一个相关性；</p>
        <img src={cell1}/>
        <li>基于网格生成距离场</li>
        <p>考虑较多的坐标点场景：如果按照上一种方式，每一个像素都需要使用循环的方式找到该像素的相关点；</p>
        <p>因此可以使用相应的网格生成对应数量的距离场</p>
        <ul>
          <li>以3*3网格为例，首先对坐标进行扩展，从 <a>[ 0, 1 ]</a> 到 <a>[ 0, 3 ]</a></li>
          <li>找到目标像素对应的网格坐标点：整数部分代表该网格，小数部分代表该网格内的坐标点 ；</li>
          <li>生成一个网格相关的距离场</li>
          <p>使用整数部分生成一个随机点<a> [ 0, 1 ] </a>范围，作为该网格的关键点；</p>
          <p>计算该网格内的小数坐标部分到 该网格关键点的距离，以此距离代表该网格内某一点的像素值；</p>
        </ul>
        <img src={cell2}/>
        <li>基于网格距离场，生成具有相关性的网格距离场； <a href={cellFragment}>查看</a></li>
        <p>以3*3的九宫格为例；<a>周围关键点</a>主要是指周围网格的关键点</p>
        <p>在九宫格中，以中心点为 (x,y) 坐标；那么其周围的<a>八个</a>格子坐标分别 (x+-01,y+-01) </p>
        <img src={cell4}/>
        <p></p>
        <iframe width="640" height="360" frameBorder="0"
          src="https://www.shadertoy.com/embed/dtfyRl?gui=true&t=10&paused=true&muted=false"
          allowFullScreen></iframe>
      </ul>
    </main>
  )
}
