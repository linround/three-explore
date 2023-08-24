import { CodeText } from '../../component/codeText.jsx'

export function Text() {
  const reflectUrl = 'https://blog.csdn.net/yinhun2012/article/details/79466517'
  return (
    <>
      <main>
        <h1>光照在模型中的实现</h1>
        <p>附录：</p>
        <ul>
          <li><a href={'https://blog.csdn.net/islittlehappy/article/details/81533090'}>求三角形内心，外心，重心，垂心</a></li>
          <li><a href={'https://yilingui.xyz/attachments/spatial_ds--bsp_tree-octree-kd-tree.pdf'}>
          四叉树、八叉树、bsp树、kd树；
          </a></li>
          <li><a href={'https://kirisamer.github.io/2022/11/05/Ch4-COMP37111/'}>渲染方程介绍；</a></li>
          <li><a href={'https://zhuanlan.zhihu.com/p/636749237'}>Lambert模型；</a></li>
          <li><a href={'https://www.liaomz.top/2022/03/12/tu-xing-xue-ji-chu-chuan-tong-de-jing-yan-guang-zhao-mo-xing/'}>传统光照模型；</a> </li>

          <li><a href={'https://blog.51cto.com/u_12485075/4801140'}>相机投影；</a></li>
          <li><a href={'https://zhuanlan.zhihu.com/p/122411512'}>推导投影矩阵；</a></li>
          <li><a href={reflectUrl}>已知入射光线推反射；</a></li>
          <li><a href={'https://zhuanlan.zhihu.com/p/338223153'}>光线投射算法；</a></li>
        </ul>
        <iframe width="640" height="360" frameBorder="0"
          src="https://www.shadertoy.com/embed/mtXfDH?gui=true&t=10&paused=true&muted=false"
          allowFullScreen></iframe>

        <li>深度缓存与光线投射有区别吗？</li>
        <p>深度缓存算法中，每次处理一个表面，并对表面上的每个投影点计算深度值，计算出来的值与之前保存的深度值进行比较，从而确定每个像素所对应的可见表面</p>
        <p>在光线投射算法中，每次处理一个像素，并沿光线的投射路径计算出该像素所对应的所有表面的深度值</p>
        <p>深度缓存首先进行了顶点投影，然后计算投影区域内的像素的深度值；光线投射是直接处理每一个像素，并计算该像素在所有表面的深度值；</p>
        <li>关于 reflect 函数</li>
        <p> 计算入射矢量的反射方向，<a href={reflectUrl}>查看；</a></p>
        <CodeText>
          <>
            <p>float reflect(float I, float N)</p>
            <p>vec2 reflect(vec2 I, vec2 N)  </p>
            <p>I 指定了入射矢量</p>
            <p>N 指定了法向量</p>
            <p> 即 r = I-2.0*dot(N,I)*N</p>
            <p>······ </p>
          </>
        </CodeText>
        <li>关于光斑变化规律需要注意到的点</li>
        <CodeText>
          <>
            <p>这里需要理解一个现象</p>
            <p> 光泽度越大，光斑就越小</p>
            <p>假设光源位置与观察位置的坐标一样；</p>
            <p>dot(reflectDir,view)   = |reflectDir||view|*cosΘ；</p>
            <p>当越靠近入射点时 反射向量与 观察方向之间的夹角越小；</p>
            <p>cosθ的值越接近 1 ；此时反射光的值越大，所以越靠近入射点，高光效果越大；</p>
            <p>随着 向周围坐标扩散，方向的变化速率也越来越大，所以 高光变小的速率也越来越大；</p>
            <p>所以在较为平缓的 坐标范围中，该区域形成了一个光斑；</p>
            <p>比如之前时 1-x²</p>
            <p>随着 x 变大 变化速率上升的越快</p>
            <p><a>注意：变化速率 尽量使用整数;不要验证[0-1]范围内的变化速率，这一块的相差都不大,对光斑影响很小</a> </p>
            <p> 变化速率绝对值 [0,8] 的区域形成光斑内圈</p>
            <p>对于1-x²。变化速率为-2x，当x为[0,4] 形成光斑内圈</p>
            <p> 对于1-x³。变化速率-3x²，当x为[0，1.6] 形成光斑内圈</p>
          </>
        </CodeText>
      </main>
    </>
  )
}
