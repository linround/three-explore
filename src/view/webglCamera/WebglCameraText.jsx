export function WebglCameraText() {
  return (
    <>
      <h1>WebglCameraText</h1>
      <p>canvas多重视图的原理是通过创建了多个canvas对象实现的</p>
      <ul>
        <li>为每一个DOM创建一个3D场景，控制器，相机</li>
        <li>在要渲染的元素下创建一个2D上下文，并挂载canvas dom</li>
        <li>收集创建得场景</li>
        <li>在2d 上下文中渲染3d 场景中的区域</li>
      </ul>
    </>
  )

}
