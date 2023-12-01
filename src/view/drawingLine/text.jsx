
export function Text() {
  return (
    <div>
      <h1>绘制线条</h1>
      <p>首先需要渲染器，场景和相机</p>
      <p>接着需要一个材质，对于线条可以使用 <a>LineBasicMaterial</a> 或 <a>LineDashedMaterial</a>。 </p>
      <ul>
        <li>THREE.PerspectiveCamera</li>
        <li>THREE.Group.</li>
        <li>material.blending</li>
        <li>THREE.PointsMaterial</li>
      </ul>
      <h2>要点</h2>
      <ul>
        <li>顶点信息设置的两种方式：<a>setAttribute</a>、<a>setFromPoints</a></li>
      </ul>
      <h2>tips</h2>
      <li>LineBasicMaterial.linewidth；由于opengl的限制，linewidth始终是设置为1。</li>
    </div>
  )
}
