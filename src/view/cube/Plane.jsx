export function Plane() {
  return (
    <>
      <main>
        <h1>立方体面的2D投影</h1>
        <p>对于大立方体的透视投影</p>
        <ul>
          <li>将投影点变换到z轴；(在这里是为了后续方便使用常规的投影矩阵进行投影运算)</li>
          <li>使用投影矩阵对变换后的坐标进行投影</li>
          <li>对投影结果进行归一化处理；（归一化矩阵需要根据空间坐标点的位置进行求取）</li>
          <li>使用可对空间立方体进行归一化投影的矩阵进行 投影运算。最终得到完整的空间图形的投影结果</li>
        </ul>.











        <ul>
          <li><a href={'https://www.shadertoy.com/view/mdsfR7'}>2D平面的 fov角，裁切</a></li>
          <li><a href={'https://www.shadertoy.com/view/DsXfWn'}>2D平面的 正交投影，裁切</a> </li>
        </ul>
      </main>
    </>
  )
}