
export function Text() {
  return (
    <div>
      <h1>绘制线条</h1>
      <p>首先需要渲染器，场景和相机</p>
      <p>接着需要一个材质，对于线条可以使用 <a>LineBasicMaterial</a> 或 <a>LineDashedMaterial</a>。 </p>
      <p>之后定义几何顶点。每队连续的顶点之间都会画线，但是第一个和最后一个不会画线。</p>
      <ul>
        <li>THREE.PerspectiveCamera</li>
        <li>THREE.Group</li>
        <li>material.blending</li>
        <li>THREE.PointsMaterial</li>
        <li>Stats</li>
      </ul>
      <h2>tips</h2>
      <li>LineBasicMaterial.linewidth；由于opengl的限制，linewidth始终是设置为1。</li>
    </div>
  )
}
