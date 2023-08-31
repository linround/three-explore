export function Text() {
  return (
    <main>
      <h1>SDF 示例</h1>
      <p>附录：</p>
      <ul>
        <li><a href={'https://www.zhihu.com/column/c_1431297491883384833'}>符号距离场函数（SDF）</a></li>
        <li><a href={'https://iquilezles.org/articles/distfunctions2d/'}>2D distance functions</a></li>
      </ul>
      <iframe width="640" height="360" frameBorder="0"
        src="https://www.shadertoy.com/embed/mlfBWB?gui=true&t=10&paused=true&muted=false"
        allowFullScreen></iframe>
      <li>SDF简介</li>
      <p>SDF就是某一点到某一个区域边界的最短距离，求SDF的通用思路就是分类讨论；</p>
    </main>
  )
}
