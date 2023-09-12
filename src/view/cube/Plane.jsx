import img7 from './img/img_7.png?url'
import { CodeText } from '../../component/codeText.jsx'
export function Plane() {
  return (
    <>
      <main>
        <h1>立方体面的2D投影</h1>

        <p>附录：</p>

        <p><a target={'_blank'} rel="noreferrer" href={'https://www.bilibili.com/video/BV1SW411y7W1/?vd_source=2fbc276c906dcfb63eeb8b5cf37bd9ff'}>四元数的可视化（视频）；</a></p>
        <p><a target={'_blank'} rel="noreferrer" href={'https://krasjet.github.io/quaternion/quaternion.pdf'} >四元数与三维旋转（pdf）；</a></p>
        <p> <a href={'https://zhuanlan.zhihu.com/p/267722955'} target={'_blank'} rel="noreferrer">平面方程的求解公式；</a></p>
        <p><a href={'https://www.shadertoy.com/view/4dG3RK'}>立方体示例1；</a></p>
        <p><img src={img7}/></p>
        <li>万向锁直观理解</li>
        <p>万向锁导致的维度丢失；</p>
        <p>欧拉角是由三个角度表示，表示物体从原始姿态到目标姿态的一个变换。无论（α，β，γ）三个角度值是多少，</p>
        <p> 都是得从物体的原始姿态开始进行绕轴进行旋转。所以物体的姿态都是相对于其最原始姿态的，上述图例中说到的，</p>
        <p> 先绕X轴旋转30度，再绕Y轴旋转90度，再绕Z轴旋转10度得到的最终姿态和先绕X轴旋转20度，再绕Y轴旋转90度的结果一样。</p>
        <p> 因此相对于最初姿态而言，当一个欧拉角包含绕Y轴旋转90度时，绕X轴和绕Z轴旋转已经是在绕同一个轴在进行旋转，</p>
        <p> 这个时候只有两个轴在起作用。这个时候就是万向锁的状态。</p>
        <p> 自己拿一个手机来做一下试验，有助于理解万象锁：</p>

        <p> 可以拿出手机放在桌面上，屏幕朝上，手机的最长边垂直与桌子的边缘设置为X轴，这个时候屏幕的短边平行于桌子的边缘设置为Y轴，因此垂直与屏幕的向量为Z轴。</p>
        <p> 我们先绕手机的最长边X轴顺时针旋转30度，这个时候手机离开桌面，留下一个长边与桌子接触；</p>
        <p>  然后再绕Y轴，也就是手机的短边旋转90度，让屏幕面与桌子的边缘平行；再绕Z轴旋转10度，也就是绕垂直于屏幕的轴旋转10度，这个时候你会发现，绕Z轴旋转时，</p>
        <p>  屏幕面还是平行桌子的边缘，而此时绕Z轴旋转的角度给手机姿态带来的影响和最开始旋转X轴给手机姿态带来的影响是一样的——都是使手机最终的姿态</p>
        <p>  （已经绕Y轴旋转了90度使得手机屏幕与桌子边缘平行）为绕着垂直于屏幕的轴旋转一定的角度。你完全可以不用绕Z轴旋转，</p>
        <p>  通过调节绕X轴旋转的角度数，使得最终手机的姿态和上述旋转过程达到的姿态一样。此时就是造成了万向锁</p>
        <CodeText>
          <>
            <p>万向锁的造成原因是因为，宣旋转角度导致了旋转前后有两个坐标轴的重合;</p>
            <p>四元数很直接的描述了绕单个轴进行旋转，所以不存在多个旋转轴，旋转前后重合的情况；</p>
          </>
        </CodeText>
        <iframe width="640" height="360" frameBorder="0"
          src="https://www.shadertoy.com/embed/mtByWc?gui=true&t=10&paused=true&muted=false"
          allowFullScreen></iframe>
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
